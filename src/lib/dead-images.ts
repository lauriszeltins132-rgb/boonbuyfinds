import deadData from "@/data/dead-image-urls.json";
import mapData from "@/data/processed-image-map.json";
import cdnManifest from "@/data/product-image-cdn.json";

type DeadImageManifest = {
  urls: string[];
};

const manifest = deadData as DeadImageManifest;
const deadSet = new Set(manifest.urls ?? []);
const processedUrls = (mapData as { urls: Record<string, string> }).urls ?? {};
const cdnBySource =
  (cdnManifest as { bySourceUrl?: Record<string, unknown> }).bySourceUrl ?? {};

/** True when the source CDN URL is in the dead manifest (ignores processed fallback). */
export function isCatalogImageUrlDead(url: string): boolean {
  if (!url) return true;
  return deadSet.has(url);
}

/** CDN URL is dead — still usable with first-party /cdn variants or /processed mattes. */
export function isDeadImageUrl(url: string): boolean {
  if (!url) return true;
  if (cdnBySource[url]) return false;
  if (processedUrls[url]) return false;
  return deadSet.has(url);
}

export function hasProcessedStaticImage(url: string): boolean {
  return Boolean(url && processedUrls[url]);
}
