import type { Product } from "@/lib/types";
import type { AuthorityStat } from "@/lib/boonbuy-authority-stats";

export type AuthorityLink = { href: string; label: string; external?: boolean };

export type AuthoritySection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  links?: AuthorityLink[];
};

export type AuthorityStep = { name: string; text: string };

export type AuthorityTable = {
  title: string;
  headers: string[];
  rows: string[][];
};

export type AuthorityCta = {
  href: string;
  label: string;
  external?: boolean;
  primary?: boolean;
};

export type AuthorityHubConfig = {
  slug: string;
  path: string;
  badge: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keywords: string[];
  intentCluster: readonly string[];
  directAnswer: string;
  keyFacts?: string[];
  heroStatsKind?: "spreadsheet" | "qc" | "finds" | "default";
  /** Override hero stats if computed dynamically in the page */
  heroStats?: AuthorityStat[];
  primaryCtas: AuthorityCta[];
  sections: AuthoritySection[];
  steps?: AuthorityStep[];
  stepsTitle?: string;
  table?: AuthorityTable;
  faqs: { question: string; answer: string }[];
  relatedResources: AuthorityLink[];
  productPreview?: {
    title: string;
    kind: "latest" | "qc" | "trending";
    limit?: number;
  };
  /** Show Telegram join CTAs (hero after quick answer + final). */
  telegramCta?: boolean;
  schema: "collection" | "article" | "webpage";
  breadcrumbLabel: string;
};

export type ResolvedAuthorityHub = AuthorityHubConfig & {
  heroStats: AuthorityStat[];
  previewProducts: Product[];
  lastUpdatedLabel: string;
};
