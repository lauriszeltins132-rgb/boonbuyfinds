#!/usr/bin/env node
/**
 * Faithful first-party product image CDN variants (no cutouts / filters).
 *
 * Downloads originals once, writes versioned WebP files under public/cdn/products/,
 * and updates src/data/product-image-cdn.json.
 *
 * Usage:
 *   node scripts/generate-product-cdn-images.mjs
 *   node scripts/generate-product-cdn-images.mjs --max=200 --concurrency=6
 *   node scripts/generate-product-cdn-images.mjs --priority-only
 */
import { spawnSync } from "child_process";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src/data");
const outDir = path.join(root, "public/cdn/products");
const manifestPath = path.join(dataDir, "product-image-cdn.json");
const warmPath = path.join(dataDir, "cdn-warm-urls.json");

const WIDTHS = [
  { key: "thumb", width: 400 },
  { key: "card", width: 800 },
  { key: "detail", width: 1400 },
];

const WEBP_QUALITY = 82;
const FETCH_TIMEOUT_MS = 20_000;

function argValue(name, fallback) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  return hit.slice(name.length + 3);
}

const MAX = Number(argValue("max", "400")) || 400;
const CONCURRENCY = Math.max(1, Number(argValue("concurrency", "5")) || 5);
const PRIORITY_ONLY = process.argv.includes("--priority-only");

function hashUrl(url) {
  return crypto.createHash("sha1").update(url).digest("hex").slice(0, 16);
}

function loadJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function refreshWarmUrls() {
  const result = spawnSync(
    "npx",
    ["tsx", path.join(__dirname, "list-homepage-cdn-warm.mts")],
    { cwd: root, encoding: "utf8", env: process.env }
  );
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.status !== 0 && result.stderr) {
    process.stderr.write(result.stderr);
    console.warn("warm-url listing failed; continuing with existing file if any");
  }
}

async function fetchBuffer(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "BoonBuyFindsImageCDN/1.0",
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
        Referer: "https://boonbuyfinds.net/",
      },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 64) throw new Error("empty body");
    return buf;
  } finally {
    clearTimeout(timer);
  }
}

async function writeVariants(url, sourceBuf) {
  const id = hashUrl(url);
  const entry = {
    original: url,
    hash: id,
    generatedAt: new Date().toISOString(),
    variants: {},
  };

  for (const { key, width } of WIDTHS) {
    const filename = `${id}-w${width}.webp`;
    const abs = path.join(outDir, filename);
    const rel = `/cdn/products/${filename}`;

    if (!fs.existsSync(abs)) {
      await sharp(sourceBuf, { failOn: "none" })
        .rotate()
        .resize({
          width,
          height: width,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(abs);
    }

    const stat = fs.statSync(abs);
    entry.variants[key] = {
      src: rel,
      width,
      bytes: stat.size,
    };
  }

  return entry;
}

function warmProductIds(products, popularIds, warmIds) {
  const warm = new Set([
    ...popularIds.map(String),
    ...warmIds.map(String),
  ]);
  for (const product of products) {
    const slug = product.category_slug || "";
    if (
      slug === "latest-finds" ||
      slug === "trending-now" ||
      slug === "best-under-50"
    ) {
      warm.add(String(product.id));
    }
  }
  const newest = [...products]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 120);
  for (const product of newest) warm.add(String(product.id));
  return warm;
}

function priorityUrls(products, popularIds, warmIds) {
  const warm = warmProductIds(products, popularIds, warmIds);
  return [...products].sort((a, b) => {
    const ap = warm.has(String(a.id)) ? 0 : 1;
    const bp = warm.has(String(b.id)) ? 0 : 1;
    if (ap !== bp) return ap - bp;
    const aPop =
      popularIds.includes(a.id) || popularIds.includes(String(a.id)) ? 0 : 1;
    const bPop =
      popularIds.includes(b.id) || popularIds.includes(String(b.id)) ? 0 : 1;
    if (aPop !== bPop) return aPop - bPop;
    return Number(b.id) - Number(a.id);
  });
}

async function mapPool(items, limit, worker) {
  const results = [];
  let i = 0;
  async function run() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

async function ensureUrl(url, existing, stats) {
  const prev = existing.bySourceUrl[url];
  if (
    prev?.variants?.card?.src &&
    fs.existsSync(
      path.join(root, "public", prev.variants.card.src.replace(/^\//, ""))
    )
  ) {
    stats.skipped += 1;
    return;
  }

  try {
    const buf = await fetchBuffer(url);
    const entry = await writeVariants(url, buf);
    existing.bySourceUrl[url] = entry;
    stats.created += 1;
    if (stats.created % 25 === 0) {
      existing.generatedAt = new Date().toISOString();
      fs.writeFileSync(manifestPath, JSON.stringify(existing));
      console.log(
        `… ${stats.created} created, ${stats.skipped} skipped, ${stats.failed} failed`
      );
    }
  } catch (error) {
    stats.failed += 1;
    if (stats.failed <= 12) {
      console.warn(`fail ${url.slice(0, 72)}: ${error.message}`);
    }
  }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  refreshWarmUrls();

  const products = loadJson(path.join(dataDir, "products.json"), []);
  const popular = loadJson(path.join(dataDir, "popular-rank.json"), { ids: [] });
  const warmFile = loadJson(warmPath, { urls: [], ids: [] });
  const existing = loadJson(manifestPath, {
    generatedAt: null,
    bySourceUrl: {},
  });

  const withImages = products.filter(
    (p) => typeof p.image === "string" && /^https?:\/\//i.test(p.image)
  );
  const ordered = priorityUrls(
    withImages,
    popular.ids ?? [],
    warmFile.ids ?? []
  );
  const queue = ordered.slice(0, PRIORITY_ONLY ? Math.min(MAX, 200) : MAX);

  const stats = { created: 0, skipped: 0, failed: 0 };

  // Always process homepage warm URLs first (even if outside MAX slice).
  const warmUrls = (warmFile.urls ?? []).filter(
    (url) => typeof url === "string" && /^https?:\/\//i.test(url)
  );
  await mapPool(warmUrls, CONCURRENCY, async (url) => {
    await ensureUrl(url, existing, stats);
  });

  await mapPool(queue, CONCURRENCY, async (product) => {
    await ensureUrl(product.image, existing, stats);
  });

  existing.generatedAt = new Date().toISOString();
  existing.stats = {
    ...stats,
    queued: queue.length,
    warmUrls: warmUrls.length,
    totalMapped: Object.keys(existing.bySourceUrl).length,
  };
  fs.writeFileSync(manifestPath, JSON.stringify(existing, null, 0));
  console.log(
    `CDN images → created=${stats.created} skipped=${stats.skipped} failed=${stats.failed} mapped=${existing.stats.totalMapped} warm=${warmUrls.length}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
