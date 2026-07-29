import { createSeoArchitecturePage } from "@/lib/seo-architecture/create-page";

export const revalidate = 86400;

const { generateMetadata, Page } = createSeoArchitecturePage("boonbuy-referral-code");
export { generateMetadata };
export default Page;
