import { createSeoLandingPage } from "@/lib/seo-landing-page";

const { generateMetadata, Page } = createSeoLandingPage("boonbuy-products");

export { generateMetadata };
export default Page;
