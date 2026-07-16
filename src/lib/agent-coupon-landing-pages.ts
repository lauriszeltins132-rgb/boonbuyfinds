import {
  BOONBUY_COUPON_URL,
  BOONBUY_SHIPPING_COUPON_CTA,
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
} from "./boonbuy-affiliate";
import {
  SEO_AGENTS,
  type SeoAgentDefinition,
  buildCouponFooterLinks,
} from "./agent-seo-shared";
import {
  BOONBUY_OFFER_DESCRIPTION,
  BOONBUY_OFFER_HEADLINE,
} from "./constants";

export type AgentCouponLandingConfig = {
  slug: string;
  path: string;
  agent: SeoAgentDefinition;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keywordLine: string;
  ctaLabel: string;
  couponUrl: string;
  offerHeadline: string;
  offerDescription: string;
  keywords: string[];
  footerLinks: { href: string; label: string }[];
  relatedDeals: { href: string; label: string }[];
};

type CouponPageVariant = {
  slug: string;
  titleSuffix: string;
  metaDescription: string;
  intro: string;
  keywordLine: string;
};

const EXTRA_BOONBUY_VARIANTS: CouponPageVariant[] = [
  {
    slug: "boonbuy-coupon",
    titleSuffix: `BoonBuy Coupon 2026 | ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Off Shipping`,
    metaDescription: `Claim the BoonBuy coupon for up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping in 2026. Verified invite link, promo code savings, and haul discounts.`,
    intro: `Looking for a BoonBuy coupon? Register with our invite link to unlock up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping — one of the highest new-user shipping discounts BoonBuy offers.`,
    keywordLine:
      "Searching for a BoonBuy coupon, BoonBuy coupon code, or BoonBuy shipping coupon? Claim the verified offer below.",
  },
  {
    slug: "best-boonbuy-coupon",
    titleSuffix: `Best BoonBuy Coupon 2026 | ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Shipping Off`,
    metaDescription: `Best BoonBuy coupon for 2026 — up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping with a verified invite. Claim savings before your next haul.`,
    intro: `The best BoonBuy coupon right now is the new-user shipping discount: up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping when you register through our invite link.`,
    keywordLine:
      "Want the best BoonBuy coupon, best BoonBuy promo code, or best BoonBuy shipping deal? Start with the offer below.",
  },
  {
    slug: "boonbuy-shipping-coupon",
    titleSuffix: `BoonBuy Shipping Coupon | ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Off Freight`,
    metaDescription: `BoonBuy shipping coupon for up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off international freight. Verified signup link for new BoonBuy accounts in 2026.`,
    intro: `BoonBuy shipping is often the biggest haul cost. Claim our BoonBuy shipping coupon for up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping on eligible new accounts.`,
    keywordLine:
      "Looking for a BoonBuy shipping coupon, BoonBuy freight discount, or BoonBuy shipping promo? Claim it below.",
  },
  {
    slug: "boonbuy-discount",
    titleSuffix: `BoonBuy Discount 2026 | ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Coupons & Savings`,
    metaDescription: `Claim a verified BoonBuy discount for up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping in 2026. Latest coupons, promo codes, and voucher deals.`,
    intro: `Unlock BoonBuy discount savings on verified finds, QC-approved products, and spreadsheet links — including up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping.`,
    keywordLine:
      "Looking for a BoonBuy discount, BoonBuy savings, or BoonBuy voucher codes? Claim the verified offer below.",
  },
  {
    slug: "boonbuy-promo",
    titleSuffix: `BoonBuy Promo 2026 | Coupon Codes & ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Off Shipping`,
    metaDescription: `Get the latest BoonBuy promo codes and up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping for 2026. Click below to claim verified savings instantly.`,
    intro: `Redeem the latest BoonBuy promo on verified finds and spreadsheet products, including the ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% shipping coupon for new users.`,
    keywordLine:
      "Searching for a BoonBuy promo, BoonBuy promo code, or daily BoonBuy coupon? Claim the verified offer below.",
  },
];

