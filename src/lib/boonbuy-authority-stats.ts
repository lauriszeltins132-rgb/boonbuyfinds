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
import {
  getBrandQcTableRows,
  getCatalogOverviewStats,
  getCategoryStatsTableRows,
  getSpreadsheetPreviewRails,
} from "@/lib/catalog-live-stats";
import { getIndexableBrands, getIndexableCategories } from "@/lib/seo-directories";
import { getBrandsFromProducts } from "@/lib/brands";
import {
  getAllProducts,
  getLatestProducts,
  getQcProducts,
  getTrendingProducts,
} from "@/lib/products";
import { getMostSavedPicks } from "@/lib/discovery";
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
  qcPercent: number;
  brandCount: number;
  brandCountLabel: string;
  categoryCount: number;
  categoryCountLabel: string;
  topBrandNames: string[];
  topCategoryNames: string[];
  lastUpdatedLabel: string;
  syncTimestamp: string;
  categoryTableRows: string[][];
  brandQcTableRows: string[][];
} {
  const brands = getIndexableBrands(getBrandsFromProducts(getAllProducts()));
  const categories = getIndexableCategories();
  const overview = getCatalogOverviewStats();
  return {
    findCount: ACTUAL_CATALOG_COUNT,
    findCountLabel: PUBLIC_CATALOG_COUNT,
    qcCount: ACTUAL_QC_COUNT,
    qcCountLabel: PUBLIC_QC_COUNT,
    qcPercent: overview.qcPercent,
    brandCount: brands.length,
    brandCountLabel: formatCountLabel(brands.length),
    categoryCount: categories.length,
    categoryCountLabel: formatCountLabel(categories.length),
    topBrandNames: brands.slice(0, 8).map((b) => b.name),
    topCategoryNames: categories.slice(0, 8).map((c) => c.name),
    lastUpdatedLabel: getAuthorityLastUpdatedLabel(),
    syncTimestamp: getAuthoritySyncTimestamp(),
    categoryTableRows: getCategoryStatsTableRows(8),
    brandQcTableRows: getBrandQcTableRows(8),
  };
}

export function getAuthorityHeroStats(
  kind: "spreadsheet" | "qc" | "finds" | "default" = "default"
): AuthorityStat[] {
  const stats = getAuthorityCatalogStats();
  if (kind === "qc") {
    return [
      { label: "QC references", value: stats.qcCountLabel },
      { label: "QC coverage", value: `${stats.qcPercent}%` },
      { label: "Indexed finds", value: stats.findCountLabel },
      { label: "Updated", value: stats.lastUpdatedLabel },
    ];
  }
  if (kind === "spreadsheet" || kind === "finds") {
    return [
      { label: "Active finds", value: stats.findCountLabel },
      { label: "QC references", value: stats.qcCountLabel },
      { label: "Brands", value: stats.brandCountLabel },
      { label: "Categories", value: stats.categoryCountLabel },
      { label: "Last sync", value: stats.lastUpdatedLabel },
    ];
  }
  return [
    { label: "Indexed finds", value: stats.findCountLabel },
    { label: "Updated", value: stats.lastUpdatedLabel },
  ];
}

export type PreviewKind = "latest" | "qc" | "trending" | "popular";

export function getAuthorityPreviewProducts(
  kind: PreviewKind = "latest",
  limit = 8
): Product[] {
  if (kind === "popular") return getMostSavedPicks(limit);
  const pool =
    kind === "qc"
      ? getQcProducts()
      : kind === "trending"
        ? getTrendingProducts()
        : getLatestProducts();
  return pool.slice(0, limit);
}

export function getAuthorityMultiPreviewRails(limit = 6) {
  return getSpreadsheetPreviewRails(limit);
}
