"use client";

import { DEFAULT_AGENT_ID, buildAgentProductUrl } from "@/lib/agents";
import type { Product } from "@/lib/types";
import { trackProductContext } from "@/lib/analytics-events";

type BuyLocation = "product_card" | "product_page" | "product_modal" | "daily_drop";

type BuyWithAgentButtonProps = {
  product: Product;
  location: BuyLocation;
  /** @deprecated Ignored — site is BoonBuy-only */
  showAgentPicker?: boolean;
  className?: string;
  compact?: boolean;
  appearance?: "primary" | "secondary";
};

export default function BuyWithAgentButton({
  product,
  location,
  className = "",
  compact = false,
  appearance = "primary",
}: BuyWithAgentButtonProps) {
  const buyUrl = buildAgentProductUrl(product, DEFAULT_AGENT_ID);
  const label = compact ? "Buy" : "Buy on BoonBuy";

  const baseClass = compact
    ? "rounded-full bg-accent px-3 py-1.5 text-[11px] font-black text-white"
    : appearance === "secondary"
      ? "inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground hover:border-accent/40"
      : "inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-black text-white hover:bg-accent-hover";

  if (!product.affiliate_link && !buyUrl) {
    return null;
  }

  if (!buyUrl) {
    return null;
  }

  return (
    <a
      href={buyUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={() => trackProductContext("buy_click", product, location)}
      className={`${baseClass} ${className}`}
      style={{ touchAction: "manipulation" }}
    >
      {label}
    </a>
  );
}

export function getBuyButtonLabel(): string {
  return "Buy on BoonBuy";
}