function buildVariants(agent: SeoAgentDefinition): CouponPageVariant[] {
  return [
    {
      slug: `${agent.slug}-coupons`,
      titleSuffix: `${agent.name} Coupons 2026 | Best Promo & Discount Codes`,
      metaDescription: `Get the latest verified ${agent.name} coupons, promo codes, and discounts for 2026. Click below to claim your savings instantly.`,
      intro: `Save money on verified ${agent.name} finds and spreadsheet products using the latest ${agent.name} coupons. Click below to claim your discount.`,
      keywordLine: `Looking for ${agent.name} coupons, ${agent.name} coupon codes, or ${agent.name} savings? Start here.`,
    },
    {
      slug: `best-${agent.slug}-coupons`,
      titleSuffix: `Best ${agent.name} Coupons 2026 | Verified Promo & Discount Codes`,
      metaDescription: `Find the best ${agent.name} coupons and verified promo codes for 2026. Claim discounts and savings on your next haul.`,
      intro: `Compare the best ${agent.name} coupons for verified finds, QC photos, and spreadsheet picks. Click below to claim the top ${agent.name} discount today.`,
      keywordLine: `Searching for best ${agent.name} coupons, best ${agent.name} promo codes, or the best ${agent.name} deals in 2026? This page has you covered.`,
    },
    {
      slug: `${agent.slug}-coupons-2026`,
      titleSuffix: `${agent.name} Coupons 2026 | Latest Promo Codes & Discounts`,
      metaDescription: `Get ${agent.name} coupons 2026 with verified promo codes, discounts, and voucher savings. Claim your offer in one click.`,
      intro: `Use the latest ${agent.name} coupons 2026 on verified finds and spreadsheet products. Click below to claim your 2026 ${agent.name} discount.`,
      keywordLine: `Need ${agent.name} coupons 2026, a current ${agent.name} voucher, or fresh ${agent.name} promo codes? Claim the latest offer below.`,
    },
    ...(agent.slug === "boonbuy" ? EXTRA_BOONBUY_VARIANTS : []),
  ];
}

function buildKeywords(agent: SeoAgentDefinition): string[] {
  const agentLower = agent.name.toLowerCase();

  return [
    `${agentLower} coupons`,
    `best ${agentLower} coupons`,
    `${agentLower} coupons 2026`,
    `${agentLower} discount`,
    `${agentLower} promo`,
    `${agentLower} voucher`,
    `${agentLower} coupon code`,
    `${agentLower} savings`,
    `${agentLower} deals`,
  ];
}

