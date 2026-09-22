import Link from "next/link";
import { BOONBUY_SIGNUP_URL, REGISTER_HEADER_CTA_LABEL } from "@/lib/constants";

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
            {REGISTER_HEADER_CTA_LABEL}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Create a free BoonBuy account for shipping coupons, QC access, and order tracking.
          </p>
          <a
            href={BOONBUY_SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-bold text-accent hover:underline"
          >
            Register on BoonBuy →
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-surface/30 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Current deals
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            See current offers available through BoonBuyFinds, then browse finds and QC guides.
          </p>
          <Link
            href="/boonbuy-deals"
            className="mt-3 inline-block text-sm font-bold text-accent hover:underline"
          >
            BoonBuy deals →
          </Link>
        </div>
      </div>
    </section>
  );
}
