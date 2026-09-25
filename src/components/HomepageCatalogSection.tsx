import { getBrandsFromProducts } from "@/lib/brands";
import { getCardDisplayMap } from "@/lib/card-props";
import { filterProducts } from "@/lib/filters";
import { getAllProducts, getCategories } from "@/lib/products";
import CatalogPanel from "@/components/CatalogPanel";

/** First page only — keeps `/` free of searchParams so Vercel can ISR/cache it. */
const PAGE_SIZE = 36;

/**
 * Server-rendered homepage catalog (page 1, featured sort).
 * Filter/pagination navigates to `/browse` (see CatalogPanel basePath).
 */
export default function HomepageCatalogSection() {
  const categories = getCategories();
  const allProducts = getAllProducts();
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
