"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackBrokenImage } from "@/lib/analytics-events";
import {
  getImageFillClass,
  shouldEnhanceImage,
} from "@/lib/image-quality";
import { getProductImagePlan, getProcessedApiSrc } from "@/lib/processed-images";
import {
  hasPlausibleImageDimensions,
  validateImageUrl,
} from "@/lib/image-url";
import ImageUnavailablePlaceholder from "./ImageUnavailablePlaceholder";

type ProductImageVariant = "card" | "featured" | "hero";

const IMAGE_LAYOUT: Record<
  ProductImageVariant,
  { width: number; height: number; sizes: string }
> = {
  card: {
    width: 800,
    height: 800,
    sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
  featured: {
    width: 1200,
    height: 1200,
    sizes: "(max-width: 1024px) 92vw, 48vw",
  },
  hero: {
    width: 1400,
    height: 1400,
    sizes: "(max-width: 1024px) 100vw, 50vw",
  },
};

type ProductImageProps = {
  src: string;
  alt: string;
  productName?: string;
  className?: string;
  priority?: boolean;
  variant?: ProductImageVariant;
  productHref?: string;
  preferredSrc?: string;
  fallbacks?: string[];
  fillClass?: string;
  needsMatte?: boolean;
  knockoutWhite?: boolean;
  enhance?: boolean;
  darkBoost?: boolean;
};

function isLocalAsset(url: string): boolean {
  return url.startsWith("/") && !url.startsWith("//");
}

function buildCandidateList(
  src: string,
  preferredSrc: string | undefined,
  extraFallbacks: string[] = [],
  variant: ProductImageVariant = "card"
): string[] {
  const validation = validateImageUrl(src);
  const plan = validation.valid
    ? getProductImagePlan(validation.normalized)
    : null;

  const ordered: (string | undefined)[] = [
    preferredSrc,
    plan?.src,
    validation.valid ? validation.normalized : isLocalAsset(src) ? src : undefined,
    plan?.originalSrc,
    ...extraFallbacks,
    ...(plan?.fallbacks ?? []),
  ];

  if (variant !== "card" && validation.valid) {
    if (plan?.isProcessed) ordered.push(plan.src);
    ordered.push(getProcessedApiSrc(validation.normalized));
  }

  const seen = new Set<string>();
  const unique: string[] = [];
  for (const url of ordered) {
    if (!url || seen.has(url)) continue;
    if (!isLocalAsset(url) && !validateImageUrl(url).valid && !url.startsWith("/api/")) {
      continue;
    }
    seen.add(url);
    unique.push(url);
  }
  return unique;
}

export default function ProductImage({
  src,
  alt,
  className = "",
  priority = false,
  variant = "card",
  productHref,
  preferredSrc,
  fallbacks = [],
  fillClass,
  knockoutWhite = false,
  enhance,
  darkBoost = false,
}: ProductImageProps) {
  const validation = useMemo(() => validateImageUrl(src), [src]);

  const candidates = useMemo(
    () => buildCandidateList(src, preferredSrc, fallbacks, variant),
    [src, preferredSrc, fallbacks, variant]
  );
  const candidateKey = candidates.join("|");

  const resolvedFillClass =
    fillClass ??
    (validation.valid
      ? getImageFillClass(validation.normalized)
      : "product-float-asset--fill-balanced");
  const resolvedEnhance =
    enhance ?? (validation.valid ? shouldEnhanceImage(validation.normalized) : false);

  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(candidates.length === 0);
  const [loaded, setLoaded] = useState(false);
  const loggedRef = useRef(false);

  const displaySrc = candidates[srcIndex] ?? "";
  const loadEager = priority;
  const layout = IMAGE_LAYOUT[variant];

  useEffect(() => {
    setSrcIndex(0);
    setFailed(candidates.length === 0);
    setLoaded(false);
    loggedRef.current = false;
  }, [candidateKey, candidates.length]);

  const failExhausted = useCallback(() => {
    setFailed(true);
    setLoaded(false);
    if (!loggedRef.current) {
      loggedRef.current = true;
      trackBrokenImage(validation.normalized || src, variant);
    }
  }, [src, validation.normalized, variant]);

  const advanceOrFail = useCallback(() => {
    setSrcIndex((currentIndex) => {
      if (currentIndex + 1 < candidates.length) {
        setLoaded(false);
        return currentIndex + 1;
      }
      failExhausted();
      return currentIndex;
    });
  }, [candidates.length, failExhausted]);

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      if (!hasPlausibleImageDimensions(img.naturalWidth, img.naturalHeight)) {
        advanceOrFail();
        return;
      }
      setLoaded(true);
    },
    [advanceOrFail]
  );

  if (failed || !displaySrc) {
    return (
      <ImageUnavailablePlaceholder
        className={className}
        variant={variant}
        productHref={productHref}
      />
    );
  }

  const isProcessedSrc =
    displaySrc.startsWith("/processed/") ||
    displaySrc.startsWith("/api/processed-image");

  const assetClass = [
    "product-float-asset",
    resolvedFillClass,
    variant !== "card" && resolvedEnhance ? "product-float-asset--enhanced" : "",
    variant !== "card" && darkBoost ? "product-float-asset--dark-boost" : "",
    knockoutWhite ? "product-float-asset--knockout-white" : "",
    variant !== "card" && isProcessedSrc ? "product-float-asset--processed-matte" : "",
    loaded ? "product-float-asset--ready" : "product-float-asset--loading",
  ]
    .filter(Boolean)
    .join(" ");

  const imageNode = (
    <div className="product-float-stage__frame">
      <Image
        key={displaySrc}
        src={displaySrc}
        alt={alt}
        fill
        sizes={layout.sizes}
        quality={85}
        priority={loadEager}
        loading={loadEager ? "eager" : "lazy"}
        decoding="async"
        unoptimized={displaySrc.startsWith("/api/")}
        className={assetClass}
        onLoad={handleLoad}
        onError={advanceOrFail}
      />
    </div>
  );

  return (
    <div
      className={`product-float-stage product-float-stage--${variant} ${className}`}
    >
      {variant !== "card" ? <div className="product-float-glow" aria-hidden /> : null}
      {variant === "card" ? (
        imageNode
      ) : (
        <div className="product-float-matte product-float-matte--opaque relative min-h-[inherit] w-full h-full">
          {imageNode}
        </div>
      )}
      {!loaded && variant !== "card" ? (
        <ImageUnavailablePlaceholder
          variant={variant}
          loading
          productHref={productHref}
        />
      ) : null}
    </div>
  );
}
