import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogPanel from "@/components/CatalogPanel";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import SavedFindsCatalog from "@/components/SavedFindsCatalog";
import { getBrandsFromProducts } from "@/lib/brands";
import { getCardDisplayMap } from "@/lib/card-props";
import { filterProducts } from "@/lib/filters";
import { getAllProducts, getCategories } from "@/lib/products";
import {
  hasExtraCatalogFilters,
  resolveBrandDestination,
} from "@/lib/seo-filter-routes";
import { SITE_URL } from "@/lib/site";

const PAGE_SIZE = 36;

type BrowsePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(
  value: string | string[] | undefined
): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export async function generateMetadata({
  searchParams,
}: BrowsePageProps): Promise<Metadata> {
  const params = await searchParams;
  const search = firstParam(params.q);
  const brand = firstParam(params.brand);
  const asRecord = {
    q: search || undefined,
    brand: brand || undefined,
    min: firstParam(params.min) || undefined,
    max: firstParam(params.max) || undefined,
    sort: firstParam(params.sort) || undefined,
    qc: firstParam(params.qc) || undefined,
    page: firstParam(params.page) || undefined,
    saved: firstParam(params.saved) || undefined,
  };

  const cleanBrand = !hasExtraCatalogFilters(asRecord)
    ? resolveBrandDestination(brand || null, search || null)
    : null;

  const canonicalPath = cleanBrand ?? "/finds";

  return {
    title: { absolute: "Browse BoonBuy Finds" },
    description:
      "Search and filter the BoonBuy Finds catalog — brands, prices, QC links, and verified checkout.",
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
    alternates: {
      canonical: `${SITE_URL}${canonicalPath}`,
    },
  };
}

async function BrowseCatalog({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const savedOnly = firstParam(params.saved) === "1";
  const categories = getCategories();

  if (savedOnly) {
    return <SavedFindsCatalog />;
  }

  const allProducts = getAllProducts();
  const brands = getBrandsFromProducts(allProducts);

  const search = firstParam(params.q);
  const brand = firstParam(params.brand);
  const minPrice = firstParam(params.min);
  const maxPrice = firstParam(params.max);
  const sort = firstParam(params.sort) || "featured";
  const qcOnly = firstParam(params.qc) === "1";
  const page = Math.max(1, parseInt(firstParam(params.page) || "1", 10) || 1);

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
          Internal catalog search and filters. Brand and category SEO pages live
          at clean URLs under /brands and /categories.
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
