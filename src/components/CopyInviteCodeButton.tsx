"use client";

import { useState } from "react";
import { BOONBUY_INVITE_CODE } from "@/lib/constants";
import { trackCouponCodeCopy } from "@/lib/analytics-events";

type CopyInviteCodeButtonProps = {
  location: string;
  className?: string;
};

export default function CopyInviteCodeButton({
  location,
  className,
}: CopyInviteCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(BOONBUY_INVITE_CODE);
    } catch {
      // Clipboard may be blocked; still acknowledge the attempt for UX.
    }
    trackCouponCodeCopy(location);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={
        className ??
        "inline-flex items-center justify-center rounded-full border border-border-strong bg-background px-6 py-3.5 text-sm font-black text-foreground transition hover:border-accent/50 hover:text-accent"
      }
      style={{ touchAction: "manipulation" }}
      aria-live="polite"
    >
      {copied ? "Copied ✓" : `Copy ${BOONBUY_INVITE_CODE}`}
    </button>
  );
}
