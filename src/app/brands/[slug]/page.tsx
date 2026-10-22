import Link from "next/link";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServerCatalogPanel from "@/components/ServerCatalogPanel";
import RelatedGuides from "@/components/RelatedGuides";
import SignupCard from "@/components/SignupCard";
import RelatedSeoLinks from "@/components/RelatedSeoLinks";
import { getRelatedGuidesForBrand } from "@/lib/related-guides";
import BrandProductRails from "@/components/brand/BrandProductRails";
import BrandSeoCollapsible from "@/components/brand/BrandSeoCollapsible";
import BrandStats from "@/components/brand/BrandStats";
import BestOfLinks from "@/components/BestOfLinks";
import RelatedPages from "@/components/RelatedPages";
import SchemaScript from "@/components/SchemaScript";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildItemListSchema,
} from "@/lib/schema";
import {
  getBrandBySlug,
  getBrandsFromProducts,
  getProductsByBrandSlug,
} from "@/lib/brands";
import { isBrandIndexable } from "@/lib/brand-indexability";
import { resolveCanonicalBrandSlug } from "@/lib/brand-normalization";
import { getRelatedIndexableBrands } from "@/lib/seo-directories";
import { getAllProducts, getCategories } from "@/lib/products";
import { getBrandPageRails } from "@/lib/brand-page-rails";
import { getBrandSeo } from "@/lib/seo-content";
import { getBrandCollectionHref } from "@/lib/brand-collections";
import { buildPageMetadata } from "@/lib/seo";
import { getProductHref } from "@/lib/slugs";
import { SITE_URL } from "@/lib/site";

type BrandPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBrandsFromProducts(getAllProducts()).map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = resolveCanonicalBrandSlug(slug);
  if (canonicalSlug !== slug) {
    return {};
  }

  const brand = getBrandBySlug(getAllProducts(), canonicalSlug);
  if (!brand) return {};

  const copy = getBrandSeo(canonicalSlug, brand.name, brand.count);
  const indexable = isBrandIndexable(brand);
  return {
    ...buildPageMetadata({
      title: copy.title,
      description: copy.description,
      path: `/brands/${canonicalSlug}`,
    }),
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function BrandLandingPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const canonicalSlug = resolveCanonicalBrandSlug(slug);
  if (canonicalSlug !== slug) {
    permanentRedirect(`/brands/${canonicalSlug}`);
  }

  const allProducts = getAllProducts();
  const brand = getBrandBySlug(allProducts, canonicalSlug);

  if (!brand) {
    notFound();
  }

  const products = getProductsByBrandSlug(allProducts, canonicalSlug);
  const collectionHref = getBrandCollectionHref(canonicalSlug);
  const pagePath = `/brands/${canonicalSlug}`;
  const rails = getBrandPageRails(canonicalSlug, brand.name, products);
  const qcCount = products.filter((product) => Boolean(product.qc_link)).length;
  const priced = products
    .map((product) => product.price)
    .filter((price): price is number => typeof price === "number" && price > 0);
  const copy = getBrandSeo(canonicalSlug, brand.name, brand.count, {
    qcCount,
    topCategories: rails.relatedCategories.slice(0, 3).map((c) => c.name),
    priceMin: priced.length ? Math.min(...priced) : null,
    priceMax: priced.length ? Math.max(...priced) : null,
  });
  const allBrands = getBrandsFromProducts(allProducts);
  const relatedBrands = getRelatedIndexableBrands(allBrands, canonicalSlug, 12);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "/brands" },
    { label: brand.name },
  ];

  return (
    <>
      <SchemaScript data={buildBreadcrumbSchema(breadcrumbs, pagePath)} />
      <SchemaScript
        data={buildCollectionPageSchema({
          name: copy.title,
          description: copy.description,
          path: pagePath,
          numberOfItems: brand.count,
        })}
      />
      <SchemaScript
        data={buildItemListSchema({
          name: `${brand.name} finds on BoonBuy`,
          description: copy.description,
          path: pagePath,
          items: products.slice(0, 24).map((product, index) => ({
            name: product.product_name,
            url: `${SITE_URL}${getProductHref(product)}`,
            position: index + 1,
          })),
        })}
      />
      <Breadcrumbs items={breadcrumbs} currentPath={pagePath} />

      <section className="px-4 pb-2 pt-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Brand finds
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{copy.title}</h1>
          <p className="mt-2 text-sm text-muted">
            {brand.count.toLocaleString()} {brand.name} finds
            {rails.stats.qcCount > 0
              ? ` · ${rails.stats.qcCount.toLocaleString()} with QC`
              : ""}
            {rails.stats.medianPrice != null
              ? ` · median ~$${Math.round(rails.stats.medianPrice)}`
              : ""}
          </p>
          {collectionHref ? (
            <p className="mt-2">
              <Link
                href={collectionHref}
                className="text-sm font-bold text-accent hover:underline"
              >
                View {brand.name} collection →
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      <BrandStats brandName={brand.name} rails={rails} />

      <BrandProductRails brandSlug={canonicalSlug} brandName={brand.name} rails={rails} />

      <section className="px-4 pb-2 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-black">Browse all {brand.name} finds</h2>
          <p className="mt-1 text-sm text-muted">
            Filter by category and price in the full catalog below.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="py-24 text-center text-muted">Loading...</div>}>
        <ServerCatalogPanel
          products={products}
          categories={getCategories().filter((c) => c.group === "category")}
          brands={relatedBrands}
          basePath={pagePath}
        />
      </Suspense>

      <BrandSeoCollapsible brandSlug={canonicalSlug} brandName={brand.name} intro={copy.intro} />

      <RelatedGuides links={getRelatedGuidesForBrand(canonicalSlug)} />
      <BestOfLinks brandSlug={canonicalSlug} />
      <SignupCard location={`brand_signup_${canonicalSlug}`} variant="compact" />
      <RelatedSeoLinks />
      <RelatedPages currentPath={pagePath} brandSlug={canonicalSlug} />
    </>
  );
}
