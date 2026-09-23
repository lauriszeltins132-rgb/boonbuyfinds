import type { MetadataRoute } from "next";
import { CATEGORY_ALIAS_SLUGS } from "@/lib/category-aliases";
import { COLLECTION_SLUGS, COLLECTIONS } from "@/lib/collections";
import { getBrandsFromProducts } from "@/lib/brands";
import { getCategories, getAllProducts } from "@/lib/products";
import { getAllProductSlugs } from "@/lib/slugs";
import { GUIDE_SLUGS, GUIDES_HUB, GUIDE_PAGES } from "@/lib/guides";
import { SEO_LIST_SLUGS, SEO_LIST_ROUTES } from "@/lib/seo-list-routes";
import { STATIC_PAGES } from "@/lib/static-pages";
import { SHARE_COLLECTION_SLUGS, SHARE_COLLECTIONS } from "@/lib/share-collections";
import { BEST_OF_PAGES, BEST_OF_SLUGS } from "@/lib/best-of-pages";
import { FINDS_HUB_PAGES, FINDS_HUB_SLUGS } from "@/lib/finds-hub-pages";
import { SEO_LANDING_PAGES, SEO_LANDING_SLUGS } from "@/lib/seo-landing-pages";
import {
  getPublishedSeoLandingConfigs,
  getSitemapChangeFrequency,
} from "@/lib/seo-landing-engine";
import { AGENT_LANDING_SLUGS } from "@/lib/agent-landing-pages";
import {
  AGENT_COUPON_LANDING_PAGES,
  AGENT_COUPON_LANDING_SLUGS,
  isPrimaryCouponLandingSlug,
} from "@/lib/agent-coupon-landing-pages";
import {
  TELEGRAM_AGENT_LANDING_PAGES,
  TELEGRAM_AGENT_LANDING_SLUGS,
} from "@/lib/telegram-agent-landing-pages";
import {
  TELEGRAM_SEO_PAGES,
  TELEGRAM_SEO_SLUGS,
} from "@/lib/telegram-seo-pages";
import { ADVERTISE_PAGE_PATH } from "@/lib/advertise-page";
import {
  SEO_ARCHITECTURE_PAGES,
  SEO_ARCHITECTURE_SLUGS,
} from "@/lib/seo-architecture/registry";
import { getDatasetSyncedAt } from "@/lib/catalog-meta";
import { SITE_URL } from "@/lib/site";

/** Keep sitemap fresh as catalog quality gates change. */
export const revalidate = 3600;

