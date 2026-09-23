"use client";

import Image from "next/image";
import { useState } from "react";
import ImageUnavailablePlaceholder from "./ImageUnavailablePlaceholder";

type SafeNextImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  quality?: number;
  priority?: boolean;
  productHref?: string;
};

/** next/image with a stable card-sized fallback when the remote asset fails. */
export default function SafeNextImage({
  src,
  alt,
  sizes,
  className = "",
  quality = 85,
  priority = false,
  productHref,
}: SafeNextImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <ImageUnavailablePlaceholder variant="card" productHref={productHref} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
