"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { readLocalStorage, writeLocalStorage } from "@/lib/safe-storage";

type CouponContextValue = {
  isOpen: boolean;
  openCoupon: () => void;
  closeCoupon: () => void;
};

const CouponContext = createContext<CouponContextValue | null>(null);
const DISMISS_KEY = "boonbuy-finds-offer-dismissed";
const DISMISS_MS = 14 * 24 * 60 * 60 * 1000;

function isDismissedRecently(): boolean {
  const dismissed = readLocalStorage(DISMISS_KEY);
  if (!dismissed) return false;
  const dismissedAt = Number(dismissed);
  if (!Number.isFinite(dismissedAt)) return false;
  return Date.now() - dismissedAt < DISMISS_MS;
}

export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCoupon = useCallback(() => {
    if (isDismissedRecently()) return;
    setIsOpen(true);
  }, []);

  const closeCoupon = useCallback(() => {
    setIsOpen(false);
    writeLocalStorage(DISMISS_KEY, String(Date.now()));
  }, []);

  const value = useMemo(
    () => ({ isOpen, openCoupon, closeCoupon }),
    [isOpen, openCoupon, closeCoupon]
  );

  return (
    <CouponContext.Provider value={value}>{children}</CouponContext.Provider>
  );
}

export function useCoupon() {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCoupon must be used within CouponProvider");
  }
  return context;
}
