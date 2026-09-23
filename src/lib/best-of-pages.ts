import { extractBrand, getBrandsFromProducts } from "./brands";
import { getEditorsPicks, getMostSavedPicks } from "./discovery";
import { getEngagementPicks } from "./engagement-picks";
import { getMonthlyHighlights } from "./popular-picks";
import { filterFeaturedEligible } from "./product-media";
import { hasExactPrice } from "./pricing";
import { getAllProducts, getDealProducts, getTrendingProducts } from "./products";
import type { Product } from "./types";

export type BestOfPageConfig = {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  intro: string;
  directAnswer?: string;
  keyFacts?: string[];
  getProducts: () => Product[];
  relatedBrandSlugs: string[];
  relatedCategorySlugs: string[];
  relatedGuideHrefs: { href: string; label: string }[];
  relatedBestOfHrefs: { href: string; label: string }[];
  faqs: { question: string; answer: string }[];
};

function priced(items: Product[]) {
  return items.filter((p) => hasExactPrice(p.price));
}

function byMaxPrice(max: number) {
  return filterFeaturedEligible(priced(getAllProducts().filter((p) => p.price! <= max))).slice(
    0,
    96
  );
}

function byCategory(...slugs: string[]) {
  return filterFeaturedEligible(
    priced(getAllProducts().filter((p) => slugs.includes(p.category_slug)))
  ).slice(0, 96);
}

function withQc() {
  return filterFeaturedEligible(
    priced(getAllProducts().filter((p) => p.qc_link))
  ).slice(0, 96);
}

const GUIDE_CLUSTER = [
  { href: "/boonbuy-guide", label: "BoonBuy guide" },
  { href: "/boonbuy-qc", label: "BoonBuy QC guide" },
  { href: "/how-to-buy", label: "How to buy" },
];

