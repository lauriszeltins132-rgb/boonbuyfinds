import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogPanel from "@/components/CatalogPanel";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import SavedFindsCatalog from "@/components/SavedFindsCatalog";
import { getBrandsFromProducts } from "@/lib/brands";
import { getCardDisplayMap } from "@/lib/card-props";
import { filterProducts } from "@/lib/filters";
import { getAllProducts, getCategories } from "@/lib/products";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Browse BoonBuy Finds",
  description:
    "Search and filter the BoonBuy Finds catalog — brands, prices, QC links, and verified checkout.",
  path: "/browse",
});

const PAGE_SIZE = 36;

type BrowsePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function BrowseCatalog({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
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

export default function BrowsePage({ searchParams }: BrowsePageProps) {
  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl pb-4">
        <h1 className="text-2xl font-black sm:text-3xl">Browse BoonBuy Finds</h1>
        <p className="mt-1 text-sm text-muted">
          Search, filter, and paginate the catalog without slowing the homepage.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="panel-shell mx-auto max-w-7xl rounded-[32px] border border-border-strong bg-panel p-5 sm:p-7">
            <ProductGridSkeleton count={12} />
          </div>
        }
      >
        <BrowseCatalog searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
