import type { Metadata } from "next";
import { StaticPageView, getStaticPageMetadata } from "@/lib/create-static-page";

export async function generateMetadata(): Promise<Metadata> {
  return getStaticPageMetadata("editorial-policy")!;
}

export default function EditorialPolicyPage() {
  return <StaticPageView slug="editorial-policy" />;
}