export const BEST_OF_PAGES: Record<string, BestOfPageConfig> = {
  "best-finds": {
    slug: "best-finds",
    path: "/best-finds",
    title: "Best BoonBuy Finds",
    metaDescription:
      "Best BoonBuy finds including sneakers, hoodies, jackets, bags and QC-approved products — updated daily from the BoonBuy Finds catalog.",
    badge: "Best of",
    h1: "Best BoonBuy finds",
    intro:
      "Editor-ranked picks from the BoonBuy Finds catalog — combining QC availability, photos, engagement, and verified buy links. Refreshed daily.",
    getProducts: () => getEditorsPicks(96),
    relatedBrandSlugs: ["nike", "jordan", "moncler", "adidas"],
    relatedCategorySlugs: ["shoes", "coats-and-jackets", "hoodies-and-pants"],
    relatedGuideHrefs: [
      { href: "/best-boonbuy-finds", label: "Best finds guide" },
      ...GUIDE_CLUSTER,
    ],
    relatedBestOfHrefs: [
      { href: "/best-finds-this-week", label: "This week" },
      { href: "/best-qc-items", label: "QC items" },
    ],
    faqs: [
      {
        question: "How are best finds ranked?",
        answer:
          "Products are scored on QC links, image quality, engagement, and premium brand weighting — then rotated daily.",
      },
      {
        question: "Do prices change?",
        answer: "Confirm live BoonBuy prices at checkout. Catalog prices sync daily.",
      },
    ],
  },

  "best-finds-this-week": {
    slug: "best-finds-this-week",
    path: "/best-finds-this-week",
    title: "Best BoonBuy Finds This Week",
    metaDescription:
      "Best BoonBuy finds this week — trending sneakers, jackets, hoodies and streetwear with verified links.",
    badge: "This week",
    h1: "Best finds this week",
    intro:
      "Trending picks from the last seven days across sneakers, outerwear, and streetwear — ranked from catalog and engagement signals.",
    getProducts: () =>
      filterFeaturedEligible(priced(getTrendingProducts())).slice(0, 96),
    relatedBrandSlugs: ["nike", "jordan", "stone-island", "supreme"],
    relatedCategorySlugs: ["shoes", "hoodies-and-pants"],
    relatedGuideHrefs: GUIDE_CLUSTER,
    relatedBestOfHrefs: [
      { href: "/best-finds", label: "All best finds" },
      { href: "/best-finds-this-month", label: "This month" },
    ],
    faqs: [
      {
        question: "How often does this list update?",
        answer: "The grid refreshes daily with catalog sync and trending rotation.",
      },
    ],
  },

  "best-finds-this-month": {
    slug: "best-finds-this-month",
    path: "/best-finds-this-month",
    title: "Best BoonBuy Finds This Month",
    metaDescription:
      "Best BoonBuy finds this month — standout sneakers, jackets, bags and accessories from the last 30 days.",
    badge: "This month",
    h1: "Best finds this month",
    intro:
      "Monthly highlights combining recency, QC, and community clicks — ideal for building a haul or sharing with friends.",
    getProducts: () => getMonthlyHighlights(96),
    relatedBrandSlugs: ["nike", "moncler", "louis-vuitton", "gucci"],
    relatedCategorySlugs: ["shoes", "accessories", "coats-and-jackets"],
    relatedGuideHrefs: GUIDE_CLUSTER,
    relatedBestOfHrefs: [
      { href: "/best-finds-this-week", label: "This week" },
      { href: "/best-finds", label: "All best finds" },
    ],
    faqs: [],
  },

  "best-under-20": {
    slug: "best-under-20",
    path: "/best-under-20",
    title: "Best BoonBuy Finds Under $20",
    metaDescription:
      "Best BoonBuy finds under $20 — budget sneakers, tees, accessories and low-risk haul fillers.",
    badge: "Under $20",
    h1: "Best finds under $20",
    intro:
      "Low-cost picks under $20 for first hauls or filling shipping weight — all with verified BoonBuy links.",
    getProducts: () => byMaxPrice(20),
    relatedBrandSlugs: ["nike", "adidas", "supreme"],
    relatedCategorySlugs: ["accessories", "tshirts-and-shorts"],
    relatedGuideHrefs: GUIDE_CLUSTER,
    relatedBestOfHrefs: [
      { href: "/best-under-30", label: "Under $30" },
      { href: "/best-under-50", label: "Under $50" },
    ],
    faqs: [
      {
        question: "Are under-$20 finds good quality?",
        answer:
          "Budget items vary by seller. Check QC references and reviews before shipping internationally.",
      },
    ],
  },

  "best-under-30": {
    slug: "best-under-30",
    path: "/best-under-30",
    title: "Best BoonBuy Finds Under $30",
    metaDescription:
      "Best BoonBuy finds under $30 including sneakers, hoodies, jackets and accessories — updated daily.",
    badge: "Under $30",
    h1: "Best finds under $30",
    intro:
      "Affordable finds under $30 that still look premium — perfect for budget hauls and everyday rotation pieces.",
    getProducts: () => getDealProducts(30).filter((p) => hasExactPrice(p.price)).slice(0, 96),
    relatedBrandSlugs: ["nike", "adidas", "new-balance"],
    relatedCategorySlugs: ["hoodies-and-pants", "shoes"],
    relatedGuideHrefs: GUIDE_CLUSTER,
    relatedBestOfHrefs: [
      { href: "/best-under-20", label: "Under $20" },
      { href: "/best-under-50", label: "Under $50" },
    ],
    faqs: [],
  },

  "best-under-50": {
    slug: "best-under-50",
    path: "/best-under-50",
    title: "Best BoonBuy Finds Under $50",
    metaDescription:
      "Discover the best BoonBuy finds under $50 including sneakers, hoodies, jackets, bags and QC-approved products.",
    badge: "Under $50",
    h1: "Best finds under $50",
    intro:
      "The sweet spot for many buyers — sneakers, hoodies, and accessories under $50 with QC references where available.",
    getProducts: () => byMaxPrice(50),
    relatedBrandSlugs: ["nike", "jordan", "asics"],
    relatedCategorySlugs: ["shoes", "hoodies-and-pants", "accessories"],
    relatedGuideHrefs: GUIDE_CLUSTER,
    relatedBestOfHrefs: [
      { href: "/best-under-30", label: "Under $30" },
      { href: "/best-under-100", label: "Under $100" },
    ],
    faqs: [
      {
        question: "What are the best under-$50 sneakers?",
        answer: "Check the product grid below — Nike, Adidas, and New Balance styles rotate daily.",
      },
    ],
  },

  "best-under-100": {
    slug: "best-under-100",
    path: "/best-under-100",
    title: "Best BoonBuy Finds Under $100",
    metaDescription:
      "Best BoonBuy finds under $100 — sneakers, jackets, bags and designer picks with verified links.",
    badge: "Under $100",
    h1: "Best finds under $100",
    intro:
      "Mid-range finds under $100 including sneakers, outerwear, and bags — balanced value before shipping.",
    getProducts: () => byMaxPrice(100),
    relatedBrandSlugs: ["moncler", "nike", "jordan", "gucci"],
    relatedCategorySlugs: ["shoes", "coats-and-jackets", "accessories"],
    relatedGuideHrefs: GUIDE_CLUSTER,
    relatedBestOfHrefs: [
      { href: "/best-under-50", label: "Under $50" },
      { href: "/best-jackets", label: "Best jackets" },
    ],
    faqs: [],
  },

  "best-sneakers": {
    slug: "best-sneakers",
    path: "/best-sneakers",
    title: "Best BoonBuy Sneakers",
    metaDescription:
      "Best BoonBuy sneakers — Nike, Jordan, Adidas, New Balance and more with QC links and verified buy buttons.",
    badge: "Sneakers",
    h1: "Best sneakers",
    intro:
      "Top sneaker finds from the BoonBuy catalog — Dunks, Jordans, Campus styles, and runners with daily updates.",
    getProducts: () => byCategory("shoes"),
    relatedBrandSlugs: ["nike", "jordan", "adidas", "new-balance", "asics"],
    relatedCategorySlugs: ["shoes"],
    relatedGuideHrefs: [
      { href: "/boonbuy-sneakers", label: "BoonBuy sneakers guide" },
      ...GUIDE_CLUSTER,
    ],
    relatedBestOfHrefs: [
      { href: "/best-under-50", label: "Sneakers under $50" },
      { href: "/best-qc-items", label: "QC sneakers" },
    ],
    faqs: [
      {
        question: "Which sneaker brands are most popular?",
        answer: "Nike, Jordan, and Adidas lead searches. Use brand pages for focused browsing.",
      },
    ],
  },

  "best-jackets": {
    slug: "best-jackets",
    path: "/best-jackets",
    title: "Best BoonBuy Jackets",
    metaDescription:
      "Best BoonBuy jackets — Moncler, puffers, shells and streetwear outerwear with QC-approved listings.",
    badge: "Jackets",
    h1: "Best jackets",
    intro:
      "Outerwear picks including puffers, shells, and designer jackets — always QC before shipping heavy items.",
    getProducts: () => byCategory("coats-and-jackets"),
    relatedBrandSlugs: ["moncler", "canada-goose", "arcteryx", "stone-island"],
    relatedCategorySlugs: ["coats-and-jackets"],
    relatedGuideHrefs: [
      { href: "/boonbuy-jackets", label: "BoonBuy jackets guide" },
      ...GUIDE_CLUSTER,
    ],
    relatedBestOfHrefs: [
      { href: "/best-under-100", label: "Under $100" },
      { href: "/best-qc-items", label: "QC outerwear" },
    ],
    faqs: [],
  },

  "best-hoodies": {
    slug: "best-hoodies",
    path: "/best-hoodies",
    title: "Best BoonBuy Hoodies",
    metaDescription:
      "Best BoonBuy hoodies and streetwear layers — Supreme, Nike tech, and graphic hoodies with verified links.",
    badge: "Hoodies",
    h1: "Best hoodies",
    intro:
      "Hoodies, crewnecks, and sweatshirt layers from across the catalog — filter by brand on each product page.",
    getProducts: () => byCategory("hoodies-and-pants"),
    relatedBrandSlugs: ["supreme", "nike", "stussy", "bape"],
    relatedCategorySlugs: ["hoodies-and-pants"],
    relatedGuideHrefs: GUIDE_CLUSTER,
    relatedBestOfHrefs: [
      { href: "/best-under-50", label: "Under $50" },
      { href: "/best-finds", label: "All best finds" },
    ],
    faqs: [],
  },

  "best-bags": {
    slug: "best-bags",
    path: "/best-bags",
    title: "Best BoonBuy Bags",
    metaDescription:
      "Best BoonBuy bags — designer handbags, crossbody, travel bags and backpacks with verified agent links.",
    badge: "Bags",
    h1: "Best bags",
    intro:
      "Designer and streetwear bags from Louis Vuitton, Gucci, Goyard, and more — QC hardware before you ship.",
    getProducts: () =>
      filterFeaturedEligible(
        priced(
          getAllProducts().filter(
            (p) =>
              p.category_slug === "accessories" &&
              /bag|tote|crossbody|backpack|keepall|speedy|neverfull/i.test(
                p.product_name
              )
          )
        )
      ).slice(0, 96),
    relatedBrandSlugs: ["louis-vuitton", "gucci", "goyard", "dior"],
    relatedCategorySlugs: ["accessories"],
    relatedGuideHrefs: [
      { href: "/best-boonbuy-bags-2026", label: "Bags 2026" },
      ...GUIDE_CLUSTER,
    ],
    relatedBestOfHrefs: [
      { href: "/best-accessories", label: "All accessories" },
      { href: "/best-qc-items", label: "QC bags" },
    ],
    faqs: [],
  },

  "best-accessories": {
    slug: "best-accessories",
    path: "/best-accessories",
    title: "Best BoonBuy Accessories",
    metaDescription:
      "Best BoonBuy accessories — hats, belts, glasses, jewelry and streetwear add-ons with verified links.",
    badge: "Accessories",
    h1: "Best accessories",
    intro:
      "Hats, belts, eyewear, and small pieces that complete a fit — great for filling out a haul under weight limits.",
    getProducts: () => byCategory("accessories"),
    relatedBrandSlugs: ["gucci", "louis-vuitton", "chrome-hearts"],
    relatedCategorySlugs: ["accessories"],
    relatedGuideHrefs: GUIDE_CLUSTER,
    relatedBestOfHrefs: [
      { href: "/best-bags", label: "Best bags" },
      { href: "/best-under-30", label: "Under $30" },
    ],
    faqs: [],
  },

  "best-jerseys": {
    slug: "best-jerseys",
    path: "/best-jerseys",
    title: "Best BoonBuy Jerseys 2026 | Football & Sports Finds",
    metaDescription:
      "Best BoonBuy jerseys — football, soccer and sports jersey finds with QC tips, price filters, and verified BoonBuy checkout links.",
    badge: "Jerseys",
    h1: "Best BoonBuy jerseys",
    intro:
      "Football and sports jersey finds for international buyers — compare prices, check name/number printing quality in QC references, then open verified BoonBuy links.",
    getProducts: () =>
      filterFeaturedEligible(
        priced(
          getAllProducts().filter((p) =>
            /jersey|football|soccer|nba|nfl/i.test(p.product_name)
          )
        )
      ).slice(0, 96),
    relatedBrandSlugs: ["nike", "adidas"],
    relatedCategorySlugs: ["tshirts-and-shorts", "accessories"],
    relatedGuideHrefs: [
      ...GUIDE_CLUSTER,
      { href: "/boonbuy-qc", label: "QC guide" },
    ],
    relatedBestOfHrefs: [
      { href: "/best-t-shirts", label: "Best t-shirts" },
      { href: "/best-under-30", label: "Under $30" },
      { href: "/best-accessories", label: "Accessories" },
    ],
    faqs: [
      {
        question: "How do I QC a jersey?",
        answer:
          "Check crest embroidery, sponsor logos, name-set spacing, and fabric thickness in warehouse photos before shipping.",
      },
    ],
  },

  "best-boonbuy-tech": {
    slug: "best-boonbuy-tech",
    path: "/best-boonbuy-tech",
    title: "Best BoonBuy Tech 2026 | Electronics Finds",
    metaDescription:
      "Best BoonBuy tech and electronics finds — earbuds, gadgets and accessories with verified links, QC tips, and shipping advice.",
    badge: "Tech",
    h1: "Best BoonBuy tech",
    intro:
      "Electronics and gadget finds from the BoonBuy Finds catalog. Confirm battery/shipping restrictions, request QC when relevant, and consolidate carefully before international freight.",
    getProducts: () => byCategory("electronics"),
    relatedBrandSlugs: ["apple", "sony"],
    relatedCategorySlugs: ["electronics", "accessories"],
    relatedGuideHrefs: [
      { href: "/boonbuy-shipping", label: "Shipping guide" },
      { href: "/boonbuy-warehouse", label: "Warehouse guide" },
      { href: "/how-to-buy", label: "How to buy" },
    ],
    relatedBestOfHrefs: [
      { href: "/best-accessories", label: "Accessories" },
      { href: "/categories/electronics", label: "Electronics category" },
      { href: "/deals", label: "Deals" },
    ],
    faqs: [
      {
        question: "Can I ship electronics with BoonBuy?",
        answer:
          "Often yes, but battery and brand-box rules vary by line. Check the live shipping form before you consolidate a tech-heavy parcel.",
      },
    ],
  },

  "best-qc-items": {
    slug: "best-qc-items",
    path: "/best-qc-items",
    title: "Best QC Approved BoonBuy Finds",
    metaDescription:
      "Best QC-approved BoonBuy finds — sneakers, jackets, bags with reference photos and warehouse QC tips.",
    badge: "QC approved",
    h1: "Best QC items",
    intro:
      "Products with QC reference links — the safest lane for international shipping when you review photos carefully.",
    getProducts: withQc,
    relatedBrandSlugs: ["nike", "jordan", "moncler", "louis-vuitton"],
    relatedCategorySlugs: ["shoes", "coats-and-jackets", "accessories"],
    relatedGuideHrefs: [
      { href: "/boonbuy-qc", label: "BoonBuy QC guide" },
      { href: "/guides/how-to-check-qc-photos", label: "How to check QC" },
    ],
    relatedBestOfHrefs: [
      { href: "/best-sneakers", label: "Best sneakers" },
      { href: "/best-jackets", label: "Best jackets" },
    ],
    faqs: [
      {
        question: "Does QC-approved mean warehouse photos?",
        answer:
          "Reference QC on find pages is from community examples. Request warehouse QC on BoonBuy after purchase.",
      },
    ],
  },

  "most-saved-finds": {
    slug: "most-saved-finds",
    path: "/most-saved-finds",
    title: "Most Saved BoonBuy Finds",
    metaDescription:
      "Most saved BoonBuy finds — wishlist-worthy sneakers, jackets, and streetwear ranked by engagement and catalog quality signals.",
    badge: "Most saved",
    h1: "Most saved finds",
    intro:
      "Community-favored picks from the BoonBuy Finds catalog — ranked by engagement and quality signals, refreshed as wishlist and browse activity updates.",
    directAnswer:
      "Most saved finds are high-engagement BoonBuy catalog picks that shoppers bookmark and revisit — a shortlist for haul planning before warehouse QC.",
    keyFacts: [
      "Ranked from engagement and quality scores, not paid placements",
      "Updated as catalog and analytics signals refresh",
      "Pair with QC guides before approving international shipping",
      "Cross-link to coupons and spreadsheet hubs when building a haul",
    ],
    getProducts: () => getMostSavedPicks(96),
    relatedBrandSlugs: ["nike", "jordan", "moncler", "stussy"],
    relatedCategorySlugs: ["shoes", "coats-and-jackets", "hoodies-and-pants"],
    relatedGuideHrefs: GUIDE_CLUSTER,
    relatedBestOfHrefs: [
      { href: "/most-viewed-finds", label: "Most viewed" },
      { href: "/editors-picks", label: "Editor's picks" },
      { href: "/best-finds", label: "Best finds" },
    ],
    faqs: [
      {
        question: "Is most saved the same as trending?",
        answer:
          "Not always. Trending emphasizes recent velocity; most saved emphasizes lasting wishlist interest and quality signals.",
      },
    ],
  },

  "most-viewed-finds": {
    slug: "most-viewed-finds",
    path: "/most-viewed-finds",
    title: "Most Viewed BoonBuy Finds",
    metaDescription:
      "Most viewed BoonBuy finds right now — popular sneakers, fashion, and accessories based on browse and engagement signals.",
    badge: "Most viewed",
    h1: "Most viewed finds",
    intro:
      "What shoppers are opening most on BoonBuy Finds — engagement-ranked products with photos, pricing context, and verified BoonBuy links.",
    directAnswer:
      "Most viewed finds surface the catalog items with the strongest recent browse and engagement signals on BoonBuy Finds.",
    keyFacts: [
      "Based on engagement picks with quality fallbacks",
      "Useful for spotting seasonal demand spikes",
      "Always confirm live BoonBuy price and size before paying",
      "Use warehouse QC before shipping anything international",
    ],
    getProducts: () => getEngagementPicks(96),
    relatedBrandSlugs: ["nike", "jordan", "adidas", "chrome-hearts"],
    relatedCategorySlugs: ["shoes", "accessories", "hoodies-and-pants"],
    relatedGuideHrefs: GUIDE_CLUSTER,
    relatedBestOfHrefs: [
      { href: "/most-saved-finds", label: "Most saved" },
      { href: "/trending", label: "Trending" },
      { href: "/best-finds-this-week", label: "This week" },
    ],
    faqs: [
      {
        question: "Does most viewed mean best quality?",
        answer:
          "Views show interest, not guaranteed batch quality. Still review QC photos and seller notes before shipping.",
      },
    ],
  },

  "summer-finds": {
    slug: "summer-finds",
    path: "/summer-finds",
    title: "Best Summer BoonBuy Finds",
    metaDescription:
      "Best summer BoonBuy finds — tees, shorts, sneakers, and light accessories with QC references and verified checkout links.",
    badge: "Seasonal",
    h1: "Summer finds",
    intro:
      "Warm-weather picks from the BoonBuy Finds catalog — lighter layers, shorts, tees, and sneakers for summer hauls, with QC-friendly shortlists.",
    directAnswer:
      "Summer finds on BoonBuy Finds focus on lighter categories — tees, shorts, sneakers, and accessories — curated for warmer-weather hauls.",
    keyFacts: [
      "Prioritizes t-shirts, shorts, sneakers, and accessories",
      "Budget lanes under $30/$50 pair well with summer hauls",
      "Still request warehouse QC on sneakers and branded tees",
      "Shipping weight is usually lower than winter outerwear",
    ],
    getProducts: () =>
      filterFeaturedEligible(
        priced(
          getAllProducts().filter((p) =>
            ["tshirts-and-shorts", "shoes", "accessories", "hoodies-and-pants"].includes(
              p.category_slug
            )
          )
        )
      ).slice(0, 96),
    relatedBrandSlugs: ["nike", "stussy", "corteiz", "adidas"],
    relatedCategorySlugs: ["tshirts-and-shorts", "shoes", "accessories"],
    relatedGuideHrefs: [
      { href: "/guides/best-summer-finds", label: "Summer guide" },
      ...GUIDE_CLUSTER,
    ],
    relatedBestOfHrefs: [
      { href: "/winter-finds", label: "Winter finds" },
      { href: "/best-under-30", label: "Under $30" },
      { href: "/best-shorts", label: "Best shorts" },
    ],
    faqs: [
      {
        question: "Is this updated for the current summer?",
        answer:
          "Yes — the product grid refreshes from the live catalog. Seasonal guides explain styling and haul tips.",
      },
    ],
  },

  "winter-finds": {
    slug: "winter-finds",
    path: "/winter-finds",
    title: "Best Winter BoonBuy Finds",
    metaDescription:
      "Best winter BoonBuy finds — jackets, hoodies, sneakers, and cold-weather accessories with QC tips and verified links.",
    badge: "Seasonal",
    h1: "Winter finds",
    intro:
      "Cold-weather BoonBuy Finds picks — jackets, hoodies, and sneakers where QC matter most before you pay international shipping on heavier parcels.",
    directAnswer:
      "Winter finds prioritize outerwear and heavier layers on BoonBuy Finds — categories where warehouse QC and shipping weight planning matter most.",
    keyFacts: [
      "Jackets and hoodies dominate winter haul volume",
      "Heavier parcels — compare shipping lines early",
      "QC stitching, logos, and fill quality before approving",
      "Pair with shipping coupon before consolidating",
    ],
    getProducts: () =>
      filterFeaturedEligible(
        priced(
          getAllProducts().filter((p) =>
            ["coats-and-jackets", "hoodies-and-pants", "shoes", "accessories"].includes(
              p.category_slug
            )
          )
        )
      ).slice(0, 96),
    relatedBrandSlugs: ["moncler", "canada-goose", "nike", "stone-island"],
    relatedCategorySlugs: ["coats-and-jackets", "hoodies-and-pants", "shoes"],
    relatedGuideHrefs: [
      { href: "/guides/best-winter-finds", label: "Winter guide" },
      { href: "/boonbuy-shipping", label: "Shipping guide" },
      ...GUIDE_CLUSTER,
    ],
    relatedBestOfHrefs: [
      { href: "/summer-finds", label: "Summer finds" },
      { href: "/best-jackets", label: "Best jackets" },
      { href: "/best-hoodies", label: "Best hoodies" },
    ],
    faqs: [
      {
        question: "Why does winter shipping cost more?",
        answer:
          "Outerwear adds volumetric weight. Use warehouse storage, compare lines, and claim a shipping coupon before you ship.",
      },
    ],
  },
};

