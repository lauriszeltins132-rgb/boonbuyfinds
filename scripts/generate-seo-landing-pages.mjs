#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const appDir = path.join(root, "src/app");

const SLUGS = [
  "boonbuy-spreadsheet",
  "best-boonbuy-spreadsheet",
  "boonbuy-qc",
  "boonbuy-finds",
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
  const dir = path.join(appDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.tsx"), pageTemplate(slug));
  console.log("created", slug);
}
