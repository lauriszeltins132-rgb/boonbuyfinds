import Link from "next/link";
import { BOONBUY_SIGNUP_URL, REGISTER_HEADER_CTA_LABEL } from "@/lib/constants";

/** Compact beginner / conversion strip — one row, not three repeated essays. */
export default function HomepageConversion() {
  return (
    <section className="px-4 py-5 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface/30 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            New to BoonBuy?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Learn agents, QC photos, and haul shipping before your first order.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/guides/beginner-guide-to-boonbuy"
              className="text-sm font-bold text-accent hover:underline"
            >
              Beginner guide →
            </Link>
            <Link
              href="/boonbuy"
              className="text-sm font-bold text-accent hover:underline"
            >
              What is BoonBuy →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-accent/25 bg-accent/5 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            {REGISTER_HEADER_CTA_LABEL}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Free BoonBuy account for shipping coupons, QC access, and order
            tracking.
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
      </div>
    </section>
  );
}
