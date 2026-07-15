import { createSeoLandingPage } from "@/lib/seo-landing-page";

const { generateMetadata, Page } = createSeoLandingPage("boonbuy-guide");

export { generateMetadata };
export default Page;
