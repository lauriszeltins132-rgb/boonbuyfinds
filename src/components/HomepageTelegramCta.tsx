import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";

/** Telegram community CTA near page bottom — SSR, no fake urgency. */
export default function HomepageTelegramCta() {
  return (
    <section className="px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-2xl border border-border bg-surface/30 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <h2 className="text-lg font-black">BoonBuy Telegram</h2>
          <p className="mt-1 text-sm text-muted">
            Daily drops, QC discussion, and spreadsheet updates from the community.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-bold text-white hover:opacity-90"
          >
            Join Telegram →
          </a>
          <Link
            href="/boonbuy-telegram"
            className="inline-flex rounded-full border border-border bg-panel px-4 py-2 text-sm font-bold hover:border-accent/40 hover:text-accent"
          >
            Telegram hub
          </Link>
        </div>
      </div>
    </section>
  );
}
