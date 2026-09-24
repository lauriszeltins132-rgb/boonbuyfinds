import {
  getCachedImage,
  getCachedImageAsync,
  setCachedImage,
  type ProcessedImageEntry,
} from "./image-cache";
import { hasPlausibleImageDimensions, validateImageUrl } from "./image-url";

const PROBE_TIMEOUT_MS = 12_000;

export function probeImageLoad(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = window.setTimeout(() => {
      img.src = "";
      resolve(false);
    }, PROBE_TIMEOUT_MS);

    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.onload = () => {
      window.clearTimeout(timer);
      resolve(
        hasPlausibleImageDimensions(img.naturalWidth, img.naturalHeight)
      );
    };
    img.onerror = () => {
      window.clearTimeout(timer);
      resolve(false);
    };
    img.src = url;
  });
}

function cacheResult(normalized: string, src: string): ProcessedImageEntry {
  const entry: ProcessedImageEntry = {
    src,
    hasBrightBackground: false,
    processedToPng: false,
    treatment: "none",
  };
  setCachedImage(normalized, entry);
  return entry;
}

/**
 * Faithful pass-through — never mutate product pixels.
 * Background-removal / canvas cutouts caused posterized / B&W artifacts.
 */
export async function processProductImage(
  imageUrl: string
): Promise<ProcessedImageEntry> {
  const { valid, normalized } = validateImageUrl(imageUrl);
  if (!valid) {
    throw new Error("Invalid image URL");
  }

  const cached =
    getCachedImage(normalized) ?? (await getCachedImageAsync(normalized));
  if (cached && !cached.processedToPng && cached.treatment === "none") {
    return cached;
  }

  const ok = await probeImageLoad(normalized);
  if (!ok) {
    throw new Error("Image load failed");
  }

  return cacheResult(normalized, normalized);
}

/** @deprecated Returns original URL unchanged. */
export async function removeWhiteBackground(imageUrl: string): Promise<string> {
  const result = await processProductImage(imageUrl);
  return result.src;
}
