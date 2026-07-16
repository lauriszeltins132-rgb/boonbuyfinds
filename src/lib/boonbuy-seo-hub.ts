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
    href: "/telegram-boonbuy",
    label: "BoonBuy Telegram",
    externalUrl: SOCIAL_LINKS.telegram,
    cta: "Join BoonBuy Telegram ✅",
  },
  discord: {
    href: "/discord-boonbuy",
    label: "BoonBuy Discord",
    externalUrl: SOCIAL_LINKS.discord,
    cta: "Join BoonBuy Discord ✅",
  },
  coupons: {
    href: "/boonbuy-coupons",
    label: "BoonBuy Coupons",
    externalUrl: BOONBUY_COUPON_URL,
    cta: BOONBUY_SHIPPING_COUPON_CTA,
  },
  couponsBest: {
    href: "/best-boonbuy-coupons",
    label: "Best BoonBuy Coupons",
  },
  coupons2026: {
    href: "/boonbuy-coupons-2026",
    label: "BoonBuy Coupons 2026",
  },
  couponSingular: {
    href: "/boonbuy-coupon",
    label: "BoonBuy Coupon",
  },
  couponsBestSingular: {
    href: "/best-boonbuy-coupon",
    label: "Best BoonBuy Coupon",
  },
  shippingCoupon: {
    href: "/boonbuy-shipping-coupon",
    label: "BoonBuy Shipping Coupon",
  },
  spreadsheet: {
    href: "/boonbuy-spreadsheet",
    label: "BoonBuy Spreadsheet",
    cta: "View BoonBuy Spreadsheet",
  },
  spreadsheetBest: {
    href: "/best-boonbuy-spreadsheet",
    label: "Best BoonBuy Spreadsheet",
  },
} as const;

export const HERO_LANDING_TITLE =
  "BoonBuy Finds – 10,000+ QC Photos, Spreadsheet Finds & Best Reps 2026";

export const HERO_LANDING_SUBTITLE = `Search QC photos, spreadsheet-style fashion and sneaker finds from Weidian and Taobao — open verified links through BoonBuy with a ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% shipping coupon.`;

export const HERO_LANDING_CTAS = [
  {
    href: BOONBUY_SEO_HUB.coupons.href,
    label: BOONBUY_SEO_HUB.coupons.cta,
    variant: "primary" as const,
  },
  {
    href: BOONBUY_SEO_HUB.telegram.href,
    label: BOONBUY_SEO_HUB.telegram.cta,
    variant: "secondary" as const,
  },
  {
    href: BOONBUY_SEO_HUB.discord.href,
    label: BOONBUY_SEO_HUB.discord.cta,
    variant: "secondary" as const,
  },
  {
    href: BOONBUY_SEO_HUB.spreadsheet.href,
    label: BOONBUY_SEO_HUB.spreadsheet.cta,
    variant: "ghost" as const,
  },
] as const;

export const SEO_HUB_FOOTER_LINKS = [
  BOONBUY_SEO_HUB.home,
  BOONBUY_SEO_HUB.telegram,
  BOONBUY_SEO_HUB.discord,
  BOONBUY_SEO_HUB.coupons,
  BOONBUY_SEO_HUB.couponSingular,
  BOONBUY_SEO_HUB.couponsBest,
  BOONBUY_SEO_HUB.couponsBestSingular,
  BOONBUY_SEO_HUB.coupons2026,
  BOONBUY_SEO_HUB.shippingCoupon,
  BOONBUY_SEO_HUB.spreadsheet,
  BOONBUY_SEO_HUB.spreadsheetBest,
] as const;

export const HOMEPAGE_SEO_INDEX_BLURB = `BoonBuy Finds is the searchable catalog for BoonBuy spreadsheet finds, QC photos, and verified checkout links. Claim up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off BoonBuy shipping with our invite coupon, join the BoonBuy Telegram and BoonBuy Discord for daily drops, and browse the BoonBuy spreadsheet alternative with filters, brands, and shareable product pages — updated for 2026.`;
