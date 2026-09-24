import cardPropsData from "@/data/card-props.json";
import { BADGE_LABELS } from "./product-badge-ui";
import type { ProductBadgeKind } from "./types";

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

export type CardDisplayProps = {
  displaySrc: string;
  fallbacks: string[];
  fillClass: string;
  isProcessedCutout: boolean;
  badges: { kind: ProductBadgeKind; label: string }[];
  badgesTrending: { kind: ProductBadgeKind; label: string }[];
  freshness: string | null;
};

function expandBadges(kinds?: ProductBadgeKind[]) {
  if (!kinds?.length) return [];
  return kinds.map((kind) => ({ kind, label: BADGE_LABELS[kind] }));
}

function catalogOriginalUrl(raw: RawCardEntry): string {
  // Prefer remote catalog original over local /processed/ cutouts.
  if (/^https?:\/\//i.test(raw.src)) return raw.src;
  const remote = raw.fb?.find((url) => /^https?:\/\//i.test(url));
  return remote ?? raw.src;
}

/** Card display uses the original catalog image — never processed cutouts. */
export function getCardDisplayProps(productId: string): CardDisplayProps | null {
  const raw = manifest.p[productId];
  if (!raw) return null;

  const displaySrc = catalogOriginalUrl(raw);
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
