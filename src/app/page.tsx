import type { Metadata } from "next";
import Link from "next/link";
import DataFreshness from "@/components/DataFreshness";
import DiscoveryHero from "@/components/DiscoveryHero";
import HomepageBrands from "@/components/HomepageBrands";
import HomepageCategories from "@/components/HomepageCategories";
import HomepageCollections from "@/components/HomepageCollections";
import HomepageConversion from "@/components/HomepageConversion";
import HomepageCouponCard from "@/components/HomepageCouponCard";
import HomepageFaq from "@/components/HomepageFaq";
import HomepageInternalLinks from "@/components/HomepageInternalLinks";
import HomepagePopularQuestions from "@/components/HomepagePopularQuestions";
import HomepageSeoContent from "@/components/HomepageSeoContent";
import LazyMount from "@/components/LazyMount";
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

export default async function HomePage() {
  const categories = getCategories();
  // 6 per rail / 4 per brand preview — never ship full catalog on homepage.
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

      {/* 1. Hero + search + primary CTAs */}
      <DiscoveryHero />

      {/* 2–3. Product discovery (small rails only) */}
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

      {/* 6. Budget + 1–2 brand collection previews */}
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

      {/* 7. Coupon CTA */}
      <HomepageCouponCard />

      <section className="px-4 pb-2 pt-1 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-panel/60 px-4 py-3">
          <div>
            <h2 className="text-sm font-black sm:text-base">Browse all finds</h2>
            <p className="text-xs text-muted">
              Search and filter the full catalog on the Finds page — not loaded here.
            </p>
          </div>
          <Link
            href="/finds"
            className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-bold text-white hover:opacity-90"
          >
            Open catalog →
          </Link>
        </div>
      </section>

      <RecentlyViewedRail />

      {/* SEO / guides lower — still SSR */}
      <HomepageConversion />
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
