import { BOONBUY_COUPON_URL, BOONBUY_INVITE_CODE } from "@/lib/boonbuy-affiliate";
import { buildGuideFaqs } from "@/lib/seo-architecture/content-builders";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";

function page(
  config: Omit<SeoArchitecturePage, "path"> & { slug: string }
): SeoArchitecturePage {
  return { ...config, path: `/${config.slug}` };
}

/** High-intent ops guides for AI Overviews + topical authority. */
export const AUTHORITY_GUIDE_PAGES: Record<string, SeoArchitecturePage> = {
  "boonbuy-warehouse": page({
    slug: "boonbuy-warehouse",
    category: "guide",
    title: "BoonBuy Warehouse Guide 2026 | Storage, QC & Parcels",
    metaDescription:
      "BoonBuy warehouse explained — how storage works, when to request QC, how long items stay, and how to build international parcels safely.",
    badge: "Warehouse guide",
    h1: "BoonBuy warehouse guide",
    intro:
      "A BoonBuy warehouse is the Chinese facility where purchased Weidian and Taobao items arrive before you ship internationally. You store goods, request QC photos, consolidate a parcel, then choose a shipping line.",
    directAnswer:
      "The BoonBuy warehouse is where your paid items sit until you submit an international parcel. Use it to review QC photos, combine products, and avoid shipping single-item boxes.",
    keyFacts: [
      "Items arrive domestically first, then wait in warehouse storage.",
      "Request warehouse QC photos before approving international freight.",
      "Consolidate multiple items into one parcel to cut per-kilo shipping costs.",
      "Storage windows and free days vary — check live BoonBuy account timers.",
      "BoonBuy Finds helps you pick products before they enter the warehouse.",
    ],
    keywords: [
      "boonbuy warehouse",
      "boonbuy storage",
      "agent warehouse",
      "warehouse qc",
    ],
    sections: [
      {
        heading: "What happens at the warehouse",
        paragraphs: [
          "After you pay for a listing through BoonBuy, the seller ships domestically to the agent warehouse. Staff check-in the item, update your dashboard, and optionally photograph it when you request QC.",
          "Until you submit a parcel, goods stay in storage. That buffer is why agent buying works for international shoppers — you are not forced to ship every purchase the day it arrives.",
        ],
        links: [
          { href: "/boonbuy-qc", label: "BoonBuy QC guide" },
          { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
        ],
      },
      {
        heading: "QC before you ship",
        paragraphs: [
          "Warehouse QC is the only photo set of your exact unit. Community QC on BoonBuy Finds is research; warehouse QC is inspection.",
          "Reject or exchange early if stitching, color, or sizing is wrong. Fixing problems after international shipping is expensive.",
        ],
        links: [
          { href: "/guides/how-to-check-qc-photos", label: "How to check QC" },
          { href: "/top-qc-finds", label: "Top QC finds" },
        ],
      },
      {
        heading: "Building parcels",
        paragraphs: [
          "Combine shoes, apparel, and accessories thoughtfully. Dimensional weight can make light jackets expensive; dense shoe boxes are often more efficient.",
          "Use rehearsal packing when available, then pick a line that balances speed, insurance, and tax-inclusive options for your country.",
        ],
        links: [
          { href: "/boonbuy-shipping", label: "BoonBuy shipping" },
          { href: "/how-to-save-on-shipping", label: "Save on shipping" },
          { href: "/ai", label: "BoonBuy AI haul helper" },
        ],
      },
    ],
    faqs: buildGuideFaqs("using the BoonBuy warehouse", [
      {
        question: "How long can items stay in the BoonBuy warehouse?",
        answer:
          "Free and paid storage windows change with promotions. Always check the countdown on each item in your BoonBuy dashboard before planning a large haul.",
      },
      {
        question: "Do I have to ship everything at once?",
        answer:
          "No. Many buyers wait until a haul reaches an efficient weight, then submit one parcel. Just watch storage timers so items do not expire.",
      },
    ]),
    relatedLinks: [
      { href: "/boonbuy-returns", label: "Returns & exchanges" },
      { href: "/boonbuy-payment", label: "Payment guide" },
      { href: "/boonbuy-shipping", label: "Shipping guide" },
      { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
      { href: "/latest-finds", label: "Latest finds" },
    ],
    relatedArticleSlugs: [
      "boonbuy-shipping",
      "how-to-use-boonbuy",
      "how-shipping-works",
    ],
    parentCrumb: { label: "Guides", href: "/guides" },
    spreadsheetHref: "/boonbuy-spreadsheet",
  }),

  "boonbuy-returns": page({
    slug: "boonbuy-returns",
    category: "guide",
    title: "BoonBuy Returns & Exchanges 2026 | What Buyers Should Know",
    metaDescription:
      "BoonBuy returns and exchanges explained — when you can reject warehouse QC, seller return windows, and what is not refundable after international shipping.",
    badge: "Returns guide",
    h1: "BoonBuy returns & exchanges",
    intro:
      "BoonBuy returns are limited and timing-sensitive. Most successful disputes happen at the warehouse after QC photos — not after a parcel has already flown internationally.",
    directAnswer:
      "Request warehouse QC, then reject or exchange before international shipping. Once a parcel leaves China, returns are usually impractical for overseas buyers.",
    keyFacts: [
      "Warehouse QC is your main protection window.",
      "Seller return policies vary by Weidian/Taobao shop.",
      "International returns are rarely economical.",
      "Photograph issues and open tickets with clear timestamps.",
      "Use BoonBuy Finds research to reduce return risk before you buy.",
    ],
    keywords: [
      "boonbuy returns",
      "boonbuy exchange",
      "boonbuy refund",
      "agent returns",
    ],
    sections: [
      {
        heading: "Return window that matters",
        paragraphs: [
          "After purchase, the seller ships to the BoonBuy warehouse. When QC photos appear, inspect carefully. If the item is wrong or defective, start the exchange/return flow inside BoonBuy while the goods are still domestic.",
          "Waiting until after international delivery usually means keeping a flawed item or eating freight both ways.",
        ],
        links: [
          { href: "/boonbuy-warehouse", label: "Warehouse guide" },
          { href: "/boonbuy-qc", label: "QC guide" },
        ],
      },
      {
        heading: "What is typically not returnable",
        paragraphs: [
          "Buyer’s remorse after approving QC, wrong size you ignored on the size chart, and parcels already in transit are weak cases.",
          "Always compare measurements in centimeters and ask community feedback before approving high-value sneakers or jackets.",
        ],
        links: [
          { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
          { href: "/telegram", label: "Telegram community" },
        ],
      },
      {
        heading: "How to document a dispute",
        paragraphs: [
          "Save QC albums, note the SKU, and describe the defect clearly. Support moves faster with evidence than with vague complaints.",
          "If a listing was researched on BoonBuy Finds, keep the product URL so you can cross-check what you expected versus what arrived.",
        ],
        links: [
          { href: "/boonbuy-finds", label: "BoonBuy finds" },
          { href: "/contact", label: "Contact BoonBuy Finds" },
        ],
      },
    ],
    faqs: buildGuideFaqs("BoonBuy returns", [
      {
        question: "Can I return after international shipping?",
        answer:
          "Rarely in a cost-effective way. Most buyers treat warehouse QC as the last practical cancel/exchange point.",
      },
      {
        question: "Does BoonBuy Finds process returns?",
        answer:
          "No. BoonBuy Finds is a discovery catalog. Returns and refunds are handled inside your BoonBuy agent account.",
      },
    ]),
    relatedLinks: [
      { href: "/boonbuy-warehouse", label: "Warehouse guide" },
      { href: "/boonbuy-payment", label: "Payment guide" },
      { href: "/is-boonbuy-safe", label: "Is BoonBuy safe?" },
      { href: "/boonbuy-coupons", label: "Coupons" },
      { href: "/ai", label: "BoonBuy AI" },
    ],
    relatedArticleSlugs: ["boonbuy-shipping", "is-boonbuy-legit", "how-to-use-boonbuy"],
    parentCrumb: { label: "Guides", href: "/guides" },
  }),

  "boonbuy-payment": page({
    slug: "boonbuy-payment",
    category: "guide",
    title: "BoonBuy Payment Guide 2026 | Top-Ups, Fees & Checkout",
    metaDescription:
      "How BoonBuy payment works — wallet top-ups, item payment vs shipping payment, common fees, and how to avoid checkout mistakes.",
    badge: "Payment guide",
    h1: "BoonBuy payment guide",
    intro:
      "BoonBuy payment usually happens in two stages: paying for marketplace items (plus domestic shipping into the warehouse), then paying separately for international freight when you submit a parcel.",
    directAnswer:
      "Top up your BoonBuy wallet, pay for each item as you order, then pay shipping later when you build a parcel. Always confirm live totals — spreadsheet prices can lag.",
    keyFacts: [
      "Item payment and international shipping are separate charges.",
      "Payment method fees (card vs balance vs crypto) can change the effective total.",
      "Confirm size/color on the live BoonBuy screen before paying.",
      "Coupons usually reduce shipping, not the item sticker price.",
      "BoonBuy Finds shows catalog prices for research — checkout is authoritative.",
    ],
    keywords: [
      "boonbuy payment",
      "boonbuy top up",
      "boonbuy wallet",
      "how to pay boonbuy",
    ],
    sections: [
      {
        heading: "Wallet top-ups",
        paragraphs: [
          "Most buyers fund a BoonBuy balance, then spend against it. Available rails change by region — cards, local methods, or crypto may appear with different surcharges.",
          "If a top-up bonus is active, screenshot terms. Bonuses often exclude certain shipping lines or expire quickly.",
        ],
        links: [
          { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
          { href: BOONBUY_COUPON_URL, label: "Register / claim invite" },
        ],
      },
      {
        heading: "Paying for items",
        paragraphs: [
          "Open a verified product link from BoonBuy Finds, confirm the SKU, then pay. The agent purchases from Weidian/Taobao and routes the goods to the warehouse.",
          "Domestic seller shipping is often billed with the item. International freight is not — that comes later.",
        ],
        links: [
          { href: "/how-to-buy", label: "How to buy" },
          { href: "/boonbuy-finds", label: "Browse finds" },
          { href: "/ai", label: "Ask BoonBuy AI" },
        ],
      },
      {
        heading: "Paying for shipping",
        paragraphs: [
          "After QC and consolidation, you choose a line and pay freight. This is where coupons and volumetric weight matter most.",
          "Re-quote if you add or remove items. A jacket can change dimensional weight more than a dense sneaker pair.",
        ],
        links: [
          { href: "/boonbuy-shipping", label: "Shipping guide" },
          { href: "/boonbuy-shipping-coupon", label: "Shipping coupon" },
          { href: "/boonbuy-warehouse", label: "Warehouse guide" },
        ],
      },
    ],
    faqs: buildGuideFaqs("paying with BoonBuy", [
      {
        question: "Is payment on BoonBuy Finds?",
        answer:
          "No. BoonBuy Finds is discovery only. You pay inside BoonBuy after opening a verified product or parcel quote.",
      },
      {
        question: "Do coupons apply to items or shipping?",
        answer:
          "Most BoonBuy Finds invite offers focus on shipping discounts for new accounts. Read live promo terms at registration.",
      },
    ]),
    relatedLinks: [
      { href: "/boonbuy-referral-code", label: "Referral code" },
      { href: "/boonbuy-discount-code", label: "Discount code" },
      { href: "/boonbuy-warehouse", label: "Warehouse" },
      { href: "/boonbuy-returns", label: "Returns" },
      { href: "/deals", label: "Deals under $30" },
    ],
    relatedArticleSlugs: [
      "boonbuy-discount-code",
      "boonbuy-shipping",
      "how-to-use-boonbuy",
    ],
    parentCrumb: { label: "Guides", href: "/guides" },
  }),

  "boonbuy-referral-code": page({
    slug: "boonbuy-referral-code",
    category: "brand",
    title: `BoonBuy Referral Code 2026 | Invite ${BOONBUY_INVITE_CODE}`,
    metaDescription: `BoonBuy referral code and invite link for 2026 — unlock shipping coupon savings via BoonBuy Finds, then shop QC-backed spreadsheet finds.`,
    badge: "Referral code",
    h1: "BoonBuy referral code",
    intro: `A BoonBuy referral code is an invite used at registration to unlock new-user benefits — most often shipping discounts. On BoonBuy Finds, use our verified invite path instead of random expired codes from old Reddit threads.`,
    directAnswer: `Use the BoonBuy Finds invite/referral signup to claim current new-user shipping savings, then browse verified finds. The invite code associated with this site is ${BOONBUY_INVITE_CODE}.`,
    keyFacts: [
      `Primary invite code published on BoonBuy Finds: ${BOONBUY_INVITE_CODE}.`,
      "Referral benefits usually target shipping, not item markdowns.",
      "Terms apply to eligible new accounts and can change.",
      "Prefer the verified signup URL over typed codes on phishing clones.",
      "After registering, shop QC finds on boonbuyfinds.net.",
    ],
    keywords: [
      "boonbuy referral code",
      "boonbuy invite code",
      "boonbuy referral",
      "boonbuy coupon code",
    ],
    sections: [
      {
        heading: "How to use the referral code",
        paragraphs: [
          `Open the verified registration link from our coupon hub. If a form asks for an invite/referral code, use ${BOONBUY_INVITE_CODE}.`,
          "Screenshot the promo terms after signup. Support tickets are easier when you can prove which offer you claimed.",
        ],
        links: [
          { href: BOONBUY_COUPON_URL, label: "Claim invite signup" },
          { href: "/boonbuy-invite-code", label: "Invite code page" },
          { href: "/boonbuy-coupons", label: "All BoonBuy coupons" },
        ],
      },
      {
        heading: "Referral vs coupon vs promo code",
        paragraphs: [
          "People search these phrases interchangeably. On BoonBuy, the practical path is usually an invite registration that unlocks shipping savings — not a checkout coupon typed on every order.",
          "Use our coupon cluster pages if you searched for coupon code, promo code, voucher, or deals — they all point to the same verified claim flow.",
        ],
        links: [
          { href: "/boonbuy-coupon-code", label: "Coupon code" },
          { href: "/boonbuy-promo-code", label: "Promo code" },
          { href: "/best-boonbuy-coupons", label: "Best coupons" },
        ],
      },
      {
        heading: "After you register",
        paragraphs: [
          "Browse the spreadsheet-style catalog, shortlist QC finds, and open verified product links. Payment and warehouse QC happen on BoonBuy.",
        ],
        links: [
          { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
          { href: "/boonbuy-finds", label: "Finds hub" },
          { href: "/ai", label: "BoonBuy AI" },
          { href: "/latest-finds", label: "Latest finds" },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the BoonBuy referral code on BoonBuy Finds?",
        answer: `The invite/referral code published with our signup links is ${BOONBUY_INVITE_CODE}. Always prefer the full verified URL from our coupon pages.`,
      },
      {
        question: "Is this an official BoonBuy page?",
        answer:
          "BoonBuy Finds is an independent catalog. We publish verified invite links so buyers can claim current new-user shipping offers and then shop QC-backed finds.",
      },
      {
        question: "Do referral codes work forever?",
        answer:
          "No. Promotions rotate. If a code fails, use the live claim button on /boonbuy-coupons rather than outdated screenshots.",
      },
    ],
    relatedLinks: [
      { href: "/boonbuy-invite", label: "BoonBuy invite" },
      { href: "/boonbuy-discount-code", label: "Discount code" },
      { href: "/boonbuy-deals", label: "BoonBuy deals" },
      { href: "/editorial-policy", label: "Editorial policy" },
    ],
    relatedArticleSlugs: [
      "boonbuy-discount-code",
      "boonbuy-shipping",
      "what-is-boonbuy",
    ],
    spreadsheetHref: "/boonbuy-spreadsheet",
  }),
};
