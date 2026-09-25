/**
 * Central BoonBuy Q&A hub — maps search intents to canonical URLs.
 * Prefer existing strong pages; do not invent unsupported facts.
 */

export type QuestionLink = {
  href: string;
  label: string;
  /** Short blurb shown on the hub under the question. */
  teaser: string;
};

export type QuestionGroup = {
  id: string;
  title: string;
  questions: QuestionLink[];
};

export const BOONBUY_QUESTIONS_HUB = {
  path: "/boonbuy-questions",
  title: "BoonBuy Questions Answered | Finds, Shipping, QC & Coupons",
  metaDescription:
    "Clear answers to common BoonBuy questions — what BoonBuy is, safety, shipping, warehouse, coupons, spreadsheet, QC photos, AI, and agent comparisons.",
  h1: "BoonBuy Questions Answered",
  intro:
    "People search dozens of BoonBuy questions every day. This hub points each major question to one clear page on BoonBuy Finds — with direct answers, key facts, and links to products, guides, and tools. We do not invent fees, shipping times, or guarantees; where details change on BoonBuy itself, we say so.",
  directAnswer:
    "BoonBuy Finds answers common BoonBuy questions with dedicated guides for legitimacy, shipping, warehouse, QC, coupons, spreadsheet finds, AI search, and agent comparisons — each page starts with a direct answer and links to the live catalog.",
} as const;

