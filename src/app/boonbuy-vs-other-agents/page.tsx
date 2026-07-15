import { getStaticPageMetadata, StaticPageView } from "@/lib/create-static-page";

export const metadata = getStaticPageMetadata("boonbuy-vs-other-agents")!;

export default function LitbuyVsOtherAgentsPage() {
  return <StaticPageView slug="boonbuy-vs-other-agents" />;
}
