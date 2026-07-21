import { buildGuideFaqs } from "@/lib/seo-architecture/content-builders";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";

function page(
  config: Omit<SeoArchitecturePage, "path"> & { slug: string }
): SeoArchitecturePage {
  return { ...config, path: `/${config.slug}` };
}

const GUIDE_RELATED = [
  "how-to-use-boonbuy",
  "how-shipping-works",
  "how-to-buy-from-taobao",
  "how-to-find-best-reps",
];

export const GUIDE_ARCHITECTURE_PAGES: Record<string, SeoArchitecturePage> = {
  "how-to-buy-from-taobao": page({
    slug: "how-to-buy-from-taobao",
    category: "guide",
    title: "How to Buy from Taobao (2026) | Agent Guide",
    metaDescription:
      "How to buy from Taobao through BoonBuy — find listings, open agent links, sizing, QC, and shipping for international buyers.",
    badge: "Marketplace guide",
    h1: "How to buy from Taobao",
    intro:
      "Taobao is Alibaba's consumer marketplace — huge catalog, Chinese-only checkout for domestic buyers. International shoppers use BoonBuy agent links from find pages to purchase without a Chinese bank card.",
    keywords: ["how to buy from taobao", "taobao agent", "taobao boonbuy"],
    sections: [
      {
        heading: "Why Taobao via an agent",
        paragraphs: [
          "Taobao listings often include more review photos and structured SKUs than small Weidian shops. You still cannot ship overseas directly — the agent buys locally and warehouses the item.",
          "BoonBuy Finds highlights Taobao-sourced rows where the embedded link resolves correctly. Always confirm the SKU color and size on the BoonBuy screen.",
        ],
        links: [{ href: "/boonbuy-taobao", label: "BoonBuy Taobao hub" }],
      },
      {
        heading: "Find Taobao items",
        paragraphs: [
          "Search categories and brands here instead of random Taobao search in a language you do not read. Save QC references from the product page.",
        ],
        links: [
          { href: "/china-spreadsheet", label: "China spreadsheet" },
          { href: "/guides/how-to-buy-from-taobao", label: "Extended guide" },
        ],
      },
      {
        heading: "Sizing and variants",
        paragraphs: [
          "Size charts vary by factory. Compare measurements in centimeters to a garment you own. Color names like 'camel' and 'khaki' are not standardized across shops.",
        ],
      },
      {
        heading: "After purchase",
        paragraphs: [
          "Domestic shipping to the BoonBuy warehouse is usually quick. Request warehouse QC photos before international freight — especially on sneakers and jackets.",
        ],
        links: [{ href: "/boonbuy-qc", label: "QC guide" }],
      },
    ],
    faqs: buildGuideFaqs("buying from Taobao", [
      {
        question: "Is Taobao the same as Tmall?",
        answer: "No. Tmall hosts brand-flagship style shops; many finds still come from Taobao C2C sellers. Agent links specify which listing you are buying.",
      },
    ]),
    relatedLinks: [
      { href: "/how-to-buy-from-weidian", label: "Weidian guide" },
      { href: "/how-to-use-boonbuy", label: "Use BoonBuy" },
    ],
    relatedArticleSlugs: GUIDE_RELATED,
    parentCrumb: { label: "Guides", href: "/guides" },
  }),

  "how-to-buy-from-weidian": page({
    slug: "how-to-buy-from-weidian",
    category: "guide",
    title: "How to Buy from Weidian (2026) | Agent Guide",
    metaDescription:
      "How to buy from Weidian through BoonBuy — mobile marketplace finds, agent links, QC, and tips for international streetwear buyers.",
    badge: "Marketplace guide",
    h1: "How to buy from Weidian",
    intro:
      "Weidian is mobile-first marketplace infrastructure for small sellers — a huge share of streetwear and sneaker batches list here first. You buy through BoonBuy, not with a foreign card on Weidian itself.",
    keywords: ["how to buy from weidian", "weidian agent", "weidian boonbuy"],
    sections: [
      {
        heading: "Weidian seller culture",
        paragraphs: [
          "Shops rotate inventory quickly. A batch can sell out while a spreadsheet row still shows yesterday's price. Trust live BoonBuy totals at payment.",
          "Photos are often minimal — QC references from other buyers fill the gap.",
        ],
        links: [{ href: "/boonbuy-weidian", label: "Weidian finds hub" }],
      },
      {
        heading: "Open agent links",
        paragraphs: [
          "Use BoonBuy URLs from BoonBuy Finds cards. Manual paste works for links friends send in Telegram — verify shop reputation in thread history first.",
        ],
      },
      {
        heading: "QC discipline",
        paragraphs: [
          "Weidian batches vary wildly at the same price point. Read multiple QC posts before grail spends.",
        ],
        links: [{ href: "/how-to-find-best-reps", label: "Find best reps" }],
      },
    ],
    faqs: buildGuideFaqs("buying from Weidian"),
    relatedLinks: [{ href: "/how-to-buy-from-taobao", label: "Taobao guide" }],
    relatedArticleSlugs: GUIDE_RELATED,
    parentCrumb: { label: "Guides", href: "/guides" },
  }),

  "how-to-use-agents": page({
    slug: "how-to-use-agents",
    category: "guide",
    title: "How to Use Shopping Agents (2026) | Beginner Guide",
    metaDescription:
      "How to use Chinese shopping agents — paste links, pay, QC, consolidate, and ship internationally. Agent workflow explained for beginners.",
    badge: "Agent guide",
    h1: "How to use shopping agents",
    intro:
      "Shopping agents are middlemen for Chinese marketplaces. The workflow is universal: paste a product URL, pay the agent, wait for domestic delivery to their warehouse, review QC photos, then pay international shipping to your address.",
    keywords: ["how to use agents", "shopping agent guide", "china agent tutorial"],
    sections: [
      {
        heading: "Choose an agent",
        paragraphs: [
          "Compare fees, shipping lines to your country, and UI preference. BoonBuy pairs with BoonBuy Finds for discovery; other agents work if you paste links manually.",
        ],
        links: [{ href: "/best-shopping-agent", label: "Best shopping agent" }],
      },
      {
        heading: "Paste links correctly",
        paragraphs: [
          "Use full marketplace URLs or agent-wrapped links from trusted find pages. Shortened mystery links are how you buy the wrong batch.",
        ],
      },
      {
        heading: "Wallet and payments",
        paragraphs: [
          "Top up agent balance or pay per order depending on platform. Factor payment-method fees into budget spreadsheets.",
        ],
      },
      {
        heading: "QC and parcels",
        paragraphs: [
          "Never skip warehouse photos on expensive lines. Build parcels when you have enough approved items to justify freight.",
        ],
        links: [{ href: "/how-shipping-works", label: "Shipping" }],
      },
    ],
    faqs: buildGuideFaqs("shopping agents"),
    relatedLinks: [{ href: "/guides/what-is-a-shopping-agent", label: "What is an agent" }],
    relatedArticleSlugs: GUIDE_RELATED,
    parentCrumb: { label: "Guides", href: "/guides" },
  }),

  "how-shipping-works": page({
    slug: "how-shipping-works",
    category: "guide",
    title: "How Agent Shipping Works (2026) | Haul Guide",
    metaDescription:
      "How shopping agent shipping works — warehouse storage, lines, weight, customs, and consolidation explained.",
    badge: "Shipping guide",
    h1: "How shipping works with agents",
    intro:
      "Agent shipping is a two-leg journey: domestic seller to warehouse, warehouse to your country. You only control the second invoice directly — but you influence cost through consolidation, packaging, and line choice.",
    keywords: ["how shipping works", "agent shipping", "haul shipping"],
    sections: [
      {
        heading: "Warehouse storage",
        paragraphs: [
          "Items sit in storage while you shop more or wait for QC. Free storage windows vary — check BoonBuy policy before letting shoes sit for months.",
        ],
      },
      {
        heading: "Choosing a line",
        paragraphs: [
          "Economy vs express vs tax-inclusive routes trade money for time and tracking detail. Quote two lines on the same parcel before paying.",
        ],
        links: [{ href: "/boonbuy-shipping", label: "BoonBuy shipping" }],
      },
      {
        heading: "Weight math",
        paragraphs: [
          "Actual weight vs volumetric weight — carriers charge whichever is higher. Bulky jackets lose on dimensional weight.",
        ],
        links: [{ href: "/how-to-save-on-shipping", label: "Save on shipping" }],
      },
      {
        heading: "Customs",
        paragraphs: [
          "Declarations are your legal statement to customs. Extreme lowballs increase seizure risk.",
        ],
        links: [{ href: "/how-to-declare-parcels", label: "Declare parcels" }],
      },
    ],
    faqs: buildGuideFaqs("agent shipping"),
    relatedLinks: [{ href: "/guides/how-shipping-works-with-agents", label: "Extended guide" }],
    relatedArticleSlugs: ["how-to-save-on-shipping", "how-to-declare-parcels", "boonbuy-shipping"],
    parentCrumb: { label: "Guides", href: "/guides" },
  }),

  "how-to-save-on-shipping": page({
    slug: "how-to-save-on-shipping",
    category: "guide",
    title: "How to Save on Agent Shipping | 2026 Tips",
    metaDescription:
      "Save on shopping agent shipping — consolidation, packaging, line selection, coupons, and timing strategies.",
    badge: "Save money",
    h1: "How to save on shipping",
    intro:
      "Shipping discounts are not just coupon codes. Consolidation, vacuum sealing, line shopping, and patience usually save more than a one-time promo on a single shoe box.",
    keywords: ["how to save on shipping", "agent shipping tips", "cheap shipping haul"],
    sections: [
      {
        heading: "Consolidate parcels",
        paragraphs: [
          "One international box with five items beats five international boxes with one item each. Plan hauls around parcel milestones.",
        ],
      },
      {
        heading: "Packaging choices",
        paragraphs: [
          "Remove shoe boxes only if you accept crease risk. Vacuum seal soft goods when the line allows it.",
        ],
      },
      {
        heading: "Coupons and timing",
        paragraphs: [
          "Registration shipping promos on BoonBuy rotate — check our coupon hub before paying freight.",
        ],
        links: [{ href: "/boonbuy-coupons", label: "Coupons" }],
      },
      {
        heading: "Line shopping",
        paragraphs: [
          "Re-quote before every parcel. A line that was cheapest in January may lose in March when carriers adjust tables.",
        ],
      },
    ],
    faqs: buildGuideFaqs("saving on shipping"),
    relatedLinks: [{ href: "/how-shipping-works", label: "How shipping works" }],
    relatedArticleSlugs: ["how-shipping-works", "boonbuy-shipping", "how-to-declare-parcels"],
    parentCrumb: { label: "Guides", href: "/guides" },
  }),

  "how-to-declare-parcels": page({
    slug: "how-to-declare-parcels",
    category: "guide",
    title: "How to Declare Parcels | Customs Guide",
    metaDescription:
      "How to declare agent parcels for customs — values, descriptions, and country-specific habits without reckless under-declaring.",
    badge: "Customs",
    h1: "How to declare parcels",
    intro:
      "Customs declarations tell your country what is inside and what it is worth. Agents collect this data when you pay international freight. Honest, plausible declarations beat fantasy numbers that trigger inspections.",
    keywords: ["how to declare parcels", "customs declaration agent", "declare haul"],
    sections: [
      {
        heading: "What you are declaring",
        paragraphs: [
          "Category labels and total value — not individual hype names on every line if your country form uses bundles. Follow the agent form fields literally.",
        ],
      },
      {
        heading: "Plausible values",
        paragraphs: [
          "Declare in the ballpark of what you paid, adjusted for your country's duty-free thresholds. Extreme lows flag parcels.",
        ],
        links: [{ href: "/how-to-avoid-customs", label: "Avoid customs issues" }],
      },
      {
        heading: "Country habits",
        paragraphs: [
          "EU, US, UK, Canada, and Australia communities maintain different folklore — read recent posts for your postal code, not a 2019 meme.",
        ],
      },
    ],
    faqs: buildGuideFaqs("parcel declarations"),
    relatedLinks: [{ href: "/how-shipping-works", label: "Shipping" }],
    relatedArticleSlugs: ["how-to-avoid-customs", "how-shipping-works", "boonbuy-shipping"],
    parentCrumb: { label: "Guides", href: "/guides" },
  }),

  "how-to-avoid-customs": page({
    slug: "how-to-avoid-customs",
    category: "guide",
    title: "How to Avoid Customs Issues | Agent Haul Tips",
    metaDescription:
      "Reduce customs seizures and delays on agent parcels — declarations, lines, volume limits, and realistic expectations.",
    badge: "Customs",
    h1: "How to avoid customs issues",
    intro:
      "You cannot guarantee zero customs scrutiny — agents and carriers still face inspections. You can reduce avoidable mistakes: honest declarations, reasonable parcel frequency, and lines appropriate for your country.",
    keywords: ["how to avoid customs", "customs seizure agent", "haul customs"],
    sections: [
      {
        heading: "What triggers inspections",
        paragraphs: [
          "Suspicious values, prohibited categories, high frequency of identical branded boxes, and random sampling. Some risk is luck.",
        ],
      },
      {
        heading: "Mitigation habits",
        paragraphs: [
          "Space large hauls when possible. Use tracked lines when available. Keep purchase screenshots if you need to dispute with support — not to argue with customs illegally.",
        ],
      },
      {
        heading: "If customs holds a parcel",
        paragraphs: [
          "Follow carrier instructions. Pay legitimate duties when assessed. Chargebacks and agent support cannot always recover seized goods.",
        ],
      },
    ],
    faqs: buildGuideFaqs("customs avoidance"),
    relatedLinks: [{ href: "/how-to-declare-parcels", label: "Declare parcels" }],
    relatedArticleSlugs: ["how-to-declare-parcels", "how-shipping-works", "boonbuy-shipping"],
    parentCrumb: { label: "Guides", href: "/guides" },
  }),

  "how-to-find-best-reps": page({
    slug: "how-to-find-best-reps",
    category: "guide",
    title: "How to Find the Best Reps (2026) | QC Guide",
    metaDescription:
      "How to find better reps — QC references, batch research, price realism, and using BoonBuy Finds before you buy.",
    badge: "QC guide",
    h1: "How to find the best reps",
    intro:
      "Better reps come from better research — not luck. QC references, batch names, price realism, and warehouse photos stack into a decision. BoonBuy Finds shortens discovery; your judgment still closes the deal.",
    keywords: ["how to find best reps", "best reps guide", "qc reps"],
    sections: [
      {
        heading: "QC references first",
        paragraphs: [
          "Read QC-linked listings and community posts before opening wallets. Know what flaws are common at a price tier.",
        ],
        links: [
          { href: "/boonbuy-qc", label: "BoonBuy QC" },
          { href: "/top-qc-finds", label: "Top QC finds" },
        ],
      },
      {
        heading: "Price realism",
        paragraphs: [
          "Grail accuracy costs money. $40 Dunks are not $400 Dunks. Compare multiple rows at similar prices.",
        ],
      },
      {
        heading: "Warehouse confirmation",
        paragraphs: [
          "Pre-purchase QC is research; warehouse QC is inspection. Fail fast at the warehouse, not after international shipping.",
        ],
      },
    ],
    faqs: buildGuideFaqs("finding quality reps"),
    relatedLinks: [{ href: "/best-rep-sneakers", label: "Best rep sneakers" }],
    relatedArticleSlugs: ["how-to-use-boonbuy", "boonbuy-qc", "how-to-buy-from-weidian"],
    parentCrumb: { label: "Guides", href: "/guides" },
  }),
};
