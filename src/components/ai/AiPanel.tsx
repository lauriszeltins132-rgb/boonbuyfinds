"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { track } from "@vercel/analytics";

const AiChat = dynamic(() => import("@/components/ai/AiChat"), {
  ssr: false,
  loading: () => (
    <p className="p-4 text-sm text-muted" role="status">
      Loading BoonBuy AI…
    </p>
  ),
});

type AiPanelProps = {
  open: boolean;
  onClose: () => void;
  entryPoint?: "floating" | "homepage" | "product" | "collection";
  initialPrompt?: string;
};

export default function AiPanel({
  open,
  onClose,
  entryPoint = "floating",
  initialPrompt,
}: AiPanelProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    track("ai_opened", { entryPoint });
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, entryPoint]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close BoonBuy AI"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-hidden rounded-t-3xl border border-border bg-background shadow-2xl sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:w-[min(100%,420px)] sm:rounded-none sm:border-l">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p id={titleId} className="text-sm font-black text-foreground">
              BoonBuy AI
            </p>
            <p className="text-xs text-muted">Catalogue-grounded product finder</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-bold"
          >
            Close
          </button>
        </div>
        <div className="px-3 pb-4 pt-2">
          <AiChat entryPoint={entryPoint} initialPrompt={initialPrompt} compact />
        </div>
      </div>
    </div>
  );
}

export function useAiPanel() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<string | undefined>();
  const openWith = useCallback((next?: string) => {
    setPrompt(next);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  return { open, prompt, openWith, close, setOpen };
}
