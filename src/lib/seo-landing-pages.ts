import type { StaticPageSection } from "./static-pages";
import { getEditorsPicks } from "./discovery";
import { getSpreadsheetMetadataCopy } from "./metadata-copy";
import { filterFeaturedEligible } from "./product-media";
import { hasExactPrice } from "./pricing";
import { getAllProducts, getTrendingProducts } from "./products";
import { TOP_LISTS } from "./top-lists";
import type { Product } from "./types";

export type SeoLandingConfig = {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  intro: string;
  sections: StaticPageSection[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { href: string; label: string }[];
  getProducts: () => Product[];
  productSectionTitle: string;
};

function priced(items: Product[]) {
  return items.filter((p) => hasExactPrice(p.price));
}

function byCategory(...slugs: string[]) {
  return priced(getAllProducts().filter((p) => slugs.includes(p.category_slug)));
}

function withQc(limit = 72) {
  return filterFeaturedEligible(
    priced(getAllProducts().filter((p) => p.qc_link))
  ).slice(0, limit);
}

const RESOURCE_LINKS = [
  { href: "/boonbuy-finds", label: "BoonBuy finds" },
  { href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" },
  { href: "/boonbuy-qc", label: "BoonBuy QC" },
  { href: "/guides", label: "All guides" },
];

export const SEO_LANDING_PAGES: Record<string, SeoLandingConfig> = {
  "boonbuy-spreadsheet": {
    slug: "boonbuy-spreadsheet",
    path: "/boonbuy-spreadsheet",
    title: getSpreadsheetMetadataCopy().title,
    metaDescription: getSpreadsheetMetadataCopy().description,
    badge: "BoonBuy resource",
    h1: "BoonBuy spreadsheet guide",
    intro:
      "BoonBuy spreadsheets are how many buyers first discover products — rows of Weidian and Taobao links, prices, and QC notes. BoonBuy Finds turns that same catalog into searchable pages with photos, filters, and verified agent links so you spend less time hunting and more time buying.",
    sections: [
      {
        heading: "What a BoonBuy spreadsheet contains",
        paragraphs: [
          "Most community spreadsheets list product names, thumbnail images, seller URLs, approximate prices, and sometimes QC photo references from previous buyers. They are powerful for power users but difficult to search on mobile and hard to share one product at a time.",
          "BoonBuy Finds imports catalog data and normalizes it into product pages. Each page shows pricing, category, brand tags, QC status, and a direct BoonBuy buy link — the same outcome as copying a row from a sheet, but faster to browse.",
        ],
        links: [
          { href: "/collections/boonbuy-spreadsheet-alternative", label: "Spreadsheet alternative" },
          { href: "/boonbuy-products", label: "Browse products" },
        ],
      },
      {
        heading: "How to use spreadsheets with BoonBuy Finds",
        paragraphs: [
          "Start on the homepage and search by brand — Nike, Jordan, Moncler, and more. When you find something worth a closer look, open the product page, check QC references if available, then follow the BoonBuy link to confirm size, batch, and live price.",
          "If you already have a spreadsheet URL or seller link, you can still paste it into BoonBuy when ordering. BoonBuy Finds is the discovery layer; BoonBuy is where checkout, QC, and shipping happen.",
        ],
        links: [
          { href: "/guides/boonbuy-spreadsheet", label: "Extended guide" },
          { href: "/boonbuy-weidian", label: "Weidian finds" },
        ],
      },
      {
        heading: "Why curated pages beat raw rows",
        paragraphs: [
          "Spreadsheets do not filter by image quality, QC availability, or category automatically. BoonBuy Finds ranks popular products, hides broken listings where possible, and surfaces related finds so you can build a haul without jumping between tabs.",
          "Collection pages like best Nike finds or QC-approved picks are designed for sharing in Discord, Reddit, and TikTok bios — cleaner than sending someone a 5,000-row Google Sheet.",
        ],
        links: [
          { href: "/best-boonbuy-finds", label: "Best BoonBuy finds" },
          { href: "/collections/best-qc-approved-finds", label: "QC finds" },
        ],
      },
      {
        heading: "Buying safely from spreadsheet links",
        paragraphs: [
          "Always confirm the live BoonBuy price before paying — spreadsheet prices can lag behind seller updates. Request warehouse QC photos for anything you plan to ship internationally, especially jackets, bags, and sneakers.",
          "Use BoonBuy Finds to shortlist products, then manage purchases in your BoonBuy dashboard. That workflow keeps discovery separate from payment and tracking.",
        ],
        links: [
          { href: "/boonbuy-qc", label: "BoonBuy QC guide" },
          { href: "/how-to-buy", label: "How to buy" },
        ],
      },
      {
        heading: "Popular brands in the BoonBuy spreadsheet universe",
        paragraphs: [
          "Nike and Jordan dominate sneaker rows, while Moncler, Canada Goose, and Arc'teryx lead jacket searches. Louis Vuitton, Gucci, and Goyard appear frequently in bag sections. Use brand pages on BoonBuy Finds instead of scanning entire sheets when you know what you want.",
          "Category pages for shoes, coats and jackets, hoodies, and accessories mirror how spreadsheets are organized — but with filters, sort options, and shareable product URLs.",
        ],
        links: [
          { href: "/brands/nike", label: "Nike finds" },
          { href: "/brands/jordan", label: "Jordan finds" },
          { href: "/brands/moncler", label: "Moncler finds" },
          { href: "/categories/shoes", label: "Shoe category" },
        ],
      },
      {
        heading: "When to switch from spreadsheet to BoonBuy Finds",
        paragraphs: [
          "Keep your spreadsheet for batch comparisons and seller notes you have collected over time. Use BoonBuy Finds when you want to search on mobile, share a single product link, or browse QC-approved picks without downloading a new file every week.",
          "Many buyers bookmark both: the spreadsheet for reference and BoonBuy Finds for daily discovery. The product grid below highlights current editor picks that would otherwise be buried mid-sheet.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is BoonBuy Finds the same as a BoonBuy spreadsheet?",
        answer:
          "They share the same product universe. BoonBuy Finds is a searchable catalog built on spreadsheet and agent data — not a replacement for your BoonBuy account.",
      },
      {
        question: "Can I still use my old spreadsheet?",
        answer:
          "Yes. Many buyers use both — spreadsheets for raw data and BoonBuy Finds for faster discovery and sharing.",
      },
      {
        question: "How often is the catalog updated?",
        answer:
          "The dataset syncs daily. New finds appear in Recently Added and collection pages after each sync.",
      },
    ],
    relatedLinks: [
      { href: "/boonbuy-finds", label: "BoonBuy finds" },
      { href: "/boonbuy-guide", label: "BoonBuy guide hub" },
      ...RESOURCE_LINKS,
    ],
    getProducts: () => getEditorsPicks(48),
    productSectionTitle: "Featured BoonBuy spreadsheet picks",
  },

  "boonbuy-qc": {
    slug: "boonbuy-qc",
    path: "/boonbuy-qc",
    title: "BoonBuy QC Photos Guide",
    metaDescription:
      "BoonBuy QC explained — reference photos, warehouse QC, what to check before shipping, and where to find QC-approved finds on BoonBuy Finds.",
    badge: "BoonBuy QC",
    h1: "BoonBuy QC photos",
    intro:
      "QC (quality control) photos are the safety net of agent buying. BoonBuy Finds links to QC references where available, and BoonBuy lets you request warehouse photos of your exact item before you ship your haul.",
    sections: [
      {
        heading: "Reference QC vs warehouse QC",
        paragraphs: [
          "Reference QC on a find page shows photos from other buyers or batch examples. They help you compare stitching, materials, and shape before you order — but they are not photos of your specific item.",
          "Warehouse QC is taken after you pay. BoonBuy staff photograph your exact product at the warehouse. That is the check that matters before international shipping.",
        ],
        links: [
          { href: "/guides/boonbuy-qc-photos", label: "Detailed QC guide" },
          { href: "/best-qc-approved-finds", label: "QC-approved list" },
        ],
      },
      {
        heading: "What to look for in QC photos",
        paragraphs: [
          "Check logo placement, sole shape, zipper quality, and color accuracy under normal lighting. For jackets, inspect stitching on cuffs and hem. For bags, verify hardware engraving and lining.",
          "If something looks off, you can often exchange or refund before shipping — but only if you review QC in time. Do not approve items you are unsure about.",
        ],
        links: [
          { href: "/guides/how-to-check-qc-photos", label: "How to check QC" },
          { href: "/boonbuy-jackets", label: "Jacket finds" },
        ],
      },
      {
        heading: "Finding QC-linked products",
        paragraphs: [
          "Use the Top QC Finds rail on the homepage or browse QC-approved collection pages. Products with QC references are marked on their listing pages.",
          "Popular sneakers and designer bags tend to have the most community QC threads — search by brand for the best results.",
        ],
        links: [
          { href: "/collections/best-qc-approved-finds", label: "QC collection" },
          { href: "/boonbuy-sneakers", label: "Sneaker finds" },
        ],
      },
      {
        heading: "QC workflow on BoonBuy",
        paragraphs: [
          "After you pay, BoonBuy receives the item at a Chinese warehouse. You can request detailed photos before approving shipment. This is separate from reference QC on find pages, which shows examples from other orders.",
          "Approve QC only when you are satisfied. If stitching, color, or hardware looks wrong, contact support through BoonBuy before the parcel leaves the warehouse.",
        ],
        links: [
          { href: "/guides/how-to-check-qc-photos", label: "Check QC photos" },
          { href: "/boonbuy-guide", label: "BoonBuy guide hub" },
        ],
      },
      {
        heading: "Categories where QC matters most",
        paragraphs: [
          "Sneakers, designer bags, and puffer jackets benefit most from QC because small details affect resale value and wearability. Budget tees and accessories are lower risk but still worth a quick warehouse check.",
          "BoonBuy Finds surfaces QC-linked listings in dedicated rails and on this page's product grid so you can build a haul with fewer surprises.",
        ],
        links: [
          { href: "/best-boonbuy-sneakers-2026", label: "Best sneakers 2026" },
          { href: "/best-boonbuy-jackets-2026", label: "Best jackets 2026" },
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a BoonBuy account for QC?",
        answer:
          "You can view reference QC on BoonBuy Finds without an account. Warehouse QC for your orders requires a BoonBuy account after you purchase.",
      },
      {
        question: "Are QC photos guaranteed?",
        answer:
          "Reference QC availability varies by product. Warehouse QC is requested per order on BoonBuy after the item arrives.",
      },
    ],
    relatedLinks: [
      { href: "/boonbuy-finds", label: "BoonBuy finds" },
      { href: "/boonbuy-spreadsheet", label: "Spreadsheet guide" },
      ...RESOURCE_LINKS,
    ],
    getProducts: withQc,
    productSectionTitle: "QC-approved BoonBuy finds",
  },

  "boonbuy-finds": {
    slug: "boonbuy-finds",
    path: "/boonbuy-finds",
    title: "BoonBuy Finds Catalog",
    metaDescription:
      "Browse verified sneaker, fashion and streetwear finds on BoonBuy — QC photos, spreadsheet-style discovery, and trusted checkout links.",
    badge: "BoonBuy Finds",
    h1: "BoonBuy finds",
    intro:
      "BoonBuy Finds is a curated discovery catalog for fashion and sneaker products. Search by brand or category, save favorites, and open verified BoonBuy links when you are ready to order.",
    sections: [
      {
        heading: "What makes BoonBuy Finds different",
        paragraphs: [
          "Instead of scrolling a raw BoonBuy spreadsheet, you get product pages with images, categories, QC badges, and related picks. Every outbound buy button opens a tested BoonBuy listing.",
          "The catalog covers sneakers, outerwear, hoodies, bags, accessories, and more — updated daily as new rows are added to the underlying dataset.",
        ],
        links: [
          { href: "/brands", label: "All brands" },
          { href: "/categories", label: "Categories" },
        ],
      },
      {
        heading: "How to search effectively",
        paragraphs: [
          "Use the homepage search for brands like Nike, Jordan, Moncler, or product types like jackets and bags. Filter the full catalog by category and price once you scroll to Browse All Finds.",
          "Check Popular Today and Top QC Finds for community-weighted picks before diving into the full catalog.",
        ],
        links: [
          { href: "/most-popular-finds-now", label: "Popular today" },
          { href: "/trending", label: "Trending" },
        ],
      },
      {
        heading: "From discovery to delivery",
        paragraphs: [
          "BoonBuy Finds helps you discover. BoonBuy handles purchase, warehouse storage, QC, and international shipping. Register on BoonBuy before your first order to unlock verified links and tracking.",
          "Save products to your wishlist on BoonBuy Finds, then open BoonBuy when you are ready to build a haul.",
        ],
        links: [
          { href: "/boonbuy-guide", label: "BoonBuy guide" },
          { href: "/how-to-buy", label: "How to buy" },
        ],
      },
      {
        heading: "BoonBuy Finds vs BoonBuy spreadsheet",
        paragraphs: [
          "Community BoonBuy spreadsheets are often shared as Google Sheets or Excel files with thousands of rows. BoonBuy Finds indexes the same product universe into pages you can search, filter, and share individually.",
          "If you are looking for the BoonBuy spreadsheet experience without the scroll fatigue, start with our spreadsheet guide and the product grid below.",
        ],
        links: [
          { href: "/boonbuy-spreadsheet", label: "Spreadsheet guide" },
          { href: "/collections/boonbuy-spreadsheet-alternative", label: "Spreadsheet alternative" },
        ],
      },
      {
        heading: "Marketplaces behind the finds",
        paragraphs: [
          "Most listings originate from Weidian or Taobao sellers. BoonBuy acts as the agent so you can pay in familiar currencies and ship to your country. Browse Weidian and Taobao guides for marketplace-specific tips.",
        ],
        links: [
          { href: "/boonbuy-weidian", label: "Weidian guide" },
          { href: "/boonbuy-taobao", label: "Taobao guide" },
        ],
      },
    ],
    faqs: [
      {
        question: "Is BoonBuy Finds free?",
        answer: "Yes. Browsing is free. You only pay when purchasing through BoonBuy.",
      },
      {
        question: "How many products are listed?",
        answer:
          "The public catalog highlights 10,000+ curated finds with daily updates across sneakers, clothing, and accessories.",
      },
    ],
    relatedLinks: [
      { href: "/best-boonbuy-finds", label: "Best finds" },
      { href: "/boonbuy-products", label: "All products" },
      ...RESOURCE_LINKS,
    ],
    getProducts: () => getEditorsPicks(72),
    productSectionTitle: "Top BoonBuy finds right now",
  },

  "boonbuy-sneakers": {
    slug: "boonbuy-sneakers",
    path: "/boonbuy-sneakers",
    title: "Best BoonBuy Sneakers 2026",
    metaDescription:
      "Best BoonBuy sneakers in 2026 — Nike, Jordan, Adidas, New Balance picks with QC links and verified agent buy buttons.",
    badge: "BoonBuy sneakers",
    h1: "BoonBuy sneakers",
    intro:
      "Sneakers are the most searched category on BoonBuy Finds. This page surfaces current Nike, Jordan, Adidas, and New Balance picks with photos, pricing, and direct BoonBuy purchase links.",
    sections: [
      {
        heading: "Top sneaker brands on BoonBuy",
        paragraphs: [
          "Nike Dunks and Air Max, Jordan retros and mids, Adidas Campus and Samba silhouettes, and New Balance 550/2002R styles dominate the catalog. Use brand filters to narrow your search.",
          "QC references matter most for sneakers — check batch comparisons before you buy and request warehouse QC after payment.",
        ],
        links: [
          { href: "/brands/nike", label: "Nike" },
          { href: "/brands/jordan", label: "Jordan" },
          { href: "/top-rep-sneakers", label: "Top sneakers list" },
        ],
      },
      {
        heading: "Sizing and batch tips",
        paragraphs: [
          "Always read the BoonBuy listing for size charts — EU and US sizing varies by seller. Community QC helps you compare toe box shape and materials between batches.",
          "If you are new, start with well-reviewed sellers and lower-risk colorways before ordering grail pairs.",
        ],
        links: [
          { href: "/boonbuy-qc", label: "QC guide" },
          { href: "/guides/best-rep-sneakers", label: "Sneaker guide" },
        ],
      },
      {
        heading: "Best BoonBuy sneaker categories",
        paragraphs: [
          "Low-top lifestyle shoes like Dunks and Campus styles are popular entry points. Jordan 1 highs and mids remain perennial searches. Running silhouettes like New Balance 2002R offer a different aesthetic for streetwear fits.",
          "Use the sneakers category and brand filters to narrow results. The grid below updates with catalog sync so you always see current inventory.",
        ],
        links: [
          { href: "/categories/shoes", label: "All shoes" },
          { href: "/best-boonbuy-sneakers-2026", label: "Best sneakers 2026" },
          { href: "/top-nike-finds", label: "Top Nike finds" },
        ],
      },
      {
        heading: "Building a sneaker haul",
        paragraphs: [
          "Combine two or three pairs with lighter items to optimize shipping weight. Request QC on every pair before approval — sole glue, stitching, and logo placement are the usual checks.",
          "BoonBuy Finds links each sneaker to a verified agent listing so you do not have to hunt for working URLs in spreadsheet comments.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the best BoonBuy sneakers right now?",
        answer:
          "Popular picks rotate daily. Check Popular Today and the product grid below for current Nike and Jordan heat.",
      },
    ],
    relatedLinks: [
      { href: "/best-boonbuy-sneakers-2026", label: "Best sneakers 2026" },
      { href: "/boonbuy-finds", label: "All finds" },
    ],
    getProducts: TOP_LISTS["top-rep-sneakers"].getProducts,
    productSectionTitle: "Best BoonBuy sneakers",
  },

  "boonbuy-jackets": {
    slug: "boonbuy-jackets",
    path: "/boonbuy-jackets",
    title: "Best BoonBuy Jackets 2026",
    metaDescription:
      "Best BoonBuy jackets and outerwear — Moncler, Arc'teryx, Stone Island, puffers and shells with verified links.",
    badge: "BoonBuy jackets",
    h1: "BoonBuy jackets",
    intro:
      "Outerwear is a high-consideration buy — QC matters even more here. Browse puffers, shells, and streetwear jackets from Moncler, Canada Goose, Arc'teryx, and more with BoonBuy agent links.",
    sections: [
      {
        heading: "Popular jacket brands",
        paragraphs: [
          "Moncler and Canada Goose puffers, Arc'teryx shells, and Stone Island badges are among the most saved jacket finds. Compare photos carefully and budget for shipping — jackets are heavy.",
          "Use the coats and jackets category to filter the full catalog beyond this curated grid.",
        ],
        links: [
          { href: "/categories/coats-and-jackets", label: "Jackets category" },
          { href: "/collections/best-jackets", label: "Jacket collection" },
          { href: "/brands/moncler", label: "Moncler" },
        ],
      },
      {
        heading: "QC for outerwear",
        paragraphs: [
          "Inspect badge stitching, zipper brands, fill distribution, and cuff elasticity in QC photos. Reference QC on find pages helps; warehouse QC confirms your exact jacket.",
        ],
        links: [{ href: "/boonbuy-qc", label: "BoonBuy QC" }],
      },
      {
        heading: "Shipping jackets internationally",
        paragraphs: [
          "Outerwear is volumetric weight — expect higher freight than tees or accessories. Many buyers time jacket purchases around seasonal sales on BoonBuy shipping lines.",
          "Consolidate multiple items in one haul to amortize cost. BoonBuy Finds helps you plan the haul before you pay.",
        ],
        links: [
          { href: "/best-boonbuy-jackets-2026", label: "Best jackets 2026" },
          { href: "/collections/best-moncler-finds", label: "Moncler collection" },
        ],
      },
      {
        heading: "Jacket styles trending on BoonBuy",
        paragraphs: [
          "Puffer jackets and down-filled coats lead winter searches. Lightweight shells from outdoor brands appeal to year-round buyers. Streetwear bombers and varsity jackets round out the catalog.",
          "Browse the coats and jackets category for the full selection beyond this curated grid.",
        ],
        links: [
          { href: "/categories/coats-and-jackets", label: "Jackets category" },
          { href: "/brands/canada-goose", label: "Canada Goose" },
        ],
      },
    ],
    faqs: [
      {
        question: "Are BoonBuy jackets worth the shipping cost?",
        answer:
          "Heavy items cost more to ship. Many buyers consolidate jackets with sneakers and tees in one haul to optimize freight.",
      },
    ],
    relatedLinks: [
      { href: "/best-boonbuy-jackets-2026", label: "Best jackets 2026" },
      { href: "/boonbuy-finds", label: "BoonBuy finds" },
    ],
    getProducts: () => filterFeaturedEligible(byCategory("coats-and-jackets")).slice(0, 72),
    productSectionTitle: "Best BoonBuy jackets",
  },

  "boonbuy-weidian": {
    slug: "boonbuy-weidian",
    path: "/boonbuy-weidian",
    title: "BoonBuy Weidian Finds Guide",
    metaDescription:
      "How to find and buy Weidian products through BoonBuy — curated finds, verified links, and marketplace tips.",
    badge: "Weidian",
    h1: "BoonBuy Weidian finds",
    intro:
      "Weidian is a major source for streetwear and sneaker finds in the BoonBuy ecosystem. BoonBuy Finds surfaces Weidian-linked products with searchable pages instead of raw seller URLs.",
    sections: [
      {
        heading: "Buying Weidian through BoonBuy",
        paragraphs: [
          "You do not check out on Weidian directly from most countries. BoonBuy places the order, receives the parcel at a Chinese warehouse, and ships internationally when you are ready.",
          "Product pages on BoonBuy Finds show the source when available. Always confirm the live listing on BoonBuy before paying.",
        ],
        links: [
          { href: "/guides/boonbuy-weidian-finds", label: "Weidian guide" },
          { href: "/guides/how-to-buy-from-weidian", label: "How to buy Weidian" },
        ],
      },
      {
        heading: "Finding quality Weidian sellers",
        paragraphs: [
          "Use QC references and community feedback before ordering. Popular brands like Nike and Moncler have more QC threads — use them to compare batches.",
        ],
        links: [
          { href: "/boonbuy-qc", label: "QC photos" },
          { href: "/trending", label: "Trending finds" },
        ],
      },
    ],
    faqs: [
      {
        question: "Weidian vs Taobao on BoonBuy?",
        answer:
          "Both work through the same BoonBuy workflow. Choose the listing with the best price, QC, and seller reputation.",
      },
    ],
    relatedLinks: [
      { href: "/boonbuy-taobao", label: "Taobao finds" },
      { href: "/boonbuy-finds", label: "BoonBuy finds" },
    ],
    getProducts: () => getEditorsPicks(48),
    productSectionTitle: "Popular Weidian finds",
  },

  "boonbuy-taobao": {
    slug: "boonbuy-taobao",
    path: "/boonbuy-taobao",
    title: "BoonBuy Taobao Finds Guide",
    metaDescription:
      "Discover Taobao fashion and sneaker finds on BoonBuy — searchable catalog, QC references, and verified agent links.",
    badge: "Taobao",
    h1: "BoonBuy Taobao finds",
    intro:
      "Taobao offers a massive range of fashion finds. BoonBuy Finds curates Taobao-linked listings so you can discover products before opening BoonBuy to complete your purchase.",
    sections: [
      {
        heading: "How Taobao fits into BoonBuy",
        paragraphs: [
          "BoonBuy acts as your buying agent for Taobao listings — handling payment, warehouse intake, QC, and shipping abroad.",
          "Browse by category on BoonBuy Finds, then follow the agent link to the matching Taobao product page inside BoonBuy.",
        ],
        links: [
          { href: "/guides/boonbuy-taobao-finds", label: "Taobao guide" },
          { href: "/guides/how-to-buy-from-taobao", label: "How to buy Taobao" },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I search Taobao in English on BoonBuy Finds?",
        answer:
          "Yes — use English brand names and keywords in the BoonBuy Finds search bar.",
      },
    ],
    relatedLinks: [
      { href: "/boonbuy-weidian", label: "Weidian finds" },
      { href: "/boonbuy-products", label: "All products" },
    ],
    getProducts: () => filterFeaturedEligible(byCategory("shoes", "hoodies-and-pants")).slice(0, 72),
    productSectionTitle: "Taobao-linked finds",
  },

  "boonbuy-guide": {
    slug: "boonbuy-guide",
    path: "/boonbuy-guide",
    title: "BoonBuy Guide Hub",
    metaDescription:
      "Complete BoonBuy guide — spreadsheets, QC photos, Weidian, Taobao, sneakers, jackets, and how to buy through BoonBuy Finds.",
    badge: "BoonBuy guide",
    h1: "BoonBuy guide",
    intro:
      "New to BoonBuy? Start here. This hub links every BoonBuy Finds resource — from spreadsheet browsing to QC photos, marketplace guides, and curated product collections.",
    sections: [
      {
        heading: "Start here",
        paragraphs: [
          "If you have never used a shopping agent, read how BoonBuy works, then browse the catalog by brand or category. Register on BoonBuy before your first purchase to unlock verified links and order tracking.",
        ],
        links: [
          { href: "/guides/beginner-guide-to-boonbuy", label: "Beginner guide" },
          { href: "/how-to-buy", label: "How to buy" },
          { href: "/boonbuy-finds", label: "Browse finds" },
        ],
      },
      {
        heading: "BoonBuy resources",
        paragraphs: [
          "Deep dives on spreadsheets, QC, sneakers, jackets, Weidian, and Taobao — each with product picks and FAQs.",
        ],
        links: [
          { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
          { href: "/boonbuy-qc", label: "QC photos" },
          { href: "/boonbuy-sneakers", label: "Sneakers" },
          { href: "/boonbuy-jackets", label: "Jackets" },
          { href: "/boonbuy-weidian", label: "Weidian" },
          { href: "/boonbuy-taobao", label: "Taobao" },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between BoonBuy and BoonBuy Finds?",
        answer:
          "BoonBuy Finds is discovery. BoonBuy is the agent where you pay, QC, and ship.",
      },
    ],
    relatedLinks: [
      { href: "/guides", label: "All guides" },
      { href: "/best-boonbuy-finds", label: "Best finds" },
    ],
    getProducts: () => getEditorsPicks(36),
    productSectionTitle: "Recommended finds for new users",
  },

  "best-boonbuy-finds": {
    slug: "best-boonbuy-finds",
    path: "/best-boonbuy-finds",
    title: "Best BoonBuy Finds 2026",
    metaDescription:
      "Best BoonBuy finds in 2026 — editor picks, QC-approved products, trending sneakers and streetwear with verified links.",
    badge: "Best finds",
    h1: "Best BoonBuy finds",
    intro:
      "The strongest picks from the BoonBuy Finds catalog — combining photos, QC availability, verified buy links, and community engagement. Updated with daily catalog sync.",
    sections: [
      {
        heading: "How we pick best finds",
        paragraphs: [
          "Products are ranked using engagement signals, premium brand weighting, QC availability, and image quality. Popular Today and editor picks feed into this page.",
        ],
        links: [
          { href: "/most-popular-finds-now", label: "Popular today" },
          { href: "/collections/best-boonbuy-finds-2026", label: "2026 collection" },
        ],
      },
    ],
    faqs: [
      {
        question: "How often do best finds change?",
        answer: "The grid rotates daily based on analytics and catalog updates.",
      },
    ],
    relatedLinks: [
      { href: "/boonbuy-finds", label: "All BoonBuy finds" },
      { href: "/boonbuy-sneakers", label: "Sneakers" },
    ],
    getProducts: () => getEditorsPicks(96),
    productSectionTitle: "Best BoonBuy finds today",
  },

  "boonbuy-products": {
    slug: "boonbuy-products",
    path: "/boonbuy-products",
    title: "BoonBuy Products Catalog",
    metaDescription:
      "Browse all BoonBuy products — sneakers, jackets, bags, hoodies and accessories with verified agent links and QC references.",
    badge: "Products",
    h1: "BoonBuy products",
    intro:
      "Every product on BoonBuy Finds links to a verified BoonBuy listing. Browse sneakers, outerwear, streetwear, bags, and accessories — filter by brand, category, and price in the full catalog below.",
    sections: [
      {
        heading: "Product categories",
        paragraphs: [
          "Shoes, coats and jackets, hoodies and pants, accessories, and electronics each have dedicated category pages. Use brand pages for Nike, Jordan, Moncler, and more.",
        ],
        links: [
          { href: "/categories", label: "Categories" },
          { href: "/brands", label: "Brands" },
        ],
      },
    ],
    faqs: [
      {
        question: "Are all products QC approved?",
        answer:
          "Not every listing has QC references, but QC-approved products are marked on their pages.",
      },
    ],
    relatedLinks: [
      { href: "/boonbuy-finds", label: "BoonBuy finds" },
      { href: "/boonbuy-spreadsheet", label: "Spreadsheet guide" },
    ],
    getProducts: () => filterFeaturedEligible(priced(getAllProducts())).slice(0, 96),
    productSectionTitle: "Featured BoonBuy products",
  },

  "best-boonbuy-sneakers-2026": {
    slug: "best-boonbuy-sneakers-2026",
    path: "/best-boonbuy-sneakers-2026",
    title: "Best BoonBuy Sneakers 2026",
    metaDescription:
      "Best BoonBuy sneakers for 2026 — Nike, Jordan, Adidas heat with QC links and verified buy buttons.",
    badge: "2026",
    h1: "Best BoonBuy sneakers 2026",
    intro:
      "The top sneaker finds on BoonBuy Finds for 2026 — ranked for photos, QC, and community clicks. Share this page or browse before your next haul.",
    sections: [
      {
        heading: "2026 sneaker trends",
        paragraphs: [
          "Jordan retros, Nike Dunks, and Adidas Campus styles continue to lead searches. Check QC references for batch comparisons before you buy.",
        ],
        links: [
          { href: "/boonbuy-sneakers", label: "BoonBuy sneakers" },
          { href: "/best-jordan-finds-2026", label: "Jordan 2026" },
        ],
      },
    ],
    faqs: [
      {
        question: "Will this list update in 2027?",
        answer: "Yes — product grids refresh daily with catalog sync.",
      },
    ],
    relatedLinks: [{ href: "/top-rep-sneakers", label: "Top sneakers" }],
    getProducts: TOP_LISTS["top-rep-sneakers"].getProducts,
    productSectionTitle: "Best sneakers 2026",
  },

  "best-boonbuy-jackets-2026": {
    slug: "best-boonbuy-jackets-2026",
    path: "/best-boonbuy-jackets-2026",
    title: "Best BoonBuy Jackets 2026",
    metaDescription:
      "Best BoonBuy jackets for 2026 — Moncler, puffers, shells and streetwear outerwear.",
    badge: "2026",
    h1: "Best BoonBuy jackets 2026",
    intro:
      "Outerwear picks for 2026 from the BoonBuy Finds catalog — puffers, shells, and designer jackets with verified BoonBuy links.",
    sections: [
      {
        heading: "Winter and seasonal picks",
        paragraphs: [
          "Moncler and Canada Goose lead jacket searches. Budget for shipping weight and always QC before you approve warehouse photos.",
        ],
        links: [
          { href: "/boonbuy-jackets", label: "BoonBuy jackets" },
          { href: "/collections/best-moncler-finds", label: "Moncler finds" },
        ],
      },
    ],
    faqs: [
      {
        question: "What jackets are most popular on BoonBuy in 2026?",
        answer:
          "Moncler puffers, Canada Goose parkas, and Arc'teryx shells lead searches. Check the grid below for current picks.",
      },
    ],
    relatedLinks: [{ href: "/categories/coats-and-jackets", label: "Jackets" }],
    getProducts: () => filterFeaturedEligible(byCategory("coats-and-jackets")).slice(0, 72),
    productSectionTitle: "Best jackets 2026",
  },

  "best-boonbuy-bags-2026": {
    slug: "best-boonbuy-bags-2026",
    path: "/best-boonbuy-bags-2026",
    title: "Best BoonBuy Bags 2026",
    metaDescription:
      "Best BoonBuy bags 2026 — designer handbags, crossbody, and backpacks with verified links.",
    badge: "2026",
    h1: "Best BoonBuy bags 2026",
    intro:
      "Designer and streetwear bag finds for 2026 — Louis Vuitton, Gucci, Goyard, and more with BoonBuy purchase links.",
    sections: [
      {
        heading: "Bag buying tips",
        paragraphs: [
          "QC hardware, stitching, and leather texture carefully. Bags are high-value items — warehouse QC is essential.",
        ],
        links: [
          { href: "/top-designer-bags", label: "Designer bags" },
          { href: "/collections/best-bags", label: "Bag collection" },
        ],
      },
    ],
    faqs: [
      {
        question: "Which bag brands are best on BoonBuy?",
        answer:
          "Louis Vuitton, Gucci, and Goyard styles have the most QC references. Always request warehouse photos before shipping.",
      },
    ],
    relatedLinks: [{ href: "/boonbuy-products", label: "All products" }],
    getProducts: TOP_LISTS["top-designer-bags"].getProducts,
    productSectionTitle: "Best bags 2026",
  },

  "best-boonbuy-accessories-2026": {
    slug: "best-boonbuy-accessories-2026",
    path: "/best-boonbuy-accessories-2026",
    title: "Best BoonBuy Accessories 2026",
    metaDescription:
      "Best BoonBuy accessories 2026 — hats, belts, glasses, and streetwear add-ons.",
    badge: "2026",
    h1: "Best BoonBuy accessories 2026",
    intro:
      "Accessories complete a fit — browse hats, belts, glasses, and more from the BoonBuy Finds catalog.",
    sections: [
      {
        heading: "Accessory categories",
        paragraphs: [
          "Use the accessories category for bags, hats, and eyewear. Smaller items are great for filling out a haul under weight limits.",
        ],
        links: [{ href: "/categories/accessories", label: "Accessories" }],
      },
    ],
    faqs: [
      {
        question: "Are accessories good for first hauls?",
        answer:
          "Yes — hats, belts, and small items add variety without heavy shipping cost.",
      },
    ],
    relatedLinks: [{ href: "/boonbuy-finds", label: "BoonBuy finds" }],
    getProducts: () => filterFeaturedEligible(byCategory("accessories")).slice(0, 72),
    productSectionTitle: "Best accessories 2026",
  },

  "best-boonbuy-finds-under-50": {
    slug: "best-boonbuy-finds-under-50",
    path: "/best-boonbuy-finds-under-50",
    title: "Best BoonBuy Finds Under $50",
    metaDescription:
      "Best BoonBuy finds under $50 — budget sneakers, tees, and accessories for your next haul.",
    badge: "Budget",
    h1: "Best BoonBuy finds under $50",
    intro:
      "Low-risk picks under $50 from the BoonBuy catalog — ideal for first hauls or filling out shipping weight.",
    sections: [
      {
        heading: "Budget haul strategy",
        paragraphs: [
          "Mix budget tees and accessories with one higher-value sneaker or jacket to optimize shipping. Confirm live BoonBuy prices at checkout.",
        ],
        links: [
          { href: "/top-budget-finds", label: "Budget list" },
          { href: "/deals", label: "Deals page" },
        ],
      },
    ],
    faqs: [
      {
        question: "Are prices under $50 accurate?",
        answer:
          "List prices sync from the catalog. Confirm the live BoonBuy price at checkout before paying.",
      },
    ],
    relatedLinks: [{ href: "/best-boonbuy-finds", label: "Best finds" }],
    getProducts: TOP_LISTS["top-products-under-50"].getProducts,
    productSectionTitle: "Finds under $50",
  },

  "best-boonbuy-hoodies": {
    slug: "best-boonbuy-hoodies",
    path: "/best-boonbuy-hoodies",
    title: "Best BoonBuy Hoodies",
    metaDescription:
      "Best BoonBuy hoodies — Stussy, Corteiz, Nike tech fleece, Supreme, and streetwear layers with verified links and QC references.",
    badge: "Hoodies",
    h1: "Best BoonBuy hoodies",
    intro:
      "The strongest hoodie picks from the BoonBuy Finds catalog — graphic streetwear, designer layers, and everyday rotation pieces with verified buy links.",
    sections: [
      {
        heading: "Popular hoodie brands on BoonBuy",
        paragraphs: [
          "Stussy, Corteiz, Nike tech fleece, Supreme, and Ami heart-logo knits lead hoodie searches. Filter by brand on each product page or browse brand authority pages for focused lanes.",
          "Hoodies are ideal haul fillers — lighter than puffers but higher engagement than basic tees. Compare print placement and drawstrings in QC before shipping.",
        ],
        links: [
          { href: "/categories/hoodies", label: "Hoodie category" },
          { href: "/brands/stussy", label: "Stussy finds" },
          { href: "/best-hoodies", label: "Best hoodies list" },
        ],
      },
    ],
    faqs: [
      {
        question: "What are the best BoonBuy hoodies?",
        answer:
          "Community favorites rotate daily — check Popular Today and this page's grid for current picks with QC references.",
      },
    ],
    relatedLinks: [
      { href: "/best-boonbuy-finds", label: "Best finds" },
      { href: "/boonbuy-finds", label: "All finds" },
    ],
    getProducts: () =>
      filterFeaturedEligible(
        priced(
          getAllProducts().filter(
            (p) =>
              p.category_slug === "hoodies-and-pants" &&
              /hoodie|sweatshirt|crewneck/i.test(p.product_name)
          )
        )
      ).slice(0, 72),
    productSectionTitle: "Top hoodie finds",
  },

  "best-weidian-finds": {
    slug: "best-weidian-finds",
    path: "/best-weidian-finds",
    title: "Best Weidian Finds on BoonBuy",
    metaDescription:
      "Best Weidian finds on BoonBuy — curated sneakers, streetwear, and accessories from Weidian sellers with verified agent links.",
    badge: "Weidian",
    h1: "Best Weidian finds",
    intro:
      "Weidian is a major source for streetwear and sneaker finds. BoonBuy Finds indexes Weidian-linked products with photos, pricing, and verified BoonBuy buy links.",
    sections: [
      {
        heading: "How to buy Weidian finds",
        paragraphs: [
          "Open a product page, click the BoonBuy buy link, and confirm size and price on BoonBuy. The agent places the Weidian order and stores your parcel for QC and shipping.",
          "Many of the best Weidian finds include QC reference links from previous buyers — compare before you order.",
        ],
        links: [
          { href: "/boonbuy-weidian", label: "Weidian guide" },
          { href: "/guides/how-to-buy-from-weidian", label: "How to buy from Weidian" },
        ],
      },
    ],
    faqs: [
      {
        question: "What are Weidian finds?",
        answer:
          "Products listed on Weidian, a Chinese marketplace. BoonBuy acts as your buying agent for international checkout and shipping.",
      },
    ],
    relatedLinks: [
      { href: "/boonbuy-finds", label: "BoonBuy finds" },
      { href: "/best-boonbuy-finds", label: "Best finds" },
    ],
    getProducts: () =>
      filterFeaturedEligible(
        priced(getAllProducts().filter((p) => /weidian/i.test(p.affiliate_link)))
      ).slice(0, 72),
    productSectionTitle: "Top Weidian finds",
  },

  "best-boonbuy-under-20": {
    slug: "best-boonbuy-under-20",
    path: "/best-boonbuy-under-20",
    title: "Best BoonBuy Finds Under $20",
    metaDescription:
      "Best BoonBuy finds under $20 — budget tees, accessories, and low-risk haul fillers with verified links.",
    badge: "Under $20",
    h1: "Best BoonBuy finds under $20",
    intro:
      "Lowest-risk picks under $20 from the BoonBuy catalog — ideal for first hauls, testing an agent, or filling shipping weight.",
    sections: [
      {
        heading: "Budget buying tips",
        paragraphs: [
          "Under-$20 items are great for testing BoonBuy workflow before bigger purchases. Bundle several budget pieces to spread shipping cost.",
        ],
        links: [
          { href: "/best-under-20", label: "Under $20 list" },
          { href: "/deals", label: "Deals" },
        ],
      },
    ],
    faqs: [
      {
        question: "Are under-$20 finds worth shipping?",
        answer:
          "Best as part of a multi-item haul. Solo shipping on a single $15 tee rarely makes financial sense.",
      },
    ],
    relatedLinks: [{ href: "/best-boonbuy-finds-under-50", label: "Under $50" }],
    getProducts: TOP_LISTS["top-products-under-20"].getProducts,
    productSectionTitle: "Finds under $20",
  },

  "best-boonbuy-under-100": {
    slug: "best-boonbuy-under-100",
    path: "/best-boonbuy-under-100",
    title: "Best BoonBuy Finds Under $100",
    metaDescription:
      "Best BoonBuy finds under $100 — sneakers, jackets, bags, and streetwear with verified links and QC references.",
    badge: "Under $100",
    h1: "Best BoonBuy finds under $100",
    intro:
      "Mid-range picks under $100 — sneakers, outerwear, and designer accessories with strong QC availability and verified BoonBuy links.",
    sections: [
      {
        heading: "Mid-range haul strategy",
        paragraphs: [
          "The under-$100 lane covers most sneakers and many jackets. Compare QC references and confirm live BoonBuy prices at checkout.",
        ],
        links: [
          { href: "/best-under-100", label: "Under $100 list" },
          { href: "/best-sneakers", label: "Best sneakers" },
        ],
      },
    ],
    faqs: [],
    relatedLinks: [{ href: "/best-boonbuy-finds", label: "Best finds" }],
    getProducts: TOP_LISTS["top-products-under-100"].getProducts,
    productSectionTitle: "Finds under $100",
  },

  "top-qc-finds": {
    slug: "top-qc-finds",
    path: "/top-qc-finds",
    title: "Top QC Finds on BoonBuy",
    metaDescription:
      "Top QC finds on BoonBuy — products with quality control reference photos for sneakers, jackets, bags, and streetwear.",
    badge: "QC",
    h1: "Top QC finds",
    intro:
      "Products with QC reference links help you compare batches before ordering. These are the strongest QC-documented finds in the catalog.",
    sections: [
      {
        heading: "How to use QC finds",
        paragraphs: [
          "Reference QC on find pages shows photos from previous buyers or batches. After purchase, request warehouse QC on BoonBuy for your exact item before shipping.",
        ],
        links: [
          { href: "/boonbuy-qc", label: "BoonBuy QC guide" },
          { href: "/guides/how-to-check-qc-photos", label: "Check QC photos" },
        ],
      },
    ],
    faqs: [
      {
        question: "What are QC finds?",
        answer:
          "Listings with quality control reference photos attached — useful for comparing materials and construction before you buy.",
      },
    ],
    relatedLinks: [
      { href: "/best-qc-items", label: "Best QC items" },
      { href: "/collections/best-qc-approved-finds", label: "QC collection" },
    ],
    getProducts: () => withQc(96),
    productSectionTitle: "Top QC finds",
  },

  "trending-boonbuy-finds": {
    slug: "trending-boonbuy-finds",
    path: "/trending-boonbuy-finds",
    title: "Trending BoonBuy Finds",
    metaDescription:
      "Trending BoonBuy finds today — hottest sneakers, jackets, hoodies, and streetwear with verified links, updated daily.",
    badge: "Trending",
    h1: "Trending BoonBuy finds",
    intro:
      "What is hot right now across the BoonBuy Finds catalog — ranked from trending sheet imports, engagement signals, and daily catalog sync.",
    sections: [
      {
        heading: "How trending works",
        paragraphs: [
          "Trending picks rotate daily based on catalog imports and visitor engagement. Sneakers and outerwear typically lead during seasonal peaks.",
        ],
        links: [
          { href: "/trending", label: "Trending page" },
          { href: "/most-popular-finds-now", label: "Popular today" },
        ],
      },
    ],
    faqs: [
      {
        question: "How often does trending update?",
        answer: "The grid refreshes with daily catalog sync and engagement-weighted rotation.",
      },
    ],
    relatedLinks: [
      { href: "/best-boonbuy-finds", label: "Best finds" },
      { href: "/best-finds-this-week", label: "This week" },
    ],
    getProducts: () => filterFeaturedEligible(priced(getTrendingProducts())).slice(0, 96),
    productSectionTitle: "Trending now",
  },

  "best-boonbuy-finds-2026": {
    slug: "best-boonbuy-finds-2026",
    path: "/best-boonbuy-finds-2026",
    title: "Best BoonBuy Finds 2026",
    metaDescription:
      "Best BoonBuy finds in 2026 — editor picks, QC-approved sneakers, jackets, and streetwear with verified links.",
    badge: "2026",
    h1: "Best BoonBuy finds 2026",
    intro:
      "The definitive 2026 collection of top BoonBuy finds — combining QC availability, engagement, premium brands, and verified buy links.",
    sections: [
      {
        heading: "2026 editor picks",
        paragraphs: [
          "This page highlights the strongest catalog entries for 2026 — sneakers, outerwear, and designer accessories with the best photos and QC coverage.",
        ],
        links: [
          { href: "/collections/best-boonbuy-finds-2026", label: "2026 collection" },
          { href: "/best-boonbuy-sneakers-2026", label: "Sneakers 2026" },
        ],
      },
    ],
    faqs: [],
    relatedLinks: [
      { href: "/best-boonbuy-finds", label: "Best finds hub" },
      { href: "/boonbuy-finds", label: "All finds" },
    ],
    getProducts: () => getEditorsPicks(96),
    productSectionTitle: "Best finds 2026",
  },
};

export const SEO_LANDING_SLUGS = Object.keys(SEO_LANDING_PAGES);

export function getSeoLandingPage(slug: string): SeoLandingConfig | undefined {
  return SEO_LANDING_PAGES[slug];
}
