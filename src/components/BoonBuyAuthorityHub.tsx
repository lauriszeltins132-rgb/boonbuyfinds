import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaScript from "@/components/SchemaScript";
import ServerProductGrid from "@/components/ServerProductGrid";
import TelegramJoinCta from "@/components/TelegramJoinCta";
import type { AuthorityHubConfig } from "@/lib/boonbuy-authority-hub-types";
import {
  getAuthorityHeroStats,
  getAuthorityLastUpdatedLabel,
  getAuthorityPreviewProducts,
} from "@/lib/boonbuy-authority-stats";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildWebPageSchema,
} from "@/lib/schema";
import { getDatasetSyncedIso } from "@/lib/catalog-meta";

function ProseSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-xl font-black tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

function HubLink({
  href,
  label,
  external,
  primary,
}: {
  href: string;
  label: string;
  external?: boolean;
  primary?: boolean;
}) {
  const className = primary
    ? "inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-black text-white transition hover:bg-accent-hover"
    : "inline-flex items-center justify-center rounded-full border border-border-strong px-5 py-2.5 text-sm font-bold text-foreground hover:border-accent/40 hover:text-accent";

  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function BoonBuyAuthorityHub({
  config,
}: {
  config: AuthorityHubConfig;
}) {
  const lastUpdated = getAuthorityLastUpdatedLabel();
  const heroStats =
    config.heroStats ?? getAuthorityHeroStats(config.heroStatsKind ?? "default");
  const previewProducts = config.productPreview
    ? getAuthorityPreviewProducts(
        config.productPreview.kind,
        config.productPreview.limit ?? 8
      )
    : [];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: config.breadcrumbLabel },
  ];

  const syncedIso = getDatasetSyncedIso();
  const schema: Record<string, unknown>[] = [
    buildBreadcrumbSchema(breadcrumbItems, config.path),
    buildFaqSchema(config.faqs),
  ];

  if (config.schema === "collection") {
    schema.unshift(
      buildCollectionPageSchema({
        name: config.h1,
        description: config.metaDescription,
        path: config.path,
        numberOfItems: previewProducts.length || heroStats.length,
      })
    );
  } else if (config.schema === "article") {
    schema.unshift(
      buildArticleSchema({
        title: config.title,
        description: config.metaDescription,
        path: config.path,
        datePublished: syncedIso,
        dateModified: syncedIso,
      })
    );
  } else {
    schema.unshift(
      buildWebPageSchema({
        name: config.h1,
        description: config.metaDescription,
        path: config.path,
      })
    );
  }

  const howTo =
    config.steps && config.steps.length > 0
      ? buildHowToSchema({
          name: config.stepsTitle ?? `How to use ${config.h1}`,
          description: config.metaDescription,
          path: config.path,
          steps: config.steps.map((s) => ({ name: s.name, text: s.text })),
        })
      : null;
  if (howTo) schema.push(howTo);

  return (
    <>
      <SchemaScript data={schema} />

      <Breadcrumbs items={breadcrumbItems} currentPath={config.path} />

      <article className="px-4 pb-12 pt-4 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-2xl">
          <section className="overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-secondary-soft to-panel-hover p-6 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {config.badge}
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {config.h1}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">{config.intro}</p>

            {heroStats.length > 0 ? (
              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border/70 bg-background/55 px-3 py-3 text-center backdrop-blur-sm"
                  >
                    <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-sm font-black text-foreground sm:text-base">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              {config.primaryCtas.map((cta) => (
                <HubLink key={`${cta.href}-${cta.label}`} {...cta} />
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">Last updated {lastUpdated}</p>
          </section>

          <aside className="mt-6 rounded-2xl border border-border bg-surface/35 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Quick answer
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {config.directAnswer}
            </p>
            {config.keyFacts && config.keyFacts.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                {config.keyFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            ) : null}
          </aside>

          {config.telegramCta ? (
            <TelegramJoinCta variant="hero" location={`${config.slug}_hero`} />
          ) : null}

          {config.productPreview && previewProducts.length > 0 ? (
            <section className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                {config.productPreview.title}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Lightweight preview only — open browse for the full catalog.
              </p>
              <div className="mt-5">
                <ServerProductGrid products={previewProducts} />
              </div>
            </section>
          ) : null}

          {config.sections.map((section) => (
            <ProseSection key={section.id} id={section.id} title={section.title}>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
              {section.bullets && section.bullets.length > 0 ? (
                <ul className="list-disc space-y-1.5 pl-5">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {section.links && section.links.length > 0 ? (
                <ul className="flex flex-wrap gap-2 pt-1">
                  {section.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      {link.external || link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
            </ProseSection>
          ))}

          {config.steps && config.steps.length > 0 ? (
            <section className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                {config.stepsTitle ?? "Steps"}
              </h2>
              <ol className="mt-5 space-y-4">
                {config.steps.map((step, index) => (
                  <li key={step.name} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-foreground">{step.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {config.table ? (
            <section className="mt-12 scroll-mt-24">
              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                {config.table.title}
              </h2>
              <div className="mt-5 -mx-1 overflow-x-auto sm:mx-0">
                <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface/40">
                      {config.table.headers.map((h) => (
                        <th
                          key={h}
                          className="px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-muted"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {config.table.rows.map((row) => (
                      <tr key={row.join("|")} className="border-b border-border/60">
                        {row.map((cell) => (
                          <td key={cell} className="px-3 py-3 text-muted">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {config.telegramCta ? (
            <TelegramJoinCta variant="compact" location={`${config.slug}_mid`} />
          ) : null}

          <section id="faq" className="mt-12 scroll-mt-24">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Frequently asked questions
            </h2>
            <div className="mt-5 space-y-3">
              {config.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-border bg-surface/20 px-4 py-3"
                >
                  <summary className="cursor-pointer list-none font-bold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-3">
                      {faq.question}
                      <span className="text-muted transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {config.telegramCta ? (
            <TelegramJoinCta variant="final" location={`${config.slug}_final`} />
          ) : null}

          <section id="related-resources" className="mt-12 scroll-mt-24">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Related BoonBuy resources
            </h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {config.relatedResources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent"
                  >
                    {link.label}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
