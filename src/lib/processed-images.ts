import damagedData from "@/data/damaged-processed-manifest.json";
import mapData from "@/data/processed-image-map.json";
import { getImageQualityDetails } from "./image-quality";

type ProcessedImageMap = {
  urls: Record<string, string>;
};

type DamagedProcessedManifest = {
  urls: string[];
  paths: string[];
};

const catalog = mapData as ProcessedImageMap;
const damaged = damagedData as DamagedProcessedManifest;
const damagedUrls = new Set(damaged.urls ?? []);
const damagedPaths = new Set(damaged.paths ?? []);

export type ProductImagePlan = {
  src: string;
  originalSrc: string;
  isProcessed: boolean;
  knockoutWhite: boolean;
  fallbacks: string[];
};

export function getProcessedApiSrc(sourceUrl: string): string {
  return `/api/processed-image?url=${encodeURIComponent(sourceUrl)}`;
}

/** Pre-built cutouts that corrupt the product or leave harsh artifacts. */
export function isProcessedCutoutBlocked(
  sourceUrl: string,
  processedPath?: string
): boolean {
  if (damagedUrls.has(sourceUrl)) return true;
  if (processedPath && damagedPaths.has(processedPath)) return true;
  if (getImageQualityDetails(sourceUrl)?.issues?.includes("damaged_cutout")) {
    return true;
  }
  // Default: do not trust background-removal cutouts for primary display.
  return true;
}

/**
 * Always prefer the catalog original. Processed cutouts change appearance
 * (posterize / harsh matte) and must not be the primary card image.
 * Processed paths are omitted from fallbacks — they are unreliable.
 */
export function getProductImagePlan(sourceUrl: string): ProductImagePlan {
  return {
    src: sourceUrl,
    originalSrc: sourceUrl,
    isProcessed: false,
    knockoutWhite: false,
    fallbacks: [],
  };
}

/** @deprecated Kept for callers that inspect the map; prefer originals. */
export function getProcessedPathForUrl(sourceUrl: string): string | undefined {
  const path = catalog.urls[sourceUrl];
  if (!path || isProcessedCutoutBlocked(sourceUrl, path)) return undefined;
  return path;
}
