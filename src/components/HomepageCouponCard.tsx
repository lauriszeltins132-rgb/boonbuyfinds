import Link from "next/link";
import {
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
  BOONBUY_SHIPPING_DISCOUNT_SAVE_LABEL,
} from "@/lib/constants";

/** Single strong coupon CTA — links to the organic /boonbuy-coupons hub. */
export default function HomepageCouponCard() {
  return (
    <section className="px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Save on BoonBuy
          </p>
          <h2 className="mt-1.5 text-lg font-black text-foreground sm:text-xl">
            Verified shipping coupon — up to {BOONBUY_SHIPPING_DISCOUNT_PERCENT}%
            off
          </h2>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
            Current invite offer for eligible new BoonBuy accounts. Codes, how it
            works, and signup links live on the coupons hub — no fake timers.
          </p>
          <p className="mt-2 text-xs font-semibold text-accent/90">
            {BOONBUY_SHIPPING_DISCOUNT_SAVE_LABEL}
          </p>
        </div>
        <Link
          href="/boonbuy-coupons"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
        >
          View BoonBuy Coupons →
        </Link>
      </div>
    </section>
  );
}
