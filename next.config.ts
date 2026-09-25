import type { NextConfig } from "next";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

type VanityRegistry = {
  marketing?: Record<string, string>;
  categories?: Record<string, string>;
  collections?: Record<string, string>;
  brands?: Record<string, string>;
  brandAliases?: Record<string, string>;
  reserved?: string[];
};

function loadVanityRegistry(): VanityRegistry {
  try {
    return require("./src/data/vanity-registry.json") as VanityRegistry;
  } catch {
    return {};
  }
}

const vanity = loadVanityRegistry();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  staticPageGenerationTimeout: 300,
  experimental: {
    optimizePackageImports: ["ai", "@ai-sdk/react", "zod"],
  },
  async redirects() {
    const marketingHosts = ["boonbuys.com", "www.boonbuys.com"] as const;

    /** Short marketing paths → clean canonical hubs on boonbuyfinds.net */
    const shortMarketingPaths: Array<{ source: string; destination: string }> = [
      { source: "/coupon", destination: "/boonbuy-coupons" },
      { source: "/coupons", destination: "/boonbuy-coupons" },
      { source: "/coupon-code", destination: "/boonbuy-coupons" },
      { source: "/promo", destination: "/boonbuy-coupons" },
      { source: "/promo-code", destination: "/boonbuy-coupons" },
      { source: "/discount", destination: "/boonbuy-coupons" },
      { source: "/discount-code", destination: "/boonbuy-coupons" },
      { source: "/finds", destination: "/boonbuy-finds" },
      { source: "/spreadsheet", destination: "/boonbuy-spreadsheet" },
      { source: "/qc", destination: "/boonbuy-qc" },
      { source: "/shipping", destination: "/boonbuy-shipping" },
      { source: "/review", destination: "/boonbuy-review" },
      { source: "/legit", destination: "/is-boonbuy-legit" },
    ];

    const categoryShortcuts: Array<{ source: string; destination: string }> = Object.entries(
      vanity.categories ?? {
        sneakers: "/categories/shoes",
        hoodies: "/categories/hoodies",
        jackets: "/categories/jackets",
        bags: "/categories/bags",
        accessories: "/categories/accessories",
        jerseys: "/best-jerseys",
      }
    ).map(([slug, destination]) => ({ source: `/${slug}`, destination }));

    const collectionShortcuts: Array<{ source: string; destination: string }> = Object.entries(
      vanity.collections ?? {
        trending: "/trending",
        latest: "/latest-finds",
        under50: "/best-under-50",
        "nike-finds": "/collections/best-nike-finds",
        "moncler-finds": "/collections/best-moncler-finds",
      }
    ).map(([slug, destination]) => ({ source: `/${slug}`, destination }));

    // Dynamic brand short aliases from catalog registry (indexable only).
    const brandShortcuts: Array<{ source: string; destination: string }> = [];
    const brandSeen = new Set<string>();
    for (const [alias, canonical] of Object.entries(vanity.brandAliases ?? {})) {
      if (brandSeen.has(alias)) continue;
      brandSeen.add(alias);
      brandShortcuts.push({ source: `/${alias}`, destination: `/brands/${canonical}` });
    }
    for (const slug of Object.keys(vanity.brands ?? {})) {
      if (brandSeen.has(slug)) continue;
      brandSeen.add(slug);
      brandShortcuts.push({ source: `/${slug}`, destination: `/brands/${slug}` });
    }

    // Brand slug aliases under /brands/{alias}
    const brandPathAliases: Array<{ source: string; destination: string }> = Object.entries(
      vanity.brandAliases ?? {}
    )
      .filter(([alias, canonical]) => alias !== canonical)
      .map(([alias, canonical]) => ({
        source: `/brands/${alias}`,
        destination: `/brands/${canonical}`,
      }));

    const hostRemaps = marketingHosts.flatMap((host) =>
      [
        ...shortMarketingPaths,
        ...categoryShortcuts,
        ...collectionShortcuts,
        ...brandShortcuts,
      ].map(({ source, destination }) => ({
        source,
        has: [{ type: "host" as const, value: host }],
        destination: `https://boonbuyfinds.net${destination}`,
        permanent: true,
      }))
    );

    return [
      // One-hop remaps from boonbuys.com short URLs → canonical hubs
      ...hostRemaps,

      {
        source: "/:path*",
        has: [{ type: "host", value: "boonbuys.com" }],
        destination: "https://boonbuyfinds.net/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.boonbuys.com" }],
        destination: "https://boonbuyfinds.net/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.boonbuyfinds.net" }],
        destination: "https://boonbuyfinds.net/:path*",
        permanent: true,
      },

      // Same short aliases on the primary domain (skip identity paths like /trending → /trending)
      ...[
        ...shortMarketingPaths,
        ...categoryShortcuts,
        ...collectionShortcuts,
        ...brandShortcuts,
        ...brandPathAliases,
      ]
        .filter(({ source, destination }) => source !== destination)
        .map(({ source, destination }) => ({
          source,
          destination,
          permanent: true,
        })),

      {
        source: "/guides/why-use-an-agent",
        destination: "/guides/why-use-a-shopping-agent",
        permanent: true,
      },
      {
        source: "/guides/how-to-order",
        destination: "/guides/how-to-order-from-boonbuy",
        permanent: true,
      },
      {
        source: "/guides/how-to-find-products",
        destination: "/how-to-use-boonbuy",
        permanent: true,
      },
      {
        source: "/guides/shipping-and-hauls",
        destination: "/guides/how-shipping-works-with-agents",
        permanent: true,
      },
      {
        source: "/guides/boonbuy-spreadsheet-guide",
        destination: "/guides/boonbuy-spreadsheet",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      { source: "/category/:slug", destination: "/categories/:slug", permanent: true },
      { source: "/best-boonbuy-sneakers", destination: "/boonbuy-sneakers", permanent: true },
      { source: "/best-boonbuy-jackets", destination: "/boonbuy-jackets", permanent: true },
      {
        source: "/best-boonbuy-accessories",
        destination: "/best-boonbuy-accessories-2026",
        permanent: true,
      },
      { source: "/best-boonbuy-bags", destination: "/best-boonbuy-bags-2026", permanent: true },
      { source: "/best-boonbuy-under-50", destination: "/best-under-50", permanent: true },
      { source: "/best-qc-finds", destination: "/top-qc-finds", permanent: true },
      // Single-hop to the live architecture guide (avoid /guides/how-to-use-boonbuy-finds chain).
      { source: "/guides/how-to-use-boonbuy", destination: "/how-to-use-boonbuy", permanent: true },
      { source: "/guides/how-to-use-boonbuy-finds", destination: "/what-is-boonbuy-finds", permanent: true },
      {
        source: "/guides/how-to-qc-photos-work",
        destination: "/guides/how-to-check-qc-photos",
        permanent: true,
      },
      {
        source: "/guides/how-to-reduce-shipping-cost",
        destination: "/guides/how-shipping-works-with-agents",
        permanent: true,
      },
      {
        source: "/guides/best-shipping-line",
        destination: "/guides/how-shipping-works-with-agents",
        permanent: true,
      },
      { source: "/guides/beginner-guide", destination: "/guides/beginner-guide-to-boonbuy", permanent: true },
      { source: "/guides/qc-guide", destination: "/guides/how-to-check-qc-photos", permanent: true },
      {
        source: "/guides/shipping-guide",
        destination: "/guides/how-shipping-works-with-agents",
        permanent: true,
      },
      { source: "/guides/weidian-guide", destination: "/guides/how-to-buy-from-weidian", permanent: true },
      { source: "/guides/boonbuy-spreadsheet", destination: "/boonbuy-spreadsheet", permanent: true },
      // Discord removed — consolidate community equity onto Telegram hubs.
      { source: "/boonbuy-discord", destination: "/boonbuy-telegram", permanent: true },
      { source: "/discord-boonbuy", destination: "/boonbuy-telegram", permanent: true },
      { source: "/discord-mulebuy", destination: "/telegram-mulebuy", permanent: true },
      { source: "/discord-hipobuy", destination: "/telegram-hipobuy", permanent: true },
      { source: "/discord-oopbuy", destination: "/telegram-oopbuy", permanent: true },
      { source: "/discord-kakobuy", destination: "/telegram-kakobuy", permanent: true },
      { source: "/telegram-boonbuy", destination: "/boonbuy-telegram", permanent: true },
      { source: "/qc-photos", destination: "/boonbuy-qc", permanent: true },
      { source: "/boonbuy-qc-photos", destination: "/boonbuy-qc", permanent: true },
      { source: "/browse-finds", destination: "/boonbuy-finds", permanent: true },
      { source: "/all-finds", destination: "/boonbuy-finds", permanent: true },
      { source: "/reps-finds", destination: "/rep-finds", permanent: true },
      { source: "/repfinds", destination: "/rep-finds", permanent: true },
      { source: "/guides/how-to-buy-from-taobao", destination: "/how-to-buy-from-taobao", permanent: true },
      { source: "/guides/how-to-buy-from-weidian", destination: "/how-to-buy-from-weidian", permanent: true },
      { source: "/guides/what-is-boonbuy", destination: "/what-is-boonbuy", permanent: true },
      { source: "/boonbuyfids", destination: "/", permanent: true },
      { source: "/boonbuyfind", destination: "/", permanent: true },
      { source: "/boonbuy-find", destination: "/", permanent: true },
      {
        source: "/boonbuy-finds-spreadsheet",
        destination: "/boonbuy-spreadsheet",
        permanent: true,
      },
      {
        source: "/boonbuyfinds-spreadsheet",
        destination: "/boonbuy-spreadsheet",
        permanent: true,
      },
      { source: "/collections/best-nike-boonbuy-finds", destination: "/collections/best-nike-finds", permanent: true },
      { source: "/collections/best-jordan-boonbuy-finds", destination: "/collections/best-jordan-finds", permanent: true },
      { source: "/collections/best-moncler-boonbuy-finds", destination: "/collections/best-moncler-finds", permanent: true },
      { source: "/collections/best-stussy-boonbuy-finds", destination: "/collections/best-stussy-finds", permanent: true },
      { source: "/collections/best-sneaker-finds", destination: "/collections/best-sneakers", permanent: true },
      { source: "/collections/best-jacket-finds", destination: "/collections/best-jackets", permanent: true },
      { source: "/collections/best-hoodie-finds", destination: "/collections/best-hoodies", permanent: true },
      { source: "/collections/best-bag-finds", destination: "/collections/best-bags", permanent: true },
      { source: "/collections/best-finds-under-50", destination: "/collections/best-under-50", permanent: true },
      { source: "/mulebuy-telegram", destination: "/telegram-mulebuy", permanent: true },
      { source: "/oopbuy-telegram", destination: "/telegram-oopbuy", permanent: true },
      { source: "/kakobuy-telegram", destination: "/telegram-kakobuy", permanent: true },
      { source: "/boonbuy-ai", destination: "/ai", permanent: true },
      { source: "/warehouse", destination: "/boonbuy-warehouse", permanent: true },
      { source: "/returns", destination: "/boonbuy-returns", permanent: true },
      { source: "/payment", destination: "/boonbuy-payment", permanent: true },
      { source: "/best-tech", destination: "/best-boonbuy-tech", permanent: true },
      { source: "/boonbuy-tech", destination: "/best-boonbuy-tech", permanent: true },
      // /jerseys handled by categoryShortcuts → /best-jerseys
      { source: "/best-boonbuy-jerseys", destination: "/best-jerseys", permanent: true },
      { source: "/best-boonbuy-shoes", destination: "/best-shoes", permanent: true },
      { source: "/best-boonbuy-watches", destination: "/best-watches", permanent: true },
      { source: "/referral-code", destination: "/boonbuy-referral-code", permanent: true },
      { source: "/boonbuy-referral", destination: "/boonbuy-referral-code", permanent: true },
      // Consolidate parallel freshness / engagement URLs onto canonical hubs.
      { source: "/new-finds", destination: "/latest-finds", permanent: true },
      // /latest handled by collectionShortcuts → /latest-finds
      { source: "/most-saved", destination: "/most-saved-finds", permanent: true },
      { source: "/most-viewed", destination: "/most-viewed-finds", permanent: true },
      { source: "/summer", destination: "/summer-finds", permanent: true },
      { source: "/winter", destination: "/winter-finds", permanent: true },
      { source: "/monthly-highlights", destination: "/best-finds-this-month", permanent: true },
      // LitBuy-style vocabulary aliases for adjacent best-of routes (optional equity).
      { source: "/best-sneaker-finds", destination: "/sneaker-finds", permanent: true },
      { source: "/best-hoodie-finds", destination: "/hoodie-finds", permanent: true },
      { source: "/best-jacket-finds", destination: "/jacket-finds", permanent: true },
      { source: "/best-bag-finds", destination: "/bag-finds", permanent: true },
      // nike-finds / jordan-finds handled by collectionShortcuts → /collections/best-*-finds
      // Q&A intent aliases — consolidate onto strong canons.
      { source: "/is-boonbuy-trustworthy", destination: "/is-boonbuy-legit", permanent: true },
      { source: "/boonbuy-alternatives", destination: "/best-shopping-agent", permanent: true },
      { source: "/boonbuy-faq", destination: "/boonbuy-questions", permanent: true },
      { source: "/boonbuy-q-and-a", destination: "/boonbuy-questions", permanent: true },
      { source: "/is-boonbuy-a-shopping-agent", destination: "/what-is-boonbuy", permanent: true },
      { source: "/how-does-boonbuy-work", destination: "/guides/how-boonbuy-works", permanent: true },
      { source: "/how-to-find-products-on-boonbuy", destination: "/boonbuy-finds", permanent: true },
      { source: "/how-to-find-cheaper-products", destination: "/ai", permanent: true },
      { source: "/how-to-compare-boonbuy-products", destination: "/ai", permanent: true },
      // Thin BoonBuy coupon variants → primary coupon hub (keep shipping-coupon separate).
      { source: "/boonbuy-coupon", destination: "/boonbuy-coupons", permanent: true },
      { source: "/boonbuy-coupon-code", destination: "/boonbuy-coupons", permanent: true },
      { source: "/boonbuy-coupons-2026", destination: "/boonbuy-coupons", permanent: true },
      { source: "/boonbuy-discount", destination: "/boonbuy-coupons", permanent: true },
      { source: "/boonbuy-discount-code", destination: "/boonbuy-coupons", permanent: true },
      { source: "/boonbuy-deals", destination: "/boonbuy-coupons", permanent: true },
      { source: "/boonbuy-promo", destination: "/boonbuy-coupons", permanent: true },
      { source: "/boonbuy-promo-code", destination: "/boonbuy-coupons", permanent: true },
      { source: "/best-boonbuy-coupon", destination: "/boonbuy-coupons", permanent: true },
      { source: "/best-boonbuy-coupons", destination: "/boonbuy-coupons", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "postimg.cc" },
      { protocol: "https", hostname: "i.postimages.org" },
      { protocol: "https", hostname: "postimages.org" },
      { protocol: "https", hostname: "si.geilicdn.com" },
      { protocol: "https", hostname: "**.geilicdn.com" },
      { protocol: "https", hostname: "cbu01.alicdn.com" },
      { protocol: "https", hostname: "img.alicdn.com" },
      { protocol: "https", hostname: "ae01.alicdn.com" },
      { protocol: "https", hostname: "sc04.alicdn.com" },
      { protocol: "https", hostname: "gd4.alicdn.com" },
      { protocol: "https", hostname: "**.alicdn.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384, 512, 640],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value:
              "<https://i.postimg.cc>; rel=preconnect, <https://si.geilicdn.com>; rel=preconnect, <https://cbu01.alicdn.com>; rel=preconnect",
          },
        ],
      },
      {
        source: "/cdn/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/processed/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
