import type { ProductBadgeKind } from "./types";

export type CardDisplayBadge = {
  kind: ProductBadgeKind;
  label: string;
};

/** Serializable card presentation props — safe to pass into client components. */
export type CardDisplayProps = {
  displaySrc: string;
  fallbacks: string[];
  fillClass: string;
  isProcessedCutout: boolean;
  badges: CardDisplayBadge[];
  badgesTrending: CardDisplayBadge[];
  freshness: string | null;
};

export type CardDisplayMap = Record<string, CardDisplayProps>;
