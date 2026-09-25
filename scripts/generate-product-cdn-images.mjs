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

function priorityUrls(products, popularIds) {
  const popular = new Set(popularIds);
  const ranked = [...products].sort((a, b) => {
    const ap = popular.has(a.id) ? 0 : 1;
    const bp = popular.has(b.id) ? 0 : 1;
    if (ap !== bp) return ap - bp;
    return Number(b.id) - Number(a.id);
  });
  return ranked;
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

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const products = loadJson(path.join(dataDir, "products.json"), []);
  const popular = loadJson(path.join(dataDir, "popular-rank.json"), { ids: [] });
  const existing = loadJson(manifestPath, {
    generatedAt: null,
    bySourceUrl: {},
  });

  const withImages = products.filter(
    (p) => typeof p.image === "string" && /^https?:\/\//i.test(p.image)
  );
  const ordered = priorityUrls(withImages, popular.ids ?? []);
  const queue = ordered.slice(0, PRIORITY_ONLY ? Math.min(MAX, 120) : MAX);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  await mapPool(queue, CONCURRENCY, async (product) => {
    const url = product.image;
    const prev = existing.bySourceUrl[url];
    if (
      prev?.variants?.card?.src &&
      fs.existsSync(path.join(root, "public", prev.variants.card.src.replace(/^\//, "")))
    ) {
      skipped += 1;
      return;
    }

    try {
      const buf = await fetchBuffer(url);
      const entry = await writeVariants(url, buf);
      existing.bySourceUrl[url] = entry;
      created += 1;
      if (created % 25 === 0) {
        existing.generatedAt = new Date().toISOString();
        fs.writeFileSync(manifestPath, JSON.stringify(existing));
        console.log(`… ${created} created, ${skipped} skipped, ${failed} failed`);
      }
    } catch (error) {
      failed += 1;
      if (failed <= 12) {
        console.warn(`fail ${product.id}: ${error.message}`);
      }
    }
  });

  existing.generatedAt = new Date().toISOString();
  existing.stats = {
    created,
    skipped,
    failed,
    queued: queue.length,
    totalMapped: Object.keys(existing.bySourceUrl).length,
  };
  fs.writeFileSync(manifestPath, JSON.stringify(existing, null, 0));
  console.log(
    `CDN images → created=${created} skipped=${skipped} failed=${failed} mapped=${existing.stats.totalMapped}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
