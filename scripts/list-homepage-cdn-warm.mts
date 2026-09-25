/**
 * Lists image URLs for homepage rails + first catalog page.
 * Writes src/data/cdn-warm-urls.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getHomepageSurfaceRails } from "../src/lib/homepage-rails.ts";
import { getAllProducts } from "../src/lib/products.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "../src/data/cdn-warm-urls.json");

const rails = getHomepageSurfaceRails(12);
const catalog = getAllProducts().slice(0, 48);
const products = [
  ...rails.popularToday,
  ...rails.latestFinds,
  ...rails.bestUnder50,
  ...(rails.nikeFinds || []),
  ...catalog,
];

const urls = [
  ...new Set(
    products
      .map((p) => p.image)
      .filter((u) => typeof u === "string" && /^https?:\/\//i.test(u))
  ),
];

const payload = {
  generatedAt: new Date().toISOString(),
  urls,
  ids: [...new Set(products.map((p) => String(p.id)))],
};

fs.writeFileSync(outPath, JSON.stringify(payload));
console.log(
  `cdn-warm-urls → ${urls.length} urls, ${payload.ids.length} product ids`
);
