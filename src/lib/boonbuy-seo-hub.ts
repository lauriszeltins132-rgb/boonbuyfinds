import {
  BOONBUY_COUPON_URL,
  BOONBUY_SHIPPING_COUPON_CTA,
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
  SOCIAL_LINKS,
} from "./constants";

/** Canonical SEO hub routes for BoonBuy Finds (LitBuy-parity structure). */
export const BOONBUY_SEO_HUB = {
  home: { href: "/", label: "BoonBuy Finds" },
  telegram: {
    href: "/boonbuy-telegram",
    label: "BoonBuy Telegram",
    externalUrl: SOCIAL_LINKS.telegram,
    cta: "Join BoonBuy Telegram",
  },
  coupons: {
    href: "/boonbuy-coupons",
    label: "BoonBuy Coupons",
    externalUrl: BOONBUY_COUPON_URL,
    cta: BOONBUY_SHIPPING_COUPON_CTA,
  },
  shippingCoupon: {
    href: "/boonbuy-shipping-coupon",
    label: "BoonBuy Shipping Coupon",
  },
  brandHub: {
    href: "/boonbuy",
    label: "BoonBuy",
  },
  review: {
    href: "/boonbuy-review",
    label: "BoonBuy Review",
  },
  questions: {
    href: "/boonbuy-questions",
    label: "BoonBuy Questions",
  },
  findsHub: {
    href: "/boonbuy-finds",
    label: "BoonBuy Finds",
  },
  browseFinds: {
    href: "/finds",
    label: "Browse Finds",
  },
  latestFinds: {
    href: "/latest-finds",
    label: "Latest Finds",
  },
  repFinds: {
    href: "/rep-finds",
    label: "Rep Finds",
  },
  spreadsheet: {
    href: "/boonbuy-spreadsheet",
    label: "BoonBuy Spreadsheet",
    cta: "View BoonBuy Spreadsheet",
  },
  guides: {
    href: "/guides",
    label: "Guides",
  },
  qc: {
    href: "/boonbuy-qc",
    label: "BoonBuy QC",
  },
} as const;

export const HERO_LANDING_TITLE =
  "BoonBuy Finds – 10,000+ QC Photos, Spreadsheet Finds & Best Reps 2026";

export const HERO_LANDING_SUBTITLE = `Search QC photos, spreadsheet-style fashion and sneaker finds from Weidian and Taobao — open verified links through BoonBuy with a ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% shipping coupon.`;

export const HERO_LANDING_CTAS = [
  {
    href: BOONBUY_SEO_HUB.coupons.href,
    label: "BoonBuy Coupons",
    variant: "primary" as const,
    icon: "coupon" as const,
  },
  {
    href: BOONBUY_SEO_HUB.spreadsheet.href,
    label: "Spreadsheet",
    variant: "secondary" as const,
    icon: "spreadsheet" as const,
  },
] as const;

/** Primary authority links only — avoid doorway coupon variant spam. */
export const SEO_HUB_FOOTER_LINKS = [
  BOONBUY_SEO_HUB.home,
  BOONBUY_SEO_HUB.brandHub,
  BOONBUY_SEO_HUB.questions,
  BOONBUY_SEO_HUB.browseFinds,
  BOONBUY_SEO_HUB.findsHub,
  BOONBUY_SEO_HUB.latestFinds,
  BOONBUY_SEO_HUB.repFinds,
  BOONBUY_SEO_HUB.spreadsheet,
  BOONBUY_SEO_HUB.coupons,
  BOONBUY_SEO_HUB.shippingCoupon,
  BOONBUY_SEO_HUB.qc,
  BOONBUY_SEO_HUB.telegram,
  BOONBUY_SEO_HUB.review,
  BOONBUY_SEO_HUB.guides,
] as const;

export const HOMEPAGE_SEO_INDEX_BLURB = `BoonBuy Finds is a product discovery platform and searchable database for BoonBuy spreadsheet finds, QC photos, coupons, and community updates. Use it to browse verified BoonBuy checkout links, claim up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping, join Telegram for daily drops, and explore category finds hubs — without copying rows from a raw Google Sheet.`;
