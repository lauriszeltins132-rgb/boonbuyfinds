"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  parseJsonArray,
  readLocalStorage,
  writeLocalStorage,
} from "@/lib/safe-storage";

type WishlistContextValue = {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "boonbuyfinds-wishlist";

function normalizeWishlist(ids: unknown[]): string[] {
  return ids.filter((id): id is string => typeof id === "string" && id.length > 0);
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setWishlist(normalizeWishlist(parseJsonArray(readLocalStorage(STORAGE_KEY))));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeLocalStorage(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      return list.includes(productId)
        ? list.filter((id) => id !== productId)
        : [...list, productId];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) =>
      Array.isArray(wishlist) ? wishlist.includes(productId) : false,
    [wishlist]
  );

  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

  const value = useMemo(
    () => ({
      wishlist: safeWishlist,
      toggleWishlist,
      isInWishlist,
    }),
    [safeWishlist, toggleWishlist, isInWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
