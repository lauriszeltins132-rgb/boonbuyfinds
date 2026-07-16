"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AgentId, CurrencyCode } from "@/lib/constants";
import { DEFAULT_AGENT_ID } from "@/lib/agents";
import { BUYING_AGENTS } from "@/lib/agents";
import { readLocalStorage, writeLocalStorage } from "@/lib/safe-storage";

type PreferencesContextValue = {
  currency: CurrencyCode;
  agentId: AgentId;
  setCurrency: (currency: CurrencyCode) => void;
  setAgentId: (agentId: AgentId) => void;
  agents: typeof BUYING_AGENTS;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);
const STORAGE_KEY = "boonbuyfinds-preferences";

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [agentId, setAgentIdState] = useState<AgentId>(DEFAULT_AGENT_ID);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = readLocalStorage(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as {
          currency?: CurrencyCode;
          agentId?: AgentId;
        };
        if (parsed && typeof parsed === "object" && parsed.currency) {
          setCurrencyState(parsed.currency);
        }
        // Site is BoonBuy-only — ignore any previously saved multi-agent preference.
        setAgentIdState(DEFAULT_AGENT_ID);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeLocalStorage(
      STORAGE_KEY,
      JSON.stringify({ currency, agentId })
    );
  }, [currency, agentId, hydrated]);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
  }, []);

  const setAgentId = useCallback((_next: AgentId) => {
    void _next;
    setAgentIdState(DEFAULT_AGENT_ID);
  }, []);

  const value = useMemo(
    () => ({
      currency,
      agentId,
      setCurrency,
      setAgentId,
      agents: BUYING_AGENTS,
    }),
    [currency, agentId, setCurrency, setAgentId]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return context;
}
