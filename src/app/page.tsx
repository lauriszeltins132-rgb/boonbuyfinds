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

/** ISR — no searchParams on this route (filters live on /browse). */
export const revalidate = 3600;

export default async function HomePage() {
  const categories = getCategories();
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

      <DiscoveryHero />

      <ServerDiscoveryRail
        title="Trending Finds"
        subtitle="Most viewed in the last 24 hours"
        href="/trending"
        products={rails.popularToday}
        showTrendingScore
        preloadImages
      />

      <LazyMount minHeight={320} rootMargin="240px 0px">
        <ServerDiscoveryRail
          title="Latest Finds"
          subtitle="Newest drops from the spreadsheet sync"
          href="/latest-finds"
          products={rails.latestFinds}
        />
      </LazyMount>

      <HomepageCategories categories={categories} />
      <HomepageBrands />

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
      <HomepageCouponCard />

      <section id="browse" className="scroll-mt-24 px-4 pt-4 sm:px-6">
        <div className="mx-auto max-w-7xl pb-3">
          <h2 className="text-xl font-black sm:text-2xl">All BoonBuy Finds</h2>
          <p className="mt-1 text-sm text-muted">
            First {36} finds below. Search and filters open the full browse
            catalog without slowing this page.
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
        <HomepageCatalogSection />
      </Suspense>

      <RecentlyViewedRail />

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
