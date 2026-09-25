import { BOONBUY_INVITE_CODE, BOONBUY_SHIPPING_DISCOUNT_PERCENT } from "@/lib/constants";
import type { AuthorityHubConfig } from "@/lib/boonbuy-authority-hub-types";
import { getAuthorityCatalogStats } from "@/lib/boonbuy-authority-stats";

const AUTHORITY_GRAPH = [
  { href: "/boonbuy", label: "What is BoonBuy" },
  { href: "/boonbuy-finds", label: "BoonBuy Finds" },
  { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
  { href: "/boonbuy-qc", label: "QC" },
  { href: "/boonbuy-shipping", label: "Shipping" },
  { href: "/boonbuy-coupons", label: "Coupons" },
  { href: "/boonbuy-warehouse", label: "Warehouse" },
  { href: "/boonbuy-review", label: "Review" },
  { href: "/is-boonbuy-legit", label: "Is BoonBuy legit?" },
  { href: "/boonbuy-telegram", label: "Telegram" },
] as const;

function related(...paths: string[]) {
  return AUTHORITY_GRAPH.filter((l) => paths.includes(l.href));
}

function buildHubs(): Record<string, AuthorityHubConfig> {
  const stats = getAuthorityCatalogStats();
  const brandsList = stats.topBrandNames.join(", ");
  const catsList = stats.topCategoryNames.join(", ");

  return {
    "boonbuy-spreadsheet": {
      slug: "boonbuy-spreadsheet",
      path: "/boonbuy-spreadsheet",
      badge: "BoonBuy spreadsheet",
      breadcrumbLabel: "BoonBuy Spreadsheet",
      title: `BoonBuy Spreadsheet 2026 | Updated Finds & QC Links | BoonBuy Finds`,
      metaDescription: `Updated BoonBuy spreadsheet alternative — ${stats.findCountLabel} searchable finds, QC references, brands, categories, and verified BoonBuy checkout links. Last sync ${stats.lastUpdatedLabel}.`,
      h1: "BoonBuy Spreadsheet – Updated Finds & QC Links",
      intro: `Looking for a BoonBuy spreadsheet, the best BoonBuy spreadsheet 2026, or updated BoonBuy spreadsheet links? BoonBuy Finds is the searchable catalog alternative: photos, QC references, filters, and verified checkout links — without scrolling a 5,000-row Google Sheet on your phone.`,
      keywords: [
        "boonbuy spreadsheet",
        "boonbuy spreadsheet 2026",
        "best boonbuy spreadsheet",
        "boonbuy finds spreadsheet",
        "boonbuy spreadsheet links",
        "updated boonbuy spreadsheet",
        "boonbuy product spreadsheet",
        "boonbuy spreadsheet qc",
      ],
      intentCluster: [
        "boonbuy spreadsheet",
        "best boonbuy spreadsheet",
        "boonbuy spreadsheet 2026",
        "boonbuy finds spreadsheet",
        "boonbuy product spreadsheet",
        "updated boonbuy spreadsheet",
        "boonbuy spreadsheet links",
        "boonbuy spreadsheet QC",
        "boonbuy clothing spreadsheet",
        "boonbuy shoes spreadsheet",
      ],
      directAnswer: `The BoonBuy spreadsheet on BoonBuy Finds is a live searchable catalog of ${stats.findCountLabel} indexed finds with photos, QC references (${stats.qcCountLabel}), brand/category filters, and verified BoonBuy buy links — updated ${stats.lastUpdatedLabel}.`,
      keyFacts: [
        `${stats.findCountLabel} active indexed finds (not a marketing estimate)`,
        `${stats.qcCountLabel} finds with QC reference links`,
        `${stats.brandCountLabel} indexable brands · ${stats.categoryCountLabel} categories`,
        `Catalog last synced ${stats.syncTimestamp}`,
        "Discovery here · checkout, warehouse QC, and shipping on BoonBuy",
      ],
      heroStatsKind: "spreadsheet",
      primaryCtas: [
        { href: "/browse", label: "Browse spreadsheet finds", primary: true },
        { href: "/latest-finds", label: "Latest additions" },
        { href: "/boonbuy-qc", label: "QC guide" },
      ],
      sections: [
        {
          id: "what-is",
          title: "What is the BoonBuy spreadsheet?",
          paragraphs: [
            "Community BoonBuy spreadsheets are product lists — names, seller URLs, prices, and sometimes QC notes. They are powerful for power users but hard to search on mobile and awkward to share one product at a time.",
            "BoonBuy Finds is the spreadsheet alternative: the same Weidian/Taobao product universe structured as product pages with photos, filters, QC references, and verified BoonBuy checkout links.",
          ],
        },
        {
          id: "current-catalog",
          title: "Current BoonBuy spreadsheet / catalog",
          paragraphs: [
            `This hub tracks the live BoonBuy Finds catalog: ${stats.findCountLabel} active finds, ${stats.qcCountLabel} QC-linked rows, last sync ${stats.lastUpdatedLabel}. Numbers come from the catalog dataset — we do not invent larger marketing figures.`,
            `Top brands currently include ${brandsList}. Categories include ${catsList}.`,
          ],
          links: [
            { href: "/brands", label: "All brands" },
            { href: "/categories", label: "All categories" },
            { href: "/trending", label: "Trending" },
          ],
        },
        {
          id: "how-to-use",
          title: "How to use the BoonBuy spreadsheet",
          paragraphs: [
            "Search by brand or keyword, open a product page, check QC when available, then use the verified BoonBuy buy link. Keep any personal Google Sheet for notes — use this catalog for daily discovery and sharing.",
          ],
        },
        {
          id: "whats-included",
          title: "What information is included",
          paragraphs: [
            "Typical spreadsheet fields map to catalog fields: product name, image, price context, brand/category tags, QC reference links where available, and a BoonBuy agent checkout URL.",
          ],
          bullets: [
            "Photos and product titles",
            "Brand and category context",
            "QC reference links when present",
            "Verified BoonBuy buy links",
            "Filters for discovery (not raw row scrolling)",
          ],
        },
        {
          id: "how-often-updated",
          title: "How often it is updated",
          paragraphs: [
            `The catalog syncs on a regular cadence. Last sync: ${stats.syncTimestamp}. New rows surface on Latest Finds and trending rails after each sync — you do not need to download a new file weekly.`,
          ],
          links: [{ href: "/latest-finds", label: "Latest finds" }],
        },
        {
          id: "brands-categories",
          title: "Brands & categories available",
          paragraphs: [
            `Indexable brands and categories with enough inventory are listed in the directories. Use brand hubs (Nike, Jordan, Moncler, …) and category hubs (shoes, jackets, bags, …) instead of scanning an entire sheet.`,
          ],
          links: [
            { href: "/brands/nike", label: "Nike" },
            { href: "/brands/jordan", label: "Jordan" },
            { href: "/categories/shoes", label: "Shoes" },
            { href: "/categories/jackets", label: "Jackets" },
          ],
        },
        {
          id: "spreadsheet-qc",
          title: "QC photos and spreadsheet QC",
          paragraphs: [
            "Many buyers search “BoonBuy spreadsheet QC” when they want rows that include quality-check references. Open finds with QC links before you order, then still request warehouse QC on BoonBuy for your exact item.",
          ],
          links: [
            { href: "/boonbuy-qc", label: "BoonBuy QC hub" },
            { href: "/top-qc-finds", label: "Top QC finds" },
          ],
        },
        {
          id: "vs-database",
          title: "Spreadsheet vs searchable BoonBuy Finds database",
          paragraphs: [
            "A Google Sheet is a file. BoonBuy Finds is a searchable database with shareable product URLs, filters, and mobile-friendly pages. Same product universe; better discovery layer.",
          ],
        },
        {
          id: "find-product",
          title: "How to find a specific product",
          paragraphs: [
            "Use homepage or /browse search for brand + model keywords. If you already have a seller URL from an old sheet, you can still paste it into BoonBuy at checkout — this catalog helps you find candidates faster first.",
          ],
          links: [
            { href: "/browse", label: "Open browse/search" },
            { href: "/ai", label: "BoonBuy AI" },
          ],
        },
        {
          id: "mistakes",
          title: "Common spreadsheet mistakes",
          paragraphs: [
            "Trusting stale prices, skipping QC, shipping without a coupon, and sharing entire sheets instead of one product URL. Confirm live BoonBuy price and warehouse photos before you pay freight.",
          ],
          links: [
            { href: "/boonbuy-coupons", label: "Coupons" },
            { href: "/boonbuy-shipping", label: "Shipping" },
          ],
        },
      ],
      stepsTitle: "Best ways to search the spreadsheet catalog",
      steps: [
        {
          name: "Open browse or search",
          text: "Start at /browse or the homepage search with a brand or product keyword.",
        },
        {
          name: "Filter by brand or category",
          text: "Use brand and category hubs when you know the lane (shoes, jackets, bags).",
        },
        {
          name: "Check QC references",
          text: "Prefer finds with QC links for high-value items, then still request warehouse QC on BoonBuy.",
        },
        {
          name: "Open the verified buy link",
          text: "Checkout on BoonBuy with the catalog link — confirm live price and size before paying.",
        },
      ],
      table: {
        title: "Spreadsheet intent → where to go",
        headers: ["You searched", "Use this"],
        rows: [
          ["boonbuy spreadsheet / 2026", "This page + /browse"],
          ["best boonbuy spreadsheet", "This page (canonical)"],
          ["spreadsheet QC", "/boonbuy-qc + QC filters"],
          ["shoes / clothing spreadsheet", "/categories + this catalog"],
          ["shipping savings", "/boonbuy-coupons"],
        ],
      },
      faqs: [
        {
          question: "Is BoonBuy Finds the same as a BoonBuy spreadsheet?",
          answer:
            "Same product universe. BoonBuy Finds is the searchable spreadsheet alternative with product pages, filters, and verified buy links — not a replacement for your BoonBuy account.",
        },
        {
          question: "What is the best BoonBuy spreadsheet in 2026?",
          answer: `For most buyers, the best “spreadsheet” experience is this live catalog (${stats.findCountLabel} finds, updated ${stats.lastUpdatedLabel}) rather than downloading a new Google Sheet every week.`,
        },
        {
          question: "How often is the BoonBuy spreadsheet updated?",
          answer: `The catalog last synced ${stats.syncTimestamp}. Check Latest Finds after syncs for new rows.`,
        },
        {
          question: "Does the spreadsheet include QC links?",
          answer: `Yes where available — ${stats.qcCountLabel} finds currently include QC reference links. Warehouse QC for your order still happens on BoonBuy.`,
        },
      ],
      relatedResources: related(
        "/boonbuy-finds",
        "/boonbuy-qc",
        "/boonbuy-coupons",
        "/boonbuy-shipping",
        "/boonbuy-telegram",
        "/boonbuy"
      ),
      productPreview: { title: "Latest spreadsheet finds", kind: "latest", limit: 8 },
      schema: "collection",
    },

    "boonbuy-qc": {
      slug: "boonbuy-qc",
      path: "/boonbuy-qc",
      badge: "BoonBuy QC",
      breadcrumbLabel: "BoonBuy QC",
      title: "BoonBuy QC Photos 2026 | How to Check Before Shipping | BoonBuy Finds",
      metaDescription: `BoonBuy QC hub — what QC photos are, warehouse vs reference QC, what to inspect for shoes/clothing/bags, and ${stats.qcCountLabel} QC-linked finds on BoonBuy Finds.`,
      h1: "BoonBuy QC Photos – How to Check Before You Ship",
      intro: `Searching BoonBuy QC, QC photos, quality check, or warehouse QC? This hub explains how QC works with BoonBuy and how to find QC references on BoonBuy Finds before you pay international shipping.`,
      keywords: [
        "boonbuy qc",
        "boonbuy qc photos",
        "boonbuy quality check",
        "boonbuy warehouse qc",
        "how to check boonbuy qc",
      ],
      intentCluster: [
        "boonbuy qc",
        "boonbuy qc photos",
        "boonbuy quality check",
        "boonbuy qc finder",
        "boonbuy qc images",
        "boonbuy warehouse qc",
        "how to check boonbuy qc",
      ],
      directAnswer:
        "BoonBuy QC means checking warehouse photos of your exact item before international shipping. BoonBuy Finds also shows reference QC from other buyers so you can shortlist earlier — then still request warehouse QC on BoonBuy for your order.",
      keyFacts: [
        `${stats.qcCountLabel} catalog finds currently include QC reference links`,
        "Reference QC ≠ photos of your specific order",
        "Warehouse QC is requested after purchase in your BoonBuy account",
        "Approve or reject before the parcel leaves the warehouse",
      ],
      heroStatsKind: "qc",
      primaryCtas: [
        { href: "/top-qc-finds", label: "Browse QC finds", primary: true },
        { href: "/boonbuy-warehouse", label: "Warehouse guide" },
        { href: "/boonbuy-spreadsheet", label: "Spreadsheet hub" },
      ],
      sections: [
        {
          id: "what-are-qc",
          title: "What are BoonBuy QC photos?",
          paragraphs: [
            "QC (quality control) photos are images used to judge whether a product looks acceptable before you commit to international freight. On agent platforms, the critical photos are taken at the warehouse for your exact item.",
          ],
        },
        {
          id: "how-qc-works",
          title: "How BoonBuy QC works",
          paragraphs: [
            "You order through BoonBuy → the seller ships to the warehouse → you request or receive QC photos → you approve, exchange, or return while goods are still domestic → then you build a parcel and ship.",
          ],
        },
        {
          id: "where-from",
          title: "Where QC photos come from",
          paragraphs: [
            "Reference QC on BoonBuy Finds may come from community albums or prior buyer threads linked on a find. Warehouse QC comes from BoonBuy staff photographing your purchased item. Do not confuse the two.",
          ],
        },
        {
          id: "find-on-site",
          title: "How to find QC photos on BoonBuy Finds",
          paragraphs: [
            "Use Top QC Finds, QC-approved collections, and product pages that show a QC link. Prefer QC-linked rows for sneakers, bags, and outerwear.",
          ],
          links: [
            { href: "/top-qc-finds", label: "Top QC finds" },
            { href: "/collections/best-qc-approved-finds", label: "QC collection" },
          ],
        },
        {
          id: "inspect",
          title: "What to inspect in QC photos",
          paragraphs: [
            "Look for logo placement, stitching, color under normal lighting, shape/silhouette, and hardware. Compare to retail references when available. If unsure, do not approve.",
          ],
        },
        {
          id: "shoes-qc",
          title: "Shoes QC",
          paragraphs: [
            "Check toebox shape, heel tab, sole pattern, stitching neatness, and size tags. Ask for extra angles if the first album is incomplete.",
          ],
          links: [{ href: "/categories/shoes", label: "Shoe finds" }],
        },
        {
          id: "clothing-qc",
          title: "Clothing QC",
          paragraphs: [
            "Inspect print/embroidery alignment, zipper quality, cuff/hem stitching, and color. Measure against size charts in centimeters before approving.",
          ],
        },
        {
          id: "bags-qc",
          title: "Bags & accessories QC",
          paragraphs: [
            "Verify hardware engraving, lining, corners, strap stitching, and logo symmetry. Accessories are small but easy to reject early if details are wrong.",
          ],
          links: [{ href: "/categories/bags", label: "Bag finds" }],
        },
        {
          id: "warehouse-qc",
          title: "Warehouse QC",
          paragraphs: [
            "Warehouse QC is your main protection window. Once a parcel ships internationally, returns are rarely economical. See the warehouse hub for storage and parcel timing context.",
          ],
          links: [{ href: "/boonbuy-warehouse", label: "BoonBuy warehouse" }],
        },
        {
          id: "cannot-tell",
          title: "What QC photos cannot tell you",
          paragraphs: [
            "Photos cannot fully prove materials longevity, exact retail hand-feel, or future seller restock consistency. QC reduces risk; it does not eliminate it.",
          ],
        },
        {
          id: "mistakes",
          title: "QC mistakes to avoid",
          paragraphs: [
            "Approving too fast, ignoring size charts, relying only on reference QC, and waiting until after international shipping to complain.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do I need a BoonBuy account for QC?",
          answer:
            "You can view reference QC on BoonBuy Finds without an account. Warehouse QC for your orders requires a BoonBuy account after purchase.",
        },
        {
          question: "Are QC photos guaranteed on every find?",
          answer:
            "No. Reference QC availability varies. Warehouse QC is requested per order after the item arrives at the warehouse.",
        },
        {
          question: "What is the difference between reference QC and warehouse QC?",
          answer:
            "Reference QC shows examples from other buyers or batches. Warehouse QC shows your exact purchased item before you ship.",
        },
      ],
      relatedResources: related(
        "/boonbuy-spreadsheet",
        "/boonbuy-warehouse",
        "/boonbuy-shipping",
        "/boonbuy-finds",
        "/boonbuy-coupons",
        "/boonbuy"
      ),
      productPreview: { title: "Browse QC finds", kind: "qc", limit: 8 },
      schema: "collection",
    },

    "boonbuy-shipping": {
      slug: "boonbuy-shipping",
      path: "/boonbuy-shipping",
      badge: "BoonBuy shipping",
      breadcrumbLabel: "BoonBuy Shipping",
      title: "BoonBuy Shipping 2026 | Cost, Lines & How It Works | BoonBuy Finds",
      metaDescription:
        "How BoonBuy shipping works — warehouse to parcel, what affects cost, volumetric weight, lines, coupons, and how to reduce freight without invented ETAs or fees.",
      h1: "BoonBuy Shipping – How Freight Works",
      intro:
        "Searching BoonBuy shipping, shipping cost, shipping time, or shipping lines? This guide covers the real process after QC — without inventing fees or delivery dates.",
      keywords: [
        "boonbuy shipping",
        "boonbuy shipping cost",
        "boonbuy shipping time",
        "boonbuy international shipping",
        "boonbuy shipping lines",
      ],
      intentCluster: [
        "boonbuy shipping",
        "boonbuy shipping cost",
        "boonbuy shipping time",
        "how boonbuy shipping works",
        "boonbuy international shipping",
        "boonbuy parcel shipping",
        "boonbuy shipping lines",
      ],
      directAnswer:
        "BoonBuy shipping is the international freight stage after warehouse QC: you build a parcel, choose a line, declare contents, and pay freight based on weight, volume, destination, and live quotes — not a single published global price.",
      keyFacts: [
        "Item prices on finds do not include international freight",
        "Quotes appear in your BoonBuy account when you submit a parcel",
        "Volumetric weight can make bulky jackets cost more than heavy shoes",
        `Shipping coupons (up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% for eligible new accounts via invite ${BOONBUY_INVITE_CODE}) can reduce freight when active`,
      ],
      heroStatsKind: "default",
      primaryCtas: [
        { href: "/boonbuy-shipping-coupon", label: "Shipping coupon", primary: true },
        { href: "/boonbuy-coupons", label: "All coupons" },
        { href: "/boonbuy-warehouse", label: "Warehouse process" },
      ],
      sections: [
        {
          id: "how-works",
          title: "How BoonBuy shipping works",
          paragraphs: [
            "After you approve QC, items stay in the warehouse until you create a parcel. You select a shipping line, declare contents/value, pay freight, then track outbound.",
          ],
        },
        {
          id: "process",
          title: "Warehouse → parcel → shipping",
          paragraphs: [
            "Seller → BoonBuy warehouse → QC → parcel build → line selection → payment → international transit → local delivery. Missing QC approval is the most common reason parcels stall.",
          ],
          links: [
            { href: "/boonbuy-warehouse", label: "Warehouse" },
            { href: "/boonbuy-qc", label: "QC" },
          ],
        },
        {
          id: "cost-factors",
          title: "What affects shipping cost",
          paragraphs: [
            "Actual weight, volumetric (dimensional) weight, shipping line, destination country, insurance/options, and any active coupon. There is no honest single “BoonBuy shipping cost” number that fits every haul.",
          ],
        },
        {
          id: "volumetric",
          title: "Weight vs volumetric weight",
          paragraphs: [
            "Carriers often bill the higher of actual vs volumetric weight. Puffer jackets and shoe boxes can price like multiple dense items. Ask for rehearsal/repack estimates in BoonBuy when available for large hauls.",
          ],
        },
        {
          id: "lines",
          title: "Shipping lines",
          paragraphs: [
            "Economy, express, and tax-inclusive style routes differ in speed, tracking, and price per kilo. Availability depends on destination and item type — confirm inside the live quote tool.",
          ],
        },
        {
          id: "times",
          title: "Estimated shipping times",
          paragraphs: [
            "BoonBuy Finds does not publish fixed global ETAs. Economy can take multiple weeks; express is usually faster and costlier. Use the estimate shown for your chosen line and country in BoonBuy.",
          ],
        },
        {
          id: "coupons",
          title: "Shipping coupons",
          paragraphs: [
            `Eligible new accounts can unlock up to ${BOONBUY_SHIPPING_DISCOUNT_PERCENT}% off shipping via the BoonBuy Finds invite (${BOONBUY_INVITE_CODE}) when the offer is active. Confirm live terms on BoonBuy before you rely on any percentage.`,
          ],
          links: [
            { href: "/boonbuy-shipping-coupon", label: "Shipping coupon page" },
            { href: "/boonbuy-coupons", label: "Coupons hub" },
          ],
        },
        {
          id: "reduce-cost",
          title: "How to reduce shipping cost",
          paragraphs: [
            "Consolidate items, remove excess packaging when safe, compare lines, claim a valid shipping coupon, and avoid shipping one item at a time.",
          ],
        },
        {
          id: "mistakes",
          title: "Common shipping mistakes",
          paragraphs: [
            "Ignoring volumetric weight, under-declaring high-risk goods, shipping before QC approval, and assuming blog “average prices” beat your live quote.",
          ],
        },
      ],
      faqs: [
        {
          question: "How much does BoonBuy shipping cost?",
          answer:
            "It depends on weight, volume, line, destination, and coupons. Use the live parcel quote in your BoonBuy account — not a guessed blog number.",
        },
        {
          question: "How long does BoonBuy shipping take?",
          answer:
            "It varies by line and country. Check the estimate for your selected route in BoonBuy; we do not invent a single worldwide delivery time.",
        },
        {
          question: "Does BoonBuy ship internationally?",
          answer:
            "Yes — BoonBuy offers international lines to many countries, subject to line restrictions and item rules. Confirm support for your destination in the quote tool.",
        },
      ],
      relatedResources: related(
        "/boonbuy-coupons",
        "/boonbuy-warehouse",
        "/boonbuy-qc",
        "/boonbuy-spreadsheet",
        "/boonbuy-review",
        "/boonbuy"
      ),
      schema: "article",
    },

    "boonbuy-finds": {
      slug: "boonbuy-finds",
      path: "/boonbuy-finds",
      badge: "BoonBuy Finds",
      breadcrumbLabel: "BoonBuy Finds",
      title: `BoonBuy Finds 2026 | ${stats.findCountLabel} Products, QC & Spreadsheet Catalog`,
      metaDescription: `Browse BoonBuy finds — ${stats.findCountLabel} indexed products with QC references, brands, categories, trending/latest rails, and verified BoonBuy checkout links.`,
      h1: "BoonBuy Finds – Product Discovery Hub",
      intro: `BoonBuy finds, best BoonBuy finds, clothing finds, shoe finds, and 2026 product discovery all start here: a searchable catalog with live counts, not a long SEO article hiding the products.`,
      keywords: [
        "boonbuy finds",
        "best boonbuy finds",
        "boonbuy product finds",
        "boonbuy clothing finds",
        "boonbuy shoe finds",
        "boonbuy finds 2026",
      ],
      intentCluster: [
        "boonbuy finds",
        "best boonbuy finds",
        "boonbuy product finds",
        "boonbuy clothing finds",
        "boonbuy shoe finds",
        "boonbuy reps",
        "boonbuy finds 2026",
      ],
      directAnswer: `BoonBuy Finds is the searchable discovery catalog for BoonBuy shoppers — ${stats.findCountLabel} indexed finds, ${stats.qcCountLabel} QC-linked rows, brand/category directories, and verified checkout links. Updated ${stats.lastUpdatedLabel}.`,
      keyFacts: [
        `${stats.findCountLabel} active finds`,
        `${stats.brandCountLabel} indexable brands · ${stats.categoryCountLabel} categories`,
        "Trending + latest discovery rails",
        "Pairs with spreadsheet, QC, coupons, and Telegram hubs",
      ],
      heroStatsKind: "finds",
      primaryCtas: [
        { href: "/browse", label: "Search finds", primary: true },
        { href: "/trending", label: "Trending" },
        { href: "/latest-finds", label: "New finds" },
        { href: "/brands", label: "Brands" },
        { href: "/categories", label: "Categories" },
      ],
      sections: [
        {
          id: "what-are-finds",
          title: "What are BoonBuy finds?",
          paragraphs: [
            "“Finds” are curated product listings from Weidian/Taobao-style sources presented with photos, context, and agent checkout links so you can research before you buy on BoonBuy.",
          ],
        },
        {
          id: "how-to-browse",
          title: "How to browse BoonBuy finds",
          paragraphs: [
            "Use search/browse for keywords, brand hubs for Nike/Jordan/Moncler-style lanes, category hubs for shoes/jackets/bags, and trending/latest for freshness.",
          ],
        },
        {
          id: "best-finds",
          title: "Best BoonBuy finds (without thin duplicate pages)",
          paragraphs: [
            "“Best” is contextual — start with trending, editor-style rails, QC-linked products, and brand hubs. This page owns best-finds intent; we do not keep a separate thin /best-boonbuy-finds doorway.",
          ],
          links: [
            { href: "/trending", label: "Trending" },
            { href: "/top-qc-finds", label: "Top QC" },
          ],
        },
        {
          id: "clothing-shoes",
          title: "Clothing finds & shoe finds",
          paragraphs: [
            "Jump into category directories for apparel and footwear instead of keyword-only pages. Pair with QC guidance before shipping sneakers or outerwear.",
          ],
          links: [
            { href: "/categories/shoes", label: "Shoes" },
            { href: "/categories/hoodies", label: "Hoodies" },
            { href: "/categories/jackets", label: "Jackets" },
          ],
        },
        {
          id: "after-you-pick",
          title: "After you pick a find",
          paragraphs: [
            "Open the BoonBuy link, confirm live price/size, request warehouse QC, then ship with a coupon when eligible. Discovery here; fulfillment on BoonBuy.",
          ],
          links: [
            { href: "/boonbuy-qc", label: "QC" },
            { href: "/boonbuy-coupons", label: "Coupons" },
            { href: "/boonbuy-shipping", label: "Shipping" },
          ],
        },
      ],
      faqs: [
        {
          question: "What is BoonBuy Finds?",
          answer:
            "An independent searchable catalog for BoonBuy shoppers — products, QC references, spreadsheet-style discovery, coupons, and verified checkout links.",
        },
        {
          question: "Are BoonBuy finds the same as a spreadsheet?",
          answer:
            "They share the same product universe. This hub is discovery-first; /boonbuy-spreadsheet explains the spreadsheet framing in more depth.",
        },
        {
          question: "How many BoonBuy finds are there?",
          answer: `The live catalog currently indexes ${stats.findCountLabel} finds (updated ${stats.lastUpdatedLabel}).`,
        },
      ],
      relatedResources: related(
        "/boonbuy-spreadsheet",
        "/boonbuy-qc",
        "/boonbuy-coupons",
        "/boonbuy-telegram",
        "/boonbuy-shipping",
        "/boonbuy"
      ),
      productPreview: { title: "Trending finds preview", kind: "trending", limit: 8 },
      schema: "collection",
    },

    "boonbuy-review": {
      slug: "boonbuy-review",
      path: "/boonbuy-review",
      badge: "BoonBuy review",
      breadcrumbLabel: "BoonBuy Review",
      title: "BoonBuy Review 2026 | Features, QC, Shipping & Who It Suits",
      metaDescription:
        "Balanced BoonBuy review — what the shopping agent is, ordering, QC, warehouse, shipping, payments, coupons, strengths, limitations, and how BoonBuy Finds fits in. No fake star ratings.",
      h1: "BoonBuy Review 2026",
      intro:
        "A factual BoonBuy agent review for shoppers comparing features, QC, shipping, and risk — without fabricated testimonials or star ratings.",
      keywords: [
        "boonbuy review",
        "boonbuy reviews",
        "boonbuy agent review",
        "is boonbuy good",
        "boonbuy review 2026",
      ],
      intentCluster: [
        "boonbuy review",
        "boonbuy reviews",
        "boonbuy agent review",
        "is boonbuy good",
        "boonbuy review 2026",
      ],
      directAnswer:
        "BoonBuy is a China shopping agent: you order Weidian/Taobao-style links into a warehouse, review QC, then ship internationally. Whether it is “good” depends on fees, shipping to your country, and how carefully you QC — use live BoonBuy terms, not hype.",
      keyFacts: [
        "Agent model: buy → warehouse → QC → parcel → ship",
        "BoonBuy Finds is an independent discovery catalog, not the agent itself",
        "No invented star ratings or fake user testimonials on this page",
        "Cross-check /is-boonbuy-legit for trust/safety framing",
      ],
      primaryCtas: [
        { href: "/boonbuy", label: "What is BoonBuy", primary: true },
        { href: "/is-boonbuy-legit", label: "Is BoonBuy legit?" },
        { href: "/boonbuy-finds", label: "Browse finds" },
      ],
      sections: [
        {
          id: "what-is",
          title: "What BoonBuy is",
          paragraphs: [
            "BoonBuy (boonbuy.com) is a shopping agent for China marketplaces. You do not need a local marketplace account for every seller — the agent purchases, stores, and ships for you.",
          ],
        },
        {
          id: "ordering",
          title: "How ordering works",
          paragraphs: [
            "Paste a product link or use a verified find link → pay item cost into warehouse → wait for arrival/QC → approve → consolidate → pay freight.",
          ],
        },
        {
          id: "features",
          title: "Main features",
          paragraphs: [
            "Warehouse storage, QC photos, parcel consolidation, international lines, and wallet/top-up style payments are the core loop. Exact menus change — confirm in your account UI.",
          ],
        },
        {
          id: "qc-warehouse-shipping",
          title: "QC, warehouse & shipping",
          paragraphs: [
            "QC and warehouse storage are why agents exist. Shipping is priced per parcel. See dedicated hubs for depth rather than repeating every fee table here.",
          ],
          links: [
            { href: "/boonbuy-qc", label: "QC" },
            { href: "/boonbuy-warehouse", label: "Warehouse" },
            { href: "/boonbuy-shipping", label: "Shipping" },
          ],
        },
        {
          id: "payments-coupons",
          title: "Payments & coupons",
          paragraphs: [
            `Payments are typically wallet top-ups plus separate freight payment. Coupons often target shipping for new users (invite ${BOONBUY_INVITE_CODE} via BoonBuy Finds when active).`,
          ],
          links: [
            { href: "/boonbuy-payment", label: "Payment guide" },
            { href: "/boonbuy-coupons", label: "Coupons" },
          ],
        },
        {
          id: "strengths",
          title: "What BoonBuy does well",
          paragraphs: [
            "Familiar agent workflow, QC before international shipping, and consolidation. Pairing with BoonBuy Finds helps research products before you spend.",
          ],
        },
        {
          id: "limits",
          title: "Limitations / things users should know",
          paragraphs: [
            "Freight can dominate haul cost. Spreadsheet prices lag. Restricted items and country rules apply. Customer support quality varies by ticket — document QC issues clearly.",
          ],
        },
        {
          id: "who-suits",
          title: "Who BoonBuy may suit",
          paragraphs: [
            "Buyers comfortable with agent workflows who want warehouse QC and international shipping. Less ideal if you need Amazon-like one-click retail with free returns.",
          ],
        },
        {
          id: "finds-fit",
          title: "How BoonBuy Finds fits in",
          paragraphs: [
            "BoonBuy Finds is independent discovery: catalog, coupons, guides, Telegram. Checkout and warehouse operations stay on BoonBuy.",
          ],
          links: [{ href: "/boonbuy-finds", label: "Finds hub" }],
        },
      ],
      table: {
        title: "Review snapshot",
        headers: ["Area", "Takeaway"],
        rows: [
          ["Discovery", "Stronger with BoonBuy Finds catalog"],
          ["QC", "Core advantage vs blind international retail"],
          ["Shipping", "Quote live; coupons may help new users"],
          ["Risk", "Agent + customs + seller variance still apply"],
        ],
      },
      faqs: [
        {
          question: "Is BoonBuy good in 2026?",
          answer:
            "It can be a solid agent if shipping to your country is reasonable and you QC carefully. Compare live fees and lines — do not rely on outdated screenshots.",
        },
        {
          question: "Does this review include star ratings?",
          answer:
            "No. We do not invent ratings or testimonials. We describe the workflow and link to deeper guides.",
        },
      ],
      relatedResources: related(
        "/is-boonbuy-legit",
        "/boonbuy",
        "/boonbuy-shipping",
        "/boonbuy-qc",
        "/boonbuy-coupons",
        "/boonbuy-finds"
      ),
      schema: "article",
    },

    "is-boonbuy-legit": {
      slug: "is-boonbuy-legit",
      path: "/is-boonbuy-legit",
      badge: "Trust & safety",
      breadcrumbLabel: "Is BoonBuy Legit?",
      title: "Is BoonBuy Legit? Safe, Scam Risks & How to Verify | BoonBuy Finds",
      metaDescription:
        "Is BoonBuy legit or a scam? Direct answer on the agent model, payments, warehouse QC, shipping risks, impersonation warnings, and how to reduce risk — careful factual wording.",
      h1: "Is BoonBuy Legit?",
      intro:
        "Direct trust questions — is BoonBuy safe, scam, or trustworthy — deserve a careful answer, not a promo page.",
      keywords: [
        "is boonbuy legit",
        "is boonbuy safe",
        "is boonbuy scam",
        "can i trust boonbuy",
        "boonbuy trustworthy",
      ],
      intentCluster: [
        "is boonbuy legit",
        "is boonbuy safe",
        "is boonbuy scam",
        "can i trust boonbuy",
        "boonbuy trustworthy",
      ],
      directAnswer:
        "BoonBuy operates as a shopping agent with warehouse QC and international shipping — a real agent model used across the China-buying ecosystem. That does not mean zero risk: seller quality, customs, fees, and phishing clones still matter. Verify you are on official domains and QC before you ship.",
      keyFacts: [
        "Agent shopping always carries marketplace + freight + customs risk",
        "Warehouse QC is the main control before international shipping",
        "Impersonation sites and fake coupon pages exist — check URLs",
        "BoonBuy Finds is independent discovery (boonbuyfinds.net), not boonbuy.com",
      ],
      primaryCtas: [
        { href: "/boonbuy-review", label: "BoonBuy review", primary: true },
        { href: "/boonbuy-qc", label: "QC safety net" },
        { href: "/boonbuy", label: "What BoonBuy is" },
      ],
      sections: [
        {
          id: "direct",
          title: "Direct answer",
          paragraphs: [
            "“Legit” in this niche usually means: is this a functioning agent with real warehouses and payouts, or a pure scam site? BoonBuy presents as a standard shopping-agent service. You should still verify domains, read live terms, and use QC — legitimacy of the platform model is not a guarantee of every seller’s product.",
          ],
        },
        {
          id: "what-is",
          title: "What BoonBuy is",
          paragraphs: [
            "A middleman that buys from China marketplaces, stores goods, offers QC photos, and ships abroad. You pay the agent; the agent pays sellers.",
          ],
        },
        {
          id: "agent-model",
          title: "How the agent model works",
          paragraphs: [
            "Link → purchase → warehouse → QC → parcel → freight. Understanding this loop prevents scam-panic when waiting for warehouse photos.",
          ],
        },
        {
          id: "payments",
          title: "Payments",
          paragraphs: [
            "Use official BoonBuy payment flows only. Never send money to individuals claiming to be “BoonBuy support” on social apps.",
          ],
          links: [{ href: "/boonbuy-payment", label: "Payment guide" }],
        },
        {
          id: "warehouse-qc",
          title: "Warehouse / QC process",
          paragraphs: [
            "QC photos are your evidence window. Reject issues before international shipping whenever possible.",
          ],
          links: [
            { href: "/boonbuy-qc", label: "QC" },
            { href: "/boonbuy-warehouse", label: "Warehouse" },
          ],
        },
        {
          id: "shipping",
          title: "Shipping",
          paragraphs: [
            "Freight delays and customs seizures can happen with any agent. That is operational risk, not automatically “scam.”",
          ],
          links: [{ href: "/boonbuy-shipping", label: "Shipping" }],
        },
        {
          id: "verify",
          title: "What users should verify",
          paragraphs: [
            "Official domain spelling, HTTPS, account emails, coupon URLs that match known hubs, and that support never asks for your password via Telegram DMs.",
          ],
        },
        {
          id: "risks",
          title: "Common risks when buying through agents",
          paragraphs: [
            "Bad batches, wrong sizes, restricted goods, customs, storage fees if you wait too long, and phishing clones of coupon pages.",
          ],
        },
        {
          id: "reduce-risk",
          title: "How to reduce risk",
          paragraphs: [
            "Research finds, use QC, consolidate carefully, declare honestly, start with smaller hauls, and bookmark official URLs.",
          ],
        },
        {
          id: "impersonation",
          title: "Official URLs / impersonation warning",
          paragraphs: [
            "Prefer boonbuy.com for the agent and boonbuyfinds.net for this catalog. Be wary of lookalike domains and unsolicited “coupon agents.”",
          ],
          links: [
            { href: "https://boonbuy.com", label: "Official BoonBuy", external: true },
            { href: "/boonbuy-coupons", label: "Our coupon hub" },
          ],
        },
      ],
      faqs: [
        {
          question: "Is BoonBuy a scam?",
          answer:
            "BoonBuy functions as a shopping agent with warehouse QC. Scam risk more often comes from phishing clones, bad sellers, or skipping QC — verify official domains and processes.",
        },
        {
          question: "Is BoonBuy safe?",
          answer:
            "Safer when you QC, use official payment flows, and understand customs/freight risk. No agent purchase is risk-free.",
        },
        {
          question: "Can I trust BoonBuy coupons from social media?",
          answer:
            "Only if they match verified hubs like /boonbuy-coupons. Random screenshots and DMs are frequently outdated or malicious.",
        },
      ],
      relatedResources: related(
        "/boonbuy-review",
        "/boonbuy",
        "/boonbuy-qc",
        "/boonbuy-payment",
        "/boonbuy-coupons",
        "/boonbuy-shipping"
      ),
      schema: "article",
    },

    "boonbuy-telegram": {
      slug: "boonbuy-telegram",
      path: "/boonbuy-telegram",
      badge: "Telegram",
      breadcrumbLabel: "BoonBuy Telegram",
      title: "BoonBuy Telegram | Join BoonBuy Finds Channel 2026",
      metaDescription:
        "Join BoonBuy Telegram for daily finds, QC alerts, spreadsheet updates, and price drops. Official BoonBuy Finds channel with above-the-fold join CTA.",
      h1: "BoonBuy Telegram",
      intro:
        "BoonBuy Telegram, BoonBuy Finds Telegram, and spreadsheet Telegram updates — join first, then read how the channel fits the catalog.",
      keywords: [
        "boonbuy telegram",
        "boonbuy telegram group",
        "boonbuy finds telegram",
        "boonbuy spreadsheet telegram",
      ],
      intentCluster: [
        "boonbuy telegram",
        "boonbuy telegram group",
        "boonbuy finds telegram",
        "boonbuy spreadsheet telegram",
      ],
      directAnswer:
        "Join the official BoonBuy Finds Telegram (@RNFinds) for daily finds, QC alerts, spreadsheet-style updates, and price-drop discussion — then use this site to search and open verified checkout links.",
      keyFacts: [
        "Official handle: @RNFinds",
        "Use the Join Telegram button — avoid impersonators",
        "Telegram for speed · BoonBuy Finds for search",
        "Pinned messages often cover coupons and hubs",
      ],
      primaryCtas: [
        { href: "/boonbuy-spreadsheet", label: "Spreadsheet hub" },
        { href: "/latest-finds", label: "Latest finds" },
        { href: "/boonbuy-qc", label: "QC hub" },
      ],
      telegramCta: true,
      sections: [
        {
          id: "what-posted",
          title: "What gets posted",
          paragraphs: [
            "Daily finds, QC discussion, spreadsheet-style drops, coupon reminders when relevant, and links back to catalog pages.",
          ],
        },
        {
          id: "finds-qc-sheet",
          title: "Finds, QC updates & spreadsheet updates",
          paragraphs: [
            "Think of Telegram as the alert layer. When a post links a product, open it on BoonBuy Finds for photos, filters, and the verified buy button.",
          ],
          links: [
            { href: "/boonbuy-finds", label: "Finds" },
            { href: "/boonbuy-qc", label: "QC" },
            { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
          ],
        },
        {
          id: "price-drops",
          title: "Price drops",
          paragraphs: [
            "Community posts may flag price changes — always confirm the live BoonBuy price before paying. Screenshots go stale.",
          ],
        },
        {
          id: "related",
          title: "How Telegram relates to BoonBuy Finds",
          paragraphs: [
            "Three layers: Telegram alerts, website search/QC/coupons, BoonBuy checkout. Power users bounce between all three.",
          ],
        },
      ],
      faqs: [
        {
          question: "What is the BoonBuy Telegram handle?",
          answer:
            "The BoonBuy Finds channel is @RNFinds. Use the Join Telegram button on this page to avoid fakes.",
        },
        {
          question: "Is Telegram a replacement for the spreadsheet?",
          answer:
            "No. Telegram is for speed/alerts. /boonbuy-spreadsheet and /browse are for searchable catalog discovery.",
        },
      ],
      relatedResources: related(
        "/boonbuy-spreadsheet",
        "/boonbuy-finds",
        "/boonbuy-qc",
        "/boonbuy-coupons",
        "/latest-finds",
        "/boonbuy"
      ),
      schema: "webpage",
    },

    "boonbuy-warehouse": {
      slug: "boonbuy-warehouse",
      path: "/boonbuy-warehouse",
      badge: "BoonBuy warehouse",
      breadcrumbLabel: "BoonBuy Warehouse",
      title: "BoonBuy Warehouse 2026 | Arrival, QC, Storage & Parcels",
      metaDescription:
        "How the BoonBuy warehouse works — seller shipping in, arrival, QC inspection, storage, parcel creation, consolidation, and shipping out. No invented timeframes.",
      h1: "BoonBuy Warehouse – How It Works",
      intro:
        "BoonBuy warehouse questions (arrival, QC, storage, parcel timing) explained carefully — only processes we can describe without inventing SLAs.",
      keywords: [
        "boonbuy warehouse",
        "boonbuy warehouse time",
        "how boonbuy warehouse works",
        "boonbuy warehouse qc",
      ],
      intentCluster: [
        "boonbuy warehouse",
        "boonbuy warehouse time",
        "how boonbuy warehouse works",
        "boonbuy warehouse qc",
      ],
      directAnswer:
        "The BoonBuy warehouse receives seller shipments, enables QC photos, stores items, and prepares consolidated parcels for international shipping. Exact arrival/storage timeframes vary — check your order timeline in BoonBuy rather than blog guesses.",
      keyFacts: [
        "Warehouse is the hub between sellers and international freight",
        "QC happens here before you should ship",
        "Storage may incur fees if you wait too long — confirm live policy in-app",
        "Returns/exchanges are most practical before international shipping",
      ],
      primaryCtas: [
        { href: "/boonbuy-qc", label: "Warehouse QC guide", primary: true },
        { href: "/boonbuy-shipping", label: "Shipping next step" },
        { href: "/boonbuy-returns", label: "Returns timing" },
      ],
      sections: [
        {
          id: "what-is",
          title: "What is the BoonBuy warehouse?",
          paragraphs: [
            "A fulfillment hub in China where agent-purchased items arrive, get photographed, stored, and packed for overseas shipping.",
          ],
        },
        {
          id: "after-seller",
          title: "What happens after the seller ships",
          paragraphs: [
            "Domestic transit to the warehouse occurs first. Status updates appear in your BoonBuy order timeline when scanning events are available.",
          ],
        },
        {
          id: "arrival",
          title: "Warehouse arrival",
          paragraphs: [
            "Arrival means the warehouse has received the parcel from the seller. Only then can detailed QC albums be produced for your item.",
          ],
        },
        {
          id: "qc",
          title: "QC inspection",
          paragraphs: [
            "Request/review photos, then approve or open an exchange/return path while goods remain domestic.",
          ],
          links: [{ href: "/boonbuy-qc", label: "QC hub" }],
        },
        {
          id: "storage",
          title: "Storage",
          paragraphs: [
            "Items can wait while you build a haul. Storage rules and fees are account/policy-specific — read the live BoonBuy notices rather than assuming free unlimited storage.",
          ],
        },
        {
          id: "parcel",
          title: "Parcel creation & consolidation",
          paragraphs: [
            "Select stored items, choose packaging/options, and submit a parcel. Consolidation usually beats shipping single-item boxes internationally.",
          ],
        },
        {
          id: "ship-out",
          title: "Shipping out",
          paragraphs: [
            "After you pay freight, the warehouse hands off to the selected line. Track in BoonBuy thereafter.",
          ],
          links: [{ href: "/boonbuy-shipping", label: "Shipping hub" }],
        },
        {
          id: "returns",
          title: "Returns/exchanges before international shipping",
          paragraphs: [
            "The practical window is post-QC, pre-freight. International returns are rarely cost-effective.",
          ],
          links: [{ href: "/boonbuy-returns", label: "Returns guide" }],
        },
      ],
      stepsTitle: "Warehouse flow",
      steps: [
        { name: "Seller ships", text: "Item moves domestically toward the warehouse." },
        { name: "Arrival + QC", text: "Warehouse receives goods; you review photos." },
        { name: "Store or resolve", text: "Approve, exchange, or return while still domestic." },
        { name: "Parcel + ship", text: "Consolidate, pay freight, track outbound." },
      ],
      faqs: [
        {
          question: "How long does BoonBuy warehouse QC take?",
          answer:
            "It varies by volume and request type. Use the timestamps in your BoonBuy order — we do not publish a fake universal SLA.",
        },
        {
          question: "Can I store items before shipping?",
          answer:
            "Typically yes for a period defined by BoonBuy policy. Confirm storage limits/fees in your account.",
        },
      ],
      relatedResources: related(
        "/boonbuy-qc",
        "/boonbuy-shipping",
        "/boonbuy-returns",
        "/boonbuy-payment",
        "/boonbuy-review",
        "/boonbuy"
      ),
      schema: "article",
    },

    boonbuy: {
      slug: "boonbuy",
      path: "/boonbuy",
      badge: "BoonBuy agent",
      breadcrumbLabel: "BoonBuy",
      title: "BoonBuy | What It Is, How It Works, Finds & Coupons | BoonBuy Finds",
      metaDescription:
        "What BoonBuy is and how the shopping agent works — ordering, warehouse, QC, shipping, payments, coupons, returns — plus links to deeper BoonBuy Finds authority hubs.",
      h1: "BoonBuy — Shopping Agent & Finds Hub",
      intro:
        "Central entity page for BoonBuy / what is BoonBuy / how BoonBuy works — then jump into deeper hubs for spreadsheet, QC, shipping, and coupons.",
      keywords: [
        "boonbuy",
        "what is boonbuy",
        "how does boonbuy work",
        "boonbuy shopping agent",
        "boonbuy agent",
      ],
      intentCluster: [
        "boonbuy",
        "what is boonbuy",
        "how does boonbuy work",
        "boonbuy shopping agent",
        "boonbuy agent",
      ],
      directAnswer:
        "BoonBuy is a China shopping agent (boonbuy.com) for Weidian/Taobao-style orders with warehouse QC and international shipping. BoonBuy Finds (boonbuyfinds.net) is the independent catalog for finds, coupons, and guides.",
      keyFacts: [
        "Agent: boonbuy.com · Catalog/guides: boonbuyfinds.net",
        "Flow: find → order → warehouse QC → parcel → ship",
        "Deeper guides linked below — this page is the overview",
      ],
      primaryCtas: [
        { href: "/boonbuy-finds", label: "Browse finds", primary: true },
        { href: "/boonbuy-coupons", label: "Coupons" },
        { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
        {
          href: `https://boonbuy.com/register?inviteCode=${BOONBUY_INVITE_CODE}`,
          label: "Register on BoonBuy",
          external: true,
        },
      ],
      sections: [
        {
          id: "what",
          title: "What BoonBuy is",
          paragraphs: [
            "A shopping agent that purchases from China marketplaces on your behalf, stores goods, offers QC, and ships internationally.",
          ],
        },
        {
          id: "ordering",
          title: "How ordering works",
          paragraphs: [
            "Use a product link (from BoonBuy Finds or elsewhere), pay for the item, wait for warehouse arrival, QC, then ship.",
          ],
        },
        {
          id: "find-products",
          title: "Find products",
          paragraphs: [
            "Use BoonBuy Finds search, spreadsheet hub, brands, and categories to research before you spend.",
          ],
          links: [
            { href: "/boonbuy-finds", label: "Finds" },
            { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
          ],
        },
        {
          id: "warehouse-qc",
          title: "Warehouse & QC",
          paragraphs: [
            "Goods land in the warehouse for photos and storage before international freight.",
          ],
          links: [
            { href: "/boonbuy-warehouse", label: "Warehouse" },
            { href: "/boonbuy-qc", label: "QC" },
          ],
        },
        {
          id: "shipping-payments",
          title: "Shipping & payments",
          paragraphs: [
            "Freight is quoted per parcel. Payments are usually wallet top-ups plus separate shipping payment.",
          ],
          links: [
            { href: "/boonbuy-shipping", label: "Shipping" },
            { href: "/boonbuy-payment", label: "Payment" },
          ],
        },
        {
          id: "coupons-returns",
          title: "Coupons & returns",
          paragraphs: [
            "Coupons often help with shipping for eligible new users. Returns are most practical pre-freight after QC.",
          ],
          links: [
            { href: "/boonbuy-coupons", label: "Coupons" },
            { href: "/boonbuy-returns", label: "Returns" },
          ],
        },
        {
          id: "finds-layer",
          title: "Spreadsheet / BoonBuy Finds",
          paragraphs: [
            "BoonBuy Finds turns spreadsheet-style catalogs into searchable pages and guides. It does not replace BoonBuy accounts.",
          ],
        },
      ],
      table: {
        title: "Deep-dive hubs",
        headers: ["Need", "Canonical page"],
        rows: [
          ["Spreadsheet / catalog", "/boonbuy-spreadsheet"],
          ["QC photos", "/boonbuy-qc"],
          ["Shipping", "/boonbuy-shipping"],
          ["Coupons", "/boonbuy-coupons"],
          ["Trust", "/is-boonbuy-legit"],
          ["Review", "/boonbuy-review"],
          ["Telegram", "/boonbuy-telegram"],
        ],
      },
      faqs: [
        {
          question: "What is BoonBuy?",
          answer:
            "A China shopping agent for marketplace links with warehouse QC and international shipping. BoonBuy Finds is the companion discovery site.",
        },
        {
          question: "How does BoonBuy work?",
          answer:
            "Order links into the warehouse, check QC, consolidate a parcel, pay freight, and track delivery.",
        },
      ],
      relatedResources: related(
        "/boonbuy-finds",
        "/boonbuy-spreadsheet",
        "/boonbuy-qc",
        "/boonbuy-shipping",
        "/boonbuy-coupons",
        "/is-boonbuy-legit",
        "/boonbuy-review",
        "/boonbuy-telegram",
        "/boonbuy-warehouse"
      ),
      schema: "webpage",
    },
  };
}

let cached: Record<string, AuthorityHubConfig> | null = null;

export function getAuthorityHub(slug: string): AuthorityHubConfig | undefined {
  if (!cached) cached = buildHubs();
  return cached[slug];
}

export function getAuthorityHubSlugs(): string[] {
  if (!cached) cached = buildHubs();
  return Object.keys(cached);
}
