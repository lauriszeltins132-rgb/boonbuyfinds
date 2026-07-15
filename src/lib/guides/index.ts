import { BEGINNER_GUIDES } from "./beginner-guides";
import { BUYING_GUIDES } from "./buying-guides";
import { QC_GUIDES } from "./qc-guides";
import { SNEAKER_GUIDES } from "./sneaker-guides";
import { FASHION_GUIDES } from "./fashion-guides";
import { BRAND_GUIDES } from "./brand-guides";
import { BUDGET_GUIDES } from "./budget-guides";
import { BOONBUY_SEO_GUIDES } from "./boonbuy-seo-guides";
import { COMPARISON_GUIDES } from "./comparison-guides";
import type { GuideCategory, GuidePage } from "./types";

export type { GuideCategory, GuidePage } from "./types";
export { GUIDE_CATEGORIES, getGuideCategoryMeta } from "./categories";
export { CORE_LINKS } from "./shared";

export const GUIDE_PAGES: Record<string, GuidePage> = {
  ...BEGINNER_GUIDES,
  ...BUYING_GUIDES,
  ...QC_GUIDES,
  ...SNEAKER_GUIDES,
  ...FASHION_GUIDES,
  ...BRAND_GUIDES,
  ...BUDGET_GUIDES,
  ...BOONBUY_SEO_GUIDES,
  ...COMPARISON_GUIDES,
};

export const GUIDE_SLUGS = Object.keys(GUIDE_PAGES);

export function getGuide(slug: string): GuidePage | undefined {
  return GUIDE_PAGES[slug];
}

export function getAllGuides(): GuidePage[] {
  return GUIDE_SLUGS.map((slug) => GUIDE_PAGES[slug]);
}

export function getGuidesByCategory(category: GuideCategory): GuidePage[] {
  return getAllGuides().filter((guide) => guide.category === category);
}

export const GUIDES_HUB = {
  path: "/guides",
  title: "BoonBuy Guides – Agents, QC Photos & How to Order",
  metaDescription:
    "BoonBuy Finds guides for shopping agents, QC photos, shipping hauls, marketplace buying, and browsing sneaker and fashion finds.",
  h1: "Guides",
  intro:
    "Clear, practical guides for browsing finds and buying through BoonBuy. Start with the basics or jump straight to sneakers, fashion, brands, or budget picks.",
};
