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
    const ok = await copyInviteCode(BOONBUY_INVITE_CODE);
    if (!ok) return;
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

async function copyInviteCode(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the legacy copy path.
  }

  try {
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.top = "0";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(input);
    return ok;
  } catch {
    return false;
  }
}
