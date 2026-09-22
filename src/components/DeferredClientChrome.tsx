"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ConversionLayer = dynamic(
  () => import("@/components/conversion/ConversionLayer"),
  { ssr: false }
);
const CouponModal = dynamic(() => import("@/components/CouponModal"), {
  ssr: false,
});
const CouponAutoOpen = dynamic(() => import("@/components/CouponAutoOpen"), {
  ssr: false,
});

/**
 * Mount conversion/coupon chrome after the browser is idle so it does not
 * compete with LCP/FCP on the initial homepage paint.
 */
export default function DeferredClientChrome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    let cancelled = false;
    const run = () => {
      if (!cancelled) enable();
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(run, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(run, 1200);
    }

    return () => {
      cancelled = true;
      if (
        idleId !== undefined &&
        typeof window !== "undefined" &&
        "cancelIdleCallback" in window
      ) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <CouponModal />
      <CouponAutoOpen />
      <ConversionLayer />
    </>
  );
}
