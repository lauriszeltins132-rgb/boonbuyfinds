import { createSeoArchitecturePage } from "@/lib/seo-architecture/create-page";
export const revalidate = 86400;


const { generateMetadata, Page } = createSeoArchitecturePage("best-watches");
export { generateMetadata };
export default Page;
