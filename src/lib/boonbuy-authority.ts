/**
 * Central BoonBuy entity / authority hub content for /boonbuy.
 * BoonBuy-specific only — no invented fees, ETAs, ratings, or guarantees.
 */

import {
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
  BOONBUY_SIGNUP_URL,
} from "@/lib/constants";

export const BOONBUY_AUTHORITY = {
  path: "/boonbuy",
  title: "What Is BoonBuy? Agent, Finds, Spreadsheet & Coupons",
  metaDescription:
    "What is BoonBuy — Chinese shopping agent for Weidian and Taobao. How it works with BoonBuy Finds for spreadsheet finds, QC photos, coupons, shipping, and AI.",
  badge: "BoonBuy authority",
  h1: "What Is BoonBuy?",
  intro:
    "BoonBuy Finds is a dedicated discovery platform for BoonBuy shoppers. This hub explains the agent, then links every major tool on this site — finds, spreadsheet, QC, coupons, shipping, warehouse, and AI.",
  directAnswer:
    "BoonBuy is a Chinese shopping agent — not a retail store. It buys from Weidian, Taobao, and 1688 on your behalf, stores items in a warehouse for QC photos, and ships internationally. BoonBuy Finds (boonbuyfinds.net) is an independent catalog that helps you discover products, coupons, and guides before checkout on BoonBuy.",
  keyFacts: [
    "BoonBuy buys marketplace items for you; it does not manufacture or stock its own retail inventory.",
    "Typical flow: find a link → pay on BoonBuy → warehouse QC → international parcel.",
    "BoonBuy Finds is independent from the BoonBuy company — discovery here, checkout on BoonBuy.",
    `Current offers available through BoonBuyFinds include new-user shipping coupons (up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off when eligible).`,
    "We do not invent fixed shipping prices, delivery days, or quality guarantees.",
  ],
  partnershipNote:
    "BoonBuy Finds works with BoonBuy to help shoppers discover verified product links, coupons, QC context, and guides. We remain an independent catalog — we do not process payments on this site.",
} as const;

export type AuthoritySection = {
  id: string;
  heading: string;
  paragraphs: string[];
  links: { href: string; label: string }[];
};

