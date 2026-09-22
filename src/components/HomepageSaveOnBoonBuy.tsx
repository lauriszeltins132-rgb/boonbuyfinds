import Link from "next/link";
import RegisterLink from "@/components/RegisterLink";
import {
  BOONBUY_SHIPPING_COUPON_CTA,
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
} from "@/lib/constants";

export default function HomepageSaveOnBoonBuy() {
  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/10 via-surface/40 to-panel-hover p-5 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
          Save On BoonBuy
        </p>
        <h2 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
          BoonBuy coupons, deals & shipping savings
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          BoonBuyFinds helps you discover BoonBuy products, resources, and savings —
          including current offers available through BoonBuyFinds such as new-user
          shipping discounts up to {BOONBUY_SHIPPING_DISCOUNT_PERCENT}% when eligible.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link
            href="/boonbuy-coupons"
            className="inline-flex rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-white hover:opacity-90"
          >
            BoonBuy coupons
          </Link>
          <Link
            href="/boonbuy-deals"
            className="inline-flex rounded-full border border-border bg-white/70 px-4 py-2.5 text-sm font-bold hover:border-accent/40 hover:text-accent"
          >
            Latest BoonBuy deals
          </Link>
          <RegisterLink
            location="homepage_save_on_boonbuy"
            className="inline-flex rounded-full border border-border bg-white/70 px-4 py-2.5 text-sm font-bold hover:border-accent/40 hover:text-accent"
          >
            {BOONBUY_SHIPPING_COUPON_CTA}
          </RegisterLink>
          <Link
            href="/boonbuy"
            className="inline-flex rounded-full border border-border bg-white/70 px-4 py-2.5 text-sm font-bold hover:border-accent/40 hover:text-accent"
          >
            What is BoonBuy?
          </Link>
        </div>
      </div>
    </section>
  );
}
