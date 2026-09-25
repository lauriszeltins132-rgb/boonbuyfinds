"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackBrokenImage } from "@/lib/analytics-events";
import { validateImageUrl } from "@/lib/image-url";
import ImageUnavailablePlaceholder from "./ImageUnavailablePlaceholder";

type ProductCardImageProps = {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  priority?: boolean;
  productHref?: string;
  preferredSrc?: string;
  fallbacks?: string[];
  fillClass?: string;
  isProcessedCutout?: boolean;
};

function isLocalAsset(url: string): boolean {
  return url.startsWith("/") && !url.startsWith("//");
}

function isUsableCandidate(url: string): boolean {
  if (!url) return false;
  if (isLocalAsset(url)) return true;
  return validateImageUrl(url).valid;
}

export default function ProductCardImage({
  src,
  alt,
  title,
  className = "",
  priority = false,
  productHref,
  preferredSrc,
  fallbacks = [],
  fillClass = "product-float-asset--fill-balanced",
}: ProductCardImageProps) {
  const validation = useMemo(() => validateImageUrl(src), [src]);

  const candidates = useMemo(() => {
    // CDN card variant first, then catalog original, then other fallbacks.
    const ordered = [
      preferredSrc,
      isLocalAsset(src) ? src : validation.normalized || src,
      ...fallbacks,
    ].filter((url): url is string => typeof url === "string" && url.length > 0);

    const seen = new Set<string>();
    const unique: string[] = [];
    for (const url of ordered) {
      if (!isUsableCandidate(url) || seen.has(url)) continue;
      if (url.startsWith("/processed/") || url.includes("/api/processed-image")) {
        continue;
      }
      seen.add(url);
      unique.push(url);
    }
    return unique;
  }, [validation.normalized, preferredSrc, fallbacks, src]);

  const candidateKey = candidates.join("|");
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(candidates.length === 0);
  const [loaded, setLoaded] = useState(false);
  const loggedRef = useRef(false);

  const displaySrc = candidates[srcIndex] ?? "";

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
      trackBrokenImage(validation.normalized || src, "card");
    }
  }, [src, validation.normalized]);

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

  if (failed || !displaySrc) {
    return (
      <ImageUnavailablePlaceholder
        className={className}
        variant="card"
        productHref={productHref}
      />
    );
  }

  const assetClass = [
    "product-float-asset",
    fillClass,
    loaded ? "product-float-asset--ready" : "product-float-asset--loading",
  ]
    .filter(Boolean)
    .join(" ");

  // Pre-encoded first-party WebP — skip redundant /_next/image work.
  const isFirstPartyCdn =
    displaySrc.startsWith("/cdn/") && displaySrc.endsWith(".webp");

  return (
    <div
      className={`product-float-stage product-float-stage--card ${className}`}
    >
      {!loaded ? (
        <div className="product-float-stage__shimmer" aria-hidden />
      ) : null}
      <div className="product-float-stage__frame">
        <Image
          key={displaySrc}
          src={displaySrc}
          alt={alt}
          title={title ?? alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 280px, 260px"
          quality={85}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          unoptimized={isFirstPartyCdn}
          className={assetClass}
          onLoad={() => setLoaded(true)}
          onError={advanceOrFail}
        />
      </div>
    </div>
  );
}
