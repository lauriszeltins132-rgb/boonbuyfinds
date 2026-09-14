import { getBrandsFromProducts } from "./brands";
import { getEditorsPicks, getMostSavedPicks } from "./discovery";
import { filterFeaturedEligible } from "./product-media";
import { hasExactPrice } from "./pricing";
import {
  getAllProducts,
  getLatestProducts,
  getTrendingProducts,
} from "./products";
import type { Product } from "./types";

export type FindsHubConfig = {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  intro: string;
  directAnswer: string;
  keyFacts: string[];
  freshnessLabel: string;
  getProducts: () => Product[];
  relatedBrandSlugs: string[];
  relatedCategorySlugs: string[];
  relatedHubHrefs: { href: string; label: string }[];
  relatedGuideHrefs: { href: string; label: string }[];
  authorityLinks: { href: string; label: string }[];
  faqs: { question: string; answer: string }[];
  /** When true, inject today's date into title/description for Discover freshness. */
  dateInMeta?: boolean;
};

function priced(items: Product[]) {
  return items.filter((p) => hasExactPrice(p.price));
}

function byCategory(...slugs: string[]) {
  return filterFeaturedEligible(
    priced(getAllProducts().filter((p) => slugs.includes(p.category_slug)))
  ).slice(0, 96);
}

