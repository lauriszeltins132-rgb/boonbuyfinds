#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const appDir = path.join(root, "src/app");

/**
 * Do NOT include authority-hub canons here.
 * `npm run build` regenerates these page.tsx files with createSeoLandingPage,
 * which previously clobbered /boonbuy-spreadsheet, /boonbuy-finds, and /boonbuy-qc
 * back to the old SeoLanding stack after PR #53.
 */
const AUTHORITY_HUB_SLUGS = new Set([
  "boonbuy",
  "boonbuy-spreadsheet",
  "boonbuy-finds",
  "boonbuy-qc",
  "boonbuy-shipping",
  "boonbuy-review",
  "is-boonbuy-legit",
  "boonbuy-telegram",
  "boonbuy-warehouse",
  "boonbuy-coupons",
  "boonbuy-shipping-coupon",
]);

const SLUGS = [
  "boonbuy-sneakers",
  "boonbuy-jackets",
  "boonbuy-weidian",
  "boonbuy-taobao",
  "boonbuy-guide",
  "best-boonbuy-finds",
  "boonbuy-products",
  "best-boonbuy-sneakers-2026",
  "best-boonbuy-jackets-2026",
  "best-boonbuy-bags-2026",
  "best-boonbuy-accessories-2026",
  "best-boonbuy-finds-under-50",
  "best-boonbuy-hoodies",
  "best-weidian-finds",
  "best-boonbuy-under-20",
  "best-boonbuy-under-100",
  "top-qc-finds",
  "trending-boonbuy-finds",
  "best-boonbuy-finds-2026",
];

const pageTemplate = (slug) => `import { createSeoLandingPage } from "@/lib/seo-landing-page";

const { generateMetadata, Page } = createSeoLandingPage("${slug}");

export { generateMetadata };
export default Page;
`;

for (const slug of SLUGS) {
  if (AUTHORITY_HUB_SLUGS.has(slug)) {
    console.error(`Refusing to overwrite authority hub page: ${slug}`);
    process.exit(1);
  }
  const dir = path.join(appDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.tsx"), pageTemplate(slug));
  console.log("created", slug);
}
