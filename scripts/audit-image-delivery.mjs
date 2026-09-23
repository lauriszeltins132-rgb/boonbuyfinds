#!/usr/bin/env node
/**
 * Image delivery audit for BoonBuy Finds (no catalog mutations).
 * Run: node scripts/audit-image-delivery.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/data");
const publicDir = path.join(__dirname, "../public");

const products = JSON.parse(
  fs.readFileSync(path.join(dataDir, "products.json"), "utf8")
);
const dead = new Set(
  JSON.parse(fs.readFileSync(path.join(dataDir, "dead-image-urls.json"), "utf8"))
    .urls ?? []
);
const processedMap =
  JSON.parse(fs.readFileSync(path.join(dataDir, "processed-image-map.json"), "utf8"))
    .urls ?? {};
const damaged = JSON.parse(
  fs.readFileSync(path.join(dataDir, "damaged-processed-manifest.json"), "utf8")
);
const damagedUrls = new Set(damaged.urls ?? []);

const ALLOWED = new Set([
  "i.postimg.cc",
  "postimg.cc",
  "postimages.org",
  "i.postimages.org",
  "si.geilicdn.com",
  "cbu01.alicdn.com",
  "img.alicdn.com",
  "ae01.alicdn.com",
  "sc04.alicdn.com",
  "gd4.alicdn.com",
]);

const hosts = {};
let missing = 0;
let invalidHost = 0;
let malformed = 0;
let validRemote = 0;
let deadMarked = 0;
let deadWithLocal = 0;
let localFileMissing = 0;
const ext = {};

for (const product of products) {
  const raw = String(product.image || "").trim();
  if (!raw) {
    missing++;
    continue;
  }

  let url;
  try {
    url = new URL(raw);
  } catch {
    malformed++;
    continue;
  }

  const host = url.hostname.toLowerCase();
  hosts[host] = (hosts[host] || 0) + 1;
  if (!ALLOWED.has(host)) {
    invalidHost++;
    continue;
  }

  validRemote++;
  const pathname = url.pathname.toLowerCase();
  const match = pathname.match(/\.([a-z0-9]+)$/);
  const kind = match ? match[1] : "unknown";
  ext[kind] = (ext[kind] || 0) + 1;

  if (dead.has(raw)) {
    deadMarked++;
    const local = processedMap[raw];
    if (local) {
      deadWithLocal++;
      if (!fs.existsSync(path.join(publicDir, local.replace(/^\//, "")))) {
        localFileMissing++;
      }
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  totalProducts: products.length,
  missing,
  malformed,
  invalidHost,
  validRemote,
  deadMarked,
  deadWithLocalFallback: deadWithLocal,
  localProcessedMissingFile: localFileMissing,
  damagedManifestUrls: damagedUrls.size,
  hosts: Object.entries(hosts)
    .sort((a, b) => b[1] - a[1])
    .map(([host, count]) => ({ host, count })),
  formats: ext,
  failureReasons: [
    {
      reason: "CDN URL marked dead in dead-image-urls.json",
      count: deadMarked,
    },
    {
      reason: "Missing image URL",
      count: missing,
    },
    {
      reason: "Invalid / disallowed host",
      count: invalidHost,
    },
    {
      reason: "Malformed URL",
      count: malformed,
    },
    {
      reason:
        "Processed cutouts blocked by damaged-processed-manifest (forces CDN)",
      count: damagedUrls.size,
    },
  ],
  remediation:
    "Serve /processed local mattes when CDN is dead; route remotes through next/image for AVIF/WebP + caching; reduce homepage initial image count.",
};

console.log("=== BoonBuy Image Delivery Audit ===\n");
console.log(JSON.stringify(report, null, 2));

fs.writeFileSync(
  path.join(dataDir, "image-delivery-audit.json"),
  JSON.stringify(report, null, 2)
);
console.log("\nWrote src/data/image-delivery-audit.json");
