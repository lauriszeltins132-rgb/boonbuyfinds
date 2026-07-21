import { BOONBUY_COUPON_URL, BOONBUY_INVITE_CODE } from "@/lib/boonbuy-affiliate";
import { SOCIAL_LINKS } from "@/lib/constants";
import { buildGuideFaqs } from "@/lib/seo-architecture/content-builders";
import type { SeoArchitecturePage } from "@/lib/seo-architecture/types";

function page(
  config: Omit<SeoArchitecturePage, "path"> & { slug: string }
): SeoArchitecturePage {
  return { ...config, path: `/${config.slug}` };
}

const BRAND_RELATED = [
  "boonbuy-finds",
  "boonbuy-spreadsheet",
  "boonbuy-coupons",
  "how-to-use-boonbuy",
  "what-is-boonbuy",
];

export const BRAND_ARCHITECTURE_PAGES: Record<string, SeoArchitecturePage> = {
  "boonbuy-spreadsheet-2026": page({
    slug: "boonbuy-spreadsheet-2026",
    category: "brand",
    title: "BoonBuy Spreadsheet 2026 | Searchable Finds Catalog",
    metaDescription:
      "BoonBuy spreadsheet 2026 — searchable QC finds, verified agent links, and daily catalog updates. The mobile-friendly alternative to scrolling raw Google Sheets.",
    badge: "Spreadsheet 2026",
    h1: "BoonBuy spreadsheet 2026",
    intro:
      "The 2026 BoonBuy spreadsheet is not a frozen Google Sheet on this site — it is the live BoonBuy Finds catalog: thousands of indexed rows with photos, prices, categories, and BoonBuy agent links you can search on your phone. Use this hub when you want spreadsheet-style discovery without losing rows in a tiny mobile viewport.",
    keywords: ["boonbuy spreadsheet 2026", "boonbuy spreadsheet", "boonbuy finds"],
    sections: [
      {
        heading: "What changed in 2026",
        paragraphs: [
          "Spreadsheet culture did not disappear — it moved behind search bars. Sellers still list on Weidian and Taobao; curators still maintain rows; buyers still need QC references. What changed is how you access those rows: category filters, brand pages, and price sliders beat infinite scroll through column Z on a phone.",
          "BoonBuy Finds syncs catalog data regularly so 2026 listings reflect current batches and pricing where the source sheet updates. Stale rows get filtered when images break or prices look like placeholders. That keeps the spreadsheet metaphor honest — live data, not a screenshot from last season.",
          "Coupon and shipping offers also rotate. Our 2026 hub pages tie spreadsheet browsing to the current BoonBuy registration invite so you are not hunting codes in comment sections.",
        ],
        links: [
          { href: "/boonbuy-spreadsheet", label: "BoonBuy spreadsheet" },
          { href: "/best-boonbuy-spreadsheet", label: "Best BoonBuy spreadsheet" },
        ],
      },
      {
        heading: "How to search like a spreadsheet power user",
        paragraphs: [
          "Start from the homepage search or open a category rail — shoes, hoodies, jackets, accessories. Add a brand filter when you know the label you want. Sort mentally by QC availability: listings with reference photos reduce guesswork before warehouse photos even exist.",
          "Save Telegram drops for heat that has not hit the index yet. When a row lands here, you get stable URLs for sharing in Discords and group chats — cleaner than paste-exporting sheet ranges.",
          "Open the agent link only when variant, size, and price match your notes. The spreadsheet row is research; BoonBuy checkout is commitment.",
        ],
      },
      {
        heading: "QC columns without the column letter",
        paragraphs: [
          "Classic spreadsheets hide QC in comment threads or adjacent tabs. On BoonBuy Finds, QC references surface on the product page when the source provides them. Read them before you buy, then request warehouse QC again after purchase — two layers, two different moments in the haul timeline.",
          "For grail pairs, cross-check multiple listings. The same batch sometimes appears under different shop names with different price points. The spreadsheet mindset — compare rows — still applies inside our filters.",
        ],
        links: [{ href: "/boonbuy-qc", label: "BoonBuy QC hub" }],
      },
      {
        heading: "Mobile workflow",
        paragraphs: [
          "Most 2026 buyers discover on mobile between classes or on the commute. Pin this site, pin Telegram, and pin the coupon page. Three taps beat downloading a 12 MB sheet on cellular data.",
          "Wishlist features on-site let you stage rows without keeping forty browser tabs open. Come back when your agent wallet is funded and shipping promos align.",
        ],
      },
      {
        heading: "Community sheets vs this catalog",
        paragraphs: [
          "Private Discord sheets may list exclusives faster for a day. Public SEO catalogs win for stable links, image hosting, and structured categories. Use both: Telegram for speed, BoonBuy Finds for organization.",
          "When a friend sends a raw Weidian URL, paste it into BoonBuy manually. When they send a boonbuyfinds.net/find link, you inherit context — name, photo, category — before checkout.",
        ],
      },
      {
        heading: "Shipping and coupons in 2026",
        paragraphs: [
          `Register on BoonBuy with invite code ${BOONBUY_INVITE_CODE} through our coupon hub for the current shipping promotion. Percentages change — the landing page on BoonBuy is authoritative.`,
          "Spreadsheet shopping saves item money; shipping consolidation saves freight money. Build parcels deliberately instead of shipping one tee at a time.",
        ],
        links: [
          { href: "/boonbuy-coupons", label: "Coupons" },
          { href: "/boonbuy-shipping", label: "Shipping guide" },
        ],
      },
    ],
    faqs: buildGuideFaqs("the 2026 BoonBuy spreadsheet", [
      {
        question: "Is there a downloadable Google Sheet?",
        answer:
          "This site is the searchable layer. Some communities maintain separate Google Sheets; we index public find data into a faster mobile catalog with agent links.",
      },
      {
        question: "How often does the catalog update?",
        answer: "Listings sync on a regular cadence as source spreadsheets and imports refresh. Check recently-added and trending pages for fresh rows.",
      },
    ]),
    relatedLinks: [
      { href: "/", label: "Homepage" },
      { href: "/spreadsheet", label: "Spreadsheet hub" },
      { href: "/telegram-boonbuy", label: "Telegram" },
    ],
    relatedArticleSlugs: BRAND_RELATED,
    spreadsheetHref: "/boonbuy-spreadsheet",
  }),

  "boonbuy-discord": page({
    slug: "boonbuy-discord",
    category: "brand",
    title: "BoonBuy Discord | Join BoonBuy Finds Server 2026",
    metaDescription:
      "Join the BoonBuy Discord for haul discussion, spreadsheet drops, QC help, and links to the BoonBuy Finds catalog. Official community server for 2026.",
    badge: "Discord",
    h1: "BoonBuy Discord",
    intro:
      "The BoonBuy Finds Discord is where haulers share new spreadsheet rows, QC outcomes, shipping line tips, and coupon reminders — without cluttering your camera roll with screenshots. It complements the website catalog; it does not replace searchable filters on desktop and mobile.",
    keywords: ["boonbuy discord", "boonbuy finds discord", "rep discord"],
    sections: [
      {
        heading: "What you get on Discord",
        paragraphs: [
          "Real-time drops when curators post heat before it hits trending rails. Size check threads where buyers compare measurements to retail. Shipping channel chatter about which line cleared customs last week for your country.",
          "Moderation keeps spam down so links stay usable. Pin the coupon page and spreadsheet hub in your own notes — Discord moves fast and pins scroll away.",
        ],
      },
      {
        heading: "Discord vs Telegram",
        paragraphs: [
          "Telegram is better for push notifications on a phone lock screen. Discord is better for threaded QC debates and long-form haul reviews. Most active members use both; join Discord for depth, Telegram for speed.",
        ],
        links: [
          { href: "/boonbuy-telegram", label: "BoonBuy Telegram" },
          { href: "/discord-boonbuy", label: "Discord landing page" },
        ],
      },
      {
        heading: "How Discord fits the spreadsheet workflow",
        paragraphs: [
          "When someone posts a find, ask for a boonbuyfinds.net link if available — structured pages beat raw URLs for newcomers. If only a Weidian link exists, paste into BoonBuy after verifying batch notes in thread history.",
          "Use category channels when the server organizes by sneakers, streetwear, or accessories. It mirrors how we slice the catalog on-site.",
        ],
      },
      {
        heading: "Rules and safety",
        paragraphs: [
          "Never share payment passwords or full ID documents in public channels. Agents handle KYC inside their official apps. Report sketchy middlemen — buy through BoonBuy or agents you recognize.",
          "QC photos in Discord are educational, not guarantees for your exact pair. Warehouse photos still rule before international shipping.",
        ],
      },
      {
        heading: "Join link",
        paragraphs: [
          `The BoonBuy Finds Discord is open at ${SOCIAL_LINKS.discord}. Introduce yourself with your country and what you collect — sneaker size, jacket brands, budget. Better answers follow better questions.`,
        ],
      },
    ],
    faqs: buildGuideFaqs("BoonBuy Discord", [
      {
        question: "Is this the official BoonBuy agent Discord?",
        answer:
          "This is the BoonBuy Finds community server for discovery and haul talk. BoonBuy agent support still lives inside BoonBuy's official channels.",
      },
      {
        question: "Can I get coupon codes on Discord?",
        answer: "Members share when promos go live. Always verify on our coupon pages and BoonBuy checkout before assuming a code still works.",
      },
    ]),
    relatedLinks: [
      { href: SOCIAL_LINKS.discord, label: "Join Discord" },
      { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
      { href: "/boonbuy-coupons", label: "Coupons" },
    ],
    relatedArticleSlugs: ["boonbuy-telegram", "boonbuy-finds", "boonbuy-spreadsheet"],
  }),

  "boonbuy-telegram": page({
    slug: "boonbuy-telegram",
    category: "brand",
    title: "BoonBuy Telegram | Join BoonBuy Finds Channel 2026",
    metaDescription:
      "Join BoonBuy Telegram for daily finds, spreadsheet alerts, QC posts, and coupon updates. Fast drops from the BoonBuy Finds channel.",
    badge: "Telegram",
    h1: "BoonBuy Telegram",
    intro:
      "Telegram is the fastest pipe for BoonBuy spreadsheet alerts — new rows, price dips, and QC reference posts land here before they trend on-site. Follow the BoonBuy Finds channel if you want push notifications without living inside Discord threads.",
    keywords: ["boonbuy telegram", "boonbuy finds telegram", "spreadsheet telegram"],
    sections: [
      {
        heading: "Why Telegram still matters in 2026",
        paragraphs: [
          "Algorithms do not gatekeep a channel you subscribed to. When a curator posts ten strong rows at midnight your time, you see them. That speed keeps Telegram central next to searchable catalogs.",
          "Posts often link straight to product pages here — one tap from notification to photos, price, and BoonBuy agent link. Save the message if you are not ready to buy; come back when your parcel budget opens.",
        ],
      },
      {
        heading: "What we post",
        paragraphs: [
          "Daily drops across sneakers, hoodies, jackets, and accessories. Coupon reminders when BoonBuy shipping promos change. Occasional guides pointing to long-form articles on this site for beginners.",
          "We do not spam unrelated ads. Sponsored rows, when they exist, are labeled. The feed prioritizes catalog quality over volume.",
        ],
      },
      {
        heading: "Telegram + spreadsheet + site",
        paragraphs: [
          "Think of three layers: Telegram for alerts, the website for search and filters, BoonBuy for checkout. Power users bounce between all three in one haul cycle.",
          "Pinned messages usually include the coupon URL and spreadsheet hub. Check pins after joining so you do not ask for links already answered.",
        ],
        links: [
          { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
          { href: "/spreadsheet", label: "Spreadsheet hub" },
        ],
      },
      {
        heading: "Join the channel",
        paragraphs: [
          `Subscribe at ${SOCIAL_LINKS.telegram}. Turn on notifications if you chase limited batches. Mute if you only want weekly browsing — the catalog will still be here.`,
        ],
      },
    ],
    faqs: buildGuideFaqs("BoonBuy Telegram", [
      {
        question: "What is the Telegram handle?",
        answer: "The BoonBuy Finds channel is linked from our site header and coupon pages — use the official link to avoid impersonators.",
      },
      {
        question: "Can I submit finds?",
        answer: "Contact via the site collab page or ask moderators in Discord for submission guidelines.",
      },
    ]),
    relatedLinks: [
      { href: SOCIAL_LINKS.telegram, label: "Join Telegram" },
      { href: "/telegram-boonbuy", label: "Telegram hub page" },
      { href: "/boonbuy-discord", label: "Discord" },
    ],
    relatedArticleSlugs: ["boonbuy-discord", "boonbuy-spreadsheet", "trending-finds"],
  }),

  "boonbuy-discount-code": page({
    slug: "boonbuy-discount-code",
    category: "brand",
    title: "BoonBuy Discount Code 2026 | Shipping Coupon",
    metaDescription:
      "Active BoonBuy discount code for 2026 — invite registration, shipping coupon, and how to apply codes at checkout on BoonBuy.",
    badge: "Discount code",
    h1: "BoonBuy discount code",
    intro:
      "BoonBuy discount codes usually arrive as registration invite codes and shipping coupons — not random strings in YouTube comments. Use the current invite on our coupon hub; confirm the live percentage on BoonBuy before you fund a haul.",
    keywords: ["boonbuy discount code", "boonbuy coupon", "boonbuy invite code"],
    sections: [
      {
        heading: "Current invite code",
        paragraphs: [
          `The primary BoonBuy registration invite is ${BOONBUY_INVITE_CODE}. Open ${BOONBUY_COUPON_URL} to register — terms apply to new accounts and may include shipping discounts rather than item markdowns.`,
          "Agent coupons rarely reduce listing prices on Taobao. They adjust service fees or international freight at parcel time. Read the promo copy so you know which checkout step applies the benefit.",
        ],
      },
      {
        heading: "How to apply a code",
        paragraphs: [
          "Enter the invite during BoonBuy signup, not on each Weidian listing. Some shipping coupons auto-attach to your first parcel; others require clicking activate in the promotions tab before you pay freight.",
          "Screenshot the promo terms when you register. Support disputes go smoother when you have timestamps.",
        ],
        links: [
          { href: "/boonbuy-coupons", label: "All coupons" },
          { href: "/boonbuy-shipping", label: "Shipping" },
        ],
      },
      {
        heading: "Avoid fake codes",
        paragraphs: [
          "Expired influencer codes circulate forever on Reddit. If a code fails, use our hub instead of random generators. Phishing sites mimic agent login pages — bookmark boonbuy.com directly.",
        ],
      },
      {
        heading: "Stacking savings",
        paragraphs: [
          "Combine registration shipping promos with smart parcel building: bundle items, pick the right line, remove excess packaging when safe. The code is one lever; consolidation is the other.",
        ],
        links: [{ href: "/how-to-save-on-shipping", label: "Save on shipping" }],
      },
    ],
    faqs: buildGuideFaqs("BoonBuy discount codes", [
      {
        question: "Does the code work on every item?",
        answer: "Invite codes attach to your account; shipping discounts apply at freight checkout. Item prices still follow seller listings.",
      },
      {
        question: "Can existing users get shipping coupons?",
        answer: "Promotions vary. Check BoonBuy's promotions tab and our coupon pages for returning-user campaigns.",
      },
    ]),
    relatedLinks: [
      { href: "/boonbuy-coupons", label: "Coupon hub" },
      { href: "/boonbuy-promo", label: "Promo page" },
      { href: BOONBUY_COUPON_URL, label: "Register with invite" },
    ],
    relatedArticleSlugs: ["boonbuy-shipping", "boonbuy-coupons", "how-to-save-on-shipping"],
  }),

  "boonbuy-shipping": page({
    slug: "boonbuy-shipping",
    category: "brand",
    title: "BoonBuy Shipping Guide 2026 | Coupons & Lines",
    metaDescription:
      "BoonBuy shipping explained — international lines, coupons, consolidation, dimensional weight, and how to quote freight before you ship your haul.",
    badge: "Shipping",
    h1: "BoonBuy shipping",
    intro:
      "Item prices are only half the haul math. BoonBuy shipping covers warehouse storage, line selection, customs declaration, and last-mile delivery to your country. Quote freight before you buy more cart lines than your budget can ship.",
    keywords: ["boonbuy shipping", "boonbuy shipping coupon", "agent shipping"],
    sections: [
      {
        heading: "How BoonBuy freight works",
        paragraphs: [
          "After QC approval, items move to shipped-ready status. You build a parcel, pick a line, declare contents and value, pay freight, then track outbound. Lines differ in speed, tracking granularity, customs handling, and price per kilo.",
          "Economy options save money with slower tracking. Express options cost more but reduce anxiety on time-sensitive deliveries. Tax-inclusive routes matter for EU buyers comparing total landed cost.",
        ],
        links: [{ href: "/how-shipping-works", label: "How shipping works" }],
      },
      {
        heading: "Shipping coupons",
        paragraphs: [
          "New registration promos often discount a percentage off international freight — not domestic seller delivery. Activate coupons before paying the parcel invoice. Our coupon hub tracks the current invite tied to shipping benefits.",
        ],
        links: [
          { href: "/boonbuy-coupons", label: "Coupons" },
          { href: "/boonbuy-discount-code", label: "Discount code" },
        ],
      },
      {
        heading: "Dimensional weight",
        paragraphs: [
          "Carriers bill volumetric weight on bulky packages. A puffer jacket can cost like two tees in a small box. Vacuum seal when appropriate; do not crush structured shoes.",
          "Rehearsal shipping — pay for warehouse repack estimates — helps on large mixed hauls if BoonBuy offers it for your account tier.",
        ],
      },
      {
        heading: "Customs and declarations",
        paragraphs: [
          "Honest declarations reduce seizure risk. Under-declaring grail pairs to save duties is a gamble with your money. Read our declare and customs guides for country-specific habits.",
        ],
        links: [
          { href: "/how-to-declare-parcels", label: "Declare parcels" },
          { href: "/how-to-avoid-customs", label: "Avoid customs issues" },
        ],
      },
      {
        heading: "Consolidation strategy",
        paragraphs: [
          "Wait until you have a full box unless you need one item urgently. Single-item international parcels are the most expensive per gram. Balance storage fees at the warehouse against waiting too long during promo expirations.",
        ],
        links: [{ href: "/how-to-save-on-shipping", label: "Save on shipping" }],
      },
    ],
    faqs: buildGuideFaqs("BoonBuy shipping", [
      {
        question: "How long does BoonBuy shipping take?",
        answer: "Depends on line and country — economy can take weeks; express often lands sooner. Tracking updates vary by carrier.",
      },
      {
        question: "Can I ship shoes and clothes together?",
        answer: "Yes in one parcel if line rules allow. Use reinforcement for shoe boxes and check weight estimates before paying.",
      },
    ]),
    relatedLinks: [
      { href: "/boonbuy-coupons", label: "Shipping coupons" },
      { href: "/guides/how-shipping-works-with-agents", label: "Agent shipping guide" },
    ],
    relatedArticleSlugs: ["how-shipping-works", "how-to-save-on-shipping", "boonbuy-discount-code"],
  }),

  "boonbuy-review": page({
    slug: "boonbuy-review",
    category: "brand",
    title: "BoonBuy Review 2026 | Agent Pros, Cons & Verdict",
    metaDescription:
      "Honest BoonBuy review for 2026 — fees, QC, shipping, spreadsheet workflow, and who should use BoonBuy Finds with the agent.",
    badge: "Review",
    h1: "BoonBuy review",
    intro:
      "BoonBuy is a Chinese shopping agent — not a retailer. This review covers how it handles purchases, warehouse QC, international shipping, and how BoonBuy Finds fits in as a discovery layer. Independent opinion for overseas streetwear and sneaker buyers.",
    keywords: ["boonbuy review", "is boonbuy good", "boonbuy agent review"],
    sections: [
      {
        heading: "What BoonBuy does well",
        paragraphs: [
          "Stable paste-link ordering across Taobao, Weidian, and 1688. Mature parcel builder with multiple shipping lines. Regular shipping promotions for new accounts when campaigns run.",
          "Pairs naturally with BoonBuy Finds — searchable catalog, coupon pages, and community channels maintained around BoonBuy checkout links.",
        ],
      },
      {
        heading: "Where buyers complain",
        paragraphs: [
          "Support queues spike during holidays. Shipping lines pause when regulations shift. Listing prices on find sites can drift from live marketplace totals — always confirm in-app before paying.",
          "No agent eliminates customs risk or batch variance. QC photos help but do not replace reading community feedback on batches.",
        ],
      },
      {
        heading: "Fees and transparency",
        paragraphs: [
          "Service fees, payment surcharges, and optional warehouse services add up. Budget 15–25% above raw listing prices for a realistic all-in estimate before international freight.",
        ],
        links: [{ href: "/boonbuy-coupons", label: "Coupons" }],
      },
      {
        heading: "Who should use BoonBuy",
        paragraphs: [
          "Buyers who want BoonBuy Finds discovery, Telegram drops, and a single agent wallet for mixed apparel and sneaker hauls. Switchers from legacy agents who need a modern UI and active shipping promos.",
        ],
        links: [
          { href: "/how-to-use-boonbuy", label: "How to use BoonBuy" },
          { href: "/is-boonbuy-legit", label: "Is BoonBuy legit" },
        ],
      },
      {
        heading: "Verdict",
        paragraphs: [
          "BoonBuy is a top-tier agent choice in 2026 when combined with disciplined QC and smart parcel building. Use BoonBuy Finds to shorten discovery; use BoonBuy to execute. Compare one quoted parcel against any alternative agent before you commit long term.",
        ],
      },
    ],
    faqs: buildGuideFaqs("BoonBuy reviews", [
      {
        question: "Is BoonBuy better than Pandabuy?",
        answer: "Pandabuy's pause pushed many buyers to BoonBuy and other agents. Compare live shipping to your country today — not 2023 threads.",
      },
      {
        question: "Can I trust BoonBuy with expensive items?",
        answer: "Use warehouse QC, insurance if offered, and start with mid-tier purchases to learn support response patterns.",
      },
    ]),
    relatedLinks: [
      { href: "/best-shopping-agent", label: "Best shopping agent" },
      { href: "/boonbuy-vs-other-agents", label: "Compare agents" },
    ],
    relatedArticleSlugs: ["is-boonbuy-legit", "is-boonbuy-safe", "what-is-boonbuy"],
  }),

  "how-to-use-boonbuy": page({
    slug: "how-to-use-boonbuy",
    category: "brand",
    title: "How to Use BoonBuy (2026) | Step-by-Step Guide",
    metaDescription:
      "How to use BoonBuy — register, paste links, pay, review QC photos, build parcels, and ship internationally. Beginner-friendly 2026 walkthrough.",
    badge: "How to",
    h1: "How to use BoonBuy",
    intro:
      "Using BoonBuy means registering an account, funding a wallet, opening agent links from find pages, confirming variants, paying for items, reviewing warehouse QC, and shipping a parcel internationally. Here is that loop with the details beginners miss.",
    keywords: ["how to use boonbuy", "boonbuy guide", "boonbuy tutorial"],
    sections: [
      {
        heading: "Register and claim coupons",
        paragraphs: [
          `Create an account through the official registration URL with invite code ${BOONBUY_INVITE_CODE}. Save shipping promo terms if your registration includes freight discounts.`,
        ],
        links: [{ href: BOONBUY_COUPON_URL, label: "Register" }],
      },
      {
        heading: "Discover products on BoonBuy Finds",
        paragraphs: [
          "Browse categories, brands, or the spreadsheet hub. Open a listing, read notes, check QC references, then click the BoonBuy agent link — not a random search on the marketplace.",
        ],
        links: [
          { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
          { href: "/boonbuy-finds", label: "BoonBuy finds" },
        ],
      },
      {
        heading: "Pay and track warehouse arrival",
        paragraphs: [
          "Match size and color on the BoonBuy screen. Pay with balance or your saved method. Wait for purchased → warehouse status. Domestic seller shipping is the first wait.",
        ],
      },
      {
        heading: "QC then ship",
        paragraphs: [
          "Review warehouse photos critically. Approve or dispute before international freight. Bundle approved items into one parcel when ready.",
        ],
        links: [
          { href: "/boonbuy-qc", label: "QC guide" },
          { href: "/boonbuy-shipping", label: "Shipping" },
        ],
      },
    ],
    faqs: buildGuideFaqs("using BoonBuy"),
    relatedLinks: [
      { href: "/boonbuy-guide", label: "BoonBuy guide" },
      { href: "/guides/beginner-guide-to-boonbuy", label: "Beginner guide" },
    ],
    relatedArticleSlugs: ["what-is-boonbuy", "boonbuy-review", "how-shipping-works"],
    parentCrumb: { label: "Guides", href: "/guides" },
  }),

  "what-is-boonbuy": page({
    slug: "what-is-boonbuy",
    category: "brand",
    title: "What Is BoonBuy? Shopping Agent Explained",
    metaDescription:
      "What is BoonBuy — Chinese shopping agent for Taobao, Weidian, and 1688. How it works for international buyers and how BoonBuy Finds helps you discover products.",
    badge: "Explainer",
    h1: "What is BoonBuy?",
    intro:
      "BoonBuy is a shopping agent that buys from Chinese marketplaces on your behalf, stores goods at a warehouse, photographs them for QC, and ships internationally. It is not a store inventory — every item comes from a third-party seller link you provide or open through an agent URL.",
    keywords: ["what is boonbuy", "boonbuy agent", "boonbuy shopping agent"],
    sections: [
      {
        heading: "Why agents exist",
        paragraphs: [
          "Taobao and Weidian target domestic buyers with local payment and shipping. Overseas cards and addresses generally fail at checkout. Agents bridge that gap legally by purchasing locally and re-exporting to you.",
        ],
        links: [{ href: "/guides/what-is-a-shopping-agent", label: "What is a shopping agent" }],
      },
      {
        heading: "BoonBuy in the ecosystem",
        paragraphs: [
          "BoonBuy competes with Kakobuy, MuleBuy, OopBuy, and others. BoonBuy Finds is independent — we organize spreadsheet finds and link out to BoonBuy for checkout.",
        ],
      },
      {
        heading: "Typical purchase flow",
        paragraphs: [
          "Link → pay → warehouse QC → international parcel. Budget for service fees and freight on top of listing prices.",
        ],
        links: [{ href: "/how-to-use-boonbuy", label: "How to use BoonBuy" }],
      },
    ],
    faqs: buildGuideFaqs("BoonBuy as an agent"),
    relatedLinks: [{ href: "/boonbuy", label: "BoonBuy hub" }],
    relatedArticleSlugs: ["how-to-use-boonbuy", "is-boonbuy-legit", "boonbuy-review"],
  }),

  "is-boonbuy-legit": page({
    slug: "is-boonbuy-legit",
    category: "brand",
    title: "Is BoonBuy Legit? (2026) Safety & Trust Guide",
    metaDescription:
      "Is BoonBuy legit? How to verify the real site, avoid scams, use QC photos, and shop safely through BoonBuy in 2026.",
    badge: "Trust",
    h1: "Is BoonBuy legit?",
    intro:
      "BoonBuy is a widely used shopping agent with real warehouse operations and international shipping volume. Legitimacy questions usually mean: am I on the real site, is my money safe, and will I get my parcel — not whether agents are morally approved.",
    keywords: ["is boonbuy legit", "boonbuy legit", "boonbuy scam"],
    sections: [
      {
        heading: "Verify the real BoonBuy",
        paragraphs: [
          "Bookmark boonbuy.com from official links on our coupon pages. Phishing clones exist — check HTTPS, spelling, and never enter passwords from Telegram DMs.",
        ],
      },
      {
        heading: "How protection works",
        paragraphs: [
          "Warehouse QC is your inspection window. Dispute flawed items before international shipping. After export, fixes are harder and slower.",
        ],
        links: [{ href: "/boonbuy-qc", label: "QC guide" }],
      },
      {
        heading: "Realistic expectations",
        paragraphs: [
          "Agents facilitate purchases from third-party sellers. Batch quality varies. Shipping delays and customs holds happen to every platform.",
        ],
      },
    ],
    faqs: buildGuideFaqs("BoonBuy legitimacy", [
      {
        question: "Is BoonBuy Finds the same company?",
        answer: "No. We are an independent discovery catalog with outbound BoonBuy links.",
      },
    ]),
    relatedLinks: [{ href: "/is-boonbuy-safe", label: "Is BoonBuy safe" }],
    relatedArticleSlugs: ["is-boonbuy-safe", "boonbuy-review", "what-is-boonbuy"],
  }),

  "is-boonbuy-safe": page({
    slug: "is-boonbuy-safe",
    category: "brand",
    title: "Is BoonBuy Safe? Privacy, Payments & QC",
    metaDescription:
      "Is BoonBuy safe for international buyers? Payment tips, account security, QC workflow, and how to reduce risk on your first haul.",
    badge: "Safety",
    h1: "Is BoonBuy safe?",
    intro:
      "Safety with BoonBuy means account security, smart payment habits, mandatory QC, and honest customs declarations — not zero risk. Treat it like any cross-border purchase with a middleman you trust after a test order.",
    keywords: ["is boonbuy safe", "boonbuy safe", "boonbuy security"],
    sections: [
      {
        heading: "Account security",
        paragraphs: [
          "Use a unique password and enable any 2FA BoonBuy offers. Do not share login details in Discord tickets with unverified helpers.",
        ],
      },
      {
        heading: "Payments",
        paragraphs: [
          "Top up what you plan to spend. Understand refund policies before large wallet loads. Card chargebacks do not map cleanly to agent workflows — read terms.",
        ],
      },
      {
        heading: "QC discipline",
        paragraphs: [
          "Approve warehouse photos only when you would keep the item in hand. Shipping flawed goods internationally is how safety feels like loss.",
        ],
      },
      {
        heading: "Customs honesty",
        paragraphs: [
          "Declare plausibly. Extreme under-declaration is a seizure strategy, not a savings hack.",
        ],
        links: [{ href: "/how-to-declare-parcels", label: "Declarations" }],
      },
    ],
    faqs: buildGuideFaqs("BoonBuy safety"),
    relatedLinks: [{ href: "/is-boonbuy-legit", label: "Is BoonBuy legit" }],
    relatedArticleSlugs: ["is-boonbuy-legit", "boonbuy-review", "how-to-avoid-customs"],
  }),
};
