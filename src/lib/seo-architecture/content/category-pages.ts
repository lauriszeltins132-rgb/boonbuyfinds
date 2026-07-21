import { buildGuideFaqs } from "@/lib/seo-architecture/content-builders";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";

function page(
  config: Omit<SeoArchitecturePage, "path"> & { slug: string }
): SeoArchitecturePage {
  return { ...config, path: `/${config.slug}` };
}

const CAT_RELATED = [
  "best-shoes",
  "best-sneakers",
  "best-hoodies",
  "trending-finds",
  "best-budget-finds",
];

type CategoryConfig = {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  intro: string;
  keywords: string[];
  filter: SeoArchitecturePage["productFilter"];
  extraSections?: SeoArchitecturePage["sections"];
};

function buildCategoryPage(c: CategoryConfig): SeoArchitecturePage {
  return page({
    slug: c.slug,
    category: "category",
    title: c.title,
    metaDescription: c.metaDescription,
    badge: "Category picks",
    h1: c.h1,
    intro: c.intro,
    keywords: c.keywords,
    sections: [
      {
        heading: `How we pick ${c.h1.toLowerCase()}`,
        paragraphs: [
          "Listings rank on photo clarity, exact pricing, QC references when available, and presentation — not paid placement. The grid refreshes as the catalog syncs.",
          "Open the agent link from the card you researched. Prices on marketplace listings can change before checkout; confirm variant and size inside BoonBuy.",
        ],
      },
      {
        heading: "Browse deeper",
        paragraphs: [
          "Use brand filters from each card's brand page, or jump to budget hubs if you are price-capped. Trending finds surfaces community momentum across categories.",
        ],
        links: [
          { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
          { href: "/trending-finds", label: "Trending" },
          { href: "/boonbuy-coupons", label: "Coupons" },
        ],
      },
      ...(c.extraSections ?? []),
    ],
    faqs: buildGuideFaqs(c.h1.toLowerCase()),
    relatedLinks: [
      { href: "/", label: "Homepage" },
      { href: "/collections", label: "Collections" },
    ],
    relatedArticleSlugs: CAT_RELATED,
    productFilter: c.filter,
    productSectionTitle: `Top ${c.h1.toLowerCase()} in the catalog`,
    spreadsheetHref: "/boonbuy-spreadsheet",
  });
}

export const CATEGORY_ARCHITECTURE_PAGES: Record<string, SeoArchitecturePage> = {
  "best-t-shirts": buildCategoryPage({
    slug: "best-t-shirts",
    title: "Best T-Shirts on BoonBuy Finds 2026",
    h1: "Best t-shirts",
    metaDescription:
      "Best t-shirt finds on BoonBuy — graphic tees, basics, and streetwear tops with QC references and agent links.",
    intro:
      "T-shirt rows are the highest-volume lines in any spreadsheet — low risk, fast turnover, easy to bundle. This page filters tee-weight listings across streetwear and designer-leaning graphics.",
    keywords: ["best t-shirts", "boonbuy t shirts", "streetwear tees"],
    filter: { categories: ["tshirts-and-shorts"], keywords: ["tee", "t-shirt", "shirt"] },
  }),

  "best-pants": buildCategoryPage({
    slug: "best-pants",
    title: "Best Pants & Trousers Finds 2026",
    h1: "Best pants",
    metaDescription:
      "Best pants finds — cargos, joggers, and trousers on BoonBuy Finds with sizing notes and QC photos.",
    intro:
      "Pants fail hauls when buyers skip inseam and waist charts. Filter here first, then measure a pair that fits well at home before you order Chinese sizing.",
    keywords: ["best pants", "cargo pants rep", "boonbuy pants"],
    filter: { categories: ["hoodies-and-pants"], keywords: ["pants", "cargo", "trouser", "jean"] },
  }),

  "best-shorts": buildCategoryPage({
    slug: "best-shorts",
    title: "Best Shorts Finds 2026 | Summer Haul Picks",
    h1: "Best shorts",
    metaDescription:
      "Best shorts for agent hauls — mesh, cargo, and branded summer picks with BoonBuy links.",
    intro:
      "Shorts are lightweight freight winners — good for filling parcel gaps. Check length in QC references; some batches run shorter than photos suggest.",
    keywords: ["best shorts", "summer finds", "boonbuy shorts"],
    filter: { categories: ["tshirts-and-shorts"], keywords: ["short"] },
  }),

  "best-watches": buildCategoryPage({
    slug: "best-watches",
    title: "Best Watches on Agent Finds 2026",
    h1: "Best watches",
    metaDescription:
      "Best watch finds — fashion watches and homage pieces with QC references. Research weight and dial details before buying.",
    intro:
      "Watch rows demand extra QC — dial alignment, bracelet weight, engraving depth. Treat this category as research-heavy; read references and warehouse photos carefully.",
    keywords: ["best watches", "rep watches", "agent watch finds"],
    filter: { keywords: ["watch"], requireQc: true },
    extraSections: [
      {
        heading: "Weight and movement expectations",
        paragraphs: [
          "Photos lie about heft. QC threads that mention movement type and bracelet grams matter more than studio lighting.",
        ],
        links: [{ href: "/luxury-spreadsheet", label: "Luxury spreadsheet" }],
      },
    ],
  }),

  "trending-finds": page({
    slug: "trending-finds",
    category: "category",
    title: "Trending Finds 2026 | Hot BoonBuy Catalog Picks",
    metaDescription:
      "Trending finds on BoonBuy Finds — what is hot in the catalog now with QC photos and verified BoonBuy links.",
    badge: "Trending",
    h1: "Trending finds",
    intro:
      "Trending finds reflect momentum in the catalog — recent clicks, fresh rows, and strong presentation. Use this rail when you want heat without opening Telegram.",
    keywords: ["trending finds", "boonbuy trending", "hot finds"],
    sections: [
      {
        heading: "How trending works",
        paragraphs: [
          "Signals combine recency, engagement where available, and editorial boosts. It is not a paid placement list — broken listings drop out.",
        ],
        links: [
          { href: "/trending", label: "Trending hub" },
          { href: "/trending-boonbuy-finds", label: "BoonBuy trending" },
        ],
      },
      {
        heading: "Pair with alerts",
        paragraphs: [
          "Telegram catches drops between index refreshes. Bookmark both trending pages and the channel for full coverage.",
        ],
        links: [{ href: "/boonbuy-telegram", label: "Telegram" }],
      },
    ],
    faqs: buildGuideFaqs("trending finds"),
    relatedLinks: [{ href: "/boonbuy-spreadsheet", label: "Spreadsheet" }],
    relatedArticleSlugs: CAT_RELATED,
    productFilter: { trending: true },
    productSectionTitle: "Trending now",
    spreadsheetHref: "/boonbuy-spreadsheet",
  }),
};
