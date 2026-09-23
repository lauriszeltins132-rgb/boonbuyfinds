import type { Metadata } from "next";
import Link from "next/link";
import CategoryBrandGrid from "@/components/CategoryBrandGrid";
import SchemaScript from "@/components/SchemaScript";
import { getCategoriesHubMetadataCopy } from "@/lib/metadata-copy";
import { getCategories } from "@/lib/products";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildItemListSchema,
} from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

const categoriesHubMeta = getCategoriesHubMetadataCopy();
const path = "/categories";

export const metadata: Metadata = buildPageMetadata({
  title: categoriesHubMeta.title,
  description: categoriesHubMeta.description,
  path,
});

export default function CategoriesPage() {
  const categories = getCategories();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Categories" },
  ];

  return (
    <>
      <SchemaScript
        data={[
          buildBreadcrumbSchema(breadcrumbs, path),
          buildCollectionPageSchema({
            name: "BoonBuy Finds Categories",
            description: categoriesHubMeta.description,
            path,
            numberOfItems: categories.length,
          }),
          buildItemListSchema({
            name: "BoonBuy Finds category directory",
            description: categoriesHubMeta.description,
            path,
            items: categories.slice(0, 24).map((category, index) => ({
              name: category.name,
              url: `/categories/${category.slug}`,
              position: index + 1,
            })),
          }),
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CategoryBrandGrid
          title="Categories"
          subtitle="Browse BoonBuy Finds by category — sneakers, hoodies, jackets, bags, and more — then open brands, QC, coupons, or the spreadsheet hub when you know what you need."
          items={categories}
        />
        <nav
          aria-label="Related authority hubs"
          className="mt-8 flex flex-wrap gap-2"
        >
          {[
            { href: "/boonbuy", label: "What is BoonBuy?" },
            { href: "/boonbuy-coupons", label: "BoonBuy coupons" },
            { href: "/boonbuy-spreadsheet", label: "Spreadsheet" },
            { href: "/best-boonbuy-finds", label: "Best finds" },
            { href: "/finds", label: "Browse finds" },
            { href: "/boonbuy-finds", label: "BoonBuy finds" },
            { href: "/brands", label: "Brands" },
            { href: "/boonbuy-qc", label: "QC photos" },
            { href: "/latest-finds", label: "Latest finds" },
            { href: "/trending", label: "Trending" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:border-accent/40 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
