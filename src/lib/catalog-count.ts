import productsData from "@/data/products.json";
import {
  ACTUAL_CATALOG_COUNT,
  ACTUAL_QC_COUNT,
  PUBLIC_CATALOG_COUNT,
  PUBLIC_QC_COUNT,
} from "./catalog-count-public";

export {
  ACTUAL_CATALOG_COUNT,
  ACTUAL_QC_COUNT,
  PUBLIC_CATALOG_COUNT,
  PUBLIC_QC_COUNT,
};

/** Actual indexed product count from dataset (internal stats) */
export function getActualCatalogCount(): number {
  return ACTUAL_CATALOG_COUNT || (productsData as unknown[]).length;
}

export function getActualQcCount(): number {
  return ACTUAL_QC_COUNT;
}

export function formatCatalogCountForSeo(): string {
  return PUBLIC_CATALOG_COUNT;
}

export function formatQcCountForSeo(): string {
  return PUBLIC_QC_COUNT;
}
