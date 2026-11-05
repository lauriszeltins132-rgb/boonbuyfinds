/**
 * Server-generated catalog statistics for authority hubs and /boonbuy-stats.
 * Only uses fields present on products — never invents weights, views, or ratings.
 */

import { extractBrand, getBrandsFromProducts } from "@/lib/brands";
import {
  ACTUAL_CATALOG_COUNT,
  ACTUAL_QC_COUNT,
  formatCountLabel,
} from "@/lib/catalog-count-public";
import {
  formatSyncedTimestamp,
  getDatasetSyncedIso,
} from "@/lib/catalog-meta";
import { formatContentDate } from "@/lib/content-dates";
import { hasExactPrice } from "@/lib/pricing";
import {
  getAllProducts,
  getLatestProducts,
  getQcProducts,
  getTrendingProducts,
} from "@/lib/products";
import { getMostSavedPicks } from "@/lib/discovery";
import { getIndexableBrands, getIndexableCategories } from "@/lib/seo-directories";
import type { Product } from "@/lib/types";

export type CategoryLiveStat = {
  name: string;
  slug: string;
  href: string;
  productCount: number;
  qcCount: number;
  qcPercent: number;
  medianPrice: number | null;
  latestName: string;
};

export type BrandLiveStat = {
  name: string;
  slug: string;
  href: string;
  productCount: number;
  qcCount: number;
  qcPercent: number;
  medianPrice: number | null;
  latestName: string;
};

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Math.round(((sorted[mid - 1] + sorted[mid]) / 2) * 100) / 100;
  }
  return sorted[mid];
}

function pricesOf(products: Product[]): number[] {
  return products
    .map((p) => p.price)
    .filter((price): price is number => hasExactPrice(price));
}

function shortName(name: string): string {
  const clean = name.replace(/\s+/g, " ").trim();
  if (clean.length <= 42) return clean;
  return `${clean.slice(0, 41).trimEnd()}…`;
}

function latestNameIn(pool: Product[], latest: Product[]): string {
  const ids = new Set(pool.map((product) => product.id));
  const hit = latest.find((product) => ids.has(product.id));
  return hit ? shortName(hit.product_name) : "—";
}

/** Indexable category lanes with count / QC / median price from the live catalog. */
export function getCategoryLiveStats(limit = 12): CategoryLiveStat[] {
  try {
  const products = getAllProducts();
  const categories = getIndexableCategories();
  const latest = getLatestProducts();
  const bySlug = new Map<string, Product[]>();
  for (const product of products) {
    if (product.group !== "category") continue;
    const list = bySlug.get(product.category_slug) ?? [];
    list.push(product);
    bySlug.set(product.category_slug, list);
  }

  return categories
    .map((category) => {
      const pool = bySlug.get(category.slug) ?? [];
      const qcCount = pool.filter((p) => Boolean(p.qc_link)).length;
      const productCount = pool.length || category.count;
      return {
        name: category.name,
        slug: category.slug,
        href: category.href,
        productCount,
        qcCount,
        qcPercent: productCount > 0 ? Math.round((qcCount / productCount) * 100) : 0,
        medianPrice: median(pricesOf(pool)),
        latestName: latestNameIn(pool, latest),
      };
    })
    .filter((row) => row.productCount > 0)
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, limit);
  } catch {
    return [];
  }
}

/** Top brands with QC coverage — unique data for /boonbuy-qc and /boonbuy-stats. */
export function getBrandQcLiveStats(limit = 12): BrandLiveStat[] {
  const brands = getIndexableBrands(getBrandsFromProducts(getAllProducts()));
  const products = getAllProducts();
  const byBrand = new Map<string, Product[]>();
  for (const product of products) {
    const name = extractBrand(product.product_name);
    if (!name) continue;
    const list = byBrand.get(name) ?? [];
    list.push(product);
    byBrand.set(name, list);
  }

  const latest = getLatestProducts();
  return brands
    .map((brand) => {
      const pool = byBrand.get(brand.name) ?? [];
      const qcCount = pool.filter((p) => Boolean(p.qc_link)).length;
      const productCount = pool.length || brand.count;
      const qcPercent =
        productCount > 0 ? Math.round((qcCount / productCount) * 100) : 0;
      return {
        name: brand.name,
        slug: brand.slug,
        href: `/brands/${brand.slug}`,
        productCount,
        qcCount,
        qcPercent,
        medianPrice: median(pricesOf(pool)),
        latestName: latestNameIn(pool, latest),
      };
    })
    .filter((row) => row.productCount > 0)
    .sort((a, b) => b.qcCount - a.qcCount || b.productCount - a.productCount)
    .slice(0, limit);
}

