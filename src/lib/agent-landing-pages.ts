import type { SeoLandingConfig } from "./seo-landing-pages";
import { filterFeaturedEligible } from "./product-media";
import { hasExactPrice } from "./pricing";
import { getAllProducts, getTrendingProducts } from "./products";

const AGENT_LINKS = [
  { href: "/boonbuy-finds", label: "BoonBuy finds" },
  { href: "/litbuy-finds", label: "LitBuy finds" },
  { href: "/kakobuy-finds", label: "Kakobuy finds" },
  { href: "/oopbuy-finds", label: "OopBuy finds" },
  { href: "/hipobuy-finds", label: "HipoBuy finds" },
  { href: "/acbuy-finds", label: "ACBuy finds" },
  { href: "/mulebuy-finds", label: "MuleBuy finds" },
  { href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" },
];

function featuredProducts(limit = 72) {
  return filterFeaturedEligible(
    getAllProducts().filter((product) => hasExactPrice(product.price))
  ).slice(0, limit);
}

function trendingProducts(limit = 72) {
  return getTrendingProducts().slice(0, limit);
}

type AgentLandingSeed = {
  slug: string;
  agentName: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  intro: string;
  extraParagraph: string;
};

function buildAgentLandingConfig(seed: AgentLandingSeed): SeoLandingConfig {
  const path = `/${seed.slug}`;
  const isBoonBuy = seed.agentName === "BoonBuy";

  return {
    slug: seed.slug,
    path,
    title: seed.title,
    metaDescription: seed.metaDescription,
    badge: seed.badge,
    h1: seed.h1,
    intro: seed.intro,
    sections: [
      {
        heading: isBoonBuy ? "Why BoonBuy is recommended" : `Using ${seed.agentName} with BoonBuy Finds`,
        paragraphs: [
          seed.extraParagraph,
          "Browse the same verified catalog on BoonBuy Finds — photos, QC references where available, and filters by brand or category. Pick your preferred agent from the header before you buy.",
        ],
        links: AGENT_LINKS,
      },
      {
        heading: "How buying works",
        level: 3,
        paragraphs: [
          "Open any product, review photos and QC when available, then choose BoonBuy (recommended) or another supported agent. Your agent preference is saved while you browse.",
          "Prices shown here come from the source catalog — always confirm the live listing price on your agent before checkout.",
        ],
      },
    ],
    faqs: [
      {
        question: `Can I buy with ${seed.agentName} on BoonBuy Finds?`,
        answer: `Yes. BoonBuy Finds stays BoonBuy-first, but you can set ${seed.agentName} as your preferred agent in the header or choose it when you press Buy on any product.`,
      },
      {
        question: "Is BoonBuy still the recommended agent?",
        answer:
          "Yes. BoonBuy is our recommended agent for verified links, QC workflow, and the catalog this site is built around. Other agents are optional alternatives.",
      },
      {
        question: `Is this an official ${seed.agentName} spreadsheet?`,
        answer:
          "This is an independent curated finds directory. It helps you discover products and open them on your chosen agent — not a replacement for each agent's own tools.",
      },
    ],
    relatedLinks: AGENT_LINKS.filter((link) => link.href !== path),
    getProducts: () => (isBoonBuy ? trendingProducts() : featuredProducts()),
    productSectionTitle: isBoonBuy
      ? "Popular BoonBuy finds"
      : `Browse finds — open on ${seed.agentName}`,
  };
}

export const AGENT_LANDING_PAGES: Record<string, SeoLandingConfig> = {
  "litbuy-finds": buildAgentLandingConfig({
    slug: "litbuy-finds",
    agentName: "LitBuy",
    title: "LitBuy Finds & Spreadsheet Alternative",
    metaDescription:
      "Looking for LitBuy finds? Browse QC-curated sneakers, streetwear and fashion finds on BoonBuy Finds — BoonBuy recommended, with LitBuy and other agents available at checkout.",
    badge: "LitBuy finds",
    h1: "LitBuy Finds & Spreadsheet Alternative",
    intro:
      "Search LitBuy-style finds without digging through static spreadsheets. BoonBuy Finds indexes verified Weidian and Taobao products with photos, QC references where available, and agent choice at checkout. BoonBuy is recommended — LitBuy shoppers can still browse the same catalog.",
    extraParagraph:
      "LitBuy shoppers often start from community spreadsheets and Discord QC threads. This LitBuy finds hub gives you a searchable catalog alternative: filter by brand or category, open product pages, then buy with BoonBuy or keep exploring before you switch agents.",
  }),
  "kakobuy-finds": buildAgentLandingConfig({
    slug: "kakobuy-finds",
    agentName: "Kakobuy",
    title: "Kakobuy Finds & Spreadsheet",
    metaDescription:
      "Explore verified sneaker, fashion and streetwear finds. Use BoonBuy as the recommended agent or choose Kakobuy, OopBuy, ACBuy, MuleBuy or HipoBuy before buying.",
    badge: "Kakobuy finds",
    h1: "Kakobuy Finds & Spreadsheet",
    intro:
      "Browse verified fashion and sneaker finds with support for BoonBuy, Kakobuy, OopBuy, ACBuy, MuleBuy and HipoBuy. BoonBuy is our recommended agent, but you can choose Kakobuy before checkout.",
    extraParagraph:
      "Kakobuy shoppers use this page to discover curated Weidian and Taobao listings, then import or open products on Kakobuy. BoonBuy Finds keeps the same catalog while letting you switch agents anytime.",
  }),
  "oopbuy-finds": buildAgentLandingConfig({
    slug: "oopbuy-finds",
    agentName: "OopBuy",
    title: "OopBuy Finds & Spreadsheet",
    metaDescription:
      "Discover QC-curated sneakers, jackets and streetwear finds. BoonBuy recommended — or choose OopBuy and other agents before you buy.",
    badge: "OopBuy finds",
    h1: "OopBuy Finds & Spreadsheet",
    intro:
      "Explore verified finds from the BoonBuy Finds catalog and open them on OopBuy when that is your preferred agent. BoonBuy remains the recommended default for verified links and QC.",
    extraParagraph:
      "OopBuy users can browse the same searchable catalog as BoonBuy shoppers, with product photos, pricing, and QC references where available.",
  }),
  "hipobuy-finds": buildAgentLandingConfig({
    slug: "hipobuy-finds",
    agentName: "HipoBuy",
    title: "HipoBuy Finds & Spreadsheet",
    metaDescription:
      "Browse fashion and sneaker finds with BoonBuy recommended, or choose HipoBuy and other supported agents at checkout.",
    badge: "HipoBuy finds",
    h1: "HipoBuy Finds & Spreadsheet",
    intro:
      "BoonBuy Finds helps you discover trending fashion and sneaker listings. Set HipoBuy as your preferred agent, or keep BoonBuy as the recommended option.",
    extraParagraph:
      "Use the agent selector on any product to open listings on HipoBuy while keeping BoonBuy as the primary recommended workflow.",
  }),
  "acbuy-finds": buildAgentLandingConfig({
    slug: "acbuy-finds",
    agentName: "ACBuy",
    title: "ACBuy Finds & Spreadsheet",
    metaDescription:
      "Verified streetwear and sneaker finds with BoonBuy recommended. Choose ACBuy or another agent before buying.",
    badge: "ACBuy finds",
    h1: "ACBuy Finds & Spreadsheet",
    intro:
      "Browse the BoonBuy Finds catalog and open products on ACBuy when that is your agent of choice. BoonBuy stays the recommended default across the site.",
    extraParagraph:
      "ACBuy shoppers can use the same curated product grid, filters, and QC-linked listings — then route purchases through ACBuy from the Buy button.",
  }),
  "mulebuy-finds": buildAgentLandingConfig({
    slug: "mulebuy-finds",
    agentName: "MuleBuy",
    title: "MuleBuy Finds & Spreadsheet",
    metaDescription:
      "Curated sneaker and fashion finds with BoonBuy recommended. Select MuleBuy or another agent when you are ready to buy.",
    badge: "MuleBuy finds",
    h1: "MuleBuy Finds & Spreadsheet",
    intro:
      "Discover verified finds and choose MuleBuy as your preferred agent, or stay with BoonBuy — our recommended option for QC and verified links.",
    extraParagraph:
      "MuleBuy users get the same searchable BoonBuy Finds experience, with agent choice saved while you browse the catalog.",
  }),
};

export function getAgentLandingPage(slug: string): SeoLandingConfig | null {
  return AGENT_LANDING_PAGES[slug] ?? null;
}

export const AGENT_LANDING_SLUGS = Object.keys(AGENT_LANDING_PAGES);
