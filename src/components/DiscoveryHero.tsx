import Image from "next/image";
import Link from "next/link";
import HeroLandingCtas from "@/components/HeroLandingCtas";
import HeroSearch from "@/components/HeroSearch";
import LiveSiteSignals from "@/components/LiveSiteSignals";
import TrustStrip from "@/components/TrustStrip";
import { PUBLIC_CATALOG_COUNT, SITE_NAME } from "@/lib/constants";
import {
  HERO_LANDING_SUBTITLE,
  HERO_LANDING_TITLE,
} from "@/lib/boonbuy-seo-hub";
import { getSearchIndex } from "@/lib/search-suggestions";

export default function DiscoveryHero() {
  const searchIndex = getSearchIndex().map(
    ({ label, href, type, keywords, priority }) => ({
      label,
      href,
      type,
      keywords,
      priority,
    })
  );

  return (
    <section className="border-b border-border/50 px-4 pb-5 pt-5 sm:px-6 sm:pb-7 sm:pt-9">
      <div className="mx-auto max-w-3xl text-center">
        <Link href="/" className="inline-flex items-center justify-center gap-3">
          <Image
            src="/logo.png?v=20260716c"
            alt={`${SITE_NAME} logo`}
            width={56}
            height={56}
            className="h-12 w-12 sm:h-14 sm:w-14"
            priority
          />
          <span className="sr-only">{SITE_NAME}</span>
        </Link>

        <h1 className="mt-3 text-[1.4rem] font-black leading-[1.12] tracking-tight sm:mt-4 sm:text-[1.85rem] lg:text-[2.2rem]">
          {HERO_LANDING_TITLE}
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted sm:mt-2.5 sm:text-[15px]">
          {HERO_LANDING_SUBTITLE}
        </p>

        <p className="mx-auto mt-1.5 text-xs text-muted/80 sm:text-sm">
          {PUBLIC_CATALOG_COUNT.toLocaleString()}+ finds · QC references · search
          &amp; filter
        </p>

        <HeroLandingCtas />

        <div className="mx-auto mt-4 max-w-[700px] sm:mt-5">
          <HeroSearch searchIndex={searchIndex} />
        </div>

        <LiveSiteSignals />
      </div>

      <div className="mx-auto mt-4 max-w-7xl sm:mt-5">
        <TrustStrip compact />
      </div>
    </section>
  );
}