export function formatMedianPrice(value: number | null): string {
  if (value == null) return "—";
  return `$${Math.round(value)}`;
}

export function getCatalogOverviewStats() {
  try {
  const products = getAllProducts();
  const brands = getIndexableBrands(getBrandsFromProducts(products));
  const categories = getIndexableCategories();
  const priced = pricesOf(products);
  const qcPct =
    ACTUAL_CATALOG_COUNT > 0
      ? Math.round((ACTUAL_QC_COUNT / ACTUAL_CATALOG_COUNT) * 100)
      : 0;
  const latest = getLatestProducts();
  const trending = getTrendingProducts();
  const qc = getQcProducts();

  return {
    findCount: ACTUAL_CATALOG_COUNT,
    findCountLabel: formatCountLabel(ACTUAL_CATALOG_COUNT),
    qcCount: ACTUAL_QC_COUNT,
    qcCountLabel: formatCountLabel(ACTUAL_QC_COUNT),
    qcPercent: qcPct,
    brandCount: brands.length,
    brandCountLabel: formatCountLabel(brands.length),
    categoryCount: categories.length,
    categoryCountLabel: formatCountLabel(categories.length),
    medianPrice: median(priced),
    medianPriceLabel: formatMedianPrice(median(priced)),
    latestCount: latest.length,
    trendingCount: trending.length,
    qcPreviewCount: qc.length,
    lastUpdatedLabel: formatContentDate(getDatasetSyncedIso()),
    syncTimestamp: formatSyncedTimestamp(),
    syncedIso: getDatasetSyncedIso(),
    topBrands: brands.slice(0, 10).map((b) => ({
      name: b.name,
      slug: b.slug,
      count: b.count,
    })),
    topCategories: categories.slice(0, 10).map((c) => ({
      name: c.name,
      slug: c.slug,
      href: c.href,
      count: c.count,
    })),
  };
  } catch {
    return {
      findCount: 0,
      findCountLabel: "0",
      qcCount: 0,
      qcCountLabel: "0",
      qcPercent: 0,
      brandCount: 0,
      brandCountLabel: "0",
      categoryCount: 0,
      categoryCountLabel: "0",
      medianPrice: null,
      medianPriceLabel: "—",
      latestCount: 0,
      trendingCount: 0,
      qcPreviewCount: 0,
      lastUpdatedLabel: "unavailable",
      syncTimestamp: "unavailable",
      syncedIso: "",
      topBrands: [],
      topCategories: [],
    };
  }
}

export function getSpreadsheetPreviewRails(limit = 6) {
  return {
    latest: getLatestProducts().slice(0, limit),
    trending: getTrendingProducts().slice(0, limit),
    qc: getQcProducts().slice(0, limit),
    popular: getMostSavedPicks(limit),
  };
}

/** Table rows for authority hubs — string cells only. */
export function getCategoryStatsTableRows(limit = 8): string[][] {
  return getCategoryLiveStats(limit).map((row) => [
    row.name,
    formatCountLabel(row.productCount),
    formatCountLabel(row.qcCount),
    `${row.qcPercent}%`,
    formatMedianPrice(row.medianPrice),
    row.latestName,
  ]);
}

export function getBrandCatalogTableRows(limit = 8): string[][] {
  return getBrandQcLiveStats(limit)
    .slice()
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, limit)
    .map((row) => [
      row.name,
      formatCountLabel(row.productCount),
      formatCountLabel(row.qcCount),
      `${row.qcPercent}%`,
      formatMedianPrice(row.medianPrice),
      row.latestName,
    ]);
}

export function getBrandQcTableRows(limit = 8): string[][] {
  return getBrandQcLiveStats(limit).map((row) => [
    row.name,
    formatCountLabel(row.productCount),
    formatCountLabel(row.qcCount),
    `${row.qcPercent}%`,
    formatMedianPrice(row.medianPrice),
    row.latestName,
  ]);
}
