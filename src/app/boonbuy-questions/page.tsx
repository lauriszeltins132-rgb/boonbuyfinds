import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaScript from "@/components/SchemaScript";
import {
  BOONBUY_QUESTIONS_HUB,
  BOONBUY_QUESTIONS_HUB_FAQS,
  BOONBUY_QUESTION_GROUPS,
} from "@/lib/boonbuy-questions";
import { formatDatasetAge, getDatasetSyncedIso } from "@/lib/catalog-meta";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
} from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { CONTENT_REVIEW_NOTE } from "@/lib/trust";

export const metadata: Metadata = buildPageMetadata({
  title: BOONBUY_QUESTIONS_HUB.title,
  description: BOONBUY_QUESTIONS_HUB.metaDescription,
  path: BOONBUY_QUESTIONS_HUB.path,
});

export const revalidate = 3600;

export default function BoonbuyQuestionsHubPage() {
  const path = BOONBUY_QUESTIONS_HUB.path;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "BoonBuy Questions" },
  ];
  const syncedIso = getDatasetSyncedIso();

  return (
    <>
      <SchemaScript
        data={[
          buildWebPageSchema({
            name: BOONBUY_QUESTIONS_HUB.h1,
            description: BOONBUY_QUESTIONS_HUB.metaDescription,
            path,
          }),
          buildBreadcrumbSchema(breadcrumbs, path),
          buildFaqSchema([...BOONBUY_QUESTIONS_HUB_FAQS]),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} currentPath={path} />

      <article className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Q&amp;A hub
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {BOONBUY_QUESTIONS_HUB.h1}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {BOONBUY_QUESTIONS_HUB.intro}
          </p>

          <aside className="mt-6 rounded-2xl border border-border bg-surface/35 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Quick answer
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {BOONBUY_QUESTIONS_HUB.directAnswer}
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              <li>One canonical page per major search intent — no duplicate thin copies</li>
              <li>Answers stay honest about unknown fees, ETAs, and agent risks</li>
              <li>Deep links to spreadsheet, coupons, QC, AI, and finds hubs</li>
            </ul>
            <p className="mt-3 text-xs text-muted">
              Last updated from catalog sync {formatDatasetAge()} (
              <time dateTime={syncedIso}>{syncedIso.slice(0, 10)}</time>) ·{" "}
              <Link
                href="/editorial-policy"
                className="font-semibold text-accent hover:underline"
              >
                Editorial policy
              </Link>
            </p>
          </aside>

          <nav aria-label="Jump to topics" className="mt-8 flex flex-wrap gap-2">
            {BOONBUY_QUESTION_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground/80 hover:border-accent/40 hover:text-accent"
              >
                {group.title}
              </a>
            ))}
          </nav>

          <div className="mt-10 space-y-12">
            {BOONBUY_QUESTION_GROUPS.map((group) => (
              <section key={group.id} id={group.id} className="scroll-mt-24">
                <h2 className="text-xl font-black text-foreground">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.questions.map((q) => (
                    <li key={`${group.id}-${q.label}`}>
                      <Link
                        href={q.href}
                        className="block rounded-2xl border border-border bg-surface/25 p-4 transition hover:border-accent/40"
                      >
                        <span className="font-bold text-accent">{q.label}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">
                          {q.teaser}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-2xl border border-border bg-surface/40 p-6">
            <h2 className="text-xl font-black">Frequently asked questions</h2>
            <dl className="mt-5 space-y-5">
              {BOONBUY_QUESTIONS_HUB_FAQS.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-bold text-foreground">{faq.question}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <nav
            aria-label="Related resources"
            className="mt-10 flex flex-wrap gap-2"
          >
            {[
              { href: "/", label: "Homepage" },
              { href: "/guides", label: "Guides" },
              { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
              { href: "/boonbuy-coupons", label: "Coupons" },
              { href: "/ai", label: "BoonBuy AI" },
              { href: "/latest-finds", label: "Latest finds" },
              { href: "/editorial-policy", label: "Editorial policy" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="mt-8 text-sm text-muted">{CONTENT_REVIEW_NOTE}</p>
        </div>
      </article>
    </>
  );
}
