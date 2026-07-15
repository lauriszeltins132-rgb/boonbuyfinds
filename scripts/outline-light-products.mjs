#!/usr/bin/env node
/**
 * Outline light products on cream mats without eating white garment pixels.
 * Strategy: darken the subject EDGE (pixels next to exact cream), not the cream.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const processedDir = path.join(__dirname, "../public/processed");
const CREAM = { r: 255, g: 252, b: 248 };
const CONCURRENCY = Math.max(4, Math.min(12, os.cpus().length));

function isExactCream(r, g, b) {
  // Only the baked cream matte — never pure white garment pixels
  return (
    Math.abs(r - CREAM.r) <= 1 &&
    Math.abs(g - CREAM.g) <= 1 &&
    Math.abs(b - CREAM.b) <= 1
  );
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function clamp(v) {
  return v < 0 ? 0 : v > 255 ? 255 : v | 0;
}

function floodCreamMask(data, width, height) {
  const total = width * height;
  const mask = new Uint8Array(total);
  const stack = [];

  const seed = (x, y) => {
    const idx = y * width + x;
    if (mask[idx]) return;
    const i = idx * 4;
    if (isExactCream(data[i], data[i + 1], data[i + 2])) {
      mask[idx] = 1;
      stack.push(idx);
    }
  };

  for (let x = 0; x < width; x++) {
    seed(x, 0);
    seed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    seed(0, y);
    seed(width - 1, y);
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
      if (isExactCream(data[i], data[i + 1], data[i + 2])) {
        mask[nidx] = 1;
        stack.push(nidx);
      }
    }
  }

  // Fill isolated exact-cream holes
  for (let i = 0; i < total; i++) {
    if (mask[i]) continue;
    const si = i * 4;
    if (isExactCream(data[si], data[si + 1], data[si + 2])) mask[i] = 1;
  }
  return mask;
}

function outlineLight(data, width, height) {
  const creamMask = floodCreamMask(data, width, height);
  const total = width * height;

  let subjectCount = 0;
  let subjectLuma = 0;
  for (let i = 0; i < total; i++) {
    if (creamMask[i]) continue;
    const si = i * 4;
    subjectCount++;
    subjectLuma += luminance(data[si], data[si + 1], data[si + 2]);
  }
  if (subjectCount < 30) return { changed: false };
  const avgL = subjectLuma / subjectCount;
  // Only outline relatively light products
  if (avgL < 150) return { changed: false, avgL };

  // Subject edge = subject pixel adjacent to cream
  const edge = new Uint8Array(total);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (creamMask[idx]) continue;
      let nearCream = false;
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        if (creamMask[ny * width + nx]) {
          nearCream = true;
          break;
        }
      }
      if (nearCream) edge[idx] = 1;
    }
  }

  // Second ring inward for thicker stroke on very light items
  const edge2 = new Uint8Array(total);
  if (avgL >= 185) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (creamMask[idx] || edge[idx]) continue;
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          if (edge[ny * width + nx]) {
            edge2[idx] = 1;
            break;
          }
        }
      }
    }
  }

  const out = Buffer.from(data);
  let painted = 0;
  for (let i = 0; i < total; i++) {
    if (!edge[i] && !edge2[i]) continue;
    const si = i * 4;
    const r = data[si];
    const g = data[si + 1];
    const b = data[si + 2];
    // Darken garment edge toward deep brown/black
    const t = edge[i] ? 0.48 : 0.28;
    out[si] = clamp(r * (1 - t) + 18 * t);
    out[si + 1] = clamp(g * (1 - t) + 14 * t);
    out[si + 2] = clamp(b * (1 - t) + 12 * t);
    out[si + 3] = 255;
    painted++;
  }

  return { changed: painted > 0, out, avgL, painted };
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

  console.log(`Edge-darken outline for light products (${files.length})...`);
  let done = 0;
  let outlined = 0;

  await mapPool(files, CONCURRENCY, async (file) => {
    const filePath = path.join(processedDir, file);
    try {
      const { data, info } = await sharp(filePath)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const result = outlineLight(data, info.width, info.height);
      done++;
      if (result.changed) {
        await sharp(result.out, {
          raw: { width: info.width, height: info.height, channels: 4 },
        })
          .png({ compressionLevel: 8, effort: 6 })
          .toFile(filePath);
        outlined++;
      }
      if (done % 200 === 0) {
        console.log(`  ${done}/${files.length} outlined=${outlined}`);
      }
    } catch (error) {
      done++;
      console.error(`  fail ${file}:`, error.message);
    }
  });

  console.log(`Done. outlined=${outlined}/${files.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
