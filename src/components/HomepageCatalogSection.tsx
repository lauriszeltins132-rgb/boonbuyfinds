import { getBrandsFromProducts } from "@/lib/brands";
import { getCardDisplayMap } from "@/lib/card-props";
import { filterProducts } from "@/lib/filters";
import { getAllProducts, getCategories } from "@/lib/products";
import CatalogPanel from "@/components/CatalogPanel";

const PAGE_SIZE = 24;

/**
 * Static homepage catalog shell — featured page 1 only.
 * Filter/search navigation uses basePath `/browse` so `/?…` never forces
 * the homepage into dynamic/private cache (Googlebot TTFB regression).
 */
export default async function HomepageCatalogSection() {
  const allProducts = getAllProducts();
  const categories = getCategories();
  const brands = getBrandsFromProducts(allProducts);

  const filtered = filterProducts(allProducts, {
    search: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sort: "featured",
    qcOnly: false,
    savedOnly: false,
  });

  const paginated = filtered.slice(0, PAGE_SIZE);
  const cardDisplays = getCardDisplayMap(paginated.map((product) => product.id));

  return (
    <CatalogPanel
      products={paginated}
      categories={categories}
      brands={brands}
      basePath="/browse"
      cardDisplays={cardDisplays}
      serverCatalog={{
        totalCount: filtered.length,
        page: 1,
        pageSize: PAGE_SIZE,
        appliedSearch: "",
        appliedBrand: "",
        appliedMin: "",
        appliedMax: "",
        appliedSort: "featured",
        appliedQc: false,
      }}
    />
  );
}
