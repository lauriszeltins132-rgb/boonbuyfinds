"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CardDisplayMap } from "@/lib/card-display";
import type { CategoryInfo, Product } from "@/lib/types";
import { useWishlist } from "@/context/WishlistContext";
import ProductGrid from "./ProductGrid";
import ProductGridSkeleton from "./ProductGridSkeleton";

type SavedFindsCatalogProps = {
  categories: CategoryInfo[];
};

/**
 * Wishlist filtering stays client-side without embedding the full catalog in the
 * homepage RSC payload. Products load on demand by saved IDs.
 */
export default function SavedFindsCatalog({
  categories: _categories,
}: SavedFindsCatalogProps) {
  const { wishlist } = useWishlist();
  const savedIds = useMemo(
    () => (Array.isArray(wishlist) ? wishlist.filter(Boolean) : []),
    [wishlist]
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [cardDisplays, setCardDisplays] = useState<CardDisplayMap>({});
  const [loading, setLoading] = useState(savedIds.length > 0);

  useEffect(() => {
    if (savedIds.length === 0) {
      setProducts([]);
      setCardDisplays({});
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    void fetch("/api/products/by-ids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: savedIds.slice(0, 120) }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to load saved finds");
        return response.json() as Promise<{
          products: Product[];
          cardDisplays?: CardDisplayMap;
        }>;
      })
      .then((data) => {
        if (cancelled) return;
        setProducts(Array.isArray(data.products) ? data.products : []);
        setCardDisplays(data.cardDisplays ?? {});
      })
      .catch(() => {
        if (!cancelled) {
          setProducts([]);
          setCardDisplays({});
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [savedIds]);

  if (savedIds.length === 0) {
    return (
      <section className="px-4 pb-16 sm:px-6">
        <div className="panel-shell mx-auto max-w-7xl rounded-[32px] border border-border-strong bg-panel p-8 text-center sm:p-10">
          <p className="text-lg font-black text-foreground">No saved finds yet</p>
          <p className="mt-2 text-sm text-muted">
            Tap the heart on any product card to save it here.
          </p>
          <Link
            href="/wishlist"
            className="mt-6 inline-flex rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-bold text-accent"
          >
            Open wishlist →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="panel-shell mx-auto max-w-7xl rounded-[32px] border border-border-strong bg-panel p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">Saved finds</h2>
            <p className="mt-1 text-sm text-muted">
              {loading
                ? "Loading your saved items…"
                : `${products.length} item${products.length === 1 ? "" : "s"} from your wishlist`}
            </p>
          </div>
          <Link href="/wishlist" className="text-sm font-bold text-accent hover:underline">
            Full wishlist →
          </Link>
        </div>
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <ProductGrid
            products={products}
            cardDisplays={cardDisplays}
            emptyMessage="No saved finds matched."
          />
        )}
      </div>
    </section>
  );
}
