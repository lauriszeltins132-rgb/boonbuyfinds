import {
  BOONBUY_INVITE_CODE,
  BOONBUY_SIGNUP_URL,
} from "./boonbuy-affiliate";
import { extractMarketplaceListingId } from "./product-title-quality";
import type { Product } from "./types";

export type AgentId =
  | "boonbuy"
  | "oopbuy"
  | "kakobuy"
  | "hipobuy"
  | "acbuy"
  | "mulebuy";

export type MarketplacePlatform = "weidian" | "taobao" | "1688";

export type AgentDefinition = {
  id: AgentId;
  name: string;
  slug: string;
  recommended: boolean;
  affiliateEnabled: boolean;
  signupUrl: string;
  description: string;
  /** Short label for compact UI */
  shortLabel: string;
};

/** Full agent registry (kept for URL builders / legacy SEO routes). */
export const ALL_AGENTS: AgentDefinition[] = [
  {
    id: "boonbuy",
    name: "BoonBuy",
    slug: "boonbuy",
    recommended: true,
    affiliateEnabled: true,
    signupUrl: BOONBUY_SIGNUP_URL,
    description: "Verified links, QC support, and exclusive shipping discounts.",
    shortLabel: "BoonBuy",
  },
  {
    id: "oopbuy",
    name: "OopBuy",
    slug: "oopbuy",
    recommended: false,
    affiliateEnabled: false,
    signupUrl: "https://oopbuy.com/register",
    description: "Import Weidian and Taobao listings through OopBuy.",
    shortLabel: "OopBuy",
  },
  {
    id: "kakobuy",
    name: "Kakobuy",
    slug: "kakobuy",
    recommended: false,
    affiliateEnabled: false,
    signupUrl: "https://www.kakobuy.com/register",
    description: "Paste or import product links on Kakobuy.",
    shortLabel: "Kakobuy",
  },
  {
    id: "hipobuy",
    name: "HipoBuy",
    slug: "hipobuy",
    recommended: false,
    affiliateEnabled: false,
    signupUrl: "https://hipobuy.com/register",
    description: "Open listings on HipoBuy for checkout.",
    shortLabel: "HipoBuy",
  },
  {
    id: "acbuy",
    name: "ACBuy",
    slug: "acbuy",
    recommended: false,
    affiliateEnabled: false,
    signupUrl: "https://www.acbuy.com/register",
    description: "Import marketplace links on ACBuy.",
    shortLabel: "ACBuy",
  },
  {
    id: "mulebuy",
    name: "MuleBuy",
    slug: "mulebuy",
    recommended: false,
    affiliateEnabled: false,
    signupUrl: "https://mulebuy.com/register",
    description: "Search or import finds on MuleBuy.",
    shortLabel: "MuleBuy",
  },
];

/** Site is BoonBuy-only — no multi-agent picker. */
export const BUYING_AGENTS: AgentDefinition[] = ALL_AGENTS.filter(
  (agent) => agent.id === "boonbuy"
);

export const DEFAULT_AGENT_ID: AgentId = "boonbuy";

const AGENT_BY_ID = Object.fromEntries(
  ALL_AGENTS.map((agent) => [agent.id, agent])
) as Record<AgentId, AgentDefinition>;

export function isAgentId(value: string): value is AgentId {
  return value in AGENT_BY_ID;
}

export function getAgentById(agentId: AgentId): AgentDefinition {
  return AGENT_BY_ID[agentId];
}

export function getAgentDisplayLabel(agentId: AgentId): string {
  const agent = getAgentById(agentId);
  return agent.recommended ? `${agent.name} — Recommended` : agent.name;
}

export function extractListingFromAffiliateLink(
  affiliateLink: string
): { platform: MarketplacePlatform; id: string } | null {
  const fromBoonBuy = extractMarketplaceListingId(affiliateLink);
  if (fromBoonBuy) return fromBoonBuy;

  const alibaba = affiliateLink.match(/1688\/(\d+)/i);
  if (alibaba) return { platform: "1688", id: alibaba[1] };

  return null;
}

/** Raw marketplace URL used by agents that import via link paste. */
export function buildMarketplaceSourceUrl(
  platform: MarketplacePlatform,
  id: string
): string {
  switch (platform) {
    case "weidian":
      return `https://weidian.com/item.html?itemID=${id}`;
    case "taobao":
      return `https://item.taobao.com/item.htm?id=${id}`;
    case "1688":
      return `https://detail.1688.com/offer/${id}.html`;
  }
}

type AgentUrlBuilder = {
  fromListing: (
    platform: MarketplacePlatform,
    id: string,
    sourceUrl: string
  ) => string;
  search: (query: string) => string;
};

/**
 * Per-agent URL templates. Edit handlers here when exact product URLs are known.
 * `fromListing` receives the raw marketplace URL as `sourceUrl` for paste-import agents.
 */
const AGENT_URL_BUILDERS: Record<AgentId, AgentUrlBuilder> = {
  boonbuy: {
    fromListing: (platform, id) =>
      `https://boonbuy.com/product/${platform}/${id}?inviteCode=${BOONBUY_INVITE_CODE}`,
    search: (query) =>
      `https://boonbuy.com/search?q=${encodeURIComponent(query)}`,
  },
  oopbuy: {
    fromListing: (platform, id) =>
      `https://oopbuy.com/product/${platform}/${id}`,
    search: (query) =>
      `https://oopbuy.com/search?q=${encodeURIComponent(query)}`,
  },
  kakobuy: {
    fromListing: (_platform, _id, sourceUrl) =>
      `https://www.kakobuy.com/item/details?url=${encodeURIComponent(sourceUrl)}`,
    search: (query) =>
      `https://www.kakobuy.com/search?q=${encodeURIComponent(query)}`,
  },
  hipobuy: {
    fromListing: (platform, id) =>
      `https://hipobuy.com/product/${platform}/${id}`,
    search: (query) =>
      `https://hipobuy.com/search?keyword=${encodeURIComponent(query)}`,
  },
  acbuy: {
    fromListing: (platform, id) =>
      `https://www.acbuy.com/product/${platform}/${id}`,
    search: (query) =>
      `https://www.acbuy.com/search?keyword=${encodeURIComponent(query)}`,
  },
  mulebuy: {
    fromListing: (platform, id) =>
      `https://mulebuy.com/product/${platform}/${id}`,
    search: (query) =>
      `https://mulebuy.com/search?q=${encodeURIComponent(query)}`,
  },
};

export function buildAgentProductUrl(
  product: Product,
  agentId: AgentId
): string | null {
  const agent = getAgentById(agentId);
  const affiliateLink = product.affiliate_link?.trim();

  if (!affiliateLink) return null;

  if (agent.affiliateEnabled && /boonbuy\.com/i.test(affiliateLink)) {
    return affiliateLink;
  }

  const listing = extractListingFromAffiliateLink(affiliateLink);
  if (listing) {
    const sourceUrl = buildMarketplaceSourceUrl(listing.platform, listing.id);
    return AGENT_URL_BUILDERS[agentId].fromListing(
      listing.platform,
      listing.id,
      sourceUrl
    );
  }

  return AGENT_URL_BUILDERS[agentId].search(product.product_name);
}

export function buildAgentSearchUrl(agentId: AgentId, query: string): string {
  return AGENT_URL_BUILDERS[agentId].search(query);
}

/** @deprecated Use BUYING_AGENTS — kept for PreferencesContext compatibility */
export const AGENTS = BUYING_AGENTS.map((agent) => ({
  id: agent.id,
  name: agent.name,
  signupUrl: agent.signupUrl,
  description: agent.description,
}));
