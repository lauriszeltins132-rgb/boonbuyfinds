import SchemaScript from "@/components/SchemaScript";
import { buildFaqSchema } from "@/lib/schema";
import {
  HOMEPAGE_AKA_LINE,
  HOMEPAGE_ENTITY_FAQS,
} from "@/lib/brand-entity";

/**
 * Full FAQ content restored — SSR text inside <details> so it stays crawlable
 * without pushing products down on mobile.
 */
export default function HomepageFaq() {
  return (
    <>
      <SchemaScript data={buildFaqSchema([...HOMEPAGE_ENTITY_FAQS])} />
      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <details className="group rounded-2xl border border-border bg-surface/30 p-5 sm:p-6" open>
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h2 className="text-2xl font-black">BoonBuy Finds FAQ</h2>
              <p className="mt-1 text-sm text-muted">
                What BoonBuy Finds is, how ordering works, QC photos, agents, and
                where to find the best picks.
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted/70">
                {HOMEPAGE_AKA_LINE}
              </p>
            </summary>

            <dl className="mt-8 space-y-6">
              {HOMEPAGE_ENTITY_FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border bg-background/40 p-5"
                >
                  <dt className="font-bold text-foreground">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </section>
    </>
  );
}
