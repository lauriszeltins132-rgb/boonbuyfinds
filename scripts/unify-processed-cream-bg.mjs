#!/usr/bin/env node
/**
 * Force remaining non-cream processed PNG edge mattes to exact wallpaper #fffcf8.
 * Only rewrites images whose corners share a consistent background that is not cream.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const processedDir = path.join(__dirname, "../public/processed");
const CREAM = { r: 255, g: 252, b: 248 };
const CONCURRENCY = Math.max(4, Math.min(12, os.cpus().length));

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function chroma(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function dist(a, b) {
  return Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b);
}

function isExactCream(r, g, b) {
  return (
    Math.abs(r - CREAM.r) <= 2 &&
    Math.abs(g - CREAM.g) <= 2 &&
    Math.abs(b - CREAM.b) <= 2
  );
}

function cornerColors(data, width, height) {
  const pts = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];
  return pts.map(([x, y]) => {
    const i = (y * width + x) * 4;
    return { r: data[i], g: data[i + 1], b: data[i + 2] };
  });
}

function avgColor(colors) {
  const n = colors.length || 1;
  return {
    r: Math.round(colors.reduce((s, c) => s + c.r, 0) / n),
    g: Math.round(colors.reduce((s, c) => s + c.g, 0) / n),
    b: Math.round(colors.reduce((s, c) => s + c.b, 0) / n),
  };
}

function shouldFix(corners) {
  const bad = corners.filter((c) => !isExactCream(c.r, c.g, c.b));
  if (bad.length < 2) return null;

  // Corners should agree (shared studio matte), not look like product fill.
  let maxPair = 0;
  for (let i = 0; i < corners.length; i++) {
    for (let j = i + 1; j < corners.length; j++) {
      maxPair = Math.max(maxPair, dist(corners[i], corners[j]));
    }
  }
  if (maxPair > 70) return null;

  const seed = avgColor(bad);
  // Skip only if the "matte" already matches cream closely enough.
  if (dist(seed, CREAM) <= 6) return null;
  return seed;
}

function isMattePixel(r, g, b, seed) {
  if (isExactCream(r, g, b)) return true;
  const d = dist({ r, g, b }, seed);
  const c = chroma(r, g, b);
  const L = luminance(r, g, b);
  const seedL = luminance(seed.r, seed.g, seed.b);

  // Warm gray / off-white studio mattes (~229,226,223 etc.)
  if (d <= 36 && c <= 28) return true;

  // Dark flat leftover mattes
  if (seedL < 90 && d <= 48 && c <= 22 && L < 110) return true;

  // Mid gray studio
  if (seedL >= 70 && seedL < 180 && d <= 40 && c <= 20) return true;

  return false;
}

function floodMatte(data, width, height, seed) {
  const total = width * height;
  const mask = new Uint8Array(total);
  const stack = [];

  const trySeed = (x, y) => {
    const idx = y * width + x;
    if (mask[idx]) return;
    const i = idx * 4;
    if (isMattePixel(data[i], data[i + 1], data[i + 2], seed)) {
      mask[idx] = 1;
      stack.push(idx);
    }
  };

  for (let x = 0; x < width; x++) {
    trySeed(x, 0);
    trySeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    trySeed(0, y);
    trySeed(width - 1, y);
  }

  while (stack.length) {
    const idx = stack.pop();
    const x = idx % width;
    const y = (idx / width) | 0;
    for (const [nx, ny] of [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const nidx = ny * width + nx;
      if (mask[nidx]) continue;
      const i = nidx * 4;
      if (isMattePixel(data[i], data[i + 1], data[i + 2], seed)) {
        mask[nidx] = 1;
        stack.push(nidx);
      }
    }
  }

  return mask;
}

async function processFile(sharp, file) {
  const filePath = path.join(processedDir, file);
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const corners = cornerColors(data, info.width, info.height);
  const seed = shouldFix(corners);
  if (!seed) return { file, skipped: true };

  const mask = floodMatte(data, info.width, info.height, seed);
  let matteCount = 0;
  const out = Buffer.from(data);
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i]) continue;
    matteCount++;
    const si = i * 4;
    out[si] = CREAM.r;
    out[si + 1] = CREAM.g;
    out[si + 2] = CREAM.b;
    out[si + 3] = 255;
  }

  if (matteCount / mask.length < 0.005) {
    return { file, skipped: true, tiny: true };
  }

  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 8, effort: 6 })
    .toFile(filePath);

  return { file, skipped: false, matteRatio: matteCount / mask.length, seed };
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
  return results;
}

async function main() {
  const sharp = (await import("sharp")).default;
  const files = fs
    .readdirSync(processedDir)
    .filter((f) => f.endsWith(".png"))
    .sort();

  console.log(
    `Unifying cream matte on ${files.length} images (${CONCURRENCY} workers)...`
  );

  let done = 0;
  let rewritten = 0;
  let skipped = 0;

  await mapPool(files, CONCURRENCY, async (file) => {
    try {
      const result = await processFile(sharp, file);
      done++;
      if (result.skipped) skipped++;
      else rewritten++;
      if (done % 200 === 0) {
        console.log(`  ${done}/${files.length} rewritten=${rewritten} skipped=${skipped}`);
      }
      return result;
    } catch (error) {
      done++;
      console.error(`  fail ${file}:`, error.message);
      return { file, error: true };
    }
  });

  console.log(`Done. rewritten=${rewritten} skipped=${skipped}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
