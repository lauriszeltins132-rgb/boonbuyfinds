import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  staticPageGenerationTimeout: 300,
  async redirects() {
    return [
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
        destination: "/guides/how-to-use-boonbuy-finds",
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
      { source: "/guides/how-to-use-boonbuy", destination: "/guides/how-to-use-boonbuy-finds", permanent: true },
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
      { source: "/discord-boonbuy", destination: "/boonbuy-discord", permanent: true },
      { source: "/telegram-boonbuy", destination: "/boonbuy-telegram", permanent: true },
      { source: "/guides/how-to-buy-from-taobao", destination: "/how-to-buy-from-taobao", permanent: true },
      { source: "/guides/how-to-buy-from-weidian", destination: "/how-to-buy-from-weidian", permanent: true },
      { source: "/guides/what-is-boonbuy", destination: "/what-is-boonbuy", permanent: true },
      { source: "/guides/how-to-use-boonbuy-finds", destination: "/how-to-use-boonbuy", permanent: true },
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
      { source: "/boonbuy-telegram", destination: "/telegram-boonbuy", permanent: true },
      { source: "/mulebuy-telegram", destination: "/telegram-mulebuy", permanent: true },
      { source: "/oopbuy-telegram", destination: "/telegram-oopbuy", permanent: true },
      { source: "/kakobuy-telegram", destination: "/telegram-kakobuy", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "si.geilicdn.com" },
      { protocol: "https", hostname: "cbu01.alicdn.com" },
      { protocol: "https", hostname: "**.alicdn.com" },
      { protocol: "https", hostname: "**.geilicdn.com" },
    ],
    formats: ["image/avif", "image/webp"],
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
    ];
  },
};

export default nextConfig;
