import { createAgentLandingPage } from "@/lib/agent-landing-page";

const { generateMetadata, Page } = createAgentLandingPage("litbuy-finds");

export { generateMetadata };
export default Page;
