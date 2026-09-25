import SchemaScript from "@/components/SchemaScript";
import { buildFaqSchema } from "@/lib/schema";
import {
  HOMEPAGE_AKA_LINE,
  HOMEPAGE_ENTITY_FAQS,
} from "@/lib/brand-entity";

/**
 * FAQ stays fully in SSR HTML via <details> — crawlable, compact on mobile.
 */
export default function HomepageFaq() {
  return (
    <>
      <SchemaScript data={buildFaqSchema([...HOMEPAGE_ENTITY_FAQS])} />
      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <details className="group rounded-2xl border border-border bg-surface/30 p-5 sm:p-6">
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h2 className="text-lg font-black sm:text-xl">BoonBuy Finds FAQ</h2>
              <p className="mt-1 text-sm text-muted">
                Ordering, QC photos, agents, and how BoonBuy Finds works.
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted/70">
                {HOMEPAGE_AKA_LINE}
              </p>
              <span className="mt-3 inline-block text-sm font-bold text-accent group-open:hidden">
                Show FAQ answers
              </span>
            </summary>

            <dl className="mt-5 space-y-4 border-t border-border pt-5">
              {HOMEPAGE_ENTITY_FAQS.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-bold text-foreground">{faq.question}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">
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
