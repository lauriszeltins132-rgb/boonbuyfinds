import {
  ACTUAL_CATALOG_COUNT,
  ACTUAL_QC_COUNT,
  formatCountLabel,
  PUBLIC_CATALOG_COUNT,
  PUBLIC_QC_COUNT,
} from "@/lib/catalog-count-public";
import {
  formatSyncedTimestamp,
  getDatasetSyncedIso,
} from "@/lib/catalog-meta";
import { formatContentDate } from "@/lib/content-dates";
import { getIndexableBrands, getIndexableCategories } from "@/lib/seo-directories";
import { getBrandsFromProducts } from "@/lib/brands";
import {
  getAllProducts,
  getLatestProducts,
  getQcProducts,
  getTrendingProducts,
} from "@/lib/products";
import type { Product } from "@/lib/types";

export type AuthorityStat = {
  label: string;
  value: string;
};

export function getAuthorityLastUpdatedLabel(): string {
  return formatContentDate(getDatasetSyncedIso());
}

export function getAuthoritySyncTimestamp(): string {
  return formatSyncedTimestamp();
}

export function getAuthorityCatalogStats(): {
  findCount: number;
  findCountLabel: string;
  qcCount: number;
  qcCountLabel: string;
  brandCount: number;
  brandCountLabel: string;
  categoryCount: number;
  categoryCountLabel: string;
  topBrandNames: string[];
  topCategoryNames: string[];
  lastUpdatedLabel: string;
  syncTimestamp: string;
} {
  const brands = getIndexableBrands(getBrandsFromProducts(getAllProducts()));
  const categories = getIndexableCategories();
  return {
    findCount: ACTUAL_CATALOG_COUNT,
    findCountLabel: PUBLIC_CATALOG_COUNT,
    qcCount: ACTUAL_QC_COUNT,
    qcCountLabel: PUBLIC_QC_COUNT,
    brandCount: brands.length,
    brandCountLabel: formatCountLabel(brands.length),
    categoryCount: categories.length,
    categoryCountLabel: formatCountLabel(categories.length),
    topBrandNames: brands.slice(0, 8).map((b) => b.name),
    topCategoryNames: categories.slice(0, 8).map((c) => c.name),
    lastUpdatedLabel: getAuthorityLastUpdatedLabel(),
    syncTimestamp: getAuthoritySyncTimestamp(),
  };
}

export function getAuthorityHeroStats(
  kind: "spreadsheet" | "qc" | "finds" | "default" = "default"
): AuthorityStat[] {
  const stats = getAuthorityCatalogStats();
  if (kind === "qc") {
    return [
      { label: "QC references", value: stats.qcCountLabel },
      { label: "Indexed finds", value: stats.findCountLabel },
      { label: "Updated", value: stats.lastUpdatedLabel },
    ];
  }
  if (kind === "spreadsheet" || kind === "finds") {
    return [
      { label: "Active finds", value: stats.findCountLabel },
      { label: "QC references", value: stats.qcCountLabel },
      { label: "Indexable brands", value: stats.brandCountLabel },
      { label: "Last sync", value: stats.lastUpdatedLabel },
    ];
  }
  return [
    { label: "Indexed finds", value: stats.findCountLabel },
    { label: "Updated", value: stats.lastUpdatedLabel },
  ];
}

export function getAuthorityPreviewProducts(
  kind: "latest" | "qc" | "trending" = "latest",
  limit = 8
): Product[] {
  const pool =
    kind === "qc"
      ? getQcProducts()
      : kind === "trending"
        ? getTrendingProducts()
        : getLatestProducts();
  return pool.slice(0, limit);
}
