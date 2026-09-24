import type { Metadata } from "next";
import { Suspense } from "react";
import HomepageCatalogSection from "@/components/HomepageCatalogSection";
import DataFreshness from "@/components/DataFreshness";
import DiscoveryHero from "@/components/DiscoveryHero";
import HomepageProductMosaic from "@/components/HomepageProductMosaic";
import DiscoveryRail from "@/components/DiscoveryRail";
import HomepageBrands from "@/components/HomepageBrands";
import HomepageCategories from "@/components/HomepageCategories";
import HomepageCollections from "@/components/HomepageCollections";
import HomepageConversion from "@/components/HomepageConversion";
import HomepageFaq from "@/components/HomepageFaq";
import HomepageInternalLinks from "@/components/HomepageInternalLinks";
import HomepagePopularQuestions from "@/components/HomepagePopularQuestions";
import HomepageQuickCtas from "@/components/HomepageQuickCtas";
import HomepageSaveOnBoonBuy from "@/components/HomepageSaveOnBoonBuy";
import HomepageSeoContent from "@/components/HomepageSeoContent";
import RecentlyViewedRail from "@/components/RecentlyViewedRail";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import SchemaScript from "@/components/SchemaScript";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { getHomepageRails } from "@/lib/homepage-rails";
import { getCategories } from "@/lib/products";
import { buildWebPageSchema } from "@/lib/schema";
import { buildHomepageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildHomepageMetadata();

/** Refresh discovery rails hourly so rotation and dedupe stay current. */
export const revalidate = 3600;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const categories = getCategories();
  // Fewer products per early rail = faster first paint on mobile.
  const rails = getHomepageRails(10);
  const mosaicSource = rails.editorsPicks.length
    ? rails.editorsPicks
    : rails.popularToday.length
      ? rails.popularToday
      : rails.latestFinds;

  return (
    <>
      <SchemaScript
        data={buildWebPageSchema({
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          path: "/",
          aboutOrganization: true,
        })}
      />

      {/* 1. Hero / search */}
      <DiscoveryHero />

      {/* 2. Compact primary CTAs */}
      <HomepageQuickCtas />

      {/* 3–5. Products first */}
      <HomepageProductMosaic products={mosaicSource} />

      <DiscoveryRail
        title="Trending Today"
        subtitle="Most viewed and clicked in the last 24 hours"
        href="/trending"
        products={rails.popularToday}
        showTrendingScore
        preloadImages
      />

      <DiscoveryRail
        title="Latest Finds"
        subtitle="Newest drops from the BoonBuy spreadsheet sync"
        href="/latest-finds"
        products={rails.latestFinds}
      />

      {rails.editorsPicks.length > 0 ? (
        <DiscoveryRail
          title="Editor's Picks"
          subtitle="QC-linked standouts with strong presentation"
          href="/editors-picks"
          products={rails.editorsPicks}
        />
      ) : null}

      {/* Browse catalog — still above long SEO walls */}
      <section id="browse" className="scroll-mt-24 px-4 pt-2 sm:px-6">
        <div className="mx-auto max-w-7xl pb-3">
          <h2 className="text-xl font-black sm:text-2xl">Browse All Finds</h2>
          <p className="mt-1 text-sm text-muted">
            Search, filter, and explore the full catalog.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <section className="px-4 pb-10 sm:px-6">
            <div className="panel-shell mx-auto max-w-7xl rounded-[32px] border border-border-strong bg-panel p-5 sm:p-7">
              <ProductGridSkeleton count={8} />
            </div>
          </section>
        }
      >
        <HomepageCatalogSection searchParams={searchParams} />
      </Suspense>

      {/* 6–8. Compact discovery chips */}
      <HomepageCategories categories={categories} />
      <HomepageBrands hideSpotlight />
      <HomepageCollections />

      {rails.bestUnder20.length > 0 ? (
        <DiscoveryRail
          title="Best Under $20"
          subtitle="Budget-friendly finds that still look premium"
          href="/best-under-30"
          products={rails.bestUnder20}
        />
      ) : null}

      <DiscoveryRail
        title="Most Viewed This Week"
        subtitle="Trending sneakers, jackets and streetwear"
        href="/trending"
        products={rails.popularWeek}
        showTrendingScore
      />

      <RecentlyViewedRail />

      {/* 9–12. SEO / conversion lower — still SSR */}
      <HomepageConversion />
      <HomepageSaveOnBoonBuy />
      <HomepagePopularQuestions />
      <HomepageInternalLinks />
      <HomepageSeoContent />
      <HomepageFaq />

      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <DataFreshness variant="block" label="Catalog synced" />
        </div>
      </section>
    </>
  );
}
