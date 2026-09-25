import type { Metadata } from "next";
import { Suspense } from "react";
import DataFreshness from "@/components/DataFreshness";
import DiscoveryHero from "@/components/DiscoveryHero";
import HomepageBrands from "@/components/HomepageBrands";
import HomepageCatalogSection from "@/components/HomepageCatalogSection";
import HomepageCategories from "@/components/HomepageCategories";
import HomepageCollections from "@/components/HomepageCollections";
import HomepageConversion from "@/components/HomepageConversion";
import HomepageCouponCard from "@/components/HomepageCouponCard";
import HomepageFaq from "@/components/HomepageFaq";
import HomepageInternalLinks from "@/components/HomepageInternalLinks";
import HomepagePopularQuestions from "@/components/HomepagePopularQuestions";
import HomepageSeoContent from "@/components/HomepageSeoContent";
import HomepageTelegramCta from "@/components/HomepageTelegramCta";
import LazyMount from "@/components/LazyMount";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import RecentlyViewedRail from "@/components/RecentlyViewedRail";
import SchemaScript from "@/components/SchemaScript";
import ServerDiscoveryRail from "@/components/ServerDiscoveryRail";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { getHomepageSurfaceRails } from "@/lib/homepage-rails";
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
  // Lightweight preview rails only — full catalog is paginated below.
  const rails = getHomepageSurfaceRails(6);

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

      {/* 2–3. Lightweight discovery rails */}
      <ServerDiscoveryRail
        title="Trending Finds"
        subtitle="Most viewed in the last 24 hours"
        href="/trending"
        products={rails.popularToday}
        showTrendingScore
      />

      <LazyMount minHeight={320} rootMargin="240px 0px">
        <ServerDiscoveryRail
          title="Latest Finds"
          subtitle="Newest drops from the spreadsheet sync"
          href="/latest-finds"
          products={rails.latestFinds}
        />
      </LazyMount>

      {/* 4–5. Compact taxonomy */}
      <HomepageCategories categories={categories} />
      <HomepageBrands />

      {/* 6–7. Budget + high-value collection previews */}
      {rails.bestUnder50.length > 0 ? (
        <LazyMount minHeight={320} rootMargin="280px 0px">
          <ServerDiscoveryRail
            title="Best Under $50"
            subtitle="Budget-friendly picks with clean listing photos"
            href="/best-under-50"
            products={rails.bestUnder50}
          />
        </LazyMount>
      ) : null}

      {rails.nikeFinds.length > 0 ? (
        <LazyMount minHeight={280} rootMargin="280px 0px">
          <ServerDiscoveryRail
            title="Best Nike Finds"
            subtitle="Dunks, Air Force, and everyday Nike picks"
            href="/collections/best-nike-finds"
            products={rails.nikeFinds}
          />
        </LazyMount>
      ) : null}

      {rails.monclerFinds.length > 0 ? (
        <LazyMount minHeight={280} rootMargin="280px 0px">
          <ServerDiscoveryRail
            title="Best Moncler Finds"
            subtitle="Puffers and outerwear with strong photos"
            href="/collections/best-moncler-finds"
            products={rails.monclerFinds}
          />
        </LazyMount>
      ) : null}

      <HomepageCollections />

      {/* 8. Coupon CTA */}
      <HomepageCouponCard />

      {/* 9. FULL homepage catalog — paginated, not the whole catalog JSON */}
      <section id="browse" className="scroll-mt-24 px-4 pt-4 sm:px-6">
        <div className="mx-auto max-w-7xl pb-3">
          <h2 className="text-xl font-black sm:text-2xl">All BoonBuy Finds</h2>
          <p className="mt-1 text-sm text-muted">
            Search, filter, and browse the catalog — 36 products per page with
            pagination.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <section className="px-4 pb-10 sm:px-6">
            <div className="panel-shell mx-auto max-w-7xl rounded-[32px] border border-border-strong bg-panel p-5 sm:p-7">
              <ProductGridSkeleton count={12} />
            </div>
          </section>
        }
      >
        <HomepageCatalogSection searchParams={searchParams} />
      </Suspense>

      <RecentlyViewedRail />

      {/* 10–17. SEO / resources lower — full SSR content restored */}
      <HomepageConversion />
      <HomepagePopularQuestions />
      <HomepageInternalLinks />
      <HomepageSeoContent />
      <HomepageFaq />
      <HomepageTelegramCta />

      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <DataFreshness variant="block" label="Catalog synced" />
        </div>
      </section>
    </>
  );
}
