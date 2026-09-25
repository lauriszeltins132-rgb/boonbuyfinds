import {
  BOONBUY_COUPON_URL,
  BOONBUY_INVITE_CODE,
  BOONBUY_OFFER_DESCRIPTION,
  BOONBUY_OFFER_HEADLINE,
  BOONBUY_SHIPPING_COUPON_CTA,
  BOONBUY_SHIPPING_DISCOUNT_PERCENT,
} from "@/lib/constants";
import { formatContentDate } from "@/lib/content-dates";
import { getDatasetSyncedIso } from "@/lib/catalog-meta";

export const BOONBUY_COUPONS_PATH = "/boonbuy-coupons";

export function getBoonBuyCouponsLastVerifiedIso(): string {
  return getDatasetSyncedIso();
}

export function getBoonBuyCouponsLastVerifiedLabel(): string {
  return formatContentDate(getBoonBuyCouponsLastVerifiedIso());
}

export const BOONBUY_COUPONS_META = {
  title: `Best BoonBuy Coupons & Shipping Discounts 2026 | BoonBuy Finds`,
  description: `Claim verified BoonBuy coupons and up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping with invite ${BOONBUY_INVITE_CODE}. Current offer, how to claim, FAQ, and shipping discount guidance — updated regularly on BoonBuy Finds.`,
  h1: "Best BoonBuy Coupons & Shipping Discounts",
  intro: `Looking for a working BoonBuy coupon? The verified offer on BoonBuy Finds is a new-user invite that can unlock up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping when the promotion is available — then shop QC finds with verified checkout links.`,
} as const;

export const BOONBUY_COUPONS_OFFER = {
  headline: BOONBUY_OFFER_HEADLINE,
  description: BOONBUY_OFFER_DESCRIPTION,
  discountPercent: BOONBUY_SHIPPING_DISCOUNT_PERCENT,
  inviteCode: BOONBUY_INVITE_CODE,
  couponUrl: BOONBUY_COUPON_URL,
  ctaLabel: BOONBUY_SHIPPING_COUPON_CTA,
  typeLabel: "Invite / registration shipping discount",
  eligibility: "Primarily for new BoonBuy accounts that register through the verified invite link",
  appliesTo: "International shipping / freight quotes on BoonBuy (not a blanket product markdown)",
} as const;

export type CouponOfferRow = {
  offer: string;
  benefit: string;
  status: "Active" | "Check live terms";
  notes: string;
};

export function getBoonBuyCouponOfferRows(): CouponOfferRow[] {
  const updated = getBoonBuyCouponsLastVerifiedLabel();
  return [
    {
      offer: "BoonBuy invite / registration offer",
      benefit: `Up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping for eligible new accounts`,
      status: "Active",
      notes: `Invite ${BOONBUY_INVITE_CODE} · Updated ${updated}`,
    },
    {
      offer: "BoonBuy shipping discount",
      benefit: "Freight savings when the invite promotion attaches to your account",
      status: "Active",
      notes: `Confirm on BoonBuy before you pay · Updated ${updated}`,
    },
    {
      offer: "BoonBuy Finds referral / invite code",
      benefit: "Attaches the verified signup path used across BoonBuy Finds",
      status: "Active",
      notes: `Code ${BOONBUY_INVITE_CODE}`,
    },
    {
      offer: "Free BoonBuy account",
      benefit: "Warehouse QC, order tracking, and verified product checkout",
      status: "Active",
      notes: "Account features — separate from the shipping promo percentage",
    },
  ];
}

export const BOONBUY_COUPON_CLAIM_STEPS = [
  {
    name: "Open the verified BoonBuy coupon link",
    text: "Use the claim button on this page (or the BoonBuy Finds invite URL). Prefer the full signup link over random codes from old screenshots.",
  },
  {
    name: "Create your BoonBuy account",
    text: "Register a new BoonBuy account through the invite URL so the referral attaches at signup.",
  },
  {
    name: "Confirm the invite benefit is attached",
    text: `If BoonBuy asks for an invite or referral code, use ${BOONBUY_INVITE_CODE}. Check account promotions or shipping terms after registration.`,
  },
  {
    name: "Browse finds on BoonBuy Finds",
    text: "Return to BoonBuy Finds to search brands, categories, QC references, and spreadsheet-style listings with verified BoonBuy buy links.",
  },
  {
    name: "Add items and request warehouse QC",
    text: "Order through BoonBuy, wait for warehouse photos when needed, then approve items before you consolidate a parcel.",
  },
  {
    name: "Confirm shipping discount at freight checkout",
    text: "Shipping promos usually apply when you submit a parcel — not as a product price slash. Review the live freight quote before you pay.",
  },
] as const;

