import { createBestOfPage } from "@/lib/best-of-page";

const { generateMetadata, Page } = createBestOfPage("most-viewed-finds");

export { generateMetadata };
export default Page;