export const BOONBUY_AUTHORITY_SECTIONS: AuthoritySection[] = [
  {
    id: "what-is-boonbuy",
    heading: "What is BoonBuy?",
    paragraphs: [
      "BoonBuy is a shopping agent for Chinese marketplaces. International buyers often cannot check out directly on Weidian or Taobao. BoonBuy purchases the listing locally, holds it at a warehouse, and ships it to your country after you approve QC.",
      "It is not the same as a brand store. Every item comes from a third-party seller link you open or paste. Listing prices on discovery sites can differ from the live BoonBuy total once fees and freight are added.",
    ],
    links: [
      { href: "/what-is-boonbuy-finds", label: "What is BoonBuy Finds?" },
      { href: "/is-boonbuy-legit", label: "Is BoonBuy legit?" },
      { href: "/boonbuy-review", label: "BoonBuy review" },
      { href: BOONBUY_SIGNUP_URL, label: "Register on BoonBuy" },
    ],
  },
  {
    id: "how-boonbuy-works",
    heading: "How BoonBuy works",
    paragraphs: [
      "The loop is consistent: open a product link, confirm size and variant, pay, wait for warehouse arrival, review QC photos, then build a parcel and pay freight. Domestic seller shipping to the warehouse is the first wait; international shipping is a separate step.",
      "BoonBuy Finds shortens discovery — browse photos and categories here, then continue on BoonBuy for payment and shipping.",
    ],
    links: [
      { href: "/guides/how-boonbuy-works", label: "How BoonBuy works (guide)" },
      { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
      { href: "/how-to-buy", label: "How to buy from BoonBuy" },
    ],
  },
  {
    id: "find-products",
    heading: "How to find products on BoonBuy",
    paragraphs: [
      "Start on the finds browse hub or branded BoonBuy finds catalog. Filter by category and brand, open latest or trending rails, then open a product page. When ready, use the verified BoonBuy checkout link.",
      "For budget hunting or natural-language search, use BoonBuy AI against the live catalog — it will not invent products that are not indexed here.",
    ],
    links: [
      { href: "/finds", label: "Browse finds" },
      { href: "/boonbuy-finds", label: "BoonBuy finds" },
      { href: "/latest-finds", label: "Latest finds" },
      { href: "/ai", label: "BoonBuy AI" },
      { href: "/categories", label: "Categories" },
      { href: "/brands", label: "Brands" },
    ],
  },
  {
    id: "spreadsheet",
    heading: "BoonBuy Spreadsheet",
    paragraphs: [
      "People search “BoonBuy spreadsheet” for community product lists — links, prices, and QC notes in a sheet. BoonBuy Finds is the searchable catalog alternative: product pages, filters, photos, and verified outbound BoonBuy links instead of raw rows.",
      "Keep a personal sheet for notes if you want. Use this site for daily discovery and shareable product URLs.",
    ],
    links: [
      { href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet hub" },
      { href: "/best-boonbuy-spreadsheet", label: "Best BoonBuy spreadsheet" },
    ],
  },
  {
    id: "qc",
    heading: "BoonBuy QC Photos",
    paragraphs: [
      "QC means quality-check photos. Reference QC on find pages helps you shortlist. Warehouse QC on BoonBuy is the inspection window for your actual order — review carefully before international shipping.",
      "QC photos are not a guarantee of authenticity or perfection. They are a visual check so you can approve, exchange, or reject before freight.",
    ],
    links: [
      { href: "/boonbuy-qc", label: "BoonBuy QC hub" },
      { href: "/top-qc-finds", label: "Top QC finds" },
      { href: "/guides/how-to-check-qc-photos", label: "How to check QC photos" },
    ],
  },
  {
    id: "coupons",
    heading: "BoonBuy Coupons",
    paragraphs: [
      `Current offers available through BoonBuyFinds focus on new-user shipping discounts — up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping when your account is eligible. Terms live on BoonBuy; confirm at registration and before you pay freight.`,
      "Coupon pages on this site point to the verified invite path. We do not invent expired codes or unsupported free-shipping guarantees.",
    ],
    links: [
      { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
      { href: "/boonbuy-deals", label: "BoonBuy deals" },
      { href: "/boonbuy-shipping-coupon", label: "Shipping coupon" },
      { href: "/best-boonbuy-coupon", label: "Best BoonBuy coupon" },
    ],
  },
  {
    id: "shipping",
    heading: "BoonBuy Shipping",
    paragraphs: [
      "International freight is paid after QC approval when you build a parcel. Cost depends on weight, volume, line, destination, and any active coupon. There is no single public price that fits every haul.",
      "Quote inside your BoonBuy account before shipping. Catalog item prices on BoonBuy Finds exclude international freight.",
    ],
    links: [
      { href: "/boonbuy-shipping", label: "BoonBuy shipping guide" },
      { href: "/how-to-save-on-shipping", label: "Save on shipping" },
    ],
  },
  {
    id: "warehouse",
    heading: "BoonBuy Warehouse",
    paragraphs: [
      "After purchase, items arrive at the BoonBuy warehouse for storage and photos. You can consolidate multiple items into one outbound parcel. Return and exchange options — when available — usually apply before international shipping, not after.",
    ],
    links: [
      { href: "/boonbuy-warehouse", label: "Warehouse guide" },
      { href: "/boonbuy-returns", label: "Returns guide" },
      { href: "/boonbuy-payment", label: "Payment guide" },
    ],
  },
  {
    id: "ai",
    heading: "BoonBuy AI",
    paragraphs: [
      "BoonBuy AI searches the live BoonBuy Finds catalog with natural language. Ask for brands, budgets, or outfit ideas. It is grounded in indexed products — it should not invent listings, prices, or stock.",
    ],
    links: [
      { href: "/ai", label: "Open BoonBuy AI" },
      { href: "/trending", label: "Trending finds" },
    ],
  },
  {
    id: "best-finds",
    heading: "Best BoonBuy Finds",
    paragraphs: [
      "Best and trending hubs surface editor and engagement shortlists from the real catalog — sneakers, streetwear, budget picks, and QC-linked items. Always confirm live price and variants on BoonBuy before paying.",
    ],
    links: [
      { href: "/best-boonbuy-finds", label: "Best BoonBuy finds" },
      { href: "/trending-boonbuy-finds", label: "Trending BoonBuy finds" },
      { href: "/best-boonbuy-finds-under-50", label: "Finds under $50" },
      { href: "/best-boonbuy-under-20", label: "Finds under $20" },
      { href: "/rep-finds", label: "Rep finds" },
    ],
  },
];

export const BOONBUY_AUTHORITY_FAQS = [
  {
    question: "Is BoonBuy Finds the same company as BoonBuy?",
    answer:
      "No. BoonBuy Finds is an independent discovery catalog. BoonBuy is the shopping agent where you pay, request warehouse QC, and ship. We link out to verified BoonBuy product URLs.",
  },
  {
    question: "Is BoonBuy a shopping agent?",
    answer:
      "Yes. BoonBuy buys from Chinese marketplaces on your behalf, warehouses items for QC, and ships internationally. It is not a store with its own inventory.",
  },
  {
    question: "How do I start with BoonBuy?",
    answer:
      "Read this hub, claim a coupon if eligible, browse finds or the spreadsheet hub, place a small test order, review warehouse QC, then ship. Exact screens can change on BoonBuy — use the live dashboard for payments and freight quotes.",
  },
  {
    question: "Where do I find BoonBuy coupons?",
    answer: `Use the BoonBuy coupons and deals pages on this site for current offers available through BoonBuyFinds, including new-user shipping discounts up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% when eligible.`,
  },
  {
    question: "Does BoonBuy Finds guarantee product quality?",
    answer:
      "No. We help you discover and inspect with reference QC. Warehouse QC on BoonBuy is your order inspection. Seller batches vary; we do not guarantee authenticity or customs clearance.",
  },
] as const;

export const BOONBUY_AUTHORITY_RESOURCE_LINKS = [
  { href: "/boonbuy-questions", label: "All BoonBuy questions" },
  { href: "/boonbuy-coupons", label: "Coupons" },
  { href: "/boonbuy-deals", label: "Deals" },
  { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
  { href: "/boonbuy-qc", label: "QC photos" },
  { href: "/boonbuy-shipping", label: "Shipping" },
  { href: "/ai", label: "BoonBuy AI" },
  { href: "/finds", label: "Browse finds" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/editorial-policy", label: "Editorial policy" },
] as const;
