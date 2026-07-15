import {
  BOONBUY_SIGNUP_URL,
  SOCIAL_LINKS,
  TELEGRAM_HANDLE,
} from "./constants";

export type StaticPageSection = {
  heading: string;
  level?: 2 | 3;
  paragraphs: string[];
  links?: { href: string; label: string }[];
};

export type StaticPage = {
  path: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  intro: string;
  sections: StaticPageSection[];
  faqs?: { question: string; answer: string }[];
  relatedLinks?: { href: string; label: string }[];
};

const GUIDE_LINKS = [
  { href: "/guides", label: "All guides" },
  { href: "/guides/beginner-guide-to-boonbuy", label: "Beginner guide" },
  { href: "/guides/how-boonbuy-works", label: "How BoonBuy works" },
  { href: "/how-to-buy", label: "How to buy" },
  { href: "/best-rep-sneakers", label: "Best rep sneakers" },
  { href: "/trending", label: "Trending finds" },
  { href: "/categories/shoes", label: "Shoe finds" },
];

const TRUST_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms" },
];

export const STATIC_PAGES: Record<string, StaticPage> = {
  about: {
    path: "/about",
    title: "About BoonBuy Finds",
    metaDescription:
      "What BoonBuy Finds is, how we source product listings, how agent links work, and why we built a cleaner way to browse BoonBuy finds.",
    badge: "About us",
    h1: "About BoonBuy Finds",
    intro:
      "BoonBuy Finds is an independent product discovery site for the BoonBuy ecosystem. We organize spreadsheet finds into searchable categories, brands, and guides — so you can browse before buying and open the correct agent link when you are ready.",
    sections: [
      {
        heading: "Our mission",
        paragraphs: [
          "Shopping through agents should not require scrolling a 3,000-row spreadsheet on your phone. We built BoonBuy Finds to make discovery faster, clearer, and easier to share.",
          "We focus on structure: categories, brands, trending collections, QC references where available, and plain-language guides for beginners.",
        ],
        links: [{ href: "/guides", label: "Browse all guides" }],
      },
      {
        heading: "What BoonBuy Finds is — and is not",
        paragraphs: [
          "BoonBuy Finds is a discovery catalog. We do not sell products, hold inventory, or process payments. Checkout happens on BoonBuy and other agent platforms through outbound links.",
          "We are not affiliated with or endorsed by BoonBuy. We curate and organize public find data to help shoppers navigate the ecosystem.",
        ],
      },
      {
        heading: "How products are selected",
        paragraphs: [
          "Listings come from public BoonBuy spreadsheets and catalog imports — product names, prices, images, categories, and agent links. Our dataset syncs regularly as source sheets update.",
          "We prioritize rows with usable photos, verified agent URLs, and plausible pricing. Promo rows, broken images, and obvious placeholder prices are filtered during import.",
          "Featured rails and top lists rank items by category placement, QC availability, image quality, and engagement signals when available.",
        ],
        links: [
          { href: "/guides/boonbuy-spreadsheet-guide", label: "Spreadsheet guide" },
          { href: "/recently-added", label: "Recently added" },
        ],
      },
      {
        heading: "How QC references work",
        paragraphs: [
          "When a spreadsheet row includes a QC link (often Telegram), we surface it on the product card and detail page. These are community or seller reference photos — not a guarantee of what you will receive.",
          "Always request warehouse QC photos of your exact item on BoonBuy before international shipping. Use our QC guides to compare stitching, logos, and materials.",
        ],
        links: [
          { href: "/guides/what-are-qc-photos", label: "What are QC photos?" },
          { href: "/best-qc-approved-finds", label: "QC-approved finds" },
        ],
      },
      {
        heading: "Editorial process",
        paragraphs: [
          "Guides are written by the BoonBuy Finds Team, reviewed for accuracy, and updated when agent workflows or catalog practices change. Top lists and collections are generated from live catalog data — not static copy.",
          "We do not accept payment for placement in lists. Affiliate commissions may apply when you register or buy through outbound BoonBuy links.",
        ],
        links: [
          { href: "/guides", label: "All guides" },
          { href: "/contact", label: "Request a correction" },
        ],
      },
      {
        heading: "Why buyers use agents",
        paragraphs: [
          "Agents like BoonBuy let you buy from Weidian, Taobao, and 1688 in one cart, store items in a warehouse, and combine shipments internationally. BoonBuy Finds helps you discover listings before you open the agent checkout flow.",
        ],
        links: [
          { href: "/guides/what-is-a-shopping-agent", label: "What is an agent?" },
          { href: "/guides/how-to-order-from-boonbuy", label: "How to order" },
        ],
      },
      {
        heading: "How agent links work",
        paragraphs: [
          "Each product page includes an outbound link to BoonBuy (or the agent URL from the source row). That link should open the matching listing so you can confirm size, color, and price before paying.",
          "Agent links may be affiliate links. If you register or buy through them, we may earn a commission at no extra cost to you. This supports the site.",
        ],
        links: [
          { href: "/guides/how-to-use-boonbuy-agent-links", label: "Agent links guide" },
          { href: "/guides/how-to-order-from-boonbuy", label: "How to order" },
        ],
      },
      {
        heading: "The BoonBuy Finds Team",
        paragraphs: [
          "Content on this site is written and maintained by the BoonBuy Finds Team — we curate product discoveries, organize categories and brands, and publish guides that explain agents, QC photos, and ordering.",
          "We do not claim to be individual fashion experts or agents. Our role is to make the catalog easier to browse and to document the buying workflow honestly.",
        ],
        links: [{ href: "/contact", label: "Contact the team" }],
      },
      {
        heading: "Do your own research",
        paragraphs: [
          "Prices, batches, and seller quality change. QC references help compare listings, but warehouse photos of your exact item are what matter before you ship internationally.",
          "Always verify product details on BoonBuy, read community feedback, and use your own judgment before ordering. Laws around imports vary by country — that is your responsibility.",
        ],
        links: [
          { href: "/guides/beginner-guide-to-boonbuy", label: "Beginner guide" },
          { href: "/guides/what-are-qc-photos", label: "What are QC photos?" },
        ],
      },
      {
        heading: "Affiliate disclosure",
        paragraphs: [
          "Some outbound links are affiliate links. Commissions help maintain BoonBuy Finds and keep the catalog free to use.",
        ],
        links: TRUST_LINKS.filter((l) => l.href !== "/about"),
      },
    ],
    faqs: [
      {
        question: "Who writes the guides?",
        answer:
          "Guides are written by the BoonBuy Finds Team and updated when workflows or catalog practices change. We aim for clear, practical explanations — not hype.",
      },
      {
        question: "Can I request a correction?",
        answer:
          "Yes. Email hello@boonbuyfinds.net with the product or guide URL and what should change. We review listing corrections regularly.",
      },
    ],
    relatedLinks: [...GUIDE_LINKS.slice(0, 4), { href: "/contact", label: "Contact" }],
  },

  contact: {
    path: "/contact",
    title: "Contact BoonBuy Finds",
    metaDescription:
      "Contact BoonBuy Finds by email, Discord, Telegram, or social channels. Listing corrections, guide feedback, and partnership inquiries.",
    badge: "Contact",
    h1: "Contact us",
    intro:
      "Questions about a listing, a guide, or a partnership idea? Reach out by email or join the community channels below. We read messages regularly and use feedback to improve the catalog.",
    sections: [
      {
        heading: "Email support",
        paragraphs: [
          "For catalog corrections, guide feedback, privacy questions, or partnerships, email hello@boonbuyfinds.net.",
          "Include the full product or guide URL when reporting a specific issue — that helps us fix it faster.",
        ],
      },
      {
        heading: "Discord & Telegram",
        paragraphs: [
          "For faster help from other buyers, join Discord or Telegram. Members share QC tips, shipping advice, and recent pickups daily.",
          "These are community spaces — not official BoonBuy support — but they are often the quickest place to get a second opinion before you ship a haul.",
        ],
        links: [
          { href: SOCIAL_LINKS.discord, label: "Join Discord" },
          {
            href: SOCIAL_LINKS.telegram,
            label: `Join Telegram ${TELEGRAM_HANDLE}`,
          },
        ],
      },
      {
        heading: "Social",
        paragraphs: [
          "Follow along for catalog highlights, browsing tips, and occasional updates on new guides and collections.",
        ],
        links: [
          {
            href: SOCIAL_LINKS.instagram,
            label: "Instagram",
          },
          {
            href: SOCIAL_LINKS.tiktok,
            label: "TikTok",
          },
        ],
      },
      {
        heading: "Order & agent support",
        paragraphs: [
          "BoonBuy Finds does not process orders. For payment, warehouse, QC, or shipping issues, contact BoonBuy directly or ask in the buyer communities above.",
        ],
        links: [
          { href: "/guides/how-to-order-from-boonbuy", label: "How to order guide" },
          { href: "/guides/beginner-guide-to-boonbuy", label: "Beginner guide" },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "We aim to respond to email within a few business days. Listing corrections are prioritized when you include a URL and a clear description of the issue.",
          "We cannot guarantee seller quality, shipping times, or customs outcomes — those depend on sellers, agents, and your local regulations.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you remove a product from the catalog?",
        answer:
          "If a listing is outdated or violates guidelines, email us with the product page URL and we will review it.",
      },
      {
        question: "Do you sell products?",
        answer:
          "No. We link to BoonBuy and other agent platforms. All purchases happen on those sites.",
      },
      {
        question: "Who maintains the guides?",
        answer:
          "The BoonBuy Finds Team writes and updates guides. If something is outdated, email us with the guide URL.",
      },
    ],
    relatedLinks: TRUST_LINKS.filter((l) => l.href !== "/contact"),
  },

  "privacy-policy": {
    path: "/privacy-policy",
    title: "Privacy Policy",
    metaDescription:
      "Privacy policy for BoonBuy Finds — what data we collect, how we use analytics, and your choices as a visitor.",
    badge: "Legal",
    h1: "Privacy policy",
    intro:
      "This policy explains what information BoonBuy Finds collects when you visit the site and how we use it. Last updated June 2026.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We use privacy-focused analytics (Vercel Analytics) to understand traffic patterns — pages visited, referrers, and general device type. We do not sell personal data.",
          "If you email us, we receive your email address and message content solely to respond to you.",
          "Wishlist items are stored in your browser's local storage. We do not receive that data on our servers.",
        ],
      },
      {
        heading: "Cookies and local storage",
        paragraphs: [
          "The site may use cookies or local storage for preferences (currency display) and saved wishlist items. You can clear these through your browser settings.",
        ],
      },
      {
        heading: "Third-party links",
        paragraphs: [
          "Outbound links to BoonBuy, Discord, Telegram, and product sellers are third-party sites with their own privacy policies. We are not responsible for their practices.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: ["Privacy questions: hello@boonbuyfinds.net"],
      },
    ],
    relatedLinks: TRUST_LINKS.filter((l) => l.href !== "/privacy-policy"),
  },

  terms: {
    path: "/terms",
    title: "Terms of Use",
    metaDescription:
      "Terms of use for BoonBuy Finds — catalog disclaimer, affiliate links, and acceptable use.",
    badge: "Legal",
    h1: "Terms of use",
    intro:
      "By using BoonBuy Finds, you agree to these terms. Please read them before relying on any listing for purchase decisions.",
    sections: [
      {
        heading: "Catalog disclaimer",
        paragraphs: [
          "BoonBuy Finds is an independent discovery catalog. Product names, images, and prices come from third-party spreadsheets and may change without notice. Always verify details on BoonBuy before purchasing.",
        ],
      },
      {
        heading: "No warranties",
        paragraphs: [
          "We provide the site as-is. We do not guarantee accuracy, availability, or quality of any product. Buying replica or inspired items may carry legal and quality risks in your region — that is your responsibility.",
        ],
      },
      {
        heading: "Affiliate links",
        paragraphs: [
          "Some links are affiliate links. Commissions help maintain the site and do not increase your price.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "Do not scrape the site in ways that harm performance, attempt unauthorized access, or misuse content for spam or misleading purposes.",
        ],
      },
    ],
    relatedLinks: TRUST_LINKS.filter((l) => l.href !== "/terms"),
  },

  "how-to-buy": {
    path: "/how-to-buy",
    title: "How to Buy on BoonBuy",
    metaDescription:
      "Step-by-step guide to buying finds through BoonBuy — register, add to cart, QC checks, shipping, and customs tips for new users.",
    badge: "Buying guide",
    h1: "How to buy through BoonBuy",
    intro:
      "Found something on BoonBuy Finds? Here is the usual flow from discovery to delivery. Exact steps can vary by seller and shipping line, but this covers what most new buyers need.",
    sections: [
      {
        heading: "1. Claim your 40% shipping coupon",
        paragraphs: [
          "Create a BoonBuy account using a referral link if you want shipping discounts for new users. Registration is free and takes a few minutes.",
        ],
        links: [
          {
            href: BOONBUY_SIGNUP_URL,
            label: "Claim 40% Coupon",
          },
          { href: "/boonbuy-coupons", label: "BoonBuy coupons guide" },
          { href: "/deals", label: "Deals under $30" },
        ],
      },
      {
        heading: "2. Open the product link",
        paragraphs: [
          "On any find page, click Buy on BoonBuy. That sends you to the agent listing with the correct item loaded. Double-check size, color, and price before adding to cart.",
        ],
      },
      {
        heading: "3. Check QC when available",
        paragraphs: [
          "If we show a QC badge, use the QC link to see warehouse photos. Compare stitching, logos, and shape to what you expect. Skip or exchange if something looks off.",
        ],
      },
      {
        heading: "4. Ship to warehouse, then ship home",
        paragraphs: [
          "Items sit in your BoonBuy warehouse until you submit a parcel. Combine multiple items to save on international shipping. Pick a shipping line that balances speed and cost for your country.",
        ],
      },
      {
        heading: "5. Declare and receive",
        paragraphs: [
          "Follow customs rules in your country. Keep tracking handy and be patient — international parcels can take one to three weeks depending on the line.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does shipping take?",
        answer:
          "It depends on the line you choose and your country. Budget lines are slower; express costs more but arrives faster.",
      },
      {
        question: "What if the item is wrong?",
        answer:
          "Contact BoonBuy support with photos. Policies vary by seller — QC before shipping home saves headaches.",
      },
    ],
    relatedLinks: GUIDE_LINKS,
  },

  "new-user-guide": {
    path: "/new-user-guide",
    title: "BoonBuy New User Guide",
    metaDescription:
      "New to BoonBuy and rep buying? Start here — account setup, first order tips, QC basics, and where to find the best finds.",
    badge: "Getting started",
    h1: "New user guide",
    intro:
      "If this is your first time using an agent, the learning curve is real but manageable. This guide points you to the right first steps without overwhelming you.",
    sections: [
      {
        heading: "Start with a low-risk first order",
        paragraphs: [
          "Pick one affordable item from our Best Under $30 collection. You learn the full flow — payment, warehouse, QC, shipping — without risking a large budget.",
        ],
        links: [
          { href: "/deals", label: "Deals under $30" },
          { href: "/best-budget-finds", label: "Best budget finds" },
        ],
      },
      {
        heading: "Learn QC basics",
        paragraphs: [
          "QC means quality check photos taken at the warehouse. Compare them to retail photos and community reviews. Small flaws might be acceptable; major flaws are not.",
        ],
        links: [{ href: "/how-to-buy", label: "Full buying guide" }],
      },
      {
        heading: "Use categories and brands",
        paragraphs: [
          "Shoes have different sizing quirks than hoodies or jackets. Browse by category when you know what you want, or by brand when you are loyal to a label.",
        ],
        links: [
          { href: "/categories/shoes", label: "Shoes" },
          { href: "/brands/nike", label: "Nike finds" },
        ],
      },
      {
        heading: "Join the community",
        paragraphs: [
          "Discord and Telegram are where buyers share recent QCs, batch advice, and shipping line recommendations for specific countries.",
        ],
        links: [
          { href: SOCIAL_LINKS.discord, label: "Discord" },
          { href: SOCIAL_LINKS.telegram, label: "Telegram" },
        ],
      },
    ],
    faqs: [
      {
        question: "Is BoonBuy Finds the same as BoonBuy?",
        answer:
          "No. BoonBuy Finds is a discovery catalog. BoonBuy is the buying agent where you checkout and ship.",
      },
    ],
    relatedLinks: GUIDE_LINKS,
  },

  "best-rep-sneakers": {
    path: "/best-rep-sneakers",
    title: "Best Rep Sneakers on BoonBuy",
    metaDescription:
      "Popular sneaker finds on BoonBuy — Nike Dunks, Jordan 1s, New Balance, and trending runners with verified buy links and QC.",
    badge: "Sneaker guide",
    h1: "Best rep sneakers right now",
    intro:
      "Sneakers are the most searched category on the site. These are the labels and styles buyers come back to most — with links to live inventory on BoonBuy Finds.",
    sections: [
      {
        heading: "Most searched brands",
        paragraphs: [
          "Nike, Jordan, Adidas, New Balance, and Asics dominate requests. Each brand page filters the catalog to that label so you are not scrolling unrelated items.",
        ],
        links: [
          { href: "/brands/nike", label: "Nike" },
          { href: "/brands/jordan", label: "Jordan" },
          { href: "/brands/adidas", label: "Adidas" },
          { href: "/brands/new-balance", label: "New Balance" },
          { href: "/brands/asics", label: "Asics" },
        ],
      },
      {
        heading: "Where to browse",
        paragraphs: [
          "The shoes category has the full sneaker inventory. Trending highlights what is hot this week; Daily Drop surfaces one featured pick every day.",
        ],
        links: [
          { href: "/categories/shoes", label: "All shoes" },
          { href: "/trending", label: "Trending" },
          { href: "/daily-drop", label: "Daily drop" },
        ],
      },
      {
        heading: "Buying tips for sneakers",
        level: 3,
        paragraphs: [
          "Check size charts per batch — EU and US conversions are not always consistent. Always request QC for pairs over $50. Compare midsole shape and toe box to reference photos.",
        ],
      },
    ],
    relatedLinks: GUIDE_LINKS,
  },

  "best-budget-finds": {
    path: "/best-budget-finds",
    title: "Best Budget Finds Under $30",
    metaDescription:
      "Best budget finds on BoonBuy under $30 — tees, accessories, and entry-level pickups with verified links.",
    badge: "Budget picks",
    h1: "Best budget finds",
    intro:
      "You do not need to spend a lot for a solid first haul. These collections surface affordable finds that are popular with new buyers and veteran budget hunters alike.",
    sections: [
      {
        heading: "Deals under $30",
        paragraphs: [
          "Our deals page filters the catalog to items at or below $30, sorted with photos first so you can scan quickly.",
        ],
        links: [{ href: "/deals", label: "Shop deals under $30" }],
      },
      {
        heading: "Hidden gems",
        paragraphs: [
          "Hidden gems are strong products that fly under the radar — fewer clicks, but often great value when you want something different from the hype list.",
        ],
        links: [{ href: "/hidden-gems", label: "Hidden gems" }],
      },
      {
        heading: "Good categories for budget buys",
        paragraphs: [
          "T-shirts, accessories, and basic hoodies often land under $30. Electronics and premium outerwear usually do not — set expectations accordingly.",
        ],
        links: [
          { href: "/categories/tshirts", label: "T-shirts" },
          { href: "/categories/accessories", label: "Accessories" },
          { href: "/categories/hoodies", label: "Hoodies" },
        ],
      },
    ],
    relatedLinks: GUIDE_LINKS,
  },

  "boonbuy-vs-other-agents": {
    path: "/boonbuy-vs-other-agents",
    title: "BoonBuy vs Other Agents",
    metaDescription:
      "How BoonBuy compares to other buying agents — fees, shipping, QC workflow, and why buyers use BoonBuy Finds for discovery.",
    badge: "Agent comparison",
    h1: "BoonBuy vs other agents",
    intro:
      "Several agents can buy from the same Chinese marketplaces. BoonBuy is the agent this catalog is built around, but an honest comparison helps you choose what fits your country and budget.",
    sections: [
      {
        heading: "Why we focus on BoonBuy",
        paragraphs: [
          "Our spreadsheet sources and affiliate links are optimized for BoonBuy. Every product page is tested to open the correct listing. That consistency is hard to replicate across multiple agents.",
        ],
      },
      {
        heading: "What to compare",
        paragraphs: [
          "Look at shipping rates to your country, exchange fees, QC photo quality, support response time, and whether your preferred sellers are supported. The cheapest agent on paper is not always the best after fees.",
        ],
      },
      {
        heading: "New user shipping discount",
        paragraphs: [
          "BoonBuy often runs promotions for new accounts — including shipping discounts when you register through a referral. Check the current offer on our homepage banner.",
        ],
        links: [
          {
            href: BOONBUY_SIGNUP_URL,
            label: "Claim 40% Coupon",
          },
          { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
          { href: "/deals", label: "Deals under $30" },
          { href: "/new-user-guide", label: "New user guide" },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I use a different agent for the same item?",
        answer:
          "Sometimes, if you have the original marketplace link. Our Buy buttons are wired for BoonBuy specifically.",
      },
      {
        question: "Is BoonBuy Finds affiliated with BoonBuy?",
        answer:
          "We are an independent discovery site with affiliate relationships. We are not owned by BoonBuy.",
      },
    ],
    relatedLinks: GUIDE_LINKS,
  },

  boonbuy: {
    path: "/boonbuy",
    title: "BoonBuy Agent | Shopping Agent, Finds & Coupons 2026",
    metaDescription:
      "BoonBuy is a China shopping agent for Weidian, Taobao and 1688. BoonBuy Finds is the #2 destination for BoonBuy finds, QC photos, coupons, Telegram and Discord.",
    badge: "BoonBuy agent",
    h1: "BoonBuy — China shopping agent & finds",
    intro:
      "BoonBuy (boonbuy.com) is a shopping agent for Chinese marketplaces. BoonBuy Finds is an independent catalog of verified finds, QC photos, and spreadsheet-style products — built to rank alongside boonbuy.com when you search BoonBuy on Google.",
    sections: [
      {
        heading: "What is BoonBuy?",
        paragraphs: [
          "BoonBuy helps international buyers purchase from Weidian, Taobao, and 1688 with warehouse QC, consolidated shipping, and agent checkout links.",
          "Use boonbuy.com to register and ship. Use boonbuyfinds.net to browse curated finds before you buy.",
        ],
        links: [
          {
            href: BOONBUY_SIGNUP_URL,
            label: "Register on BoonBuy",
          },
          { href: "/boonbuy-coupons", label: "Claim BoonBuy coupons" },
          { href: "/deals", label: "Deals under $30" },
          { href: "/boonbuy-finds", label: "Browse BoonBuy finds" },
        ],
      },
      {
        heading: "BoonBuy Finds — your discovery layer",
        paragraphs: [
          "Search thousands of QC-approved fashion and sneaker finds. Every product opens a verified BoonBuy link with QC references and trusted checkout.",
        ],
        links: [
          { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
          { href: "/telegram-boonbuy", label: "BoonBuy Telegram" },
          { href: "/discord-boonbuy", label: "BoonBuy Discord" },
        ],
      },
    ],
    relatedLinks: [
      { href: "/", label: "Homepage" },
      { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
      { href: "/boonbuy-finds", label: "BoonBuy finds catalog" },
      { href: "https://boonbuy.com", label: "Official BoonBuy site" },
    ],
  },
};

export const STATIC_PAGE_PATHS = Object.keys(STATIC_PAGES);

export function getStaticPage(slug: string): StaticPage | undefined {
  return STATIC_PAGES[slug];
}
