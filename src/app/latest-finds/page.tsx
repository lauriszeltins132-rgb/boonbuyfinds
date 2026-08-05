import { createFindsHubPage } from "@/lib/finds-hub-page";

const { generateMetadata, Page } = createFindsHubPage("latest-finds");

export { generateMetadata };
export default Page;