export const BOONBUY_QUESTION_GROUPS: QuestionGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    questions: [
      {
        href: "/what-is-boonbuy",
        label: "What is BoonBuy?",
        teaser: "Shopping agent explained — not a retail store.",
      },
      {
        href: "/what-is-boonbuy-finds",
        label: "What is BoonBuy Finds?",
        teaser: "This catalog vs the BoonBuy agent site.",
      },
      {
        href: "/guides/how-boonbuy-works",
        label: "How does BoonBuy work?",
        teaser: "Link → pay → warehouse → QC → ship.",
      },
      {
        href: "/how-to-use-boonbuy",
        label: "How to use BoonBuy",
        teaser: "Account, checkout, and first-order workflow.",
      },
      {
        href: "/how-to-buy",
        label: "How to buy from BoonBuy",
        teaser: "Step-by-step buying from finds to parcel.",
      },
      {
        href: "/boonbuy-products",
        label: "What can you buy on BoonBuy?",
        teaser: "Marketplace products via Weidian, Taobao, and more.",
      },
      {
        href: "/what-is-boonbuy",
        label: "Is BoonBuy a shopping agent?",
        teaser: "Yes — it buys from Chinese marketplaces for you.",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety and legitimacy",
    questions: [
      {
        href: "/is-boonbuy-legit",
        label: "Is BoonBuy legit?",
        teaser: "Real agent vs phishing clones and haul risk.",
      },
      {
        href: "/is-boonbuy-safe",
        label: "Is BoonBuy safe?",
        teaser: "Payments, account security, and QC discipline.",
      },
      {
        href: "/is-boonbuy-legit",
        label: "Is BoonBuy trustworthy?",
        teaser: "Same trust checklist as legitimacy — verify the real site.",
      },
      {
        href: "/boonbuy-review",
        label: "BoonBuy review",
        teaser: "Independent pros, cons, and who it fits.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping",
    questions: [
      {
        href: "/boonbuy-shipping",
        label: "How does BoonBuy shipping work?",
        teaser: "Freight after QC — lines, quotes, and parcels.",
      },
      {
        href: "/boonbuy-shipping",
        label: "How much is BoonBuy shipping?",
        teaser: "Depends on weight, volume, line, and country — quote first.",
      },
      {
        href: "/boonbuy-shipping",
        label: "How long does BoonBuy shipping take?",
        teaser: "Varies by line and destination; no single fixed ETA.",
      },
      {
        href: "/boonbuy-shipping",
        label: "Does BoonBuy ship worldwide?",
        teaser: "International lines to many countries — confirm in your account.",
      },
    ],
  },
  {
    id: "warehouse-returns",
    title: "Warehouse and returns",
    questions: [
      {
        href: "/boonbuy-warehouse",
        label: "How does the BoonBuy warehouse work?",
        teaser: "Storage, photos, and consolidation before freight.",
      },
      {
        href: "/boonbuy-returns",
        label: "How do BoonBuy returns work?",
        teaser: "Return/exchange windows before international shipping.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    questions: [
      {
        href: "/boonbuy-payment",
        label: "What payment methods does BoonBuy accept?",
        teaser: "Methods change — check the live BoonBuy checkout.",
      },
    ],
  },
  {
    id: "coupons",
    title: "Coupons and referrals",
    questions: [
      {
        href: "/boonbuy-coupons",
        label: "Does BoonBuy have coupons?",
        teaser: "Shipping and invite offers tracked on our coupon hub.",
      },
      {
        href: "/best-boonbuy-coupon",
        label: "What is the best BoonBuy coupon?",
        teaser: "Current shipping-focused invite for new accounts.",
      },
      {
        href: "/boonbuy-referral-code",
        label: "Does BoonBuy have a referral code?",
        teaser: "Invite / referral signup path explained.",
      },
    ],
  },
  {
    id: "spreadsheet-finds",
    title: "Spreadsheet and finds",
    questions: [
      {
        href: "/boonbuy-spreadsheet",
        label: "What is the BoonBuy spreadsheet?",
        teaser: "Community product lists vs this searchable catalog.",
      },
      {
        href: "/boonbuy-spreadsheet",
        label: "How to use the BoonBuy spreadsheet",
        teaser: "Browse, filter, and open verified checkout links.",
      },
      {
        href: "/boonbuy-finds",
        label: "What are BoonBuy finds?",
        teaser: "Curated product discoveries with photos and links.",
      },
      {
        href: "/best-boonbuy-finds",
        label: "What are the best BoonBuy finds?",
        teaser: "Editor and engagement shortlists from the catalog.",
      },
      {
        href: "/boonbuy-finds",
        label: "How to find products on BoonBuy",
        teaser: "Browse finds hub, brands, categories, and spreadsheet.",
      },
      {
        href: "/ai",
        label: "How to find cheaper products on BoonBuy",
        teaser: "Use AI budget prompts plus under-$X and deals rails.",
      },
      {
        href: "/ai",
        label: "How to compare BoonBuy products",
        teaser: "Compare finds in BoonBuy AI against the live catalog.",
      },
    ],
  },
  {
    id: "qc",
    title: "QC photos",
    questions: [
      {
        href: "/boonbuy-qc",
        label: "Does BoonBuy have QC photos?",
        teaser: "Warehouse QC after purchase; reference QC on finds.",
      },
      {
        href: "/boonbuy-qc",
        label: "How do BoonBuy QC photos work?",
        teaser: "Reference vs warehouse QC and what to check.",
      },
    ],
  },
  {
    id: "ai",
    title: "BoonBuy AI",
    questions: [
      {
        href: "/ai",
        label: "What is BoonBuy AI?",
        teaser: "Catalog-grounded assistant — no invented products.",
      },
    ],
  },
  {
    id: "comparisons",
    title: "Comparisons",
    questions: [
      {
        href: "/best-shopping-agent",
        label: "What are the best BoonBuy alternatives?",
        teaser: "Agent comparison hub for other shopping agents.",
      },
      {
        href: "/boonbuy-vs-cnfans",
        label: "BoonBuy vs CNFans",
        teaser: "Balanced agent comparison.",
      },
      {
        href: "/boonbuy-vs-mulebuy",
        label: "BoonBuy vs MuleBuy",
        teaser: "Fees, QC, and when each may fit.",
      },
      {
        href: "/boonbuy-vs-kakobuy",
        label: "BoonBuy vs Kakobuy",
        teaser: "Workflow and shipping differences.",
      },
      {
        href: "/boonbuy-vs-litbuy",
        label: "BoonBuy vs LitBuy",
        teaser: "Agent comparison notes.",
      },
      {
        href: "/boonbuy-vs-oopbuy",
        label: "BoonBuy vs OopBuy",
        teaser: "When OopBuy may still fit habit or coupons.",
      },
    ],
  },
];

/** Compact homepage rail — highest-intent questions only. */
export const POPULAR_BOONBUY_QUESTIONS: QuestionLink[] = [
  {
    href: "/what-is-boonbuy",
    label: "What is BoonBuy?",
    teaser: "Shopping agent basics",
  },
  {
    href: "/is-boonbuy-legit",
    label: "Is BoonBuy legit?",
    teaser: "Trust and scam checks",
  },
  {
    href: "/boonbuy-shipping",
    label: "How does BoonBuy shipping work?",
    teaser: "Freight after QC",
  },
  {
    href: "/boonbuy-spreadsheet",
    label: "What is the BoonBuy spreadsheet?",
    teaser: "Catalog vs raw sheets",
  },
  {
    href: "/boonbuy-finds",
    label: "What are BoonBuy finds?",
    teaser: "Product discovery",
  },
  {
    href: "/boonbuy-qc",
    label: "How do QC photos work?",
    teaser: "Warehouse inspection",
  },
  {
    href: "/ai",
    label: "What is BoonBuy AI?",
    teaser: "Catalog search assistant",
  },
  {
    href: "/best-boonbuy-coupon",
    label: "Best BoonBuy coupon",
    teaser: "Shipping invite offers",
  },
];

export const BOONBUY_QUESTIONS_HUB_FAQS = [
  {
    question: "Is BoonBuy Finds the same company as BoonBuy?",
    answer:
      "No. BoonBuy Finds (boonbuyfinds.net) is an independent discovery catalog. BoonBuy is the shopping agent where checkout, warehouse QC, and shipping happen. We link out to verified BoonBuy product URLs.",
  },
  {
    question: "Why don’t you list exact shipping prices or delivery days?",
    answer:
      "Freight quotes depend on parcel weight, volume, shipping line, and destination, and they change in the BoonBuy dashboard. Any fixed number we invented would be misleading — quote inside your BoonBuy account before you ship.",
  },
  {
    question: "Where should I start if I am new?",
    answer:
      "Read What is BoonBuy, then How to use BoonBuy, claim a coupon if eligible, browse Latest finds or the spreadsheet hub, and place a small test order before a large haul.",
  },
] as const;
