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
    let timeoutId = 0;
    let idleId = 0;

    const enable = () => setReady(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(enable, 1200);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
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
