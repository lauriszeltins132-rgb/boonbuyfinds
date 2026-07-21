"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const AiPanel = dynamic(() => import("@/components/ai/AiPanel"), {
  ssr: false,
});

export default function AiLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-[70] flex h-12 items-center gap-2 rounded-full bg-accent px-4 text-sm font-black text-white shadow-lg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:bottom-6 sm:right-6"
        aria-label="Open BoonBuy AI assistant"
      >
        <span aria-hidden="true">AI</span>
        <span className="hidden sm:inline">Ask BoonBuy AI</span>
      </button>
      <AiPanel open={open} onClose={() => setOpen(false)} entryPoint="floating" />
    </>
  );
}
