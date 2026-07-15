#!/usr/bin/env node
/**
 * Rematte existing public/processed PNGs from dark (#141418) to cream (#fffcf8),
 * gently normalize subject brightness, and add a soft dark outline on light items
 * so white products stay visible on the warm site background.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const processedDir = path.join(__dirname, "../public/processed");

const CREAM = { r: 255, g: 252, b: 248 }; // #fffcf8
const OUTLINE = { r: 36, g: 28, b: 22 };
const CONCURRENCY = Math.max(4, Math.min(12, os.cpus().length));

/** Detect baked dark matte + flat studio black (NOT textured black fabric). */
function isOldMattePixel(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;

  // Exact-ish processor mattes used historically
  if (
    Math.abs(r - 20) <= 12 &&
    Math.abs(g - 20) <= 12 &&
    Math.abs(b - 24) <= 14 &&
    chroma <= 16
  ) {
    return true;
  }
  if (
    Math.abs(r - 19) <= 12 &&
    Math.abs(g - 19) <= 12 &&
    Math.abs(b - 26) <= 14 &&
    chroma <= 16
  ) {
    return true;
  }

  // Flat near-black studio leftover (extremely dark + almost no chroma)
  if (max <= 22 && chroma <= 10) return true;

  // Warm gray leftover matte (~229,226,223) darker than cream wallpaper
  if (
    chroma <= 18 &&
    r >= 200 &&
    r <= 245 &&
    g >= 198 &&
    g <= 245 &&
    b >= 195 &&
    b <= 242 &&
    !(Math.abs(r - 255) <= 3 && Math.abs(g - 252) <= 3 && Math.abs(b - 248) <= 3)
  ) {
    return true;
  }

  return false;
}

function floodMatteMask(data, width, height) {
  const total = width * height;
  const mask = new Uint8Array(total);
  const stack = [];

  const trySeed = (x, y) => {
    const idx = y * width + x;
    if (mask[idx]) return;
    const i = idx * 4;
    if (isOldMattePixel(data[i], data[i + 1], data[i + 2])) {
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
      if (isOldMattePixel(data[i], data[i + 1], data[i + 2])) {
        mask[nidx] = 1;
        stack.push(nidx);
      }
    }
  }

  // Also replace any non-edge “matte holes” that still match old matte exactly,
  // but never flood into dark garments that differ from the edge matte.
  for (let i = 0; i < total; i++) {
    if (mask[i]) continue;
    const si = i * 4;
    const r = data[si];
    const g = data[si + 1];
    const b = data[si + 2];
    if (
      (Math.abs(r - 20) <= 6 &&
        Math.abs(g - 20) <= 6 &&
        Math.abs(b - 24) <= 8) ||
      (Math.abs(r - 19) <= 6 &&
        Math.abs(g - 19) <= 6 &&
        Math.abs(b - 26) <= 8)
    ) {
      mask[i] = 1;
    }
  }

  return mask;
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function clamp(v) {
  return v < 0 ? 0 : v > 255 ? 255 : v | 0;
}

function normalizeSubjectPixel(r, g, b) {
  const L = luminance(r, g, b);
  // Lift crushed shadows a bit, soften blown highlights — keep midtones mostly
  let factor = 1.03;
  if (L < 35) factor = 1.18;
  else if (L < 70) factor = 1.1;
  else if (L > 235) factor = 0.9;
  else if (L > 210) factor = 0.95;
  return {
    r: clamp(r * factor),
    g: clamp(g * factor),
    b: clamp(b * factor),
  };
}

function rematte(data, width, height) {
  const mask = floodMatteMask(data, width, height);
  const total = width * height;
  const out = Buffer.alloc(total * 4);

  let subjectCount = 0;
  let subjectLuma = 0;

  for (let i = 0; i < total; i++) {
    const si = i * 4;
    if (mask[i]) {
      out[si] = CREAM.r;
      out[si + 1] = CREAM.g;
      out[si + 2] = CREAM.b;
      out[si + 3] = 255;
      continue;
    }
    const n = normalizeSubjectPixel(data[si], data[si + 1], data[si + 2]);
    out[si] = n.r;
    out[si + 1] = n.g;
    out[si + 2] = n.b;
    out[si + 3] = 255;
    subjectCount++;
    subjectLuma += luminance(n.r, n.g, n.b);
  }

  const avgL = subjectCount > 0 ? subjectLuma / subjectCount : 0;
  const needsOutline = avgL >= 150;

  if (needsOutline) {
    // Darken SUBJECT edge pixels that touch cream (keeps white garments visible)
    const edge = new Uint8Array(total);
    const edge2 = new Uint8Array(total);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (mask[idx]) continue; // subject
        let nearCream = false;
        for (const [dx, dy] of [
          [1, 0], [-1, 0], [0, 1], [0, -1],
          [1, 1], [-1, 1], [1, -1], [-1, -1],
        ]) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          if (mask[ny * width + nx]) {
            nearCream = true;
            break;
          }
        }
        if (nearCream) edge[idx] = 1;
      }
    }
    if (avgL >= 180) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x;
          if (mask[idx] || edge[idx]) continue;
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
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

    for (let i = 0; i < total; i++) {
      if (!edge[i] && !edge2[i]) continue;
      const si = i * 4;
      const r = out[si];
      const g = out[si + 1];
      const b = out[si + 2];
      const t = edge[i] ? 0.55 : 0.32;
      out[si] = clamp(r * (1 - t) + 16 * t);
      out[si + 1] = clamp(g * (1 - t) + 12 * t);
      out[si + 2] = clamp(b * (1 - t) + 10 * t);
    }
  }

  let matteRatio = 0;
  for (let i = 0; i < total; i++) if (mask[i]) matteRatio++;
  matteRatio /= total;

  return { out, matteRatio, needsOutline, avgL };
}

async function processFile(sharp, file) {
  const filePath = path.join(processedDir, file);
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { out, matteRatio, needsOutline } = rematte(
    data,
    info.width,
    info.height
  );

  // Skip rewrite if almost no matte found (already cream / natural photo)
  if (matteRatio < 0.02) {
    return { file, skipped: true, matteRatio, needsOutline };
  }

  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 8, effort: 6 })
    .toFile(filePath);

  return { file, skipped: false, matteRatio, needsOutline };
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
  if (!fs.existsSync(processedDir)) {
    console.error("Missing public/processed");
    process.exit(1);
  }

  const files = fs
    .readdirSync(processedDir)
    .filter((f) => f.endsWith(".png"))
    .sort();

  console.log(
    `Rematting ${files.length} processed images → cream #fffcf8 (${CONCURRENCY} workers)...`
  );

  let done = 0;
  let rewritten = 0;
  let outlined = 0;
  let skipped = 0;

  await mapPool(files, CONCURRENCY, async (file) => {
    try {
      const result = await processFile(sharp, file);
      done++;
      if (result.skipped) skipped++;
      else {
        rewritten++;
        if (result.needsOutline) outlined++;
      }
      if (done % 100 === 0) {
        console.log(
          `  ${done}/${files.length} (rewritten ${rewritten}, outlined ${outlined}, skipped ${skipped})`
        );
      }
      return result;
    } catch (error) {
      done++;
      console.error(`  fail ${file}:`, error.message);
      return { file, error: true };
    }
  });

  console.log(
    `Done. rewritten=${rewritten} outlined=${outlined} skipped=${skipped} total=${files.length}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
