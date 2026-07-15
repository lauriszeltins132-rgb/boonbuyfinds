import {
  getEditorsPicks,
  getHiddenGems,
  getDailyDrop,
} from "./discovery";
import {
  getDealProducts,
  getLatestProducts,
  getTrendingProducts,
} from "./products";
import type { Product } from "./types";

export type CollectionConfig = {
  slug: string;
  title: string;
  badge: string;
  description: string;
  intro: string;
  href: string;
  getProducts: () => Product[];
};

export const COLLECTIONS: Record<string, CollectionConfig> = {
  trending: {
    slug: "trending",
    title: "Trending Finds",
    badge: "Trending",
    description:
      "Trending BoonBuy finds this week — popular sneakers, fashion, and accessories with verified buy links.",
    intro:
      "See what is gaining momentum across the catalog. These picks are pulled from the trending sheet and ranked for fast discovery.",
    href: "/trending",
    getProducts: getTrendingProducts,
  },
  "new-finds": {
    slug: "new-finds",
    title: "New Finds",
    badge: "Fresh",
    description:
      "The newest BoonBuy finds — recently added products across sneakers, streetwear, accessories, and electronics.",
    intro:
      "Fresh drops land here first. Browse the latest additions with photos, pricing, and outbound BoonBuy purchase links.",
    href: "/new-finds",
    getProducts: getLatestProducts,
  },
  "best-under-30": {
    slug: "best-under-30",
    title: "Best Under $30",
    badge: "Budget",
    description:
      "Affordable BoonBuy finds under $30 — budget-friendly sneakers and fashion with verified agent links.",
    intro:
      "Strong value picks that stay under $30. Ideal when you want quality finds without overspending.",
    href: "/best-under-30",
    getProducts: () => getDealProducts(30),
  },
  "daily-drop": {
    slug: "daily-drop",
    title: "Daily Drop",
    badge: "Today",
    description:
      "Today’s featured BoonBuy find — one standout product selected automatically every day.",
    intro:
      "One featured product changes every day at midnight UTC. Come back tomorrow for the next drop.",
    href: "/daily-drop",
    getProducts: () => [getDailyDrop()],
  },
  "hidden-gems": {
    slug: "hidden-gems",
    title: "Hidden Gems",
    badge: "Underrated",
    description:
      "Underrated BoonBuy finds with strong photos and QC — quality picks outside the main spotlight.",
    intro:
      "These listings fly under the radar but still deliver on photos, QC references, and verified buy links.",
    href: "/hidden-gems",
    getProducts: () => getHiddenGems(48),
  },
  "editors-picks": {
    slug: "editors-picks",
    title: "Editor's Picks",
    badge: "Curated",
    description:
      "Hand-selected BoonBuy finds with photos and QC — editor-curated highlights from across the catalog.",
    intro:
      "A tighter shortlist of listings that combine strong visuals, QC availability, and clear purchase paths.",
    href: "/editors-picks",
    getProducts: () => getEditorsPicks(48),
  },
};

export const COLLECTION_SLUGS = Object.keys(COLLECTIONS);

export function getCollection(slug: string): CollectionConfig | undefined {
  return COLLECTIONS[slug];
}
