import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaScript from "@/components/SchemaScript";
import {
  BOONBUY_AUTHORITY,
  BOONBUY_AUTHORITY_FAQS,
  BOONBUY_AUTHORITY_RESOURCE_LINKS,
  BOONBUY_AUTHORITY_SECTIONS,
} from "@/lib/boonbuy-authority";
import { formatDatasetAge, getDatasetSyncedIso } from "@/lib/catalog-meta";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
} from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { CONTENT_REVIEW_NOTE } from "@/lib/trust";

export const metadata: Metadata = buildPageMetadata({
  title: BOONBUY_AUTHORITY.title,
  description: BOONBUY_AUTHORITY.metaDescription,
  path: BOONBUY_AUTHORITY.path,
});

export const revalidate = 3600;

export default function BoonBuyAuthorityPage() {
  const path = BOONBUY_AUTHORITY.path;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "BoonBuy" },
  ];
  const syncedIso = getDatasetSyncedIso();

  return (
    <>
      <SchemaScript
        data={[
          buildWebPageSchema({
            name: BOONBUY_AUTHORITY.h1,
            description: BOONBUY_AUTHORITY.metaDescription,
            path,
          }),
          buildBreadcrumbSchema(breadcrumbs, path),
          buildFaqSchema([...BOONBUY_AUTHORITY_FAQS]),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} currentPath={path} />

      <article className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {BOONBUY_AUTHORITY.badge}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {BOONBUY_AUTHORITY.h1}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {BOONBUY_AUTHORITY.intro}
          </p>

          <aside className="mt-6 rounded-2xl border border-border bg-surface/35 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Quick answer
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {BOONBUY_AUTHORITY.directAnswer}
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              {BOONBUY_AUTHORITY.keyFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {BOONBUY_AUTHORITY.partnershipNote}
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
          </aside>

          <nav aria-label="Jump to sections" className="mt-8 flex flex-wrap gap-2">
            {BOONBUY_AUTHORITY_SECTIONS.map((section) => (
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
          </nav>

          <div className="mt-10 space-y-12">
            {BOONBUY_AUTHORITY_SECTIONS.map((section) => (
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
                <ul className="mt-4 flex flex-wrap gap-2">
                  {section.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section id="faq" className="mt-12 scroll-mt-24 rounded-2xl border border-border bg-surface/40 p-6">
            <h2 className="text-xl font-black">Frequently Asked Questions</h2>
            <dl className="mt-5 space-y-5">
              {BOONBUY_AUTHORITY_FAQS.map((faq) => (
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
            aria-label="Related BoonBuy resources"
            className="mt-10 flex flex-wrap gap-2"
          >
            {BOONBUY_AUTHORITY_RESOURCE_LINKS.map((link) => (
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
