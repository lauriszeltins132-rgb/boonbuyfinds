import cdnManifest from "@/data/product-image-cdn.json";

type CdnVariant = {
  src: string;
  width: number;
  bytes?: number;
};

type CdnEntry = {
  original: string;
  hash: string;
  variants: {
    thumb?: CdnVariant;
    card?: CdnVariant;
    detail?: CdnVariant;
  };
};

type CdnManifest = {
  bySourceUrl?: Record<string, CdnEntry>;
};

const bySource = (cdnManifest as CdnManifest).bySourceUrl ?? {};

export type ProductImageCdnUrls = {
  originalUrl: string;
  thumbnailUrl: string | null;
  cardImageUrl: string | null;
  detailImageUrl: string | null;
};

/** First-party WebP variants — faithful resize only (no filters/cutouts). */
export function getProductImageCdn(originalUrl: string): ProductImageCdnUrls | null {
  if (!originalUrl) return null;
  const entry = bySource[originalUrl];
  if (!entry) return null;
  return {
    originalUrl: entry.original || originalUrl,
    thumbnailUrl: entry.variants.thumb?.src ?? null,
    cardImageUrl: entry.variants.card?.src ?? null,
    detailImageUrl: entry.variants.detail?.src ?? null,
  };
}

export function getCardCdnSrc(originalUrl: string): string | null {
  return getProductImageCdn(originalUrl)?.cardImageUrl ?? null;
}

export function getDetailCdnSrc(originalUrl: string): string | null {
  const cdn = getProductImageCdn(originalUrl);
  return cdn?.detailImageUrl ?? cdn?.cardImageUrl ?? null;
}
