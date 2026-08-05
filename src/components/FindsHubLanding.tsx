import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGrid from "@/components/ProductGrid";
import RelatedPages from "@/components/RelatedPages";
import SchemaScript from "@/components/SchemaScript";
import {
  getFindsHubBrands,
  getFindsHubCategories,
  type FindsHubConfig,
} from "@/lib/finds-hub-pages";
import { formatDatasetAge, getDatasetSyncedIso } from "@/lib/catalog-meta";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildItemListSchema,
} from "@/lib/schema";
import { getProductHref } from "@/lib/slugs";

type FindsHubLandingProps = {
  config: FindsHubConfig;
};

export default function FindsHubLanding({ config }: FindsHubLandingProps) {
  const products = config.getProducts();
  const brands = getFindsHubBrands(config);
  const categories = getFindsHubCategories(config);
  const syncedIso = getDatasetSyncedIso();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Finds", href: "/latest-finds" },
    { label: config.h1 },
  ];

  const schema: Record<string, unknown>[] = [
    buildCollectionPageSchema({
      name: config.h1,
      description: config.metaDescription,
      path: config.path,
      numberOfItems: products.length,
    }),
    buildBreadcrumbSchema(breadcrumbs, config.path),
    buildFaqSchema(config.faqs),
  ];

  if (products.length > 0) {
    const itemList = buildItemListSchema({
      name: config.h1,
      description: config.metaDescription,
      path: config.path,
      items: products.slice(0, 48).map((product, index) => ({
        name: product.product_name,
        url: getProductHref(product),
        position: index + 1,
      })),
    });
    if (itemList) schema.push(itemList);
  }

  return (
    <>
      <SchemaScript data={schema} />

      <Breadcrumbs items={breadcrumbs} currentPath={config.path} />

      <section className="px-4 pb-4 pt-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {config.badge}
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{config.h1}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            {config.intro}
          </p>

          <aside className="mt-6 max-w-3xl rounded-2xl border border-border bg-surface/35 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Quick answer
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {config.directAnswer}
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              {config.keyFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">
              {config.freshnessLabel} · Catalog synced {formatDatasetAge()} (
              <time dateTime={syncedIso}>{syncedIso.slice(0, 10)}</time>) ·{" "}
              <Link
                href="/editorial-policy"
                className="font-semibold text-accent hover:underline"
              >
                Editorial policy
              </Link>
            </p>
          </aside>

          <nav aria-label="Authority resources" className="mt-6 flex flex-wrap gap-2">
            {config.authorityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground/80 hover:border-accent/40 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="mt-4 text-sm text-muted">
            {products.length.toLocaleString()} products · {config.freshnessLabel}
          </p>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-black">Products</h2>
          <div className="mt-6">
            <ProductGrid products={products.slice(0, 48)} />
          </div>
        </div>
      </section>

      {brands.length > 0 ? (
        <section className="px-4 pb-6 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-2xl border border-border bg-surface/30 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-muted">
              Related brands
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {brands.map((brand) => (
                <li key={brand.slug}>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
                  >
                    {brand.name} ({brand.count})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {categories.length > 0 ? (
        <section className="px-4 pb-6 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-2xl border border-border bg-surface/30 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-muted">
              Related categories
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={cat.href}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-2xl border border-border bg-surface/30 p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-muted">
            More finds hubs
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {config.relatedHubHrefs.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {config.relatedGuideHrefs.length > 0 ? (
        <section className="px-4 pb-6 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-2xl border border-border bg-surface/30 p-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-muted">
              Related guides
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {config.relatedGuideHrefs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface/40 p-6">
          <h2 className="text-xl font-black">Frequently asked questions</h2>
          <dl className="mt-5 space-y-5">
            {config.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-bold text-foreground">{faq.question}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <RelatedPages currentPath={config.path} />
    </>
  );
}
