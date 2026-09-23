import type { Metadata } from "next";
import { Suspense } from "react";
import BrowseCatalogSection from "@/components/BrowseCatalogSection";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import SchemaScript from "@/components/SchemaScript";
import { buildWebPageSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

type BrowseSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

function hasActiveFilters(
  params: Record<string, string | string[] | undefined>
): boolean {
  return Boolean(
    params.q ||
      params.brand ||
      params.min ||
      params.max ||
      (params.sort && params.sort !== "featured") ||
      params.qc === "1" ||
      params.saved === "1" ||
      (params.page && String(params.page) !== "1")
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: BrowseSearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const filtered = hasActiveFilters(params);
  const base = buildPageMetadata({
    title: "Browse BoonBuy Finds | Search, Filter & QC Catalog",
    description:
      "Search and filter the BoonBuy Finds catalog — brands, prices, QC-linked items, and verified BoonBuy checkout links.",
    path: "/browse",
  });

  if (!filtered) return base;

  return {
    ...base,
    robots: { index: false, follow: true },
  };
}

/** Dynamic browse — searchParams intentionally keep this route uncached. */
export const dynamic = "force-dynamic";

export default function BrowsePage({
  searchParams,
}: {
  searchParams: BrowseSearchParams;
}) {
  return (
    <>
      <SchemaScript
        data={buildWebPageSchema({
          name: "Browse BoonBuy Finds",
          description:
            "Search and filter the BoonBuy Finds catalog with brands, prices, and QC filters.",
          path: "/browse",
        })}
      />

      <section className="scroll-mt-24 px-4 pt-8 sm:px-6">
        <div className="mx-auto max-w-7xl pb-4">
          <h1 className="text-2xl font-black sm:text-3xl">Browse BoonBuy Finds</h1>
          <p className="mt-1 text-sm text-muted">
            Search, filter, and explore the full catalog with verified BoonBuy checkout links.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <section className="px-4 pb-16 sm:px-6">
            <div className="panel-shell mx-auto max-w-7xl rounded-[32px] border border-border-strong bg-panel p-5 sm:p-7">
              <ProductGridSkeleton count={8} />
            </div>
          </section>
        }
      >
        <BrowseCatalogSection searchParams={searchParams} />
      </Suspense>
    </>
  );
}
