import { getBrandsFromProducts } from "@/lib/brands";
import { getCardDisplayMap } from "@/lib/card-props";
import { filterProducts } from "@/lib/filters";
import { getAllProducts, getCategories } from "@/lib/products";
import CatalogPanel from "@/components/CatalogPanel";
import SavedFindsCatalog from "@/components/SavedFindsCatalog";

const PAGE_SIZE = 24;

type BrowseCatalogSectionProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Dynamic filtered catalog for `/browse` — keeps homepage ISR cacheable. */
export default async function BrowseCatalogSection({
  searchParams,
}: BrowseCatalogSectionProps) {
  const params = await searchParams;
  const savedOnly = params.saved === "1";
  const categories = getCategories();

  if (savedOnly) {
    return <SavedFindsCatalog />;
  }

  const allProducts = getAllProducts();
  const brands = getBrandsFromProducts(allProducts);

  const search = String(params.q ?? "");
  const brand = String(params.brand ?? "");
  const minPrice = String(params.min ?? "");
  const maxPrice = String(params.max ?? "");
  const sort = String(params.sort ?? "featured");
  const qcOnly = params.qc === "1";
  const page = Math.max(1, parseInt(String(params.page ?? "1"), 10) || 1);

  const filtered = filterProducts(allProducts, {
    search,
    category: "",
    brand,
    minPrice,
    maxPrice,
    sort,
    qcOnly,
    savedOnly: false,
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
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
        page: currentPage,
        pageSize: PAGE_SIZE,
        appliedSearch: search,
        appliedBrand: brand,
        appliedMin: minPrice,
        appliedMax: maxPrice,
        appliedSort: sort,
        appliedQc: qcOnly,
      }}
    />
  );
}
