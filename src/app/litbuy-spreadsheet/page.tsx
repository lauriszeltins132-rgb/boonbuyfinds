import { createSeoLandingConfigPage } from "@/lib/seo-landing-config-page";

const { generateMetadata, Page } = createSeoLandingConfigPage("litbuy-spreadsheet");

export { generateMetadata };
export default Page;
