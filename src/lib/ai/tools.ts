import { tool } from "ai";
import { z } from "zod";
import {
  buildHaulInputSchema,
  compareProductsInputSchema,
  findSimilarInputSchema,
  getPriceRangeInputSchema,
  getProductDetailsInputSchema,
  getTrendingInputSchema,
  searchProductsInputSchema,
} from "@/lib/ai/schemas";
import {
  buildHaulFromCatalog,
  compareCatalogProducts,
  findSimilarProducts,
  getCatalogCategoryStats,
  getObservedPriceRange,
  getPublicProductByIdOrSlug,
  getTrendingPublicProducts,
  searchCatalog,
} from "@/lib/ai/product-search";

export function createBoonBuyAiTools() {
  return {
    searchProducts: tool({
      description:
        "Search the BoonBuy Finds catalogue with filters. Returns only real products.",
      inputSchema: searchProductsInputSchema,
      execute: async (input) => searchCatalog(input),
    }),

    getProductDetails: tool({
      description: "Get one verified product by id or slug.",
      inputSchema: getProductDetailsInputSchema,
      execute: async ({ productId, slug }) => {
        const product = getPublicProductByIdOrSlug(productId, slug);
        if (!product) return { found: false, product: null };
        return { found: true, product };
      },
    }),

    findSimilarProducts: tool({
      description:
        "Find similar or cheaper catalogue alternatives to a product id.",
      inputSchema: findSimilarInputSchema,
      execute: async (input) => findSimilarProducts(input),
    }),

    compareProducts: tool({
      description: "Compare 2–4 real catalogue products using available fields only.",
      inputSchema: compareProductsInputSchema,
      execute: async ({ productIds }) => compareCatalogProducts(productIds),
    }),

    buildHaul: tool({
      description:
        "Build a budget haul/outfit from real catalogue products. Totals are calculated in code.",
      inputSchema: buildHaulInputSchema,
      execute: async (input) => buildHaulFromCatalog(input),
    }),

    getTrendingProducts: tool({
      description: "Return trending catalogue products.",
      inputSchema: getTrendingInputSchema,
      execute: async ({ category, limit }) => ({
        products: getTrendingPublicProducts(category, limit),
      }),
    }),

    getCategories: tool({
      description: "List valid categories with counts and price ranges.",
      inputSchema: z.object({}),
      execute: async () => ({ categories: getCatalogCategoryStats() }),
    }),

    getPriceRange: tool({
      description: "Observed catalogue price range for a query or category.",
      inputSchema: getPriceRangeInputSchema,
      execute: async ({ query, category }) =>
        getObservedPriceRange(query, category),
    }),
  };
}

export type BoonBuyAiTools = ReturnType<typeof createBoonBuyAiTools>;
