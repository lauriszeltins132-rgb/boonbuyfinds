"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackBrokenImage } from "@/lib/analytics-events";
import { getImageFillClass } from "@/lib/image-quality";
import { getProductImagePlan } from "@/lib/processed-images";
import {
  hasPlausibleImageDimensions,
  validateImageUrl,
} from "@/lib/image-url";
import ImageUnavailablePlaceholder from "./ImageUnavailablePlaceholder";

type ProductImageVariant = "card" | "featured" | "hero";

const IMAGE_LAYOUT: Record<
  ProductImageVariant,
  { width: number; height: number }
> = {
  card: { width: 400, height: 400 },
  featured: { width: 540, height: 500 },
  hero: { width: 600, height: 560 },
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

function buildCandidateList(
  src: string,
  preferredSrc: string | undefined,
  extraFallbacks: string[] = []
): string[] {
  const validation = validateImageUrl(src);
  if (!validation.valid) return [];

  const plan = getProductImagePlan(validation.normalized);
  // Catalog original always first — preferredSrc is only an alternate original.
  const ordered: (string | undefined)[] = [
    validation.normalized,
    preferredSrc,
    plan.originalSrc,
    ...extraFallbacks,
    ...plan.fallbacks,
  ];

  const seen = new Set<string>();
  const unique: string[] = [];
  for (const url of ordered) {
    if (!url || seen.has(url)) continue;
    // Never surface background-removal / processed cutouts.
    if (url.startsWith("/processed/") || url.includes("/api/processed-image")) {
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
}: ProductImageProps) {
  const validation = useMemo(() => validateImageUrl(src), [src]);

  const candidates = useMemo(
    () => buildCandidateList(src, preferredSrc, fallbacks),
    [src, preferredSrc, fallbacks]
  );
  const candidateKey = candidates.join("|");

  const resolvedFillClass =
    fillClass ??
    (validation.valid
      ? getImageFillClass(validation.normalized)
      : "product-float-asset--fill-balanced");

  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(candidates.length === 0);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const loggedRef = useRef(false);

  const displaySrc = candidates[srcIndex] ?? "";
  const loadEager = priority;

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

  const confirmLoaded = useCallback(
    (img: HTMLImageElement) => {
      if (!hasPlausibleImageDimensions(img.naturalWidth, img.naturalHeight)) {
        advanceOrFail();
        return;
      }
      setLoaded(true);
    },
    [advanceOrFail]
  );

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      confirmLoaded(event.currentTarget);
    },
    [confirmLoaded]
  );

  const handleError = useCallback(() => {
    advanceOrFail();
  }, [advanceOrFail]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || failed || !displaySrc) return;

    const tryConfirm = () => {
      if (img.complete && img.naturalWidth > 0) {
        confirmLoaded(img);
        return true;
      }
      return false;
    };

    if (tryConfirm()) return;

    let cancelled = false;
    void img.decode?.().then(() => {
      if (!cancelled) tryConfirm();
    }).catch(() => {
      if (!cancelled && img.complete && img.naturalWidth > 0) {
        setLoaded(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [confirmLoaded, displaySrc, failed, srcIndex]);

  if (failed || !displaySrc) {
    return (
      <ImageUnavailablePlaceholder
        className={className}
        variant={variant}
        productHref={productHref}
      />
    );
  }

  const assetClass = [
    "product-float-asset",
    resolvedFillClass,
    loaded ? "product-float-asset--ready" : "product-float-asset--loading",
  ]
    .filter(Boolean)
    .join(" ");

  const imageNode = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={imgRef}
      key={displaySrc}
      src={displaySrc}
      alt={alt}
      width={IMAGE_LAYOUT[variant].width}
      height={IMAGE_LAYOUT[variant].height}
      loading={loadEager ? "eager" : "lazy"}
      fetchPriority={loadEager ? "high" : "auto"}
      decoding="async"
      referrerPolicy="no-referrer"
      className={assetClass}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  return (
    <div
      className={`product-float-stage product-float-stage--${variant} ${className}`}
    >
      {variant !== "card" ? <div className="product-float-glow" aria-hidden /> : null}
      {variant === "card" ? (
        imageNode
      ) : (
        <div className="product-float-matte product-float-matte--opaque">{imageNode}</div>
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
