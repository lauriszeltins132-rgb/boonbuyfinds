import { isDeadImageUrl } from "./dead-images";
import {
  getImageFillClass,
  getImageQualityScore,
} from "./image-quality";
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
 * Faithful catalog rendering — always the original product image.
 * No cutouts, no CSS enhancement, no knockout.
 */
export function resolveProductDisplayImage(
  product: Product
): ResolvedProductImage | null {
  if (!product.image) return null;

  const sourceUrl = product.image;
  if (isDeadImageUrl(sourceUrl)) return null;

  const plan = getProductImagePlan(sourceUrl);

  return {
    displaySrc: plan.src,
    sourceUrl,
    score: getImageQualityScore(sourceUrl),
    fillClass: getImageFillClass(sourceUrl),
    needsMatte: false,
    knockoutWhite: false,
    enhance: false,
    darkBoost: false,
    isProcessed: false,
    fallbacks: plan.fallbacks,
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
