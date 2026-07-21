import { BRAND_ARCHITECTURE_PAGES } from "@/lib/seo-architecture/content/brand-pages";
import { CATEGORY_ARCHITECTURE_PAGES } from "@/lib/seo-architecture/content/category-pages";
import { COMPARISON_ARCHITECTURE_PAGES } from "@/lib/seo-architecture/content/comparison-pages";
import { GUIDE_ARCHITECTURE_PAGES } from "@/lib/seo-architecture/content/guide-pages";
import { REVIEW_ARCHITECTURE_PAGES } from "@/lib/seo-architecture/content/review-pages";
import { SPREADSHEET_ARCHITECTURE_PAGES } from "@/lib/seo-architecture/content/spreadsheet-pages";
import { withMinimumWordCount } from "@/lib/seo-architecture/supplement";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";

function applyMinimumWords(
  pages: Record<string, SeoArchitecturePage>,
  minimum = 1500
): Record<string, SeoArchitecturePage> {
  return Object.fromEntries(
    Object.entries(pages).map(([slug, page]) => [
      slug,
      withMinimumWordCount(page, page.category === "comparison" ? 1800 : minimum),
    ])
  );
}

export const SEO_ARCHITECTURE_PAGES: Record<string, SeoArchitecturePage> = {
  ...applyMinimumWords(BRAND_ARCHITECTURE_PAGES),
  ...applyMinimumWords(COMPARISON_ARCHITECTURE_PAGES),
  ...applyMinimumWords(SPREADSHEET_ARCHITECTURE_PAGES),
  ...applyMinimumWords(CATEGORY_ARCHITECTURE_PAGES),
  ...applyMinimumWords(GUIDE_ARCHITECTURE_PAGES),
  ...applyMinimumWords(REVIEW_ARCHITECTURE_PAGES),
};

export const SEO_ARCHITECTURE_SLUGS = Object.keys(SEO_ARCHITECTURE_PAGES);

export function getSeoArchitecturePage(slug: string): SeoArchitecturePage | undefined {
  return SEO_ARCHITECTURE_PAGES[slug];
}

export function getSeoArchitecturePath(slug: string): string {
  return SEO_ARCHITECTURE_PAGES[slug]?.path ?? `/${slug}`;
}
