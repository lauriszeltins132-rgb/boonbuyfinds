#!/usr/bin/env node
/**
 * Build vanity redirect registry from catalog brands + fixed shortcuts.
 * Edge/next.config load this JSON so brand short URLs stay dynamic.
 *
 * Run: node scripts/generate-vanity-registry.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const productsPath = path.join(root, "src/data/products.json");
const outPath = path.join(root, "src/data/vanity-registry.json");

const MIN_INDEXABLE_BRAND_COUNT = 3;

const BRAND_DISPLAY_ALIASES = {
  "Off White": "Off-White",
  "Arc'teryx": "Arcteryx",
  GGDB: "Golden Goose",
  "Maison Mihara Yasuhiro": "Mihara Yasuhiro",
  "Polo Ralph Lauren": "Ralph Lauren",
  LV: "Louis Vuitton",
};

const BRAND_SLUG_ALIASES = {
  offwhite: "off-white",
  ralphlauren: "ralph-lauren",
  "polo-ralph-lauren": "ralph-lauren",
  "ralph-lauren-polo": "ralph-lauren",
  lv: "louis-vuitton",
  louisvuitton: "louis-vuitton",
  stoneisland: "stone-island",
  thenorthface: "the-north-face",
  "north-face": "the-north-face",
  chromehearts: "chrome-hearts",
  "arc-teryx": "arcteryx",
  ggdb: "golden-goose",
  goldengoose: "golden-goose",
  newbalance: "new-balance",
  "chrome-heart": "chrome-hearts",
  "stone-islands": "stone-island",
};

const KNOWN_BRANDS = [
  "Chrome Hearts",
  "Balenciaga",
  "Ralph Lauren",
  "Supreme",
  "Essentials",
  "Dior",
  "Rick Owens",
  "Bape",
  "Burberry",
  "Nike",
  "Goyard",
  "Stone Island",
  "New Balance",
  "Sp5der",
  "Chanel",
  "Jordan",
  "Adidas",
  "Louis Vuitton",
  "Moncler",
  "Prada",
  "Gucci",
  "Off-White",
  "Off White",
  "Ami",
  "Lacoste",
  "Hermes",
  "Versace",
  "Fendi",
  "Givenchy",
  "Valentino",
  "Asics",
  "UGG",
  "The North Face",
  "Carhartt",
  "Gallery Dept",
  "Maison Margiela",
  "MM6",
  "Salomon",
  "Alexander McQueen",
  "Golden Goose",
  "GGDB",
  "Corteiz",
  "Stussy",
  "Palace",
  "Arc'teryx",
  "Arcteryx",
  "CP Company",
  "Palm Angels",
  "Amiri",
  "Loewe",
  "Miu Miu",
  "Yeezy",
  "Travis Scott",
  "Nocta",
  "Mertra",
  "Vivienne Westwood",
  "Vetements",
  "Bottega Veneta",
  "Timberland",
  "Converse",
  "Vans",
  "Puma",
  "Reebok",
  "Under Armour",
  "Lululemon",
  "Alo",
  "Zegna",
  "Loro Piana",
  "Canada Goose",
  "Moose Knuckles",
  "Marni",
  "Mihara Yasuhiro",
  "Maison Mihara Yasuhiro",
  "Represent",
  "Fear of God",
  "Acne Studios",
  "Rimowa",
  "Tiffany",
  "Rolex",
  "Casio",
  "Apple",
  "Sony",
];

const RESERVED = [
  "coupon",
  "coupons",
  "coupon-code",
  "promo",
  "promo-code",
  "discount",
  "discount-code",
  "finds",
  "spreadsheet",
  "qc",
  "shipping",
  "review",
  "legit",
  "telegram",
  "trending",
  "latest",
  "brands",
  "categories",
  "guides",
  "about",
  "contact",
  "privacy",
  "terms",
  "browse",
  "collections",
  "ai",
  "wishlist",
  "stats",
  "advertise",
  "api",
  "cdn",
  "processed",
  "under50",
  "under-50",
  "sneakers",
  "sneaker",
  "shoes",
  "hoodies",
  "hoodie",
  "jackets",
  "jacket",
  "bags",
  "bag",
  "accessories",
  "jerseys",
  "jersey",
  "nike-finds",
  "moncler-finds",
  "jordan-finds",
  "stussy-finds",
  "boonbuy",
  "boonbuy-finds",
  "boonbuy-coupons",
  "boonbuy-spreadsheet",
  "boonbuy-qc",
  "boonbuy-shipping",
  "boonbuy-review",
  "is-boonbuy-legit",
  "best-under-50",
  "best-jerseys",
  "deals",
  "feed.xml",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
  "_next",
];

const MARKETING = {
  coupon: "/boonbuy-coupons",
  coupons: "/boonbuy-coupons",
  "coupon-code": "/boonbuy-coupons",
  promo: "/boonbuy-coupons",
  "promo-code": "/boonbuy-coupons",
  discount: "/boonbuy-coupons",
  "discount-code": "/boonbuy-coupons",
  finds: "/boonbuy-finds",
  spreadsheet: "/boonbuy-spreadsheet",
  qc: "/boonbuy-qc",
  shipping: "/boonbuy-shipping",
  review: "/boonbuy-review",
  legit: "/is-boonbuy-legit",
  telegram: "/boonbuy-telegram",
};

const CATEGORIES = {
  sneakers: "/categories/shoes",
  sneaker: "/categories/shoes",
  shoes: "/categories/shoes",
  hoodies: "/categories/hoodies",
  hoodie: "/categories/hoodies",
  jackets: "/categories/jackets",
  jacket: "/categories/jackets",
  bags: "/categories/bags",
  bag: "/categories/bags",
  accessories: "/categories/accessories",
  jerseys: "/best-jerseys",
  jersey: "/best-jerseys",
};

const COLLECTIONS = {
  trending: "/trending",
  latest: "/latest-finds",
  under50: "/best-under-50",
  "under-50": "/best-under-50",
  "nike-finds": "/collections/best-nike-finds",
  "moncler-finds": "/collections/best-moncler-finds",
  "jordan-finds": "/collections/best-jordan-finds",
  "stussy-finds": "/collections/best-stussy-finds",
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const KNOWN_BRANDS_BY_LENGTH = [...KNOWN_BRANDS].sort((a, b) => b.length - a.length);

function extractBrand(productName) {
  const upper = productName.toUpperCase();
  for (const brand of KNOWN_BRANDS_BY_LENGTH) {
    if (upper.includes(brand.toUpperCase())) {
      return BRAND_DISPLAY_ALIASES[brand] ?? brand;
    }
  }
  return null;
}

function normalizeDisplay(name) {
  return BRAND_DISPLAY_ALIASES[name] ?? name;
}

function main() {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const counts = new Map();

  for (const product of products) {
    const brand = extractBrand(product.product_name);
    if (!brand) continue;
    const canonical = normalizeDisplay(brand);
    counts.set(canonical, (counts.get(canonical) || 0) + 1);
  }

  const brands = {};
  const thin = [];
  for (const [name, count] of counts.entries()) {
    const slug = slugify(name);
    if (RESERVED.includes(slug) || MARKETING[slug] || CATEGORIES[slug] || COLLECTIONS[slug]) {
      continue;
    }
    if (count >= MIN_INDEXABLE_BRAND_COUNT && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      brands[slug] = slug;
    } else {
      thin.push({ name, slug, count });
    }
  }

  // Alias keys that are not reserved and point at indexable brands
  const brandAliases = {};
  for (const [alias, canonical] of Object.entries(BRAND_SLUG_ALIASES)) {
    if (RESERVED.includes(alias) || MARKETING[alias] || CATEGORIES[alias] || COLLECTIONS[alias]) {
      continue;
    }
    if (brands[canonical]) {
      brandAliases[alias] = canonical;
    }
  }

  const registry = {
    generatedAt: new Date().toISOString(),
    minIndexableBrandCount: MIN_INDEXABLE_BRAND_COUNT,
    reserved: RESERVED,
    marketing: MARKETING,
    categories: CATEGORIES,
    collections: COLLECTIONS,
    brands,
    brandAliases,
    thinBrandsExcluded: thin.sort((a, b) => a.slug.localeCompare(b.slug)),
    stats: {
      indexableBrands: Object.keys(brands).length,
      thinBrands: thin.length,
      brandAliases: Object.keys(brandAliases).length,
      categoryShortcuts: Object.keys(CATEGORIES).length,
      collectionShortcuts: Object.keys(COLLECTIONS).length,
    },
  };

  fs.writeFileSync(outPath, JSON.stringify(registry, null, 2) + "\n");
  console.log(
    `Vanity registry → ${outPath} (${registry.stats.indexableBrands} brands, ${registry.stats.thinBrands} thin excluded)`
  );
}

main();
