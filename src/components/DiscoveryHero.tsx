import Image from "next/image";
import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import LiveSiteSignals from "@/components/LiveSiteSignals";
import TrustStrip from "@/components/TrustStrip";
import { SITE_NAME } from "@/lib/constants";
import {
  HERO_LANDING_CTAS,
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
            src="/logo.svg?v=20260716"
            alt={`${SITE_NAME} logo`}
            width={56}
            height={56}
            className="h-12 w-12 sm:h-14 sm:w-14"
            priority
          />
          <span className="sr-only">{SITE_NAME}</span>
        </Link>

        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
          Verified BoonBuy finds · QC · Coupons
        </p>

        <h1 className="mt-3 text-[1.75rem] font-black leading-[1.08] tracking-tight sm:text-[2.35rem] lg:text-[2.75rem]">
          {HERO_LANDING_TITLE}
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {HERO_LANDING_SUBTITLE}
        </p>

        <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {HERO_LANDING_CTAS.map((cta) => {
            const className =
              cta.variant === "primary"
                ? "inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-black text-white hover:bg-accent-hover"
                : cta.variant === "secondary"
                  ? "inline-flex items-center justify-center rounded-full border border-accent/35 bg-accent/10 px-4 py-2.5 text-sm font-bold text-accent hover:bg-accent/15"
                  : "inline-flex items-center justify-center rounded-full border border-border px-4 py-2.5 text-sm font-bold text-foreground hover:border-accent/40 hover:text-accent";

            return (
              <Link key={cta.href} href={cta.href} className={className}>
                {cta.label}
              </Link>
            );
          })}
        </div>

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
