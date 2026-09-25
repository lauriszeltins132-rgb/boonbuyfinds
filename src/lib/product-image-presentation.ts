import { isDeadImageUrl } from "./dead-images";
import {
  getImageFillClass,
  getImageQualityScore,
} from "./image-quality";
import { getDetailCdnSrc, getCardCdnSrc } from "./product-image-cdn";
import { getProductImagePlan } from "./processed-images";
import type { Product } from "./types";

export type ResolvedProductImage = {
  displaySrc: string;
  sourceUrl: string;
  score: number;
  fillClass: string;
  needsMatte: boolean;
  knockoutWhite: boolean;
  enhance: boolean;
  darkBoost: boolean;
  isProcessed: boolean;
  fallbacks: string[];
};

/**
 * Source priority (never invent imagery, never mutate pixels):
 * 1. First-party /cdn card|detail WebP when available
 * 2. Valid primary product.image
 * 3. null → placeholder
 */
export function resolveBestProductImageSrc(product: Product): string | null {
  if (!product.image) return null;
  const cdnDetail = getDetailCdnSrc(product.image);
  if (cdnDetail) return cdnDetail;
  const cdnCard = getCardCdnSrc(product.image);
  if (cdnCard) return cdnCard;
  if (isDeadImageUrl(product.image)) return null;
  return product.image;
}

export function resolveProductDisplayImage(
  product: Product
): ResolvedProductImage | null {
  if (!product.image) return null;

  const sourceUrl = product.image;
  const displaySrc = resolveBestProductImageSrc(product);
  if (!displaySrc) return null;

  const plan = getProductImagePlan(sourceUrl);
  const fallbacks = [
    displaySrc !== sourceUrl ? sourceUrl : null,
    ...plan.fallbacks,
  ].filter((url): url is string => Boolean(url) && url !== displaySrc);

  return {
    displaySrc,
    sourceUrl,
    score: getImageQualityScore(sourceUrl),
    fillClass: getImageFillClass(sourceUrl),
    needsMatte: false,
    knockoutWhite: false,
    enhance: false,
    darkBoost: false,
    isProcessed: false,
    fallbacks,
  };
}

export function passesCardDisplayGate(product: Product): boolean {
  if (!product.image) return false;
  if (isDeadImageUrl(product.image)) return false;
  const resolved = resolveProductDisplayImage(product);
  if (!resolved) return false;
  return resolved.score >= 42 || Boolean(product.image);
}

export function getProductVisualScore(product: Product): number {
  const resolved = resolveProductDisplayImage(product);
  let score = resolved?.score ?? 0;
  if (product.qc_link) score += 12;
  if (product.image) score += 8;
  return score;
}

export function compareProductVisualQuality(a: Product, b: Product): number {
  return getProductVisualScore(b) - getProductVisualScore(a);
}
