"use client";

import { useEffect, useMemo, useState } from "react";
import type { BrightBgTreatment } from "@/lib/bright-bg";
import { probeImageLoad } from "@/lib/image-processing";
import { validateImageUrl } from "@/lib/image-url";

export type ProcessedImageState = "idle" | "loading" | "ready" | "failed";

export function useProcessedImage(rawSrc: string) {
  const validation = useMemo(() => validateImageUrl(rawSrc), [rawSrc]);
  const [displaySrc, setDisplaySrc] = useState("");
  const [state, setState] = useState<ProcessedImageState>(() =>
    validation.valid ? "loading" : "failed"
  );

  useEffect(() => {
    if (!validation.valid) {
      setDisplaySrc("");
      setState("failed");
      return;
    }

    let cancelled = false;
    setDisplaySrc("");
    setState("loading");

    // Faithful original only — no canvas cutouts or bright-bg treatments.
    void probeImageLoad(validation.normalized).then((ok) => {
      if (cancelled) return;
      if (ok) {
        setDisplaySrc(validation.normalized);
        setState("ready");
        return;
      }
      setDisplaySrc("");
      setState("failed");
    });

    return () => {
      cancelled = true;
    };
  }, [validation.normalized, validation.valid]);

  return {
    displaySrc,
    state,
    normalizedSrc: validation.normalized,
    processedToPng: false,
    treatment: "none" as BrightBgTreatment,
    needsDarkMatte: false,
    needsVignette: false,
    failed: state === "failed",
    loading: state === "loading",
    ready: state === "ready",
  };
}
