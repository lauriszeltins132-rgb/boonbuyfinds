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
  readSessionStorage,
  writeSessionStorage,
} from "@/lib/safe-storage";

type ConversionContextValue = {
  uniqueProductViews: number;
  recordProductView: (productId: string) => void;
  dismissNudge: (key: string) => void;
  isNudgeDismissed: (key: string) => boolean;
};

const ConversionContext = createContext<ConversionContextValue | null>(null);

const SESSION_VIEWS_KEY = "boonbuy-session-product-views";

function readViewedIds(): string[] {
  return parseJsonArray<string>(readSessionStorage(SESSION_VIEWS_KEY)).filter(
    (id) => typeof id === "string" && id.length > 0
  );
}

function writeViewedIds(ids: string[]) {
  writeSessionStorage(SESSION_VIEWS_KEY, JSON.stringify(ids));
}

export function ConversionProvider({ children }: { children: React.ReactNode }) {
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setViewedIds(readViewedIds());
    setHydrated(true);
  }, []);

  const recordProductView = useCallback((productId: string) => {
    setViewedIds((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      if (list.includes(productId)) return list;
      const next = [...list, productId];
      writeViewedIds(next);
      return next;
    });
  }, []);

  const dismissNudge = useCallback((key: string) => {
    setDismissed((prev) => ({ ...prev, [key]: true }));
    writeSessionStorage(key, "1");
  }, []);

  const isNudgeDismissed = useCallback(
    (key: string) => {
      if (dismissed[key]) return true;
      return readSessionStorage(key) === "1";
    },
    [dismissed]
  );

  const value = useMemo(
    () => ({
      uniqueProductViews: hydrated ? viewedIds.length : 0,
      recordProductView,
      dismissNudge,
      isNudgeDismissed,
    }),
    [hydrated, viewedIds.length, recordProductView, dismissNudge, isNudgeDismissed]
  );

  return (
    <ConversionContext.Provider value={value}>{children}</ConversionContext.Provider>
  );
}

export function useConversion() {
  const context = useContext(ConversionContext);
  if (!context) {
    throw new Error("useConversion must be used within ConversionProvider");
  }
  return context;
}
