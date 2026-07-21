import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoArticleLayout from "@/components/SeoArticleLayout";
import { getSeoArchitectureContentDates } from "@/lib/seo-architecture/dates";
import { getSeoArchitecturePage } from "@/lib/seo-architecture/registry";
import { buildArticlePageMetadata } from "@/lib/seo";

export function createSeoArchitecturePage(slug: string) {
  async function generateMetadata(): Promise<Metadata> {
    const page = getSeoArchitecturePage(slug);
    if (!page) return { title: "Not found" };

    const dates = getSeoArchitectureContentDates(slug);

    return buildArticlePageMetadata({
      title: page.title,
      description: page.metaDescription,
      path: page.path,
      publishedTime: dates.publishedIso,
      modifiedTime: dates.updatedIso,
    });
  }

  function Page() {
    const page = getSeoArchitecturePage(slug);
    if (!page) notFound();
    return <SeoArticleLayout page={page} />;
  }

  return { generateMetadata, Page };
}