const AUTHORITY = [
  { href: "/finds", label: "Browse finds" },
  { href: "/boonbuy-finds", label: "BoonBuy finds" },
  { href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" },
  { href: "/boonbuy-qc", label: "BoonBuy QC" },
  { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
  { href: "/boonbuy-discord", label: "BoonBuy Discord" },
  { href: "/boonbuy-telegram", label: "BoonBuy Telegram" },
  { href: "/latest-finds", label: "Latest finds" },
] as const;

const HUB_MESH = [
  { href: "/finds", label: "Browse finds" },
  { href: "/sneaker-finds", label: "Sneaker finds" },
  { href: "/clothing-finds", label: "Clothing finds" },
  { href: "/streetwear-finds", label: "Streetwear finds" },
  { href: "/hoodie-finds", label: "Hoodie finds" },
  { href: "/jacket-finds", label: "Jacket finds" },
  { href: "/bag-finds", label: "Bag finds" },
  { href: "/rep-finds", label: "Rep finds" },
  { href: "/best-rep-finds", label: "Best rep finds" },
] as const;

export const FINDS_HUB_PAGES: Record<string, FindsHubConfig> = {
  finds: {
    slug: "finds",
    path: "/finds",
    title: "Browse BoonBuy Finds | Catalog Discovery Hub",
    metaDescription:
      "Browse BoonBuy finds — sneakers, streetwear, jackets, and accessories with photos, categories, brands, and verified BoonBuy checkout links.",
    badge: "Browse finds",
    h1: "Browse finds",
    intro:
      "Start here to browse the BoonBuy Finds catalog. Jump into categories and brands, open latest or trending rails, then continue to a product page and a verified BoonBuy checkout link when you are ready.",
    directAnswer:
      "The finds hub is the browse-first discovery layer for BoonBuy Finds — categories, brands, and product grids with photos and verified BoonBuy links, not checkout itself.",
    keyFacts: [
      "Browse the live catalog by category, brand, or freshness rails",
      "Product pages include photos and QC references when available",
      "Checkout, warehouse QC, and shipping happen on BoonBuy",
      "Pair discovery with the spreadsheet hub and coupon pages when useful",
    ],
    freshnessLabel: "Catalog synced daily",
    getProducts: () => getEditorsPicks(96),
    relatedBrandSlugs: ["nike", "jordan", "stussy", "moncler", "adidas"],
    relatedCategorySlugs: [
      "shoes",
      "hoodies-and-pants",
      "coats-and-jackets",
      "accessories",
    ],
    relatedHubHrefs: [...HUB_MESH.filter((l) => l.href !== "/finds")],
    relatedGuideHrefs: [
      { href: "/boonbuy-finds", label: "What is BoonBuy Finds?" },
      { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
      { href: "/boonbuy-spreadsheet", label: "Spreadsheet hub" },
      { href: "/boonbuy-qc", label: "QC photos" },
    ],
    authorityLinks: [...AUTHORITY.filter((l) => l.href !== "/finds")],
    faqs: [
      {
        question: "Is /finds the same as /boonbuy-finds?",
        answer:
          "No. /finds is the browse/discovery hub. /boonbuy-finds is the branded BoonBuy finds catalog page for people searching “BoonBuy finds” specifically.",
      },
      {
        question: "Can I check out here?",
        answer:
          "No. Browse and shortlist on BoonBuy Finds, then open the verified BoonBuy link to pay, request warehouse QC, and ship.",
      },
      {
        question: "Where should I go for brand-new imports?",
        answer:
          "Use Latest finds for newest catalog additions, and Trending for engagement-weighted picks.",
      },
    ],
  },

  "latest-finds": {
    slug: "latest-finds",
    path: "/latest-finds",
    title: "Latest BoonBuy Finds",
    metaDescription:
      "Latest BoonBuy finds updated daily — newest sneakers, streetwear, and accessories with QC photos and verified BoonBuy links.",
    badge: "Fresh drops",
    h1: "Latest finds",
    intro:
      "The newest additions to the BoonBuy Finds catalog — synced from spreadsheet and marketplace imports, then sorted newest-first so you can scan what just landed before it gets buried.",
    directAnswer:
      "Latest finds are the newest BoonBuy catalog products, sorted by recency, with photos, pricing context, and verified checkout links.",
    keyFacts: [
      "Sorted newest-first from the live catalog sync",
      "Updated daily as spreadsheet and import pipelines refresh",
      "Pair with coupons before you consolidate a haul",
      "Use QC guides before approving warehouse photos",
    ],
    freshnessLabel: "Updated daily",
    dateInMeta: true,
    getProducts: () =>
      filterFeaturedEligible(priced(getLatestProducts())).slice(0, 96),
    relatedBrandSlugs: ["nike", "jordan", "stussy", "moncler"],
    relatedCategorySlugs: ["shoes", "hoodies-and-pants", "coats-and-jackets"],
    relatedHubHrefs: [...HUB_MESH],
    relatedGuideHrefs: [
      { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
      { href: "/boonbuy-qc", label: "QC guide" },
    ],
    authorityLinks: [...AUTHORITY],
    faqs: [
      {
        question: "How often do latest finds update?",
        answer:
          "The grid refreshes with the catalog sync — typically daily. The page shows when the dataset was last synced.",
      },
      {
        question: "Is this the same as trending?",
        answer:
          "No. Latest finds prioritize recency. Trending prioritizes engagement and velocity.",
      },
    ],
  },

  "sneaker-finds": {
    slug: "sneaker-finds",
    path: "/sneaker-finds",
    title: "Sneaker Finds 2026 | Nike, Jordan, Adidas & QC Photos",
    metaDescription:
      "BoonBuy sneaker finds — Nike, Jordan, Adidas and more with QC photo references, spreadsheet discovery, and verified BoonBuy checkout links.",
    badge: "Sneakers",
    h1: "Sneaker finds",
    intro:
      "Sneaker finds from the BoonBuy Finds database — Dunks, Jordans, and everyday runners with photos, QC signals where available, and verified BoonBuy buy links instead of raw spreadsheet rows.",
    directAnswer:
      "Sneaker finds are BoonBuy-indexed footwear listings with photos, brand and category context, and verified agent checkout links for Weidian and Taobao pairs.",
    keyFacts: [
      "Covers Nike, Jordan, Adidas and related silhouettes",
      "QC references help shortlist batches before you order",
      "Confirm size and live price on BoonBuy before paying",
      "Request warehouse QC before international shipping",
    ],
    freshnessLabel: "Updated regularly",
    getProducts: () => byCategory("shoes"),
    relatedBrandSlugs: ["nike", "jordan", "adidas", "new-balance"],
    relatedCategorySlugs: ["shoes"],
    relatedHubHrefs: HUB_MESH.filter((l) => l.href !== "/sneaker-finds"),
    relatedGuideHrefs: [
      { href: "/guides/qc-checklist-for-shoes", label: "Sneaker QC checklist" },
      { href: "/best-sneakers", label: "Best sneakers list" },
      { href: "/boonbuy-qc", label: "QC hub" },
    ],
    authorityLinks: [...AUTHORITY],
    faqs: [
      {
        question: "How do I buy a sneaker find?",
        answer:
          "Open the product page, review photos and QC notes, then use the BoonBuy link to order. Claim a shipping coupon before you consolidate.",
      },
      {
        question: "Do all sneakers have QC photos?",
        answer:
          "No. Some listings include reference QC; all orders can request warehouse QC on BoonBuy after purchase.",
      },
    ],
  },

  "clothing-finds": {
    slug: "clothing-finds",
    path: "/clothing-finds",
    title: "Clothing Finds 2026 | Streetwear, Tees & Layers",
    metaDescription:
      "BoonBuy clothing finds — tees, layers, and apparel picks with QC context, spreadsheet-style discovery, and verified BoonBuy links.",
    badge: "Clothing",
    h1: "Clothing finds",
    intro:
      "Apparel discoveries across tees, shorts, and everyday layers from the BoonBuy Finds catalog — organized for haul planning with photos and verified checkout links.",
    directAnswer:
      "Clothing finds are BoonBuy apparel listings spanning tees, shorts, and light layers, curated for discovery rather than a single brand silo.",
    keyFacts: [
      "Focuses on wearable apparel beyond pure sneakers",
      "Works well for budget and summer hauls",
      "Cross-shop hoodies and jackets in dedicated hubs",
      "Always verify size charts on BoonBuy",
    ],
    freshnessLabel: "Updated regularly",
    getProducts: () => byCategory("tshirts-and-shorts", "hoodies-and-pants"),
    relatedBrandSlugs: ["stussy", "corteiz", "nike", "bape"],
    relatedCategorySlugs: ["tshirts-and-shorts", "hoodies-and-pants"],
    relatedHubHrefs: HUB_MESH.filter((l) => l.href !== "/clothing-finds"),
    relatedGuideHrefs: [
      { href: "/guides/best-summer-finds", label: "Summer finds guide" },
      { href: "/summer-finds", label: "Summer finds" },
    ],
    authorityLinks: [...AUTHORITY],
    faqs: [
      {
        question: "What counts as clothing finds?",
        answer:
          "Tees, shorts, and related apparel layers. For outerwear, use jacket finds; for heavy fleece, use hoodie finds.",
      },
    ],
  },

  "streetwear-finds": {
    slug: "streetwear-finds",
    path: "/streetwear-finds",
    title: "Streetwear Finds 2026 | Hoodies, Tees & Culture Brands",
    metaDescription:
      "BoonBuy streetwear finds — Stussy, Corteiz, Bape and more with QC photos, spreadsheet discovery, and verified BoonBuy links.",
    badge: "Streetwear",
    h1: "Streetwear finds",
    intro:
      "Culture-brand streetwear from the BoonBuy Finds catalog — hoodies, tees, and everyday pieces with photos and verified BoonBuy checkout instead of hunting Discord screenshots.",
    directAnswer:
      "Streetwear finds are BoonBuy-indexed culture-brand apparel and accessories curated for discovery, QC context, and verified agent links.",
    keyFacts: [
      "Blends hoodies, tees, and related streetwear categories",
      "Strong for Stussy, Corteiz, Bape-style searches",
      "Use Discord and Telegram for live batch chatter",
      "Pair with the spreadsheet hub for broader browsing",
    ],
    freshnessLabel: "Updated regularly",
    getProducts: () =>
      filterFeaturedEligible(
        priced([
          ...byCategory("hoodies-and-pants"),
          ...byCategory("tshirts-and-shorts"),
          ...getTrendingProducts().filter((p) =>
            ["hoodies-and-pants", "tshirts-and-shorts", "accessories"].includes(
              p.category_slug
            )
          ),
        ])
      )
        .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
        .slice(0, 96),
    relatedBrandSlugs: ["stussy", "corteiz", "bape", "supreme"],
    relatedCategorySlugs: ["hoodies-and-pants", "tshirts-and-shorts", "accessories"],
    relatedHubHrefs: HUB_MESH.filter((l) => l.href !== "/streetwear-finds"),
    relatedGuideHrefs: [
      { href: "/top-streetwear-finds", label: "Top streetwear list" },
      { href: "/boonbuy-discord", label: "Discord community" },
    ],
    authorityLinks: [...AUTHORITY],
    faqs: [
      {
        question: "Streetwear finds vs clothing finds?",
        answer:
          "Streetwear finds lean into culture brands and hoodie/tee silhouettes. Clothing finds are a broader apparel lane including lighter staples.",
      },
    ],
  },

  "hoodie-finds": {
    slug: "hoodie-finds",
    path: "/hoodie-finds",
    title: "Hoodie Finds 2026 | Streetwear Fleece & QC Photos",
    metaDescription:
      "BoonBuy hoodie finds — streetwear fleece with QC photo tips, spreadsheet discovery, and verified BoonBuy checkout links.",
    badge: "Hoodies",
    h1: "Hoodie finds",
    intro:
      "Hoodie and fleece finds from BoonBuy Finds — weight, print, and logo details matter, so use QC references and warehouse photos before you ship heavier parcels.",
    directAnswer:
      "Hoodie finds are BoonBuy fleece and hoodie listings with photos and verified checkout links, ideal for streetwear hauls where QC stitching and prints matter.",
    keyFacts: [
      "Heavier parcels — plan shipping early",
      "Check print alignment and cuff quality in QC",
      "Cross-link to streetwear and jacket hubs",
      "Claim shipping coupons before consolidating",
    ],
    freshnessLabel: "Updated regularly",
    getProducts: () => byCategory("hoodies-and-pants"),
    relatedBrandSlugs: ["stussy", "corteiz", "nike", "chrome-hearts"],
    relatedCategorySlugs: ["hoodies-and-pants"],
    relatedHubHrefs: HUB_MESH.filter((l) => l.href !== "/hoodie-finds"),
    relatedGuideHrefs: [
      { href: "/best-hoodies", label: "Best hoodies list" },
      { href: "/boonbuy-shipping", label: "Shipping guide" },
    ],
    authorityLinks: [...AUTHORITY],
    faqs: [
      {
        question: "Should I always QC hoodies?",
        answer:
          "Yes for branded prints and expensive fleece. Request warehouse photos on BoonBuy before international shipping.",
      },
    ],
  },

  "jacket-finds": {
    slug: "jacket-finds",
    path: "/jacket-finds",
    title: "Jacket Finds 2026 | Outerwear, Puffers & QC Photos",
    metaDescription:
      "BoonBuy jacket finds — puffers, shells, and outerwear with QC tips, spreadsheet discovery, and verified BoonBuy links.",
    badge: "Jackets",
    h1: "Jacket finds",
    intro:
      "Outerwear finds where QC and shipping weight matter most — BoonBuy Finds surfaces jackets with photos and verified links so you can shortlist before paying freight.",
    directAnswer:
      "Jacket finds are BoonBuy outerwear listings — puffers, shells, and coats — with photos, QC context, and verified agent checkout links.",
    keyFacts: [
      "Highest shipping impact category for many hauls",
      "Inspect logos, zippers, and fill in warehouse QC",
      "Compare shipping lines before consolidating",
      "Winter hub pairs well with these picks",
    ],
    freshnessLabel: "Updated regularly",
    getProducts: () => byCategory("coats-and-jackets"),
    relatedBrandSlugs: ["moncler", "canada-goose", "stone-island", "nike"],
    relatedCategorySlugs: ["coats-and-jackets"],
    relatedHubHrefs: HUB_MESH.filter((l) => l.href !== "/jacket-finds"),
    relatedGuideHrefs: [
      { href: "/best-jackets", label: "Best jackets list" },
      { href: "/winter-finds", label: "Winter finds" },
      { href: "/boonbuy-warehouse", label: "Warehouse guide" },
    ],
    authorityLinks: [...AUTHORITY],
    faqs: [
      {
        question: "Why are jacket finds riskier to ship blind?",
        answer:
          "Small defects are costly once freight is paid. Always review warehouse QC and compare volumetric weight quotes.",
      },
    ],
  },

  "bag-finds": {
    slug: "bag-finds",
    path: "/bag-finds",
    title: "Bag Finds 2026 | Designer Bags, Crossbody & QC Photos",
    metaDescription:
      "BoonBuy bag finds — designer and everyday bags with QC photo tips, spreadsheet discovery, and verified BoonBuy links.",
    badge: "Bags",
    h1: "Bag finds",
    intro:
      "Bag and accessories finds from the BoonBuy Finds catalog — hardware, leather grain, and stitching detail make QC essential before you ship.",
    directAnswer:
      "Bag finds are BoonBuy-indexed bag and related accessory listings with photos, QC context, and verified checkout links.",
    keyFacts: [
      "Hardware and logo placement deserve close QC",
      "Often lighter than jackets but still worth warehouse photos",
      "Browse related accessories category for belts and small goods",
      "Use spreadsheet filters when you know the silhouette",
    ],
    freshnessLabel: "Updated regularly",
    getProducts: () => byCategory("accessories"),
    relatedBrandSlugs: ["louis-vuitton", "gucci", "prada", "goyard"],
    relatedCategorySlugs: ["accessories"],
    relatedHubHrefs: HUB_MESH.filter((l) => l.href !== "/bag-finds"),
    relatedGuideHrefs: [
      { href: "/best-bags", label: "Best bags list" },
      { href: "/boonbuy-qc", label: "QC guide" },
    ],
    authorityLinks: [...AUTHORITY],
    faqs: [
      {
        question: "Are bag finds only designer?",
        answer:
          "No. The hub includes designer and everyday bags from the accessories category — filter by brand when you know what you want.",
      },
    ],
  },

  "rep-finds": {
    slug: "rep-finds",
    path: "/rep-finds",
    title: "Rep Finds | BoonBuy Catalog Discovery 2026",
    metaDescription:
      "Browse rep finds on BoonBuy Finds — sneakers, streetwear, and accessories with photos, QC signals, and verified BoonBuy checkout links.",
    badge: "Rep finds",
    h1: "Rep finds",
    intro:
      "A broad discovery lane for rep-style finds indexed on BoonBuy Finds. Use this hub when you want the wider catalog — then narrow into sneakers, jackets, or best-rep shortlists when you know the lane.",
    directAnswer:
      "Rep finds are BoonBuy Finds catalog products commonly shared as spreadsheet rows — photos, category context, and verified BoonBuy links for discovery before warehouse QC.",
    keyFacts: [
      "Broad catalog discovery — not a paid placement board",
      "Branch into sneaker, clothing, and bag finds hubs when ready",
      "QC references help shortlist; warehouse QC covers your order",
      "Use Best rep finds when you want a tighter shortlist",
    ],
    freshnessLabel: "Updated daily",
    getProducts: () =>
      filterFeaturedEligible(
        priced([...getTrendingProducts(), ...getEditorsPicks(48)])
      ).slice(0, 96),
    relatedBrandSlugs: ["nike", "jordan", "stussy", "moncler", "chrome-hearts"],
    relatedCategorySlugs: ["shoes", "hoodies-and-pants", "coats-and-jackets", "accessories"],
    relatedHubHrefs: [...HUB_MESH.filter((l) => l.href !== "/rep-finds")],
    relatedGuideHrefs: [
      { href: "/best-rep-finds", label: "Best rep finds" },
      { href: "/boonbuy-qc", label: "QC guide" },
      { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
      { href: "/boonbuy-review", label: "BoonBuy review" },
    ],
    authorityLinks: [...AUTHORITY],
    faqs: [
      {
        question: "How is this different from Best rep finds?",
        answer:
          "Rep finds is the broader discovery hub. Best rep finds is a tighter shortlist ranked by editor and engagement signals.",
      },
      {
        question: "Does “rep finds” mean guaranteed quality?",
        answer:
          "No. Listings come from third-party marketplace sellers. Use reference QC when available and always review warehouse QC before shipping.",
      },
    ],
  },

  "best-rep-finds": {
    slug: "best-rep-finds",
    path: "/best-rep-finds",
    title: "Best Rep Finds 2026 | QC-Backed BoonBuy Picks",
    metaDescription:
      "Best rep finds on BoonBuy Finds — editor and engagement-ranked products with QC signals, spreadsheet discovery, and verified BoonBuy links.",
    badge: "Best finds",
    h1: "Best rep finds",
    intro:
      "A curated shortlist of standout BoonBuy Finds — combining QC availability, presentation quality, and engagement so you spend less time scrolling thin spreadsheet rows.",
    directAnswer:
      "Best rep finds are high-signal BoonBuy catalog picks ranked for QC context, photos, and engagement — a starting haul shortlist, not a paid placement list.",
    keyFacts: [
      "Editor and quality signals — not paid ads",
      "Start here, then branch into category finds hubs",
      "Still request warehouse QC on anything you ship",
      "Coupons and shipping guides lower total haul cost",
    ],
    freshnessLabel: "Updated daily",
    getProducts: () => {
      const editors = getEditorsPicks(48);
      const saved = getMostSavedPicks(48);
      const seen = new Set<string>();
      const merged: Product[] = [];
      for (const p of [...editors, ...saved]) {
        if (seen.has(p.id)) continue;
        seen.add(p.id);
        merged.push(p);
        if (merged.length >= 96) break;
      }
      return filterFeaturedEligible(priced(merged));
    },
    relatedBrandSlugs: ["nike", "jordan", "moncler", "louis-vuitton"],
    relatedCategorySlugs: ["shoes", "coats-and-jackets", "accessories"],
    relatedHubHrefs: [...HUB_MESH.filter((l) => l.href !== "/best-rep-finds")],
    relatedGuideHrefs: [
      { href: "/best-finds", label: "Best finds hub" },
      { href: "/guides/best-rep-sneakers", label: "Best rep sneakers guide" },
      { href: "/boonbuy-review", label: "BoonBuy review" },
    ],
    authorityLinks: [...AUTHORITY],
    faqs: [
      {
        question: "Is best rep finds the same as rep finds?",
        answer:
          "Same family, different depth. /rep-finds is broader catalog discovery; /best-rep-finds is a tighter shortlist. /best-finds remains the ranked best-of collection.",
      },
    ],
  },
};

export const FINDS_HUB_SLUGS = Object.keys(FINDS_HUB_PAGES);

export function getFindsHubPage(slug: string): FindsHubConfig | undefined {
  return FINDS_HUB_PAGES[slug];
}

export function getFindsHubBrands(config: FindsHubConfig) {
  const all = getBrandsFromProducts(getAllProducts());
  return config.relatedBrandSlugs
    .map((slug) => all.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => !!b);
}

export function getFindsHubCategories(config: FindsHubConfig) {
  const products = getAllProducts();
  return config.relatedCategorySlugs.map((slug) => {
    const count = products.filter((p) => p.category_slug === slug).length;
    const name =
      slug === "shoes"
        ? "Shoes"
        : slug === "coats-and-jackets"
          ? "Coats & Jackets"
          : slug === "hoodies-and-pants"
            ? "Hoodies & Pants"
            : slug === "tshirts-and-shorts"
              ? "T-shirts & Shorts"
              : slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
    return { slug, name, href: `/categories/${slug}`, count };
  });
}
