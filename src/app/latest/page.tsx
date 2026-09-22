import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServerCatalogPanel from "@/components/ServerCatalogPanel";
import RelatedSearches from "@/components/RelatedSearches";
import { getBrandsFromProducts } from "@/lib/brands";
import { getCategories, getLatestProducts } from "@/lib/products";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "New Finds",
  description:
    "Fresh BoonBuy finds added recently — sneakers, streetwear, accessories, and more with verified buy links.",
  path: "/latest",
});

export default function LatestPage() {
  const products = getLatestProducts();
  const brands = getBrandsFromProducts(products);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "New Finds" },
        ]}
      />
      <section className="px-4 pb-6 pt-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Fresh drops
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">New Finds</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            The newest additions from the BoonBuy Finds catalog — updated from the
            latest spreadsheet drops with photos, pricing, and verified purchase links.
          </p>
          <p className="mt-3 text-sm text-muted">
            Manually curated catalog sync · See{" "}
            <Link href="/editorial-policy" className="font-semibold text-accent hover:underline">
              editorial policy
            </Link>
            .
          </p>
        </div>
      </section>
      <Suspense fallback={<div className="py-24 text-center text-muted">Loading...</div>}>
        <ServerCatalogPanel
          products={products}
          categories={getCategories()}
          brands={brands}
          basePath="/latest"
        />
      </Suspense>
      <RelatedSearches title="Popular & related searches" />
    </>
  );
}
