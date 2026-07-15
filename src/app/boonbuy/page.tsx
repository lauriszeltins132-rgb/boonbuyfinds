import type { Metadata } from "next";
import { StaticPageView, getStaticPageMetadata } from "@/lib/create-static-page";

export async function generateMetadata(): Promise<Metadata> {
  return getStaticPageMetadata("boonbuy")!;
}

export default function BoonBuyHubPage() {
  return <StaticPageView slug="boonbuy" />;
}
