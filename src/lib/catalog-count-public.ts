import productsData from "@/data/products.json";

type CatalogRow = {
  qc_link?: string | null;
};

const catalog = productsData as CatalogRow[];

/** Exact indexed row count from products.json (source of truth). */
export const ACTUAL_CATALOG_COUNT = catalog.length;

/** Exact QC-linked row count from products.json. */
export const ACTUAL_QC_COUNT = catalog.filter(
  (product) => typeof product.qc_link === "string" && product.qc_link.length > 0
).length;

export function formatCountLabel(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Public-facing catalog size — always matches products.json.
 * Do not hardcode "10,000+" or other marketing figures here.
 */
export const PUBLIC_CATALOG_COUNT = formatCountLabel(ACTUAL_CATALOG_COUNT);

/** Public-facing QC reference count — matches products with qc_link. */
export const PUBLIC_QC_COUNT = formatCountLabel(ACTUAL_QC_COUNT);
