import Link from "next/link";
import {
  BOONBUY_SHIPPING_COUPON_CTA,
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
  SOCIAL_LINKS,
} from "@/lib/constants";

/** Compact primary CTAs directly under the hero — keeps products close on mobile. */
export default function HomepageQuickCtas() {
  return (
    <section className="px-4 pb-3 pt-1 sm:px-6 sm:pb-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2">
        <Link
          href="/boonbuy-coupons"
          className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          BoonBuy Coupons
          <span className="ml-1.5 text-white/85">
            · up to {BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping
          </span>
        </Link>
        <Link
          href="/boonbuy-spreadsheet"
          className="inline-flex rounded-full border border-border bg-panel px-4 py-2 text-sm font-bold hover:border-accent/40 hover:text-accent"
        >
          Spreadsheet
        </Link>
        <a
          href={SOCIAL_LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-border bg-panel px-4 py-2 text-sm font-bold hover:border-accent/40 hover:text-accent"
        >
          Telegram
        </a>
        <Link
          href="/best-boonbuy-finds"
          className="inline-flex rounded-full border border-border bg-panel px-4 py-2 text-sm font-bold hover:border-accent/40 hover:text-accent"
        >
          Best finds
        </Link>
        <Link
          href="/boonbuy-coupons"
          className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-bold text-accent hover:bg-accent/15"
        >
          {BOONBUY_SHIPPING_COUPON_CTA}
        </Link>
      </div>
    </section>
  );
}
