import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BoonBuyAuthorityHub from "@/components/BoonBuyAuthorityHub";
import { getAuthorityHub } from "@/lib/boonbuy-authority-hubs";
import { SITE_NAME } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

export function createAuthorityHubPage(slug: string) {
  const config = getAuthorityHub(slug);
  if (!config) {
    throw new Error(`Unknown authority hub: ${slug}`);
  }

  const canonical = `${SITE_URL}${config.path}`;

  async function generateMetadata(): Promise<Metadata> {
    return {
      title: { absolute: config!.title },
      description: config!.metaDescription,
      alternates: { canonical },
      robots: { index: true, follow: true },
      keywords: [...config!.keywords],
      openGraph: {
        title: config!.title,
        description: config!.metaDescription,
        url: canonical,
        siteName: SITE_NAME,
        type: "website",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: config!.title,
        description: config!.metaDescription,
      },
    };
  }

  function Page() {
    const hub = getAuthorityHub(slug);
    if (!hub) notFound();
    return <BoonBuyAuthorityHub config={hub} />;
  }

  return { generateMetadata, Page };
}
