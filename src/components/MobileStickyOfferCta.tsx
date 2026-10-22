"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import RegisterLink from "@/components/RegisterLink";
import {
  BOONBUY_INVITE_CODE,
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
} from "@/lib/constants";
import { readSessionStorage, writeSessionStorage } from "@/lib/safe-storage";

const HIGH_INTENT_PATHS = new Set([
  "/boonbuy-coupons",
  "/boonbuy-spreadsheet",
  "/boonbuy-shipping-coupon",
]);

/**
 * Lightweight mobile sticky CTA for high-intent commercial pages only.
 * Dismissible; does not cover desktop chrome.
 */
export default function MobileStickyOfferCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const active = Boolean(pathname && HIGH_INTENT_PATHS.has(pathname));
    if (!active || !pathname) {
      setVisible(false);
      root.classList.remove("has-mobile-sticky-offer");
      return;
    }
    const key = `sticky-offer-dismissed:${pathname}`;
    const isDismissed = Boolean(readSessionStorage(key));
    setDismissed(isDismissed);
    setVisible(true);
    root.classList.toggle("has-mobile-sticky-offer", !isDismissed);
    return () => root.classList.remove("has-mobile-sticky-offer");
  }, [pathname]);

  if (!visible || dismissed || !pathname) return null;

  function dismiss() {
    writeSessionStorage(`sticky-offer-dismissed:${pathname}`, "1");
    document.documentElement.classList.remove("has-mobile-sticky-offer");
    setDismissed(true);
  }

  return (
    <div
      className="fixed inset-x-0 z-[75] border-t border-border bg-panel/95 px-3 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md sm:hidden"
      style={{
        /* Sit above the mobile dock so nav stays tappable */
        bottom: "calc(2.65rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-bold text-foreground">
            {BOONBUY_INVITE_CODE} · Up to {BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Shipping
          </p>
          <p className="truncate text-[10px] text-muted">Verified BoonBuy invite</p>
        </div>
        <RegisterLink
          location={`${pathname.replace(/\//g, "_").replace(/^_/, "")}_sticky`}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-accent px-4 text-xs font-black text-white"
          style={{ touchAction: "manipulation" }}
        >
          Claim Offer
        </RegisterLink>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss offer bar"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base text-muted hover:text-foreground"
          style={{ touchAction: "manipulation" }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
