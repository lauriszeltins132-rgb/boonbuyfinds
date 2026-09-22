"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false }
);

export default function DeferredSpeedInsights() {
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
      idleId = window.requestIdleCallback(run, { timeout: 3500 });
    } else {
      timeoutId = setTimeout(run, 1800);
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
  return <SpeedInsights />;
}
