"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const AiPanel = dynamic(() => import("@/components/ai/AiPanel"), {
  ssr: false,
});

export default function AiLauncher() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[5.5rem] right-4 z-[70] flex h-12 min-w-12 items-center gap-2 rounded-full bg-accent px-4 text-sm font-black text-white shadow-lg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:bottom-6 sm:right-6"
        aria-label="Open BoonBuy AI assistant"
      >
        <span aria-hidden="true">AI</span>
        <span className="hidden sm:inline">Ask BoonBuy AI</span>
      </button>
      <AiPanel
        open={open}
        onClose={() => setOpen(false)}
        entryPoint="floating"
        returnFocusRef={buttonRef}
      />
    </>
  );
}