export const BOONBUY_COUPON_BENEFITS = [
  {
    title: "Shipping savings",
    body: `Eligible new accounts can unlock up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping when the invite promotion is active.`,
  },
  {
    title: "Verified invite path",
    body: "BoonBuy Finds publishes one invite so you are not guessing expired influencer codes from old threads.",
  },
  {
    title: "Warehouse QC workflow",
    body: "A BoonBuy account unlocks warehouse QC photos for your orders — useful before you ship internationally.",
  },
  {
    title: "Order tracking",
    body: "Track purchases from seller to warehouse to your door inside the BoonBuy dashboard.",
  },
  {
    title: "Verified product links",
    body: "BoonBuy Finds buy buttons open BoonBuy product URLs with the invite attached when applicable.",
  },
] as const;

export const BOONBUY_COUPONS_RELATED_RESOURCES = [
  { href: "/boonbuy-finds", label: "BoonBuy Finds" },
  { href: "/boonbuy-spreadsheet", label: "BoonBuy Spreadsheet" },
  { href: "/boonbuy-qc", label: "BoonBuy QC" },
  { href: "/boonbuy-shipping", label: "BoonBuy Shipping" },
  { href: "/boonbuy-shipping-coupon", label: "BoonBuy Shipping Coupon" },
  { href: "/boonbuy-questions", label: "BoonBuy Questions" },
  { href: "/latest-finds", label: "Latest Finds" },
  { href: "/trending", label: "Trending Finds" },
  { href: "/best-finds", label: "Best Finds" },
  { href: "/boonbuy-telegram", label: "Telegram" },
] as const;

export const BOONBUY_COUPONS_FAQS: { question: string; answer: string }[] = [
  {
    question: "What are BoonBuy coupons?",
    answer: `On BoonBuy Finds, “BoonBuy coupons” usually means the verified invite/registration offer that can unlock up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping for eligible new accounts — plus free account features like QC and tracking. It is not a random product coupon vault.`,
  },
  {
    question: "What is the best BoonBuy coupon right now?",
    answer: `The best current offer we promote is the new-user shipping discount: up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping when you register through the BoonBuy Finds invite and the promotion is available.`,
  },
  {
    question: "Is there a working BoonBuy coupon code?",
    answer: `Use invite code ${BOONBUY_INVITE_CODE} with the verified signup link on this page. Prefer the full invite URL — pasted codes alone can fail if the signup path is wrong.`,
  },
  {
    question: "How do BoonBuy coupon codes work?",
    answer:
      "Most savings attach at registration via invite/referral, then show up when you pay shipping for a consolidated parcel. Confirm the live quote on BoonBuy before funding freight.",
  },
  {
    question: "How do I claim the BoonBuy shipping discount?",
    answer: `Click the claim button, create a new BoonBuy account through the invite, then check shipping promotions when you submit a parcel. See also /boonbuy-shipping-coupon for shipping-focused guidance.`,
  },
  {
    question: "Is there a BoonBuy referral code?",
    answer: `Yes. The invite/referral code published with BoonBuy Finds is ${BOONBUY_INVITE_CODE}. Use it at signup through our verified registration link.`,
  },
  {
    question: "What is the difference between a BoonBuy coupon and invite code?",
    answer:
      "People search both phrases for the same intent. The invite/referral code attaches benefits at registration; “coupon” usually means that shipping discount path — not a separate storewide SKU markdown code.",
  },
  {
    question: "Does the BoonBuy coupon expire?",
    answer:
      "Promotions can change. We do not invent a fixed expiration date. Check this page and the live BoonBuy signup terms — BoonBuy Finds updates the offer when the verified promotion changes.",
  },
  {
    question: "Can existing users use the coupon?",
    answer:
      "The shipping invite is aimed at new accounts that register through the referral link. Existing accounts may not receive the same new-user shipping percentage — confirm inside your BoonBuy dashboard.",
  },
  {
    question: "Why is my BoonBuy coupon not showing?",
    answer:
      "Common causes: the offer changed, you already had an account, you signed up without the invite URL, regional restrictions, or the discount only appears later during shipping checkout rather than on product prices.",
  },
  {
    question: "How much can I save with a BoonBuy coupon?",
    answer: `The verified headline is up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping. “Up to” is not a guarantee on every parcel — final freight still depends on weight, volume, line, destination, and live promo rules.`,
  },
  {
    question: "Does BoonBuy offer shipping coupons?",
    answer: `Yes — that is the main savings type promoted here. For shipping-specific detail, use /boonbuy-shipping-coupon and /boonbuy-shipping.`,
  },
  {
    question: "Where do I enter a BoonBuy coupon code?",
    answer: `Enter invite code ${BOONBUY_INVITE_CODE} during registration if BoonBuy shows an invite/referral field. Shipping discounts are typically confirmed later on the freight quote, not as a product-price field on every listing.`,
  },
  {
    question: "Does the discount apply to product prices or shipping?",
    answer:
      "The BoonBuy Finds invite offer targets shipping/freight for eligible new users. Product prices still follow the seller listing on Weidian/Taobao via BoonBuy.",
  },
  {
    question: "How do I verify that the coupon was applied?",
    answer:
      "After signup, review account promotions and — most importantly — compare the shipping quote when you submit a parcel. If the discount is missing, re-check eligibility and live BoonBuy terms before you pay.",
  },
];
