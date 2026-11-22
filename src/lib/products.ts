import type { CategoryInfo, Product } from "./types";
import productsData from "@/data/products.json";
import { getBrandsFromProducts } from "./brands";
import { filterBrowsableProducts } from "./catalog-filters";
import {
  compareProductVisualQuality,
  passesCardDisplayGate,
} from "./product-image-presentation";
import { auditCatalogPrices, hasExactPrice } from "./pricing";
import { isDeadImageUrl } from "./dead-images";
import { validateImageUrl } from "./image-url";
import { buildListingCatalog, type ListingCatalog } from "./listing-canonical";
import { productBelongsToCategory } from "./product-membership";

function normalizeProduct(product: Product): Product {
  const validation = validateImageUrl(product.image);
  const normalized = validation.valid ? validation.normalized : "";
  if (normalized && isDeadImageUrl(normalized)) {
    return { ...product, image: "" };
  }
  return {
    ...product,
    image: normalized,
  };
}

const normalizedProducts = filterBrowsableProducts(
  (productsData as Product[]).map(normalizeProduct)
);

function canServeProduct(product: Product): boolean {
  if (!product.image) return false;
  return passesCardDisplayGate(product);
}

/**
 * One public product per listing id. Source rows stay in products.json.
 * Duplicate row ids resolve to the canonical product.
 */
const listingCatalog: ListingCatalog = buildListingCatalog(
  normalizedProducts,
  canServeProduct
);

/** Catalog listings — one canonical product per listing, image gate unchanged. */
const catalogProducts = listingCatalog.canonicalProducts;

/** Sorted once at module load — getAllProducts() is called heavily on homepage rails. */
const catalogProductsSorted = sortWithImagesFirst(catalogProducts);

export function sortWithImagesFirst(items: Product[]): Product[] {
  return [...items].sort((a, b) => {
    const visual = compareProductVisualQuality(a, b);
    if (visual !== 0) return visual;
    const aScore = (a.image ? 2 : 0) + (a.qc_link ? 1 : 0);
    const bScore = (b.image ? 2 : 0) + (b.qc_link ? 1 : 0);
    return bScore - aScore;
  });
}

export function getAllProducts(): Product[] {
  return catalogProductsSorted;
}

export function getProductById(id: string): Product | undefined {
  return listingCatalog.publicByAliasId.get(id);
}

export function getSourceProductById(id: string): Product | undefined {
  return listingCatalog.sourceById.get(id);
}

export function getAllSourceProducts(): Product[] {
  return normalizedProducts;
}

export function getListingCatalog(): ListingCatalog {
  return listingCatalog;
}

export function getTrendingProducts(): Product[] {
  return sortWithImagesFirst(
    catalogProducts.filter((product) =>
      productBelongsToCategory(product, "trending-now")
    )
  );
}

export function getLatestProducts(): Product[] {
  return sortWithImagesFirst(
    catalogProducts.filter((product) =>
      productBelongsToCategory(product, "latest-finds")
    )
  );
}

export function getDealProducts(maxPrice = 30): Product[] {
  return sortWithImagesFirst(
    catalogProducts.filter(
      (product) =>
        hasExactPrice(product.price) && (product.price as number) <= maxPrice
    )
  );
}

export function getQcProducts(): Product[] {
  return sortWithImagesFirst(
    catalogProducts.filter((product) => product.qc_link && product.qc_link.length > 0)
  );
}

export function getProductsByCategorySlug(slug: string): Product[] {
  return sortWithImagesFirst(
    catalogProducts.filter((product) => productBelongsToCategory(product, slug))
  );
}

export function getCatalogStats() {
  const withImages = catalogProducts.filter((p) => p.image).length;
  const withQc = catalogProducts.filter((p) => p.qc_link).length;
  const uniqueUrls = new Set(catalogProducts.map((p) => p.affiliate_link)).size;

  const priceAudit = auditCatalogPrices(catalogProducts);

  return {
    total: catalogProducts.length,
    withImages,
    withQc,
    uniqueUrls,
    brands: getBrandsFromProducts(catalogProducts).length,
    categories: getCategories().filter((c) => c.group === "category").length,
    prices: {
      exact: priceAudit.exact,
      unavailable: priceAudit.unavailable,
      checkLatest: priceAudit.checkLatest,
      nullInSource: priceAudit.nullInSource,
    },
  };
}

export function getCategories(): CategoryInfo[] {
  const map = new Map<string, CategoryInfo>();

  for (const product of catalogProducts) {
    const memberships = [
      {
        name: product.category,
        slug: product.category_slug,
        group: product.group,
      },
      ...(product.listingRelations ?? []).map((relation) => ({
        name: relation.category,
        slug: relation.category_slug,
        group: relation.group,
      })),
    ];
    const seen = new Set<string>();
    for (const membership of memberships) {
      if (seen.has(membership.slug)) continue;
      seen.add(membership.slug);
      const existing = map.get(membership.slug);
      if (existing) {
        existing.count += 1;
        continue;
      }
      map.set(membership.slug, {
        name: membership.name,
        slug: membership.slug,
        count: 1,
        href:
          membership.group === "featured"
            ? membership.slug === "trending-now"
              ? "/trending"
              : "/latest-finds"
            : `/categories/${membership.slug}`,
        group: membership.group,
      });
    }
  }

  const categoryOrder = [
    "trending-now",
    "latest-finds",
    "shoes",
    "hoodies-and-pants",
    "coats-and-jackets",
    "tshirts-and-shorts",
    "accessories",
    "electronics",
  ];

  return categoryOrder
    .filter((slug) => map.has(slug))
    .map((slug) => map.get(slug)!);
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return getCategories().find((category) => category.slug === slug);
}

export { catalogProducts, catalogProducts as products };
