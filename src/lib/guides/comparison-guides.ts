import { buildGuide } from "./build";
import { CORE_LINKS } from "./shared";
import type { GuidePage } from "./types";

export const COMPARISON_GUIDES: Record<string, GuidePage> = {
  "how-to-find-good-reps": buildGuide("how-to-find-good-reps", "beginner", {
    title: "How to Find Good Reps on BoonBuy",
    metaDescription:
      "How to find good reps on BoonBuy — QC photos, seller research, batch comparisons, and using BoonBuy Finds to discover quality finds.",
    badge: "Buying guide",
    h1: "How to find good reps",
    intro:
      "Good reps start with research — QC references, community feedback, and realistic expectations on price. BoonBuy Finds helps you discover listings; BoonBuy handles purchase and warehouse QC.",
    cardDescription: "QC, batches, and discovery tips for better rep buys.",
    sections: [
      {
        heading: "Start with QC references",
        paragraphs: [
          "Products with QC links on BoonBuy Finds show photos from previous buyers. Compare stitching, materials, and shape before you order.",
          "After purchase, request warehouse QC on BoonBuy for your exact item before international shipping.",
        ],
        links: [
          { href: "/boonbuy-qc", label: "BoonBuy QC guide" },
          { href: "/best-qc-items", label: "Top QC finds" },
        ],
      },
      {
        heading: "Use brand and category filters",
        paragraphs: [
          "Search by brand on BoonBuy Finds to narrow Nike, Jordan, or Moncler lanes. Check Popular Today and Top QC Finds for community-weighted picks.",
        ],
        links: [
          { href: "/best-finds", label: "Best finds" },
          { href: "/guides/how-to-check-qc-photos", label: "Check QC photos" },
        ],
      },
      {
        heading: "Price and batch realism",
        paragraphs: [
          "Extremely low prices often mean lower-tier batches. Compare multiple listings and read QC threads before grail purchases.",
        ],
        links: [{ href: "/best-under-50", label: "Budget finds" }],
      },
    ],
    faqs: [
      {
        question: "What makes a rep good?",
        answer:
          "Accurate materials, clean stitching, and shape that matches retail references — verified through QC photos.",
      },
    ],
    relatedLinks: [...CORE_LINKS],
  }),

  "boonbuy-vs-allchinabuy": buildGuide("boonbuy-vs-allchinabuy", "beginner", {
    title: "BoonBuy vs AllChinaBuy",
    metaDescription:
      "BoonBuy vs AllChinaBuy compared — fees, QC workflow, shipping, and using BoonBuy Finds for product discovery.",
    badge: "Agent comparison",
    h1: "BoonBuy vs AllChinaBuy",
    intro:
      "Both BoonBuy and AllChinaBuy are shopping agents for Chinese marketplaces. BoonBuy Finds links primarily to BoonBuy listings — compare fees and features on each platform before your first haul.",
    cardDescription: "Agent comparison for overseas buyers.",
    sections: [
      {
        heading: "Discovery vs checkout",
        paragraphs: [
          "BoonBuy Finds is a discovery catalog with verified BoonBuy agent links. AllChinaBuy has its own browse tools — compare which workflow you prefer.",
        ],
        links: [{ href: "/boonbuy-guide", label: "BoonBuy guide" }],
      },
      {
        heading: "QC and shipping",
        paragraphs: [
          "Both agents offer warehouse QC and international lines. Compare current shipping promotions and QC photo policies at checkout.",
        ],
        links: [{ href: "/guides/how-shipping-works-with-agents", label: "Shipping guide" }],
      },
    ],
    faqs: [],
    relatedLinks: [{ href: "/boonbuy-vs-other-agents", label: "More agent comparisons" }],
  }),

  "boonbuy-vs-sugargoo": buildGuide("boonbuy-vs-sugargoo", "beginner", {
    title: "BoonBuy vs Sugargoo",
    metaDescription:
      "BoonBuy vs Sugargoo — shopping agent comparison for Weidian and Taobao finds, QC, and shipping.",
    badge: "Agent comparison",
    h1: "BoonBuy vs Sugargoo",
    intro:
      "BoonBuy and Sugargoo both buy from Chinese sellers for international customers. BoonBuy Finds curates discoverable listings with BoonBuy buy links.",
    cardDescription: "Compare BoonBuy and Sugargoo for your next haul.",
    sections: [
      {
        heading: "Which agent to use",
        paragraphs: [
          "Many buyers choose based on shipping lines, fees, and UI preference. BoonBuy Finds helps you discover products before opening BoonBuy to purchase.",
        ],
        links: [{ href: "/how-to-buy", label: "How to buy" }],
      },
    ],
    faqs: [],
    relatedLinks: [{ href: "/boonbuy-vs-other-agents", label: "Agent hub" }],
  }),

  "boonbuy-vs-pandabuy-alternatives": buildGuide("boonbuy-vs-pandabuy-alternatives", "beginner", {
    title: "BoonBuy vs Pandabuy Alternatives",
    metaDescription:
      "BoonBuy and Pandabuy alternatives compared — agent features, QC, shipping, and finding products on BoonBuy Finds.",
    badge: "Agent comparison",
    h1: "BoonBuy vs Pandabuy alternatives",
    intro:
      "Pandabuy paused operations — many buyers switched to BoonBuy and other agents. BoonBuy Finds surfaces curated listings with verified BoonBuy links.",
    cardDescription: "Agent alternatives after Pandabuy.",
    sections: [
      {
        heading: "Migrating your workflow",
        paragraphs: [
          "Paste seller URLs into BoonBuy when ordering. Use BoonBuy Finds to discover new products instead of spreadsheet rows.",
        ],
        links: [
          { href: "/boonbuy-spreadsheet", label: "Spreadsheet guide" },
          { href: "/guides/beginner-guide-to-boonbuy", label: "Beginner guide" },
        ],
      },
    ],
    faqs: [],
    relatedLinks: [{ href: "/boonbuy-vs-other-agents", label: "BoonBuy vs other agents" }],
  }),
};