function entry(
  pathOrUrl: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  lastModified: Date = getDatasetSyncedAt()
): MetadataRoute.Sitemap[number] {
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
  return { url, lastModified, changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getCategories();
  const brands = getBrandsFromProducts(getAllProducts());
  const productSlugs = getAllProductSlugs();
  const synced = getDatasetSyncedAt();

  const routes: MetadataRoute.Sitemap = [
    entry("/", "daily", 1, synced),
    entry("/boonbuy", "weekly", 0.99, synced),
    entry("/finds", "daily", 0.98, synced),
    entry("/boonbuy-finds", "daily", 0.97, synced),
    entry("/boonbuy-spreadsheet", "weekly", 0.96, synced),
    entry("/boonbuy-coupons", "weekly", 0.98, synced),
    entry("/boonbuy-deals", "weekly", 0.95, synced),
    entry("/boonbuy-discount-code", "weekly", 0.93, synced),
    entry("/latest-finds", "daily", 0.95, synced),
    entry("/rep-finds", "daily", 0.94, synced),
    entry("/boonbuy-qc", "weekly", 0.93, synced),
    entry("/boonbuy-telegram", "weekly", 0.92, synced),
    entry("/boonbuy-questions", "weekly", 0.94, synced),
    entry("/best-boonbuy-finds", "daily", 0.93, synced),
    entry("/trending-boonbuy-finds", "daily", 0.92, synced),
    entry("/ai", "weekly", 0.9, synced),
    entry("/trending", "daily", 0.9, synced),
    entry("/deals", "daily", 0.9, synced),
    entry("/recently-added", "daily", 0.92, synced),
    entry("/brands", "weekly", 0.85, synced),
    entry("/categories", "weekly", 0.85, synced),
    entry("/collections", "weekly", 0.88, synced),
    entry("/best-finds-by-category", "weekly", 0.85, synced),
    entry(GUIDES_HUB.path, "weekly", 0.9, synced),
  ];

  for (const slug of GUIDE_SLUGS) {
    const guide = GUIDE_PAGES[slug];
    routes.push(entry(guide.path, "monthly", 0.86, synced));
  }

  for (const slug of SEO_LIST_SLUGS) {
    const list = SEO_LIST_ROUTES[slug];
    routes.push(entry(list.path, "weekly", 0.84, synced));
  }

  for (const slug of SEO_LANDING_SLUGS) {
    const page = SEO_LANDING_PAGES[slug];
    // Authority hubs already listed above with higher priority.
    if (
      page.path === "/boonbuy-finds" ||
      page.path === "/boonbuy-spreadsheet" ||
      page.path === "/boonbuy-qc" ||
      page.path === "/best-boonbuy-finds" ||
      page.path === "/trending-boonbuy-finds"
    ) {
      continue;
    }
    routes.push(entry(page.path, "weekly", 0.88, synced));
  }

  for (const configEntry of getPublishedSeoLandingConfigs()) {
    routes.push(
      entry(
        `/${configEntry.slug}`,
        getSitemapChangeFrequency(configEntry),
        configEntry.type === "freshness" ? 0.9 : 0.87,
        synced
      )
    );
  }

  for (const slug of AGENT_LANDING_SLUGS) {
    routes.push(entry(`/${slug}`, "weekly", 0.86, synced));
  }

  // Only primary coupon hubs — variants canonicalize elsewhere (doorway mitigation).
  // BoonBuy coupons already listed above at authority priority.
  for (const slug of AGENT_COUPON_LANDING_SLUGS) {
    if (!isPrimaryCouponLandingSlug(slug)) continue;
    if (slug === "boonbuy-coupons") continue;
    const page = AGENT_COUPON_LANDING_PAGES[slug];
    routes.push(entry(page.path, "weekly", 0.9, synced));
  }

  // Skip BoonBuy telegram agent-landing alias — it 301s to the architecture canon.
  const REDIRECTED_COMMUNITY_LANDINGS = new Set([
    "telegram-boonbuy",
  ]);

  for (const slug of TELEGRAM_AGENT_LANDING_SLUGS) {
    if (REDIRECTED_COMMUNITY_LANDINGS.has(slug)) continue;
    const page = TELEGRAM_AGENT_LANDING_PAGES[slug];
    routes.push(entry(page.path, "weekly", 0.9, synced));
  }

  for (const slug of TELEGRAM_SEO_SLUGS) {
    const page = TELEGRAM_SEO_PAGES[slug];
    routes.push(entry(page.path, "weekly", 0.82, synced));
  }

  routes.push(entry(ADVERTISE_PAGE_PATH, "monthly", 0.7, synced));

  for (const slug of BEST_OF_SLUGS) {
    const page = BEST_OF_PAGES[slug];
    routes.push(entry(page.path, "daily", 0.9, synced));
  }

  for (const slug of FINDS_HUB_SLUGS) {
    const page = FINDS_HUB_PAGES[slug];
    // Authority finds hubs already listed with tiered priority above.
    if (
      page.path === "/finds" ||
      page.path === "/latest-finds" ||
      page.path === "/rep-finds"
    ) {
      continue;
    }
    routes.push(entry(page.path, "daily", 0.92, synced));
  }

  const highPriorityGuides = new Set([
    "/how-to-buy",
    "/new-user-guide",
    "/best-rep-sneakers",
    "/best-budget-finds",
    "/boonbuy-vs-other-agents",
  ]);

  for (const page of Object.values(STATIC_PAGES)) {
    routes.push(
      entry(page.path, "monthly", highPriorityGuides.has(page.path) ? 0.85 : 0.75, synced)
    );
  }

  for (const slug of COLLECTION_SLUGS) {
    const collection = COLLECTIONS[slug];
    // /new-finds redirects to /latest — skip duplicate sitemap URL.
    if (
      collection.href === "/trending" ||
      collection.href === "/deals" ||
      collection.href === "/new-finds"
    ) {
      continue;
    }
    routes.push(entry(collection.href, "daily", 0.88, synced));
  }

  for (const category of categories) {
    if (category.group === "category") {
      routes.push(entry(`/categories/${category.slug}`, "weekly", 0.8, synced));
    }
  }

  for (const slug of CATEGORY_ALIAS_SLUGS) {
    routes.push(entry(`/categories/${slug}`, "weekly", 0.82, synced));
  }

  for (const brand of brands) {
    routes.push(entry(`/brands/${brand.slug}`, "weekly", 0.75, synced));
  }

  for (const slug of SHARE_COLLECTION_SLUGS) {
    const collection = SHARE_COLLECTIONS[slug];
    routes.push(entry(collection.path, "weekly", 0.87, synced));
  }

  for (const slug of productSlugs) {
    routes.push(entry(`/find/${slug}`, "weekly", 0.6, synced));
  }

  for (const slug of SEO_ARCHITECTURE_SLUGS) {
    const page = SEO_ARCHITECTURE_PAGES[slug];
    // Community canons + consolidated entity aliases already listed above.
    if (
      page.path === "/boonbuy-telegram" ||
      page.path === "/boonbuy-discord" ||
      page.path === "/boonbuy" ||
      page.path === "/boonbuy-coupons" ||
      slug === "what-is-boonbuy"
    ) {
      continue;
    }
    routes.push(
      entry(page.path, "weekly", page.category === "comparison" ? 0.88 : 0.86, synced)
    );
  }

  routes.push(entry("/feed.xml", "daily", 0.5, synced));

  const seen = new Set<string>();
  return routes.filter((route) => {
    if (seen.has(route.url)) return false;
    seen.add(route.url);
    return true;
  });
}
