import Link from "next/link";
import { HERO_LANDING_CTAS } from "@/lib/boonbuy-seo-hub";

type HeroCtaIcon = (typeof HERO_LANDING_CTAS)[number]["icon"];

function CtaIcon({ name }: { name: HeroCtaIcon }) {
  const common = {
    className: "h-4 w-4 shrink-0",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "coupon":
      return (
        <svg {...common}>
          <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 1 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 1 0 0-4V8z" />
          <path d="M10 8v8" />
        </svg>
      );
    case "spreadsheet":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 10h16M4 14h16M10 4v16" />
        </svg>
      );
  }
}

const VARIANT_CLASS = {
  primary:
    "border-transparent bg-accent text-white shadow-[0_8px_20px_rgba(255,128,0,0.22)] hover:bg-accent-hover hover:shadow-[0_10px_24px_rgba(255,128,0,0.28)]",
  secondary:
    "border-accent/30 bg-white text-accent hover:border-accent/50 hover:bg-accent/5",
  ghost:
    "border-border bg-white text-foreground hover:border-accent/35 hover:text-accent",
} as const;

export default function HeroLandingCtas() {
  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
      {HERO_LANDING_CTAS.map((cta) => (
        <Link
          key={cta.href}
          href={cta.href}
          className={`hero-landing-cta inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold tracking-tight transition duration-200 sm:px-5 sm:py-3 ${VARIANT_CLASS[cta.variant]}`}
        >
          <CtaIcon name={cta.icon} />
          <span>{cta.label}</span>
        </Link>
      ))}
    </div>
  );
}
