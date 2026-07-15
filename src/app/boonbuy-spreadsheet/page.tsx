import { createSeoLandingPage } from "@/lib/seo-landing-page";

const { generateMetadata, Page } = createSeoLandingPage("boonbuy-spreadsheet");

export { generateMetadata };
export default Page;
