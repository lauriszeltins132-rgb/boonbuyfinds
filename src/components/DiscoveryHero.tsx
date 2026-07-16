import Image from "next/image";
import Link from "next/link";
import HeroLandingCtas from "@/components/HeroLandingCtas";
import HeroSearch from "@/components/HeroSearch";
import LiveSiteSignals from "@/components/LiveSiteSignals";
import TrustStrip from "@/components/TrustStrip";
import { HERO_ENTITY_LINE } from "@/lib/brand-entity";
import {
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
  SITE_NAME,
} from "@/lib/constants";
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
    <section className="border-b border-border/50 px-4 pb-7 pt-5 sm:px-6 sm:pb-10 sm:pt-10">
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

        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
          Verified BoonBuy finds · QC · {BOONBUY_SHIPPING_DISCOUNT_PERCENT}%
          shipping coupon
        </p>

        <h1 className="mt-3 text-[1.35rem] font-black leading-[1.12] tracking-tight sm:text-[1.85rem] lg:text-[2.35rem]">
          {HERO_LANDING_TITLE}
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {HERO_LANDING_SUBTITLE}
        </p>

        <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-muted/80 sm:text-sm">
          {HERO_ENTITY_LINE}
        </p>

        <HeroLandingCtas />

        <LiveSiteSignals />

        <div className="mx-auto mt-6 max-w-[700px] sm:mt-7">
          <HeroSearch searchIndex={searchIndex} />
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-7xl sm:mt-6">
        <TrustStrip compact />
      </div>
    </section>
  );
}
