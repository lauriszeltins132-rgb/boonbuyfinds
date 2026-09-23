"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyMountProps = {
  children: ReactNode;
  /** Keep a stable height estimate before mount to reduce CLS. */
  minHeight?: number | string;
  rootMargin?: string;
  className?: string;
};

/**
 * Defer mounting heavy below-the-fold sections until near the viewport so
 * product images in later rails do not compete with LCP.
 */
export default function LazyMount({
  children,
  minHeight = 320,
  rootMargin = "200px 0px",
  className = "",
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div
      ref={ref}
      className={className}
      style={visible ? undefined : { minHeight }}
    >
      {visible ? children : null}
    </div>
  );
}
