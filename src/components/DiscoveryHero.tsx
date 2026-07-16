import Image from "next/image";
import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import LiveSiteSignals from "@/components/LiveSiteSignals";
import TrustStrip from "@/components/TrustStrip";
import { HERO_ENTITY_LINE } from "@/lib/brand-entity";
import { HERO_HEADLINE, HERO_SUBHEADLINE, SITE_NAME } from "@/lib/constants";
import { HERO_LANDING_CTAS } from "@/lib/boonbuy-seo-hub";
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
    <section className="border-b border-border/50 px-4 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-10">
      <div className="mx-auto max-w-3xl text-center">
        <Link href="/" className="mb-4 inline-flex items-center justify-center">
          <Image
            src="/logo.png?v=20260716b"
            alt={`${SITE_NAME} logo`}
            width={56}
            height={56}
            className="h-12 w-12 sm:h-14 sm:w-14"
            priority
          />
          <span className="sr-only">{SITE_NAME}</span>
        </Link>

        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
          QC approved · Verified BoonBuy links
        </p>

        <h1 className="mt-3 text-[1.35rem] font-black leading-[1.12] tracking-tight sm:text-[1.85rem] lg:text-[2.35rem]">
          {HERO_HEADLINE}
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {HERO_SUBHEADLINE}
        </p>

        <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-muted/80 sm:text-sm">
          {HERO_ENTITY_LINE}
        </p>

        <LiveSiteSignals />

        <div className="mx-auto mt-6 max-w-[700px] sm:mt-7">
          <HeroSearch searchIndex={searchIndex} />
        </div>

        <div className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
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
      </div>

      <div className="mx-auto mt-5 max-w-7xl sm:mt-6">
        <TrustStrip compact />
      </div>
    </section>
  );
}
