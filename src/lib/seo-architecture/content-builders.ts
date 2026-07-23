import type { StaticPageSection } from "@/lib/static-pages";
import { BOONBUY_COUPON_URL, BOONBUY_INVITE_CODE } from "@/lib/boonbuy-affiliate";
import { SOCIAL_LINKS } from "@/lib/constants";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";

export type ComparisonOpponent = {
  name: string;
  slug: string;
  positioning: string;
  pricingAngle: string;
  shippingAngle: string;
  spreadsheetAngle: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string;
  verdict: string;
};

function pathFor(slug: string): string {
  return `/${slug}`;
}

function coreLinks(): { href: string; label: string }[] {
  return [
    { href: "/", label: "Homepage" },
    { href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" },
    { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
    { href: "/boonbuy-telegram", label: "Telegram" },
    { href: "/guides", label: "Guides" },
  ];
}

const OPPONENT_FINDS_LINKS: Record<string, { href: string; label: string }[]> = {
  litbuy: [
    { href: "/litbuy-finds", label: "LitBuy finds" },
    { href: "/litbuy-spreadsheet", label: "LitBuy spreadsheet" },
  ],
  kakobuy: [
    { href: "/kakobuy-finds", label: "Kakobuy finds" },
    { href: "/kakobuy-spreadsheet", label: "Kakobuy spreadsheet" },
  ],
  mulebuy: [
    { href: "/mulebuy-finds", label: "MuleBuy finds" },
    { href: "/mulebuy-spreadsheet", label: "MuleBuy spreadsheet" },
  ],
  oopbuy: [
    { href: "/oopbuy-finds", label: "OopBuy finds" },
    { href: "/oopbuy-spreadsheet", label: "OopBuy spreadsheet" },
  ],
};

export function buildComparisonPage(
  slug: string,
  opponent: ComparisonOpponent,
  relatedSlugs: string[]
): SeoArchitecturePage {
  const title = `BoonBuy vs ${opponent.name} (2026) — Fees, Shipping & Spreadsheet`;
  const metaDescription = `BoonBuy vs ${opponent.name} compared for 2026 — pricing, shipping lines, spreadsheet workflow, QC, and which agent fits your haul style.`;
  const h1 = `BoonBuy vs ${opponent.name}`;

  const sections: StaticPageSection[] = [
    {
      heading: "Overview",
      paragraphs: [
        `BoonBuy and ${opponent.name} both sit in the Chinese shopping-agent lane: you paste a Taobao, Weidian, or 1688 link, pay in your currency, wait for domestic delivery to a warehouse, review QC photos, then ship internationally. The checkout loop is similar; the differences show up in fees, promotions, UI habits, and how you discover products before you buy.`,
        `BoonBuy Finds is built around BoonBuy discovery — searchable spreadsheet-style catalog, QC references where available, and verified buy links. ${opponent.name} ${opponent.positioning}. Many buyers compare the two when switching agents or splitting hauls across platforms.`,
        `This page is an independent comparison for overseas shoppers. Promotions change; always confirm live fees and shipping lines inside each agent before you pay. Use it to match an agent to your budget, category focus, and how much you rely on community spreadsheets versus in-app browse tools.`,
      ],
      links: [
        { href: "/boonbuy", label: "What is BoonBuy" },
        { href: "/boonbuy-review", label: "BoonBuy review" },
        { href: "/best-shopping-agent", label: "Best shopping agent" },
        ...(OPPONENT_FINDS_LINKS[opponent.slug] ?? []),
      ],
    },
    {
      heading: "Pricing and service fees",
      paragraphs: [
        `Agent pricing is never just the listing price on Taobao or Weidian. You pay the item cost, domestic seller shipping to the warehouse, optional value-added services (extra QC angles, vacuum seal, reinforcement), and international freight. BoonBuy and ${opponent.name} each publish fee tables that shift with campaigns — signup coupons, seasonal shipping sales, and category-specific promos.`,
        opponent.pricingAngle,
        `On BoonBuy Finds we surface listing prices to help you compare before checkout, but the authoritative total is always the agent screen at payment time. Sellers change prices without updating spreadsheets; currency conversion and service fees apply on top. Budget a buffer for unexpected domestic shipping on heavy items and for insurance if you add it at parcel stage.`,
      ],
      links: [
        { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
        { href: "/boonbuy-discount-code", label: "Discount codes" },
        { href: "/how-to-save-on-shipping", label: "Save on shipping" },
      ],
    },
    {
      heading: "Shipping lines and delivery",
      paragraphs: [
        `International shipping is where haul economics live or die. Both agents offer multiple lines — economy post, commercial express, tax-inclusive routes, and sometimes EU or US-specific channels. Line availability depends on destination country, weight, dimensions, and whether the parcel contains shoes, batteries, or branded boxes.`,
        opponent.shippingAngle,
        `BoonBuy regularly promotes shipping discounts for new registrations — check the current invite offer on our coupon pages before your first parcel. Consolidation matters: waiting until you have a full shoe + apparel box often beats shipping single items. Read dimensional weight rules; a light but bulky jacket can price like a dense sneaker box.`,
      ],
      links: [
        { href: "/boonbuy-shipping", label: "BoonBuy shipping guide" },
        { href: "/how-shipping-works", label: "How agent shipping works" },
        { href: "/how-to-declare-parcels", label: "Declare parcels" },
      ],
    },
    {
      heading: "Spreadsheet and discovery workflow",
      paragraphs: [
        `Most experienced buyers still start from spreadsheets, Telegram channels, or curated sites — not from typing random keywords into an agent search bar. Discovery quality determines whether you land on the right batch, size chart, and colorway before money leaves your account.`,
        opponent.spreadsheetAngle,
        `BoonBuy Finds exists because raw spreadsheets are painful on mobile. We index finds with categories, brands, filters, and QC links where the source sheet provides them. When you are ready, the agent link on each row opens BoonBuy on the intended listing. If you already use ${opponent.name} spreadsheets, you can still cross-check batches here before deciding which agent wallet to fund.`,
      ],
      links: [
        { href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" },
        { href: "/spreadsheet", label: "Spreadsheet hub" },
        { href: "/best-boonbuy-spreadsheet", label: "Best BoonBuy spreadsheet" },
      ],
    },
    {
      heading: "QC photos and warehouse checks",
      paragraphs: [
        `Warehouse QC is your last chance to catch wrong sizes, color mismatches, and factory flaws before international freight. BoonBuy provides standard warehouse photos; you can often request extra angles or measurements for a small fee. Treat QC as mandatory for grail purchases — not optional for budget tees.`,
        `${opponent.name} follows the same broad pattern: items arrive, get photographed, you approve or dispute. Turnaround and photo clarity vary by warehouse load and item type. Compare sample QC threads in community channels for the categories you buy most — sneakers versus knitwear versus bags have different failure modes.`,
        `BoonBuy Finds adds a pre-purchase layer: QC reference links on listings show what previous buyers received for similar batches. That does not replace your own warehouse photos, but it narrows which links are worth opening in the first place.`,
      ],
      links: [
        { href: "/boonbuy-qc", label: "BoonBuy QC" },
        { href: "/guides/how-to-check-qc-photos", label: "Check QC photos" },
        { href: "/how-to-find-best-reps", label: "Find better reps" },
      ],
    },
    {
      heading: `Pros of BoonBuy`,
      paragraphs: [
        `BoonBuy pairs well with BoonBuy Finds — the catalog, coupon pages, and Telegram community are aligned on one agent workflow. Registration promos and shipping coupons are easy to find; invite links are consistent across product rows.`,
        `UI familiarity matters when you are managing dozens of cart lines across Weidian shops. BoonBuy's purchase flow, warehouse status screens, and parcel builder are mature. Support response times fluctuate like every agent, but the platform handles high-volume sneaker and apparel hauls routinely.`,
        `If you want one ecosystem for discovery (this site + spreadsheet hubs) and checkout (BoonBuy), you avoid re-pasting links into a second agent unless a specific seller requires it.`,
      ],
    },
    {
      heading: `Cons of BoonBuy`,
      paragraphs: [
        `No agent wins every line to every country at every weight break. BoonBuy shipping quotes can lose to ${opponent.name} on specific routes during a promo window — always quote both before sealing a parcel.`,
        `BoonBuy Finds is independent; we do not control BoonBuy fee changes or warehouse policies. Listing prices on find pages can drift from live marketplace data. You still need to confirm variant SKUs inside BoonBuy before paying.`,
        `If your entire friend group standardizes on ${opponent.name} spreadsheets and internal tools, switching has a social friction cost even when BoonBuy is competitive on fees.`,
      ],
    },
    {
      heading: `Pros of ${opponent.name}`,
      paragraphs: opponent.strengths.map((s) => `${s} This matters most when your haul profile matches what ${opponent.name} optimizes for — check recent community feedback for your destination country.`),
    },
    {
      heading: `Cons of ${opponent.name}`,
      paragraphs: opponent.weaknesses.map((s) => `${s} Compare against your own last three parcels — averages hide outliers.`),
    },
    {
      heading: "Which is better?",
      paragraphs: [
        opponent.verdict,
        `${opponent.bestFor} If that sounds like your shopping pattern, ${opponent.name} deserves a funded test haul. If you want curated BoonBuy spreadsheet discovery, QC references on listings, and a single coupon workflow, BoonBuy plus BoonBuy Finds is the straighter path.`,
        `Plenty of buyers run both agents: fund the one with the better shipping quote today, keep the other for sellers that only list cleanly on one platform. The wrong move is choosing based on a six-month-old Reddit thread — pull live quotes and ship a small test parcel before you commit a four-figure wardrobe haul.`,
      ],
      links: [
        { href: "/boonbuy-vs-other-agents", label: "More comparisons" },
        { href: BOONBUY_COUPON_URL, label: "Claim BoonBuy coupon" },
      ],
    },
  ];

  const faqs = buildComparisonFaqs(opponent);

  return {
    slug,
    path: pathFor(slug),
    category: "comparison",
    title,
    metaDescription,
    badge: "Agent comparison",
    h1,
    intro: `Choosing between BoonBuy and ${opponent.name} in 2026 comes down to shipping quotes to your country, how you discover links, and whether you want BoonBuy Finds' curated catalog on the BoonBuy checkout path. Below is a practical breakdown — not affiliate hype.`,
    keywords: [
      `boonbuy vs ${opponent.slug}`,
      "boonbuy",
      opponent.slug,
      "shopping agent comparison",
      "boonbuy shipping",
    ],
    sections,
    faqs,
    relatedLinks: [
      ...coreLinks(),
      ...(OPPONENT_FINDS_LINKS[opponent.slug] ?? []),
    ],
    relatedArticleSlugs: relatedSlugs,
    spreadsheetHref: "/boonbuy-spreadsheet",
    heroImage: {
      src: "/banners/boonbuy-finds-og.jpg",
      alt: `BoonBuy vs ${opponent.name} shopping agent comparison`,
      caption: `Compare BoonBuy and ${opponent.name} before your next haul — fees, shipping, and spreadsheet workflow.`,
    },
  };
}

function buildComparisonFaqs(opponent: ComparisonOpponent) {
  const n = opponent.name;
  return [
    {
      question: `Is BoonBuy better than ${n}?`,
      answer: `Neither wins every category. BoonBuy is strong when you use BoonBuy Finds for discovery and want integrated coupon workflows. ${n} can win specific shipping lines or seller ecosystems. Quote both for your country and weight.`,
    },
    {
      question: `Can I use BoonBuy Finds with ${n}?`,
      answer: `BoonBuy Finds links default to BoonBuy agent URLs. You can still use our catalog to research batches and QC, then paste the seller URL into ${n} manually if you prefer that checkout path.`,
    },
    {
      question: `Which agent has cheaper shipping — BoonBuy or ${n}?`,
      answer: `It changes monthly. Economy lines, tax-inclusive routes, and seasonal promos shift rankings. Build a test parcel in both dashboards with identical items and compare the total before paying.`,
    },
    {
      question: `Does ${n} have better QC than BoonBuy?`,
      answer: `Both offer warehouse photos. Quality depends on warehouse load and whether you pay for extra angles. Read recent QC posts for your category rather than assuming one agent is always sharper.`,
    },
    {
      question: `Can I switch from ${n} to BoonBuy?`,
      answer: `Yes. Paste seller links into BoonBuy, fund your wallet, and run a small first haul to learn the UI. Use our beginner guides if you are new to the BoonBuy checkout screens.`,
    },
    {
      question: `Which spreadsheet is easier — BoonBuy or ${n}?`,
      answer: `Raw Google Sheets are hard on phones either way. BoonBuy Finds is a searchable layer on top of BoonBuy-oriented finds. ${n} may have its own community sheets — pick the discovery tool your circle already maintains.`,
    },
    {
      question: `Are fees higher on BoonBuy or ${n}?`,
      answer: `Service fee percentages and payment surcharges differ by agent and payment method. Check each platform's fee page the week you order — campaigns overwrite list prices.`,
    },
    {
      question: `Is BoonBuy legit compared to ${n}?`,
      answer: `Both are established agent platforms used by international buyers. Legitimacy is not the usual debate — shipping time, QC discipline, and support responsiveness are. Start with a modest cart if you are skeptical.`,
    },
    {
      question: `Which agent is better for sneakers?`,
      answer: `Sneaker hauls need good box protection options and reliable weight estimates. Compare shoe shipping lines on both agents to your country. BoonBuy Finds highlights sneaker rows with QC references when available.`,
    },
    {
      question: `Which agent is better for designer bags?`,
      answer: `Bag hauls trigger dimensional weight and customs scrutiny. Confirm packaging options and declare values honestly. Use our designer spreadsheet hub to shortlist links before agent checkout.`,
    },
    {
      question: `Can I combine BoonBuy and ${n} in one wardrobe haul?`,
      answer: `Not in one international parcel — each agent warehouses separately. You can absolutely buy apparel on one agent and shoes on another if shipping math works.`,
    },
    {
      question: `Does BoonBuy Finds endorse ${n}?`,
      answer: `No. BoonBuy Finds is an independent catalog. We compare agents to help shoppers decide; checkout always happens on the agent you choose.`,
    },
    {
      question: `What invite code should I use for BoonBuy?`,
      answer: `Use invite code ${BOONBUY_INVITE_CODE} on registration for the current shipping promotion listed on our coupon pages — confirm the live percentage on BoonBuy before you rely on it.`,
    },
    {
      question: `Where do I get help choosing between agents?`,
      answer: `Join our Telegram at ${SOCIAL_LINKS.telegram} for haul discussion, or read our best shopping agent review hub for a wider field comparison beyond BoonBuy vs ${n}.`,
    },
    {
      question: `How often should I re-compare BoonBuy and ${n}?`,
      answer: `Before every large parcel. Shipping sales and fee tweaks roll out without fanfare. A five-minute quote comparison can save more than an hour of spreadsheet hunting.`,
    },
  ];
}

export function buildSpreadsheetIntro(focus: string): string {
  return `${focus} On BoonBuy Finds the live catalog replaces scrolling frozen spreadsheet rows — search, filter by brand, and open verified BoonBuy links when you are ready to buy.`;
}

export function buildGuideFaqs(topic: string, extra: { question: string; answer: string }[] = []) {
  const base = [
    {
      question: `How does ${topic} relate to BoonBuy?`,
      answer: `BoonBuy is the checkout agent; BoonBuy Finds helps you discover listings first. ${topic} fits into that flow before you paste links or pay.`,
    },
    {
      question: "Do I need a shopping agent for Chinese marketplaces?",
      answer: "Overseas cards and addresses generally cannot check out on Taobao or Weidian directly. Agents purchase locally, warehouse items, and ship internationally.",
    },
    {
      question: "Where can I browse finds before buying?",
      answer: "Use the BoonBuy spreadsheet hub on this site, category pages, and Telegram for daily drops — then open agent links from each listing.",
    },
    {
      question: "How do I avoid wrong variants?",
      answer: "Match color, size, and batch notes on the find page to the agent checkout screen. Chinese sizing often runs small — read listing charts.",
    },
    {
      question: "Should I check QC before shipping internationally?",
      answer: "Yes for anything expensive. Warehouse photos are your last chance to catch flaws before freight leaves China.",
    },
    {
      question: "What if the price changed at checkout?",
      answer: "Marketplace sellers update prices without warning spreadsheets. Trust the live agent total at payment time.",
    },
    {
      question: "Can I save on shipping?",
      answer: "Consolidate items, pick the right line for your country, remove excess packaging when safe, and use current BoonBuy shipping coupons for new accounts.",
    },
    {
      question: "Is BoonBuy Finds affiliated with BoonBuy?",
      answer: "No. We are an independent discovery site with outbound agent links. Policies and fees are controlled by BoonBuy.",
    },
    {
      question: "Where do beginners start?",
      answer: "Read what-is-boonbuy and how-to-use-boonbuy, browse the spreadsheet hub, then place a small test order before a large haul.",
    },
    {
      question: "How do I stay updated on new finds?",
      answer: `Follow Telegram ${SOCIAL_LINKS.telegram} and check trending finds pages weekly.`,
    },
  ];
  return [...base, ...extra];
}
