import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServerCatalogPanel from "@/components/ServerCatalogPanel";
import RelatedSearches from "@/components/RelatedSearches";
import SignupCard from "@/components/SignupCard";
import { getBrandsFromProducts } from "@/lib/brands";
import { getCategories, getTrendingProducts } from "@/lib/products";
import { getTrendingMetadataCopy } from "@/lib/metadata-copy";
import { buildPageMetadata } from "@/lib/seo";

const trendingMeta = getTrendingMetadataCopy();

export const metadata: Metadata = buildPageMetadata({
  title: trendingMeta.title,
  description: trendingMeta.description,
  path: "/trending",
});

export default function TrendingPage() {
  const products = getTrendingProducts();
  const brands = getBrandsFromProducts(products);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Trending" },
        ]}
      />
      <section className="px-4 pb-6 pt-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Trending now
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">Trending This Week</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            What people are browsing right now across the BoonBuy Finds catalog —
            hand-picked from the trending sheet with photos, QC references, and buy links.
          </p>
        </div>
      </section>
      <SignupCard location="trending" variant="compact" />
      <section className="px-4 pb-2 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          <Link
            href="/boonbuy-coupons"
            className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
          >
            BoonBuy coupons
          </Link>
          <Link
            href="/boonbuy-deals"
            className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
          >
            Latest BoonBuy deals
          </Link>
          <Link
            href="/boonbuy"
            className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
          >
            What is BoonBuy?
          </Link>
        </div>
      </section>
      <Suspense fallback={<div className="py-24 text-center text-muted">Loading...</div>}>
        <ServerCatalogPanel
          products={products}
          categories={getCategories()}
          brands={brands}
          basePath="/trending"
        />
      </Suspense>
      <RelatedSearches title="Related searches" />
    </>
  );
}
