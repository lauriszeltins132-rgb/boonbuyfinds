import type { StaticPageSection } from "@/lib/static-pages";
import type { SeoLandingProductFilter } from "@/lib/seo-landing-config";

export type SeoArchitectureCategory =
  | "brand"
  | "comparison"
  | "spreadsheet"
  | "category"
  | "guide"
  | "review";

export type SeoArticleImage = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type SeoArchitecturePage = {
  slug: string;
  path: string;
  category: SeoArchitectureCategory;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  intro: string;
  keywords: string[];
  sections: StaticPageSection[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { href: string; label: string }[];
  relatedArticleSlugs?: string[];
  productFilter?: SeoLandingProductFilter;
  productSectionTitle?: string;
  spreadsheetHref?: string;
  parentCrumb?: { label: string; href: string };
  heroImage?: SeoArticleImage;
  publishedIso?: string;
};
