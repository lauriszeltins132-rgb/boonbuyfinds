/**
 * Primary BoonBuy coupon authority content for /boonbuy-coupons.
 * Facts only — no invented codes, guarantees, or unsupported exclusivity claims.
 */

import {
  BOONBUY_COUPON_URL,
  BOONBUY_INVITE_CODE,
  BOONBUY_SHIPPING_COUPON_CTA,
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
  BOONBUY_SIGNUP_URL,
} from "@/lib/boonbuy-affiliate";
import {
  BOONBUY_OFFER_DESCRIPTION,
  BOONBUY_OFFER_HEADLINE,
} from "@/lib/constants";

export const BOONBUY_COUPONS_HUB = {
  path: "/boonbuy-coupons",
  title: `Best BoonBuy Coupons & Deals 2026 | Up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% Off Shipping`,
  metaDescription: `Best BoonBuy coupons and deals for 2026 — claim up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping with a verified invite, then learn how discount codes, referral options, and haul savings work.`,
  badge: "BoonBuy coupons",
  h1: "Best BoonBuy Coupons & Deals 2026",
  intro:
    "This is BoonBuy Finds’ coupon hub for shoppers searching BoonBuy coupon, BoonBuy coupons, promo codes, and shipping discounts. We explain what is available through BoonBuyFinds, how to claim it, and how to stack savings without chasing expired screenshots.",
  directAnswer: `Current offers available through BoonBuyFinds focus on new-user shipping discounts — up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping when your BoonBuy account is eligible. Claim via the verified invite path below, confirm terms inside BoonBuy, then browse finds before you pay freight.`,
  howUsersSave: [
    "Shipping coupons cut international freight — often the largest haul cost after items.",
    "Invite registration attaches account benefits; item listings still follow seller prices.",
    "Consolidation, line choice, and QC approval before shipping prevent wasted freight spend.",
  ],
  howToClaim: [
    "Open the claim button to register or sign in on BoonBuy through the verified invite.",
    "Confirm any shipping coupon or promo appears in your BoonBuy account.",
    "Browse finds on BoonBuy Finds, open a verified BoonBuy product link, and order.",
    "After warehouse QC, apply eligible shipping benefits when you pay freight.",
  ],
  offerHeadline: BOONBUY_OFFER_HEADLINE,
  offerDescription: BOONBUY_OFFER_DESCRIPTION,
  ctaLabel: BOONBUY_SHIPPING_COUPON_CTA,
  couponUrl: BOONBUY_COUPON_URL,
  signupUrl: BOONBUY_SIGNUP_URL,
  inviteCode: BOONBUY_INVITE_CODE,
  keywords: [
    "boonbuy coupon",
    "boonbuy coupons",
    "boonbuy coupon code",
    "boonbuy promo code",
    "boonbuy discount code",
    "boonbuy discount",
    "boonbuy shipping coupon",
    "boonbuy referral code",
    "boonbuy deals",
    "best boonbuy coupons 2026",
  ],
} as const;

export type CouponsHubSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  links?: { href: string; label: string }[];
  steps?: string[];
};

