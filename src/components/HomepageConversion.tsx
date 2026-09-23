import Link from "next/link";

export default function HomepageConversion() {
  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface/30 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            What is BoonBuy?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Learn how the agent, warehouse QC, shipping, coupons, and BoonBuy Finds fit together.
          </p>
          <Link
            href="/boonbuy"
            className="mt-3 inline-block text-sm font-bold text-accent hover:underline"
          >
            BoonBuy authority hub →
          </Link>
        </div>

        <div className="rounded-2xl border border-accent/25 bg-accent/5 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            BoonBuy coupons
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Current shipping offers available through BoonBuyFinds, how to claim them, and how to use
            a coupon at checkout.
          </p>
          <Link
            href="/boonbuy-coupons"
            className="mt-3 inline-block text-sm font-bold text-accent hover:underline"
          >
            Open coupon hub →
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-surface/30 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Spreadsheet & best finds
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Searchable spreadsheet alternative plus curated best and trending BoonBuy finds.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            <Link
              href="/boonbuy-spreadsheet"
              className="text-sm font-bold text-accent hover:underline"
            >
              Spreadsheet →
            </Link>
            <Link
              href="/best-boonbuy-finds"
              className="text-sm font-bold text-accent hover:underline"
            >
              Best finds →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
