import Image from "next/image";
import Link from "next/link";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/Breadcrumbs";
import GuideSignupCallout from "@/components/conversion/GuideSignupCallout";
import ProductGrid from "@/components/ProductGrid";
import RelatedPages from "@/components/RelatedPages";
import SchemaScript from "@/components/SchemaScript";
import SeoArticleReadingMeta from "@/components/SeoArticleReadingMeta";
import TableOfContents from "@/components/TableOfContents";
import { getSeoArchitectureContentDates } from "@/lib/seo-architecture/dates";
import { getSeoArchitectureInternalLinks } from "@/lib/seo-architecture/internal-links";
import { getSeoArchitecturePage } from "@/lib/seo-architecture/registry";
import { resolveSeoArchitectureProducts } from "@/lib/seo-architecture/products";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";
import {
  buildTableOfContents,
  countArticleWords,
  estimateReadingTimeMinutes,
  slugifyHeading,
} from "@/lib/seo-architecture/utils";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
} from "@/lib/schema";
import { BOONBUY_COUPON_URL } from "@/lib/boonbuy-affiliate";
import { SOCIAL_LINKS } from "@/lib/constants";

type SeoArticleLayoutProps = {
  page: SeoArchitecturePage;
};

function RelatedArticles({
  slugs,
  currentSlug,
}: {
  slugs: string[];
  currentSlug: string;
}) {
  const articles = slugs
    .filter((slug) => slug !== currentSlug)
    .map((slug) => getSeoArchitecturePage(slug))
    .filter(Boolean) as SeoArchitecturePage[];

  if (articles.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-border bg-surface/35 p-5 sm:p-6">
      <h2 className="text-lg font-black text-foreground">Related articles</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {articles.slice(0, 8).map((article) => (
          <li key={article.slug}>
            <Link
              href={article.path}
              className="text-sm font-semibold text-accent hover:underline"
            >
              {article.h1}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function InternalLinkHub({ page }: { page: SeoArchitecturePage }) {
  const hubs = getSeoArchitectureInternalLinks(page);

  return (
    <section className="mt-10 rounded-2xl border border-border bg-surface/35 p-5 sm:p-6">
      <h2 className="text-lg font-black text-foreground">Explore BoonBuy Finds</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {hubs.map((hub) => (
          <div key={hub.title}>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-muted">
              {hub.title}
            </h3>
            <ul className="mt-2 space-y-1.5">
              {hub.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SeoArticleLayout({ page }: SeoArticleLayoutProps) {
  const dates = getSeoArchitectureContentDates(page.slug);
  const wordCount = countArticleWords(page.intro, page.sections, page.faqs);
  const readingTimeMinutes = estimateReadingTimeMinutes(wordCount);
  const toc = buildTableOfContents(page.sections);
  const products = resolveSeoArchitectureProducts(page);

  const breadcrumbs: BreadcrumbItem[] = page.parentCrumb
    ? [
        { label: "Home", href: "/" },
        page.parentCrumb,
        { label: page.h1 },
      ]
    : [
        { label: "Home", href: "/" },
        { label: page.h1 },
      ];

  const schema: Record<string, unknown>[] = [
    buildWebPageSchema({
      name: page.h1,
      description: page.metaDescription,
      path: page.path,
    }),
    buildArticleSchema({
      title: page.title,
      description: page.metaDescription,
      path: page.path,
      datePublished: dates.publishedIso,
      dateModified: dates.updatedIso,
    }),
    buildBreadcrumbSchema(breadcrumbs, page.path),
    buildFaqSchema(page.faqs),
  ];

  const spreadsheetHref = page.spreadsheetHref ?? "/boonbuy-spreadsheet";

  return (
    <>
      <SchemaScript data={schema} />

      <Breadcrumbs items={breadcrumbs} currentPath={page.path} />

      <article className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {page.badge}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {page.h1}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">{page.intro}</p>

          <SeoArticleReadingMeta
            publishedIso={dates.publishedIso}
            updatedIso={dates.updatedIso}
            readingTimeMinutes={readingTimeMinutes}
            wordCount={wordCount}
          />

          {page.heroImage ? (
            <figure className="mt-8 overflow-hidden rounded-2xl border border-border">
              <Image
                src={page.heroImage.src}
                alt={page.heroImage.alt}
                width={page.heroImage.width ?? 1200}
                height={page.heroImage.height ?? 630}
                className="h-auto w-full"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 720px"
              />
              {page.heroImage.caption ? (
                <figcaption className="border-t border-border px-4 py-3 text-sm text-muted">
                  {page.heroImage.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="mt-8">
            <GuideSignupCallout variant="inline" />
          </div>

          <div className="mt-8">
            <TableOfContents entries={toc} />
          </div>

          <div className="mt-10 space-y-10">
            {page.sections.map((section) => {
              const Heading = section.level === 3 ? "h3" : "h2";
              const sectionId = slugifyHeading(section.heading);

              return (
                <section key={section.heading} id={sectionId}>
                  <Heading
                    className={
                      section.level === 3
                        ? "text-lg font-bold text-foreground"
                        : "text-xl font-black text-foreground"
                    }
                  >
                    {section.heading}
                  </Heading>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-muted">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                  {section.links && section.links.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          {link.href.startsWith("http") ? (
                            <a
                              href={link.href}
                              rel="noopener noreferrer"
                              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-bold text-foreground hover:border-accent hover:text-accent"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-bold text-foreground hover:border-accent hover:text-accent"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              );
            })}
          </div>

          {page.spreadsheetHref || page.category === "spreadsheet" ? (
            <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-6">
              <h2 className="text-lg font-black text-foreground">Open the spreadsheet</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Browse the live searchable catalog on BoonBuy Finds — filter by brand,
                category, and price, then open verified agent links.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={spreadsheetHref}
                  className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
                >
                  Browse spreadsheet finds
                </Link>
                <a
                  href={BOONBUY_COUPON_URL}
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-bold text-foreground hover:border-accent"
                >
                  Claim shipping coupon
                </a>
              </div>
            </div>
          ) : null}

          {products.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-xl font-black text-foreground">
                {page.productSectionTitle ?? "Featured finds"}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Live picks from the BoonBuy Finds catalog — updated as new listings sync.
              </p>
              <div className="mt-6">
                <ProductGrid products={products.slice(0, 24)} />
              </div>
            </section>
          ) : null}

          <section className="mt-12">
            <h2 className="text-xl font-black text-foreground">Frequently asked questions</h2>
            <dl className="mt-6 space-y-6">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-border p-5">
                  <dt className="font-bold text-foreground">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <InternalLinkHub page={page} />

          {page.relatedLinks.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-lg font-black text-foreground">More resources</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {page.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-bold text-foreground hover:border-accent hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {page.relatedArticleSlugs && page.relatedArticleSlugs.length > 0 ? (
            <RelatedArticles
              slugs={page.relatedArticleSlugs}
              currentSlug={page.slug}
            />
          ) : null}

          <p className="mt-10 text-sm text-muted">
            Join the community on{" "}
            <a
              href={SOCIAL_LINKS.telegram}
              className="font-bold text-accent hover:underline"
              rel="noopener noreferrer"
            >
              Telegram
            </a>{" "}
            and{" "}
            <a
              href={SOCIAL_LINKS.discord}
              className="font-bold text-accent hover:underline"
              rel="noopener noreferrer"
            >
              Discord
            </a>{" "}
            for daily drops and haul discussion.
          </p>
        </div>
      </article>

      <RelatedPages currentPath={page.path} />
    </>
  );
}