export const BOONBUY_COUPONS_HUB_SECTIONS: CouponsHubSection[] = [
  {
    id: "current-coupons",
    heading: "Current BoonBuy Coupons",
    paragraphs: [
      `Current offers available through BoonBuyFinds center on new-user shipping savings — up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping when BoonBuy marks your account eligible. Terms live on BoonBuy and can change; always confirm inside your account before paying freight.`,
      `The invite path used on this site registers with invite code ${BOONBUY_INVITE_CODE}. That is not a magic item-price markdown — it is the verified signup link BoonBuy Finds promotes for shipping benefits when eligible.`,
      "We do not invent expired influencer codes or claim every promo works forever. If a benefit does not appear after signup, check BoonBuy’s promotions tab or contact BoonBuy support.",
    ],
    links: [
      { href: BOONBUY_COUPON_URL, label: BOONBUY_SHIPPING_COUPON_CTA },
      { href: "/boonbuy-deals", label: "Latest BoonBuy deals" },
      { href: "/boonbuy-shipping-coupon", label: "Shipping coupon detail" },
    ],
  },
  {
    id: "how-to-use",
    heading: "How To Use A BoonBuy Coupon",
    paragraphs: [
      "Most BoonBuy savings attach at account registration or freight checkout — not on each Weidian or Taobao listing. Treat “coupon code” searches as invite + shipping promo workflows unless BoonBuy shows a specific promotions field.",
    ],
    steps: [
      "Claim the verified invite from this page (or the deals hub).",
      "Complete BoonBuy registration and open the promotions / coupons area in your account.",
      "Shop on BoonBuy Finds, then open the product’s BoonBuy checkout link.",
      "Request warehouse QC photos and approve or reject before international shipping.",
      "When you build a parcel, confirm any shipping discount is applied before you pay freight.",
    ],
    links: [
      { href: "/how-to-buy", label: "How to buy from BoonBuy" },
      { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
      { href: "/boonbuy", label: "What is BoonBuy?" },
    ],
  },
  {
    id: "where-to-find",
    heading: "Where To Find BoonBuy Discounts",
    paragraphs: [
      "Start here for current offers available through BoonBuyFinds. Use the deals page for partner promotion context, the discount-code guide for how codes differ from shipping coupons, and the referral page for invite-style savings language.",
      "Avoid random “working codes” lists on social media. Expired strings circulate for years. Prefer the live claim button on this site, then verify eligibility on BoonBuy.",
    ],
    links: [
      { href: "/boonbuy-deals", label: "BoonBuy deals" },
      { href: "/boonbuy-discount-code", label: "BoonBuy discount code guide" },
      { href: "/boonbuy-referral-code", label: "BoonBuy referral code" },
      { href: "/boonbuy-promo-code", label: "Promo code path" },
    ],
  },
  {
    id: "shipping-savings",
    heading: "BoonBuy Shipping Savings",
    paragraphs: [
      "International freight is paid after QC when you build a parcel. Cost depends on weight, volume, line, destination, and any active coupon. Catalog item prices on BoonBuy Finds exclude international freight.",
      `New-user shipping coupons (up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% when eligible) matter most on heavier or multi-item parcels. Pair coupons with consolidation — one well-built haul usually beats several single-item boxes.`,
    ],
    links: [
      { href: "/boonbuy-shipping", label: "BoonBuy shipping guide" },
      { href: "/boonbuy-shipping-coupon", label: "Shipping coupon page" },
      { href: "/how-to-save-on-shipping", label: "Save on shipping" },
    ],
  },
  {
    id: "referral",
    heading: "BoonBuy Referral Options",
    paragraphs: [
      `BoonBuy Finds promotes a verified invite (code ${BOONBUY_INVITE_CODE}) so new shoppers can register through a tracked signup URL. Referral and invite language usually mean the same workflow: register with the invite, then confirm any shipping benefit in-account.`,
      "We do not invent extra “secret” referral percentages beyond what BoonBuy shows after signup. If you already have an account, check BoonBuy’s current campaigns — returning-user promos are separate from new-user invites.",
    ],
    links: [
      { href: "/boonbuy-referral-code", label: "Referral code guide" },
      { href: "/boonbuy-invite", label: "BoonBuy invite" },
      { href: BOONBUY_SIGNUP_URL, label: "Register on BoonBuy" },
    ],
  },
  {
    id: "other-ways",
    heading: "Other Ways To Save On BoonBuy",
    paragraphs: [
      "Coupons are one lever. Discovery quality and haul planning often save more money than a single promo string.",
      "Use BoonBuy Finds to shortlist with photos and QC references, BoonBuy AI for budget-aware catalog search, and spreadsheet-style browsing instead of paying freight on impulse picks you later reject at QC.",
    ],
    links: [
      { href: "/finds", label: "Browse finds" },
      { href: "/ai", label: "BoonBuy AI" },
      { href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" },
      { href: "/best-boonbuy-finds", label: "Best BoonBuy finds" },
      { href: "/best-boonbuy-finds-under-50", label: "Finds under $50" },
      { href: "/boonbuy-qc", label: "QC photos" },
      { href: "/guides", label: "Guides" },
    ],
  },
];

export const BOONBUY_COUPONS_HUB_FAQS = [
  {
    question: "What is the best BoonBuy coupon right now?",
    answer: `Current offers available through BoonBuyFinds focus on new-user shipping discounts — up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping when eligible. Confirm the live terms in your BoonBuy account; we do not invent fixed “always working” codes.`,
  },
  {
    question: "Is there a BoonBuy coupon code I can type at checkout?",
    answer: `Many shoppers searching “BoonBuy coupon code” need the invite registration path (invite ${BOONBUY_INVITE_CODE}) plus any shipping promo that attaches to the account. Item listings rarely accept random discount strings. See the discount-code guide for how codes differ from shipping coupons.`,
  },
  {
    question: "Do BoonBuy coupons reduce product prices?",
    answer:
      "Usually no. Agent coupons and invites more often affect shipping or account promotions. Seller listing prices still apply — confirm the live BoonBuy total before paying.",
  },
  {
    question: "How do I claim a BoonBuy shipping coupon?",
    answer:
      "Use the claim button on this page, finish BoonBuy registration, verify the promo in-account, shop finds, review warehouse QC, then apply eligible shipping benefits when you pay freight.",
  },
  {
    question: "Are these coupons exclusive or guaranteed?",
    answer:
      "No. We only describe current offers available through BoonBuyFinds. Eligibility, percentage, and duration are set by BoonBuy and can change. We do not claim guarantees or exclusivity.",
  },
  {
    question: "Where else can I learn about BoonBuy savings?",
    answer:
      "Use the BoonBuy deals page for partner offers, the discount-code and referral guides for code-style searches, and the shipping guide for freight strategy. The BoonBuy authority hub ties coupons to QC, spreadsheet, and AI discovery.",
  },
] as const;

export const BOONBUY_COUPONS_TRUST = {
  howChecked: [
    "We promote the verified BoonBuy invite URL used across BoonBuy Finds — not scraped comment-section codes.",
    "Offer copy is tied to the live signup path and catalog sync timestamps on this page.",
    "When BoonBuy changes eligibility or percentages, we update hub wording to match what we currently promote.",
    "We reject unsupported claims like “100% working,” “guaranteed,” or “exclusive” unless BoonBuy documents them.",
  ],
  editorialNote:
    "Reviewed by the BoonBuy Finds Team against the current invite path and shipping-offer messaging. Coupons and eligibility are controlled by BoonBuy — always verify inside your account before paying freight.",
  updateHistory: [
    {
      label: "2026 coupon hub expansion",
      detail:
        "Expanded /boonbuy-coupons into a full savings guide with claim steps, shipping/referral sections, FAQ schema, and links to deals + discount-code cluster pages.",
    },
    {
      label: "Partner deals page",
      detail:
        "Added /boonbuy-deals for current offers available through BoonBuyFinds without inventing unsupported promotions.",
    },
    {
      label: "Synonym consolidation",
      detail:
        "Hard-redirected thin coupon synonym URLs onto this hub while keeping unique discount-code guidance on its own URL.",
    },
  ],
} as const;

export const BOONBUY_COUPONS_RESOURCE_LINKS = [
  { href: "/boonbuy", label: "What is BoonBuy?" },
  { href: "/boonbuy-deals", label: "Latest BoonBuy deals" },
  { href: "/boonbuy-discount-code", label: "Discount code guide" },
  { href: "/boonbuy-shipping-coupon", label: "Shipping coupon" },
  { href: "/boonbuy-referral-code", label: "Referral code" },
  { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
  { href: "/boonbuy-qc", label: "QC photos" },
  { href: "/ai", label: "BoonBuy AI" },
  { href: "/best-boonbuy-finds", label: "Best finds" },
  { href: "/editorial-policy", label: "Editorial policy" },
] as const;
