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
    case "telegram":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M21.8 4.3 3.7 11.3c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.8 5.4c.2.7.4.9 1 .9.6 0 .9-.3 1.2-.6l2.5-2.4 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.2-.4-1.7-1.4-1.3zM9.5 14.5l8.9-5.6c.4-.3.8-.1.5.2l-7.2 6.5-.3 3.3-1.9-4.4z" />
        </svg>
      );
    case "discord":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M19.3 5.1A16.5 16.5 0 0 0 15.2 4l-.2.4c1.5.4 2.3 1 3 1.7-1.3-.6-2.6-1-4-1.2a14 14 0 0 0-4 0c-1.4.2-2.7.6-4 1.2.7-.7 1.6-1.3 3-1.7L8.8 4A16.5 16.5 0 0 0 4.7 5.1C2.1 9 1.4 12.8 1.7 16.5A16.7 16.7 0 0 0 6.8 19c.3-.5.6-.9.9-1.4-.5-.2-1-.4-1.4-.7.1-.1.2-.1.3-.2 2.3 1.1 4.8 1.6 7.4 1.6s5.1-.5 7.4-1.6c.1.1.2.1.3.2-.5.3-1 .5-1.4.7.3.5.6.9.9 1.4a16.7 16.7 0 0 0 5.1-2.5c.4-4.3-.6-8-2.8-11.4zM8.8 14.5c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5zm6.4 0c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5z" />
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
