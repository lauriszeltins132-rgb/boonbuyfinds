#!/usr/bin/env node
/**
 * Generates favicon PNG/ICO assets from the official BoonBuy mark
 * (public/icon-source.png, fallback icon-source.svg).
 * Run: node scripts/generate-favicons.mjs
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const appDir = join(root, "src", "app");

const pngSource = join(publicDir, "icon-source.png");
const svgSource = join(publicDir, "icon-source.svg");
const source = existsSync(pngSource)
  ? readFileSync(pngSource)
  : readFileSync(svgSource);

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
/** Apple touch prefers an opaque tile — match BoonBuy cream chrome. */
const appleBg = { r: 255, g: 252, b: 248, alpha: 1 };

const sizes = [
  { name: "favicon-16x16.png", size: 16, background: transparent },
  { name: "favicon-32x32.png", size: 32, background: transparent },
  { name: "favicon-48x48.png", size: 48, background: transparent },
  { name: "favicon-192x192.png", size: 192, background: transparent },
  { name: "favicon-512x512.png", size: 512, background: transparent },
  { name: "apple-touch-icon.png", size: 180, background: appleBg },
  { name: "android-chrome-192x192.png", size: 192, background: transparent },
  { name: "android-chrome-512x512.png", size: 512, background: transparent },
];

const pngBuffers = {};

for (const { name, size, background } of sizes) {
  const buffer = await sharp(source)
    .resize(size, size, {
      fit: "contain",
      background,
    })
    .png()
    .toBuffer();

  writeFileSync(join(publicDir, name), buffer);
  if (size <= 48) pngBuffers[size] = buffer;
  console.log(`created ${name}`);
}

const icoBuffer = await pngToIco([
  pngBuffers[16],
  pngBuffers[32],
  pngBuffers[48],
]);

writeFileSync(join(publicDir, "favicon.ico"), icoBuffer);
writeFileSync(join(appDir, "favicon.ico"), icoBuffer);
console.log("created favicon.ico (public + src/app)");

await sharp(source)
  .resize(32, 32, { fit: "contain", background: transparent })
  .png()
  .toFile(join(appDir, "icon.png"));
console.log("created src/app/icon.png");

await sharp(source)
  .resize(180, 180, { fit: "contain", background: appleBg })
  .png()
  .toFile(join(appDir, "apple-icon.png"));
console.log("created src/app/apple-icon.png");
