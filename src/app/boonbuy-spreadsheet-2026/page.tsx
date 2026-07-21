import { createSeoArchitecturePage } from "@/lib/seo-architecture/create-page";
export const revalidate = 86400;


const { generateMetadata, Page } = createSeoArchitecturePage("boonbuy-spreadsheet-2026");
export { generateMetadata };
export default Page;
