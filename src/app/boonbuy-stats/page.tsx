import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaScript from "@/components/SchemaScript";
import {
  formatMedianPrice,
  getBrandQcLiveStats,
  getCatalogOverviewStats,
  getCategoryLiveStats,
} from "@/lib/catalog-live-stats";
import { formatCountLabel } from "@/lib/catalog-count-public";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const PATH = "/boonbuy-stats";

export function generateMetadata(): Metadata {
  const stats = getCatalogOverviewStats();
  const title = `BoonBuy Finds Stats | Live Catalog Counts & QC Coverage`;
  const description = `Live BoonBuy Finds catalog stats — ${stats.findCountLabel} finds, ${stats.qcCountLabel} QC references (${stats.qcPercent}% coverage), ${stats.brandCountLabel} brands, ${stats.categoryCountLabel} categories, median price ${stats.medianPriceLabel}. Last sync ${stats.lastUpdatedLabel}.`;
  const canonical = `${SITE_URL}${PATH}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function BoonBuyStatsPage() {
  const overview = getCatalogOverviewStats();
  const categories = getCategoryLiveStats(10);
  const brands = getBrandQcLiveStats(10);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "BoonBuy Stats" },
  ];

  const heroStats = [
    { label: "Active finds", value: overview.findCountLabel },
    { label: "QC references", value: overview.qcCountLabel },
    { label: "QC coverage", value: `${overview.qcPercent}%` },
    { label: "Brands", value: overview.brandCountLabel },
    { label: "Categories", value: overview.categoryCountLabel },
    { label: "Median price", value: overview.medianPriceLabel },
    { label: "Last sync", value: overview.lastUpdatedLabel },
  ];

  return (
    <>
      <SchemaScript
        data={buildWebPageSchema({
          name: "BoonBuy Finds Stats",
          description: `Live catalog statistics for BoonBuy Finds — ${overview.findCountLabel} finds, updated ${overview.lastUpdatedLabel}.`,
          path: PATH,
        })}
      />
      <SchemaScript data={buildBreadcrumbSchema(breadcrumbs, PATH)} />

      <Breadcrumbs items={breadcrumbs} currentPath={PATH} />

      <article className="px-4 pb-12 pt-4 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-3xl">
          <section className="rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-secondary-soft to-panel-hover p-6 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Live catalog data
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              BoonBuy Finds Stats
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Real-time snapshot of the BoonBuy Finds catalog — product counts, QC
              coverage, brands, categories, and median prices. Numbers update when the
              catalog syncs ({overview.syncTimestamp}).
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/70 bg-background/55 px-3 py-3 text-center"
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
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/boonbuy-spreadsheet"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-black text-white hover:bg-accent-hover"
              >
                Open spreadsheet
              </Link>
              <Link
                href="/browse"
                className="inline-flex items-center justify-center rounded-full border border-border-strong px-5 py-2.5 text-sm font-bold hover:border-accent/40 hover:text-accent"
              >
                Browse finds
              </Link>
              <Link
                href="/boonbuy-qc"
                className="inline-flex items-center justify-center rounded-full border border-border-strong px-5 py-2.5 text-sm font-bold hover:border-accent/40 hover:text-accent"
              >
                QC hub
              </Link>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Categories
            </h2>
            <p className="mt-2 text-sm text-muted">
              Product count, QC count, and median price from the live catalog. Weight data
              is not available in the dataset, so it is omitted.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface/40">
                    {["Category", "Products", "With QC", "Median price"].map((h) => (
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
                  {categories.map((row) => (
                    <tr key={row.slug} className="border-b border-border/60">
                      <td className="px-3 py-3">
                        <Link
                          href={row.href}
                          className="font-semibold text-foreground hover:text-accent"
                        >
                          {row.name}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-muted">
                        {formatCountLabel(row.productCount)}
                      </td>
                      <td className="px-3 py-3 text-muted">
                        {formatCountLabel(row.qcCount)}
                      </td>
                      <td className="px-3 py-3 text-muted">
                        {formatMedianPrice(row.medianPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Brands by QC coverage
            </h2>
            <p className="mt-2 text-sm text-muted">
              Indexable brands ranked by QC-linked product count.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface/40">
                    {["Brand", "Products", "With QC", "QC %", "Median price"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-muted"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {brands.map((row) => (
                    <tr key={row.slug} className="border-b border-border/60">
                      <td className="px-3 py-3">
                        <Link
                          href={row.href}
                          className="font-semibold text-foreground hover:text-accent"
                        >
                          {row.name}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-muted">
                        {formatCountLabel(row.productCount)}
                      </td>
                      <td className="px-3 py-3 text-muted">
                        {formatCountLabel(row.qcCount)}
                      </td>
                      <td className="px-3 py-3 text-muted">{row.qcPercent}%</td>
                      <td className="px-3 py-3 text-muted">
                        {formatMedianPrice(row.medianPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Related hubs
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                { href: "/boonbuy-spreadsheet", label: "BoonBuy Spreadsheet" },
                { href: "/boonbuy-finds", label: "BoonBuy Finds" },
                { href: "/boonbuy-qc", label: "BoonBuy QC" },
                { href: "/boonbuy-coupons", label: "BoonBuy Coupons" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:border-accent/40 hover:text-accent"
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
