import Link from "next/link";
import { POPULAR_BOONBUY_QUESTIONS } from "@/lib/boonbuy-questions";

/** Compact homepage Q&A rail — server-rendered, no client JS. */
export default function HomepagePopularQuestions() {
  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-border/80 bg-surface/20 p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-black sm:text-xl">Popular BoonBuy Questions</h2>
            <p className="mt-1 text-sm text-muted">
              Direct answers for the searches people ask most — full hub linked below.
            </p>
          </div>
          <Link
            href="/boonbuy-questions"
            className="text-sm font-bold text-accent hover:underline"
          >
            All BoonBuy questions →
          </Link>
        </div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_BOONBUY_QUESTIONS.map((q) => (
            <li key={q.href + q.label}>
              <Link
                href={q.href}
                className="block rounded-xl border border-border bg-background/40 px-3 py-3 transition hover:border-accent/40"
              >
                <span className="text-sm font-bold text-foreground">{q.label}</span>
                <span className="mt-0.5 block text-xs text-muted">{q.teaser}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