export const BEST_OF_SLUGS = Object.keys(BEST_OF_PAGES);

export function getBestOfPage(slug: string): BestOfPageConfig | undefined {
  return BEST_OF_PAGES[slug];
}

export function getBestOfBrands(config: BestOfPageConfig) {
  const all = getBrandsFromProducts(getAllProducts());
  return config.relatedBrandSlugs
    .map((slug) => all.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => !!b);
}

export function getBestOfCategories(config: BestOfPageConfig) {
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
            : slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
    return { slug, name, href: `/categories/${slug}`, count };
  });
}

export function getBestOfSupplementaryRails(config: BestOfPageConfig) {
  const mainIds = new Set(config.getProducts().slice(0, 24).map((p) => p.id));
  const used = new Set(mainIds);

  const recentlyAdded = getAllProducts()
    .filter((p) => !used.has(p.id) && hasExactPrice(p.price) && p.image)
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 12);
  recentlyAdded.forEach((p) => used.add(p.id));

  const popularWeek = getTrendingProducts()
    .filter((p) => !used.has(p.id))
    .slice(0, 12);

  const mostSaved = getEngagementPicks(12).filter((p) => !used.has(p.id));

  return { recentlyAdded, popularWeek, mostSaved };
}

export function getContextualBestOfLinks(context: {
  categorySlug?: string;
  brandSlug?: string;
  maxPrice?: number;
}): { href: string; label: string }[] {
  const links: { href: string; label: string }[] = [
    { href: "/best-finds", label: "Best Finds" },
    { href: "/collections", label: "Collections" },
  ];

  const brandCollections: Record<string, string> = {
    nike: "/collections/best-nike-finds",
    jordan: "/collections/best-jordan-finds",
    moncler: "/collections/best-moncler-finds",
    stussy: "/collections/best-stussy-finds",
    corteiz: "/collections/best-corteiz-finds",
  };

  if (context.brandSlug && brandCollections[context.brandSlug]) {
    links.push({
      href: brandCollections[context.brandSlug],
      label: `Best ${context.brandSlug.replace(/-/g, " ")} collection`,
    });
  }

  if (context.categorySlug === "shoes" || context.brandSlug === "nike" || context.brandSlug === "jordan") {
    links.push({ href: "/collections/best-sneakers", label: "Best Sneakers" });
    links.push({ href: "/best-sneakers", label: "Sneakers list" });
  }
  if (context.categorySlug === "coats-and-jackets" || context.brandSlug === "moncler") {
    links.push({ href: "/collections/best-jackets", label: "Best Jackets" });
    links.push({ href: "/best-jackets", label: "Jackets list" });
  }
  if (context.categorySlug === "hoodies-and-pants") {
    links.push({ href: "/collections/best-hoodies", label: "Best Hoodies" });
    links.push({ href: "/best-hoodies", label: "Hoodies list" });
  }
  if (context.categorySlug === "accessories") {
    links.push({ href: "/collections/best-bags", label: "Best Bags" });
    links.push({ href: "/best-bags", label: "Bags list" });
  }

  if (context.maxPrice !== undefined && context.maxPrice <= 30) {
    links.push({ href: "/collections/best-under-30", label: "Under $30" });
  } else if (context.maxPrice !== undefined && context.maxPrice <= 50) {
    links.push({ href: "/collections/best-under-50", label: "Under $50" });
  } else {
    links.push({ href: "/collections/best-under-50", label: "Under $50" });
  }

  links.push({ href: "/collections/top-qc-finds", label: "Top QC Finds" });
  links.push({ href: "/collections/trending-this-week", label: "Trending Week" });

  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}
