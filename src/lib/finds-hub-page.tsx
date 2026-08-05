import type { Metadata } from "next";
import FindsHubLanding from "@/components/FindsHubLanding";
import { getFindsHubPage } from "@/lib/finds-hub-pages";
import { buildPageMetadata } from "@/lib/seo";

function requireFindsHub(slug: string) {
  const config = getFindsHubPage(slug);
  if (!config) {
    throw new Error(`Unknown finds hub: ${slug}`);
  }
  return config;
}

function datedTitle(base: string): string {
  const now = new Date();
  const label = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${base} | ${label}`;
}

export function createFindsHubPage(slug: string) {
  const config = requireFindsHub(slug);

  async function generateMetadata(): Promise<Metadata> {
    const title = config.dateInMeta ? datedTitle(config.title) : config.title;
    const description = config.dateInMeta
      ? `${config.metaDescription} Updated ${new Date().toISOString().slice(0, 10)}.`
      : config.metaDescription;

    return buildPageMetadata({
      title,
      description,
      path: config.path,
    });
  }

  function Page() {
    return <FindsHubLanding config={config} />;
  }

  return { generateMetadata, Page };
}
