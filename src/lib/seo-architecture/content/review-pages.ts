import { buildGuideFaqs } from "@/lib/seo-architecture/content-builders";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";

function page(
  config: Omit<SeoArchitecturePage, "path"> & { slug: string }
): SeoArchitecturePage {
  return { ...config, path: `/${config.slug}` };
}

const REVIEW_RELATED = [
  "best-shopping-agent",
  "best-chinese-shopping-agent",
  "best-agent-for-reps",
  "best-agent-for-taobao",
];

export const REVIEW_ARCHITECTURE_PAGES: Record<string, SeoArchitecturePage> = {
  "best-chinese-shopping-agent": page({
    slug: "best-chinese-shopping-agent",
    category: "review",
    title: "Best Chinese Shopping Agent 2026 | Compared",
    metaDescription:
      "Best Chinese shopping agents in 2026 — BoonBuy, Kakobuy, MuleBuy, OopBuy compared for fees, QC, shipping, and spreadsheet workflow.",
    badge: "Agent review",
    h1: "Best Chinese shopping agent",
    intro:
      "Chinese shopping agents buy from domestic marketplaces and ship worldwide. The best agent for you depends on shipping quotes to your country, UI preference, and whether you discover finds through BoonBuy Finds or another ecosystem.",
    keywords: ["best chinese shopping agent", "best china agent", "shopping agent 2026"],
    sections: [
      {
        heading: "Evaluation criteria",
        paragraphs: [
          "Shipping line menu to your country, warehouse QC clarity, fee transparency, payment options, and support responsiveness during disputes.",
          "Discovery matters — an agent with cheap freight but no find workflow still needs spreadsheets from somewhere.",
        ],
      },
      {
        heading: "Top picks for 2026",
        paragraphs: [
          "BoonBuy leads for buyers using BoonBuy Finds catalogs and coupon hubs. Kakobuy and MuleBuy remain strong for sneaker communities with existing spreadsheets. OopBuy suits buyers already funded there.",
        ],
        links: [
          { href: "/best-shopping-agent", label: "Best shopping agent" },
          { href: "/boonbuy-review", label: "BoonBuy review" },
        ],
      },
      {
        heading: "Run a test haul",
        paragraphs: [
          "Quote the same cart on two agents before loyalty. Shipping promos change monthly rankings.",
        ],
        links: [{ href: "/boonbuy-vs-other-agents", label: "Compare agents" }],
      },
    ],
    faqs: buildGuideFaqs("choosing a Chinese shopping agent"),
    relatedLinks: [
      { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
      { href: "/how-to-use-agents", label: "How to use agents" },
    ],
    relatedArticleSlugs: REVIEW_RELATED,
  }),

  "best-agent-for-reps": page({
    slug: "best-agent-for-reps",
    category: "review",
    title: "Best Shopping Agent for Reps 2026",
    metaDescription:
      "Best agent for reps — QC workflow, sneaker shipping, spreadsheet discovery, and why BoonBuy + BoonBuy Finds ranks high for rep buyers.",
    badge: "Rep buyers",
    h1: "Best agent for reps",
    intro:
      "Rep buyers need agents with reliable QC photos, sneaker-friendly shipping lines, and discovery tools that surface batch references. Fees matter less than not shipping flawed grails internationally.",
    keywords: ["best agent for reps", "rep shopping agent", "best agent reps"],
    sections: [
      {
        heading: "QC workflow",
        paragraphs: [
          "Choose agents with clear warehouse photo UI and paid extra-angle options. Dispute before international freight.",
        ],
        links: [{ href: "/how-to-find-best-reps", label: "Find best reps" }],
      },
      {
        heading: "Discovery stack",
        paragraphs: [
          "BoonBuy Finds indexes QC-linked rows where sources provide them. Pair with Telegram for speed.",
        ],
        links: [
          { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
          { href: "/top-qc-finds", label: "QC finds" },
        ],
      },
      {
        heading: "Our pick",
        paragraphs: [
          "BoonBuy plus BoonBuy Finds for buyers who want one checkout path and searchable catalogs. Test alternatives if friends quote cheaper freight on your next shoe parcel.",
        ],
        links: [{ href: "/boonbuy-review", label: "BoonBuy review" }],
      },
    ],
    faqs: buildGuideFaqs("agents for rep buyers"),
    relatedLinks: [{ href: "/best-shopping-agent", label: "Best shopping agent" }],
    relatedArticleSlugs: REVIEW_RELATED,
  }),

  "best-agent-for-taobao": page({
    slug: "best-agent-for-taobao",
    category: "review",
    title: "Best Agent for Taobao 2026 | Buying Guide",
    metaDescription:
      "Best shopping agent for Taobao purchases — paste-link workflow, fees, and BoonBuy Finds for Taobao discovery.",
    badge: "Taobao",
    h1: "Best agent for Taobao",
    intro:
      "Every major agent supports Taobao paste links. The best Taobao agent is the one with accurate item resolution, fair fees, and shipping lines that fit your country — plus discovery tools if you do not already have URLs.",
    keywords: ["best agent for taobao", "taobao shopping agent", "taobao agent 2026"],
    sections: [
      {
        heading: "Paste-link accuracy",
        paragraphs: [
          "Agents should resolve Taobao SKUs without swapping colors. Verify on the checkout screen every time.",
        ],
        links: [{ href: "/how-to-buy-from-taobao", label: "Taobao guide" }],
      },
      {
        heading: "Discovery before paste",
        paragraphs: [
          "BoonBuy Finds Taobao-sourced rows reduce bad searches. Use /boonbuy-taobao and category filters before manual paste.",
        ],
        links: [{ href: "/boonbuy-taobao", label: "Taobao finds" }],
      },
      {
        heading: "Recommendation",
        paragraphs: [
          "BoonBuy for integrated BoonBuy Finds discovery. Compare Kakobuy or MuleBuy freight if you already maintain wallets there.",
        ],
      },
    ],
    faqs: buildGuideFaqs("Taobao agents"),
    relatedLinks: [{ href: "/china-spreadsheet", label: "China spreadsheet" }],
    relatedArticleSlugs: REVIEW_RELATED,
  }),
};
