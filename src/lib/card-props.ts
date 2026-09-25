import "server-only";

import cardPropsData from "@/data/card-props.json";
import { BADGE_LABELS } from "./product-badge-ui";
import type { CardDisplayMap, CardDisplayProps } from "./card-display";
import type { ProductBadgeKind } from "./types";

export type { CardDisplayMap, CardDisplayProps } from "./card-display";

type RawCardEntry = {
  src: string;
  fb?: string[];
  fc?: "s" | "b" | "d";
  pm?: 0 | 1;
  b?: ProductBadgeKind[];
  bt?: ProductBadgeKind[];
  f?: "r" | "w" | "i";
};

type CardPropsManifest = {
  p: Record<string, RawCardEntry>;
};

const manifest = cardPropsData as CardPropsManifest;

const FILL_CLASSES: Record<"s" | "b" | "d", string> = {
  s: "product-float-asset--fill-sparse",
  b: "product-float-asset--fill-balanced",
  d: "product-float-asset--fill-dense",
};

const FRESHNESS_LABELS: Record<"r" | "w" | "i", string> = {
  r: "Added recently",
  w: "New this week",
  i: "Recently indexed",
};

function expandBadges(kinds?: ProductBadgeKind[]) {
  if (!kinds?.length) return [];
  return kinds.map((kind) => ({ kind, label: BADGE_LABELS[kind] }));
}

function catalogDisplayUrl(raw: RawCardEntry): string {
  // Prefer first-party /cdn WebP variants, then remote original.
  // Never prefer /processed/ cutouts (appearance-changing).
  if (raw.src.startsWith("/cdn/")) return raw.src;
  if (/^https?:\/\//i.test(raw.src)) return raw.src;
  const cdn = raw.fb?.find((url) => url.startsWith("/cdn/"));
  if (cdn) return cdn;
  const remote = raw.fb?.find((url) => /^https?:\/\//i.test(url));
  return remote ?? raw.src;
}

/** Card display prefers first-party CDN variants; never processed cutouts. */
export function getCardDisplayProps(productId: string): CardDisplayProps | null {
  const raw = manifest.p[productId];
  if (!raw) return null;

  const displaySrc = catalogDisplayUrl(raw);
  const fallbacks = (raw.fb ?? []).filter(
    (url) =>
      url &&
      url !== displaySrc &&
      !url.startsWith("/processed/") &&
      !url.includes("/api/processed-image")
  );

  const badges = expandBadges(raw.b);
  const badgesTrending = expandBadges(raw.bt ?? raw.b);

  return {
    displaySrc,
    fallbacks,
    fillClass: FILL_CLASSES[raw.fc ?? "b"],
    isProcessedCutout: false,
    badges,
    badgesTrending,
    freshness: raw.f ? FRESHNESS_LABELS[raw.f] : null,
  };
}

/** Resolve display props for a product list without shipping the full manifest to the browser. */
export function getCardDisplayMap(
  productIds: Iterable<string>
): CardDisplayMap {
  const map: CardDisplayMap = {};
  for (const id of productIds) {
    const props = getCardDisplayProps(id);
    if (props) map[id] = props;
  }
  return map;
}
