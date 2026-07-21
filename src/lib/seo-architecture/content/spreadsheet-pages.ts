import { buildGuideFaqs, buildSpreadsheetIntro } from "@/lib/seo-architecture/content-builders";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";

function page(
  config: Omit<SeoArchitecturePage, "path"> & { slug: string }
): SeoArchitecturePage {
  return { ...config, path: `/${config.slug}` };
}

const SHEET_RELATED = [
  "spreadsheet",
  "best-spreadsheet",
  "boonbuy-spreadsheet",
  "best-boonbuy-spreadsheet",
  "china-spreadsheet",
];

export const SPREADSHEET_ARCHITECTURE_PAGES: Record<string, SeoArchitecturePage> = {
  spreadsheet: page({
    slug: "spreadsheet",
    category: "spreadsheet",
    title: "Shopping Agent Spreadsheet Hub 2026 | BoonBuy Finds",
    metaDescription:
      "Spreadsheet hub for shopping agent finds — China spreadsheets, designer rows, shoes, clothing, budget and luxury picks with live BoonBuy links.",
    badge: "Spreadsheet hub",
    h1: "Shopping agent spreadsheet hub",
    intro: buildSpreadsheetIntro(
      "Every major agent community still talks in spreadsheets — rows of Taobao and Weidian links with prices, batches, and QC notes."
    ),
    keywords: ["spreadsheet", "rep spreadsheet", "shopping agent spreadsheet", "china spreadsheet"],
    sections: [
      {
        heading: "Why spreadsheets still dominate",
        paragraphs: [
          "Agents do not manufacture hype — curators do, in shared Google Sheets and Telegram channels. A spreadsheet row is a contract between buyer and seller expectations: this link, this price, this batch photo.",
          "The problem is usability. Sheets break on mobile, images expire, and columns multiply until beginners quit. BoonBuy Finds keeps the spreadsheet data model — row-level finds — but renders it as a searchable catalog.",
        ],
      },
      {
        heading: "Browse by intent",
        paragraphs: [
          "Use specialized hubs below instead of one mega-sheet. Shoe spreadsheets filter sneaker batches; designer spreadsheets focus luxury bags and labels; budget spreadsheets cap prices for starter hauls.",
        ],
        links: [
          { href: "/shoe-spreadsheet", label: "Shoe spreadsheet" },
          { href: "/designer-spreadsheet", label: "Designer spreadsheet" },
          { href: "/budget-spreadsheet", label: "Budget spreadsheet" },
        ],
      },
      {
        heading: "China marketplace sources",
        paragraphs: [
          "Most rows trace to Taobao, Weidian, or 1688. Each marketplace has different shop vibes — Weidian for street batches, Taobao for structured size charts, 1688 for bulk basics.",
        ],
        links: [
          { href: "/china-spreadsheet", label: "China spreadsheet" },
          { href: "/how-to-buy-from-taobao", label: "Taobao guide" },
        ],
      },
      {
        heading: "BoonBuy checkout path",
        paragraphs: [
          "When a row includes a BoonBuy agent link, open it from the product page here. Paste-only workflows still work for other agents, but BoonBuy Finds optimizes for BoonBuy discovery and coupons.",
        ],
        links: [{ href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" }],
      },
    ],
    faqs: buildGuideFaqs("shopping spreadsheets"),
    relatedLinks: [
      { href: "/best-spreadsheet", label: "Best spreadsheet" },
      { href: "/boonbuy-telegram", label: "Telegram" },
    ],
    relatedArticleSlugs: SHEET_RELATED,
    spreadsheetHref: "/boonbuy-spreadsheet",
  }),

  "best-spreadsheet": page({
    slug: "best-spreadsheet",
    category: "spreadsheet",
    title: "Best Spreadsheet for Agent Finds 2026",
    metaDescription:
      "Best spreadsheet options for agent finds in 2026 — searchable BoonBuy Finds catalog vs raw Google Sheets, plus category-specific hubs.",
    badge: "Best spreadsheet",
    h1: "Best spreadsheet for agent finds",
    intro:
      "The best spreadsheet in 2026 is the one you actually use on mobile — searchable, image-stable, and linked to a checkout agent you trust. For BoonBuy buyers, that means BoonBuy Finds plus category hubs, not a 4,000-row frozen sheet.",
    keywords: ["best spreadsheet", "best rep spreadsheet", "best boonbuy spreadsheet"],
    sections: [
      {
        heading: "Evaluation criteria",
        paragraphs: [
          "Mobile speed, QC reference availability, price accuracy, and agent link integrity. A sheet with ten perfect rows beats a sheet with ten thousand broken images.",
          "Community freshness matters — who maintains it, how often rows update, and whether mods remove dead links.",
        ],
      },
      {
        heading: "Our recommendation for BoonBuy",
        paragraphs: [
          "Start with /boonbuy-spreadsheet and /best-boonbuy-spreadsheet on this site. Layer Telegram for same-day drops. Keep a personal notes doc for batches you have researched.",
        ],
        links: [
          { href: "/best-boonbuy-spreadsheet", label: "Best BoonBuy spreadsheet" },
          { href: "/boonbuy-spreadsheet-2026", label: "2026 spreadsheet" },
        ],
      },
      {
        heading: "When raw Google Sheets still win",
        paragraphs: [
          "Private group sheets with unreleased batches may beat public indexes for a weekend. Cross-check anything exclusive on BoonBuy Finds once it goes public for stable URLs.",
        ],
      },
    ],
    faqs: buildGuideFaqs("choosing the best spreadsheet"),
    relatedLinks: [{ href: "/spreadsheet", label: "Spreadsheet hub" }],
    relatedArticleSlugs: SHEET_RELATED,
    spreadsheetHref: "/boonbuy-spreadsheet",
  }),

  "china-spreadsheet": page({
    slug: "china-spreadsheet",
    category: "spreadsheet",
    title: "China Spreadsheet | Taobao & Weidian Finds 2026",
    metaDescription:
      "China spreadsheet hub — Taobao, Weidian, and 1688 finds indexed for international buyers with BoonBuy agent links.",
    badge: "China spreadsheet",
    h1: "China spreadsheet finds",
    intro: buildSpreadsheetIntro(
      "China spreadsheets aggregate marketplace links domestic buyers already use — rep sneakers, streetwear, accessories, and designer-inspired pieces."
    ),
    keywords: ["china spreadsheet", "taobao spreadsheet", "weidian spreadsheet"],
    sections: [
      {
        heading: "Marketplace mix",
        paragraphs: [
          "Weidian shops often move fastest on streetwear batches. Taobao brings review photos and size grids. 1688 appears on bulk or basic pieces. Good china spreadsheets label source marketplace per row.",
        ],
      },
      {
        heading: "Language and sizing",
        paragraphs: [
          "Titles may be Chinese-only — use photos and QC references. Size charts frequently run small; measure a well-fitting piece at home before ordering apparel.",
        ],
        links: [
          { href: "/how-to-buy-from-weidian", label: "Weidian guide" },
          { href: "/how-to-buy-from-taobao", label: "Taobao guide" },
        ],
      },
      {
        heading: "Agent checkout",
        paragraphs: [
          "International buyers never pay sellers directly. Open BoonBuy links from catalog rows or paste URLs into BoonBuy manually after research.",
        ],
      },
    ],
    faqs: buildGuideFaqs("China marketplace spreadsheets"),
    relatedLinks: [{ href: "/spreadsheet", label: "Hub" }],
    relatedArticleSlugs: SHEET_RELATED,
    spreadsheetHref: "/boonbuy-spreadsheet",
  }),

  "designer-spreadsheet": page({
    slug: "designer-spreadsheet",
    category: "spreadsheet",
    title: "Designer Spreadsheet | Luxury Finds & Bags 2026",
    metaDescription:
      "Designer spreadsheet for luxury bags, belts, and apparel finds — QC-focused rows with BoonBuy links.",
    badge: "Designer spreadsheet",
    h1: "Designer spreadsheet",
    intro:
      "Designer spreadsheets cluster high-risk, high-reward categories — bags, belts, scarves, eyewear. Rows should include batch comparisons and material callouts because small flaws matter more at these price points.",
    keywords: ["designer spreadsheet", "luxury spreadsheet", "designer rep spreadsheet"],
    sections: [
      {
        heading: "What to verify on designer rows",
        paragraphs: [
          "Hardware color, leather grain, stamp alignment, and interior lining. QC references are mandatory reading, not optional scrolling.",
        ],
        links: [
          { href: "/top-designer-bags", label: "Top designer bags" },
          { href: "/luxury-spreadsheet", label: "Luxury spreadsheet" },
        ],
      },
      {
        heading: "Shipping considerations",
        paragraphs: [
          "Boxes and dust bags add volume. Declare honestly and pick lines with tracking if available. Reinforcement matters — corner crush shows on camera instantly.",
        ],
        links: [{ href: "/boonbuy-shipping", label: "Shipping" }],
      },
    ],
    faqs: buildGuideFaqs("designer spreadsheets"),
    relatedLinks: [{ href: "/brands", label: "Brands" }],
    relatedArticleSlugs: ["luxury-spreadsheet", "china-spreadsheet", "best-spreadsheet"],
    spreadsheetHref: "/boonbuy-spreadsheet",
    productFilter: { keywords: ["bag", "belt", "wallet"], requireQc: true },
    productSectionTitle: "Designer-leaning finds with QC",
  }),

  "clothing-spreadsheet": page({
    slug: "clothing-spreadsheet",
    category: "spreadsheet",
    title: "Clothing Spreadsheet | Apparel Finds 2026",
    metaDescription:
      "Clothing spreadsheet — hoodies, jackets, pants, tees, and streetwear rows with searchable BoonBuy catalog links.",
    badge: "Clothing spreadsheet",
    h1: "Clothing spreadsheet",
    intro:
      "Apparel spreadsheets rotate faster than sneaker sheets — seasonal drops, factory runs, and colorways expire in weeks. A searchable clothing hub beats archiving last month's hoodie tab.",
    keywords: ["clothing spreadsheet", "streetwear spreadsheet", "apparel spreadsheet"],
    sections: [
      {
        heading: "Category slices",
        paragraphs: [
          "Split browsing by hoodies, jackets, pants, and tees instead of one apparel megasheet. Size issues cause most returns — read charts per listing.",
        ],
        links: [
          { href: "/best-hoodies", label: "Best hoodies" },
          { href: "/best-jackets", label: "Best jackets" },
          { href: "/streetwear-spreadsheet", label: "Streetwear spreadsheet" },
        ],
      },
      {
        heading: "Fabric and batch notes",
        paragraphs: [
          "Weight in grams, lining type, and zipper brands often hide in listing details. Compare QC photos for drape — stiff fleece vs soft cotton blends look different on body.",
        ],
      },
    ],
    faqs: buildGuideFaqs("clothing spreadsheets"),
    relatedLinks: [{ href: "/categories", label: "Categories" }],
    relatedArticleSlugs: ["budget-spreadsheet", "shoe-spreadsheet", "spreadsheet"],
    spreadsheetHref: "/boonbuy-spreadsheet",
    productFilter: { categories: ["hoodies-and-pants", "coats-and-jackets", "tshirts-and-shorts"] },
    productSectionTitle: "Clothing picks",
  }),

  "budget-spreadsheet": page({
    slug: "budget-spreadsheet",
    category: "spreadsheet",
    title: "Budget Spreadsheet | Finds Under $50",
    metaDescription:
      "Budget spreadsheet for agent finds under $50 — tees, accessories, and entry sneakers with BoonBuy links.",
    badge: "Budget spreadsheet",
    h1: "Budget spreadsheet",
    intro:
      "Budget spreadsheets cap row prices so beginners do not click $200 jackets by accident. Remember service fees and international shipping still apply — a $18 tee can become a $40 landed lesson if you ship alone.",
    keywords: ["budget spreadsheet", "cheap rep spreadsheet", "under 50 finds"],
    sections: [
      {
        heading: "Smart budget rules",
        paragraphs: [
          "Bundle budget lines into one parcel. Prioritize categories with lower failure rates — caps, socks, basic tees — before gambling on budget leather.",
        ],
        links: [
          { href: "/best-under-20", label: "Under $20" },
          { href: "/best-under-50", label: "Under $50" },
          { href: "/best-budget-finds", label: "Budget finds" },
        ],
      },
      {
        heading: "Quality expectations",
        paragraphs: [
          "Low price tiers mean lower-tier batches. QC references show what you should expect — not retail perfection.",
        ],
      },
    ],
    faqs: buildGuideFaqs("budget spreadsheets"),
    relatedLinks: [{ href: "/best-budget-finds", label: "Budget finds" }],
    relatedArticleSlugs: ["spreadsheet", "best-spreadsheet", "clothing-spreadsheet"],
    spreadsheetHref: "/boonbuy-spreadsheet",
    productFilter: { maxPrice: 50 },
    productSectionTitle: "Budget finds under $50",
  }),

  "luxury-spreadsheet": page({
    slug: "luxury-spreadsheet",
    category: "spreadsheet",
    title: "Luxury Spreadsheet | High-End Finds 2026",
    metaDescription:
      "Luxury spreadsheet for high-end bags, watches, and designer apparel — QC-heavy rows for serious haulers.",
    badge: "Luxury spreadsheet",
    h1: "Luxury spreadsheet",
    intro:
      "Luxury spreadsheets trade volume for scrutiny. Fewer rows, more QC commentary, higher stakes per click. Use them after you understand warehouse disputes and insurance options.",
    keywords: ["luxury spreadsheet", "designer spreadsheet", "high end rep spreadsheet"],
    sections: [
      {
        heading: "Risk management",
        paragraphs: [
          "Insure parcels when offered. Photograph unboxing. Keep support tickets factual with image attachments.",
        ],
      },
      {
        heading: "Overlap with designer hub",
        paragraphs: [
          "Designer and luxury hubs share DNA — bags, leather goods, watches. Watches add movement and weight verification layers.",
        ],
        links: [
          { href: "/designer-spreadsheet", label: "Designer spreadsheet" },
          { href: "/best-watches", label: "Best watches" },
        ],
      },
    ],
    faqs: buildGuideFaqs("luxury spreadsheets"),
    relatedLinks: [{ href: "/top-designer-bags", label: "Designer bags" }],
    relatedArticleSlugs: ["designer-spreadsheet", "china-spreadsheet", "best-spreadsheet"],
    spreadsheetHref: "/boonbuy-spreadsheet",
    productFilter: { minPrice: 80, requireQc: true },
    productSectionTitle: "Higher-tier QC finds",
  }),

  "best-boonbuy-spreadsheet": page({
    slug: "best-boonbuy-spreadsheet",
    category: "spreadsheet",
    title: "Best BoonBuy Spreadsheet 2026 | Top Catalog Picks",
    metaDescription:
      "Best BoonBuy spreadsheet for 2026 — curated catalog slices, QC finds, and verified agent links on BoonBuy Finds.",
    badge: "Best BoonBuy spreadsheet",
    h1: "Best BoonBuy spreadsheet",
    intro:
      "The best BoonBuy spreadsheet is the live BoonBuy Finds index plus focused hubs — shoes, designer, budget, and trending rails — rather than a single static file. This page collects the highest-signal entry points.",
    keywords: ["best boonbuy spreadsheet", "boonbuy spreadsheet", "boonbuy finds spreadsheet"],
    sections: [
      {
        heading: "Top entry URLs",
        paragraphs: [
          "Homepage search for ad-hoc hunts. /boonbuy-spreadsheet for brand intent. Category pages for hoodies, shoes, jackets. Trending for community-weighted heat.",
        ],
        links: [
          { href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" },
          { href: "/trending-finds", label: "Trending finds" },
          { href: "/boonbuy-spreadsheet-2026", label: "2026 edition" },
        ],
      },
      {
        heading: "Maintenance and trust",
        paragraphs: [
          "We filter broken listings and surface QC when sources provide it. Telegram still leads on speed; this site leads on structure.",
        ],
      },
    ],
    faqs: buildGuideFaqs("the best BoonBuy spreadsheet"),
    relatedLinks: [{ href: "/best-spreadsheet", label: "Best spreadsheet overall" }],
    relatedArticleSlugs: SHEET_RELATED,
    spreadsheetHref: "/boonbuy-spreadsheet",
    productFilter: { trending: true },
    productSectionTitle: "Trending BoonBuy spreadsheet picks",
  }),
};
