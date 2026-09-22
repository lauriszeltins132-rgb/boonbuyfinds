import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RegisterLink from "@/components/RegisterLink";
import SchemaScript from "@/components/SchemaScript";
import {
  BOONBUY_COUPONS_HUB,
  BOONBUY_COUPONS_HUB_FAQS,
  BOONBUY_COUPONS_HUB_SECTIONS,
  BOONBUY_COUPONS_RESOURCE_LINKS,
  BOONBUY_COUPONS_TRUST,
} from "@/lib/boonbuy-coupons-hub";
import { formatDatasetAge, getDatasetSyncedIso } from "@/lib/catalog-meta";
import {
  buildAgentCouponWebPageSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { CONTENT_REVIEW_NOTE } from "@/lib/trust";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: BOONBUY_COUPONS_HUB.title,
    description: BOONBUY_COUPONS_HUB.metaDescription,
    path: BOONBUY_COUPONS_HUB.path,
  }),
  keywords: [...BOONBUY_COUPONS_HUB.keywords],
};

export const revalidate = 3600;

export default function BoonBuyCouponsHubPage() {
  const path = BOONBUY_COUPONS_HUB.path;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "BoonBuy", href: "/boonbuy" },
    { label: "Coupons" },
  ];
  const syncedIso = getDatasetSyncedIso();

  return (
    <>
      <SchemaScript
        data={[
          buildAgentCouponWebPageSchema({
            name: BOONBUY_COUPONS_HUB.h1,
            description: BOONBUY_COUPONS_HUB.metaDescription,
            path,
            couponUrl: BOONBUY_COUPONS_HUB.couponUrl,
            offerHeadline: BOONBUY_COUPONS_HUB.offerHeadline,
            offerDescription: BOONBUY_COUPONS_HUB.offerDescription,
          }),
          buildBreadcrumbSchema(breadcrumbs, path),
          buildFaqSchema([...BOONBUY_COUPONS_HUB_FAQS]),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} currentPath={path} />

      <article className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {BOONBUY_COUPONS_HUB.badge}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {BOONBUY_COUPONS_HUB.h1}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {BOONBUY_COUPONS_HUB.intro}
          </p>

          <aside className="mt-6 rounded-2xl border border-accent/25 bg-accent/5 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Quick answer
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {BOONBUY_COUPONS_HUB.directAnswer}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  How you save
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                  {BOONBUY_COUPONS_HUB.howUsersSave.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  How to claim
                </p>
                <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                  {BOONBUY_COUPONS_HUB.howToClaim.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
            <p className="mt-4 text-lg font-black text-foreground">
              {BOONBUY_COUPONS_HUB.offerHeadline}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {BOONBUY_COUPONS_HUB.offerDescription}
            </p>
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
            <div className="mt-5 flex flex-wrap gap-3">
              <RegisterLink
                location="boonbuy_coupons_hub"
                className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-bold text-white hover:opacity-90"
              >
                {BOONBUY_COUPONS_HUB.ctaLabel}
              </RegisterLink>
              <Link
                href="/boonbuy-deals"
                className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-bold hover:border-accent/40 hover:text-accent"
              >
                Latest BoonBuy deals
              </Link>
            </div>
          </aside>

          <nav aria-label="Jump to coupon sections" className="mt-8 flex flex-wrap gap-2">
            {BOONBUY_COUPONS_HUB_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground/80 hover:border-accent/40 hover:text-accent"
              >
                {section.heading}
              </a>
            ))}
            <a
              href="#faq"
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground/80 hover:border-accent/40 hover:text-accent"
            >
              FAQ
            </a>
            <a
              href="#trust"
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground/80 hover:border-accent/40 hover:text-accent"
            >
              How we check coupons
            </a>
          </nav>

          <div className="mt-10 space-y-12">
            {BOONBUY_COUPONS_HUB_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-xl font-black text-foreground">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mt-3 text-sm leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.steps ? (
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
                    {section.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                ) : null}
                {section.links ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {section.links.map((link) => (
                      <li key={link.href + link.label}>
                        {link.href.startsWith("http") ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <section
            id="faq"
            className="mt-12 scroll-mt-24 rounded-2xl border border-border bg-surface/40 p-6"
          >
            <h2 className="text-xl font-black">Frequently Asked Questions</h2>
            <dl className="mt-5 space-y-5">
              {BOONBUY_COUPONS_HUB_FAQS.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-bold text-foreground">{faq.question}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            id="trust"
            className="mt-12 scroll-mt-24 rounded-2xl border border-border bg-surface/35 p-6"
          >
            <h2 className="text-xl font-black">Editorial review & coupon checks</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {BOONBUY_COUPONS_TRUST.editorialNote}
            </p>
            <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-accent">
              How coupons are checked
            </h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              {BOONBUY_COUPONS_TRUST.howChecked.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Update history
            </h3>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              {BOONBUY_COUPONS_TRUST.updateHistory.map((entry) => (
                <li key={entry.label}>
                  <span className="font-bold text-foreground">{entry.label}: </span>
                  {entry.detail}
                </li>
              ))}
            </ul>
          </section>

          <nav
            aria-label="Related BoonBuy savings resources"
            className="mt-10 flex flex-wrap gap-2"
          >
            {BOONBUY_COUPONS_RESOURCE_LINKS.map((link) => (
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