function buildPageConfig(
  agent: SeoAgentDefinition,
  variant: CouponPageVariant,
  siblingVariants: CouponPageVariant[]
): AgentCouponLandingConfig {
  const path = `/${variant.slug}`;

  return {
    slug: variant.slug,
    path,
    agent,
    title: variant.titleSuffix,
    metaDescription: variant.metaDescription,
    h1: `${agent.name} Coupons & Promo Codes`,
    intro: variant.intro,
    keywordLine: variant.keywordLine,
    ctaLabel: `Claim ${agent.name} Coupon ✅`,
    couponUrl:
      agent.slug === "boonbuy" ? BOONBUY_COUPON_URL : agent.signupUrl,
    offerHeadline: agent.offerHeadline,
    offerDescription: agent.offerDescription,
    keywords: buildKeywords(agent),
    footerLinks: buildCouponFooterLinks(
      agent,
      path,
      siblingVariants.map((entry) => ({
        href: `/${entry.slug}`,
        label: entry.titleSuffix.split(" | ")[0],
      }))
    ),
    relatedDeals: [
      { href: "/deals", label: "Deals under $30" },
      { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
      { href: "/boonbuy-shipping-coupon", label: "BoonBuy shipping coupon" },
      { href: "/best-boonbuy-spreadsheet", label: "Best BoonBuy spreadsheet" },
      { href: "/recently-added", label: "Recently added finds" },
      { href: agent.findsPath, label: `${agent.name} finds catalog` },
      { href: `/telegram-${agent.slug}`, label: `${agent.name} Telegram` },
      { href: `/discord-${agent.slug}`, label: `${agent.name} Discord` },
    ],
  };
}

const ALL_VARIANTS = SEO_AGENTS.flatMap((agent) => {
  const variants = buildVariants(agent);
  return variants.map((variant) =>
    buildPageConfig(agent, variant, variants)
  );
});

export const AGENT_COUPON_LANDING_PAGES: Record<string, AgentCouponLandingConfig> =
  Object.fromEntries(ALL_VARIANTS.map((page) => [page.slug, page]));

export const AGENT_COUPON_LANDING_SLUGS = ALL_VARIANTS.map((page) => page.slug);

export function getAgentCouponLandingPage(
  slug: string
): AgentCouponLandingConfig | undefined {
  return AGENT_COUPON_LANDING_PAGES[slug];
}

const BOONBUY_COUPON_SEO_OVERRIDES: Record<
  string,
  Partial<AgentCouponLandingConfig>
> = {
  "boonbuy-coupons": {
    title: `BoonBuy Coupons | ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Off Shipping Coupon`,
    metaDescription: `Claim BoonBuy coupons for up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping. Verified BoonBuy Finds coupon pages with invite signup links for 2026.`,
    h1: "BoonBuy Coupons",
    intro: `Get BoonBuy coupons that matter — up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping when you register with our invite. Then browse spreadsheet finds, QC photos, and verified checkout links on BoonBuy Finds.`,
    ctaLabel: BOONBUY_SHIPPING_COUPON_CTA,
    offerHeadline: BOONBUY_OFFER_HEADLINE,
    offerDescription: BOONBUY_OFFER_DESCRIPTION,
    keywords: [
      "boonbuy coupons",
      "boonbuy coupon",
      "boonbuy shipping coupon",
      "boonbuy coupons 2026",
      "best boonbuy coupons",
      `${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping boonbuy`,
    ],
  },
  "best-boonbuy-coupons": {
    title: `Best BoonBuy Coupons | ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Shipping Discount Codes`,
    metaDescription: `Best BoonBuy coupons for 2026 — up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping with a verified invite. Claim before your next haul.`,
    h1: "Best BoonBuy Coupons",
    intro: `The best BoonBuy coupons focus on shipping. New accounts can unlock up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping through our invite — then use BoonBuy Finds to shop QC-backed spreadsheet finds.`,
    ctaLabel: BOONBUY_SHIPPING_COUPON_CTA,
    offerHeadline: BOONBUY_OFFER_HEADLINE,
    offerDescription: BOONBUY_OFFER_DESCRIPTION,
  },
  "boonbuy-coupons-2026": {
    title: `BoonBuy Coupons 2026 | Claim ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Shipping Discount`,
    metaDescription: `BoonBuy coupons 2026 with up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping. Official BoonBuy Finds coupon pages and verified signup links.`,
    h1: "BoonBuy Coupons 2026",
    intro: `Updated for 2026: claim BoonBuy coupons including up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping, then shop verified Weidian and Taobao finds on BoonBuy Finds.`,
    ctaLabel: BOONBUY_SHIPPING_COUPON_CTA,
    offerHeadline: BOONBUY_OFFER_HEADLINE,
    offerDescription: BOONBUY_OFFER_DESCRIPTION,
  },
  "boonbuy-coupon": {
    h1: "BoonBuy Coupon",
    ctaLabel: BOONBUY_SHIPPING_COUPON_CTA,
    offerHeadline: BOONBUY_OFFER_HEADLINE,
    offerDescription: BOONBUY_OFFER_DESCRIPTION,
  },
  "best-boonbuy-coupon": {
    h1: "Best BoonBuy Coupon",
    ctaLabel: BOONBUY_SHIPPING_COUPON_CTA,
    offerHeadline: BOONBUY_OFFER_HEADLINE,
    offerDescription: BOONBUY_OFFER_DESCRIPTION,
  },
  "boonbuy-shipping-coupon": {
    h1: "BoonBuy Shipping Coupon",
    ctaLabel: BOONBUY_SHIPPING_COUPON_CTA,
    offerHeadline: BOONBUY_OFFER_HEADLINE,
    offerDescription: BOONBUY_OFFER_DESCRIPTION,
  },
};

for (const [slug, override] of Object.entries(BOONBUY_COUPON_SEO_OVERRIDES)) {
  if (!AGENT_COUPON_LANDING_PAGES[slug]) continue;
  AGENT_COUPON_LANDING_PAGES[slug] = {
    ...AGENT_COUPON_LANDING_PAGES[slug],
    ...override,
  };
}
