#!/usr/bin/env node
/**
 * Generates thin Next.js route wrappers for SEO architecture pages.
 * Run: node scripts/generate-seo-architecture-routes.mjs
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const slugsPath = join(root, "src/lib/seo-architecture/slugs.json");

// slugs maintained alongside registry — generated from registry at build time via import would need ts — use manual sync from registry export
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// Read slugs from registry by parsing the registry file for slugs export
import { readFileSync } from "node:fs";
const registrySrc = readFileSync(
  join(root, "src/lib/seo-architecture/registry.ts"),
  "utf8"
);

// Extract slug keys from spread imports - simpler: read slugs.json we'll write from a static list
const SLUGS = [
  "boonbuy-spreadsheet-2026",
  "boonbuy-discord",
  "boonbuy-telegram",
  "boonbuy-discount-code",
  "boonbuy-shipping",
  "boonbuy-review",
  "how-to-use-boonbuy",
  "what-is-boonbuy",
  "is-boonbuy-legit",
  "is-boonbuy-safe",
  "boonbuy-vs-litbuy",
  "boonbuy-vs-kakobuy",
  "boonbuy-vs-cnfans",
  "boonbuy-vs-allchinabuy",
  "boonbuy-vs-hoobuy",
  "spreadsheet",
  "best-spreadsheet",
  "china-spreadsheet",
  "designer-spreadsheet",
  "clothing-spreadsheet",
  "budget-spreadsheet",
  "luxury-spreadsheet",
  "best-boonbuy-spreadsheet",
  "best-t-shirts",
  "best-pants",
  "best-shorts",
  "best-watches",
  "trending-finds",
  "how-to-buy-from-taobao",
  "how-to-buy-from-weidian",
  "how-to-use-agents",
  "how-shipping-works",
  "how-to-save-on-shipping",
  "how-to-declare-parcels",
  "how-to-avoid-customs",
  "how-to-find-best-reps",
  "best-chinese-shopping-agent",
  "best-agent-for-reps",
  "best-agent-for-taobao",
];

const template = (slug) => `import { createSeoArchitecturePage } from "@/lib/seo-architecture/create-page";

export const revalidate = 86400;

const { generateMetadata, Page } = createSeoArchitecturePage("${slug}");
export { generateMetadata };
export default Page;
`;

let created = 0;
let skipped = 0;

for (const slug of SLUGS) {
  const dir = join(root, "src/app", slug);
  const pagePath = join(dir, "page.tsx");

  if (existsSync(pagePath)) {
    skipped++;
    continue;
  }

  mkdirSync(dir, { recursive: true });
  writeFileSync(pagePath, template(slug), "utf8");
  created++;
}

console.log(`SEO architecture routes: created ${created}, skipped ${skipped} (existing)`);
void registrySrc;
