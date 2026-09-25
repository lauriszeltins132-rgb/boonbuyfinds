import { createAuthorityHubPage } from "@/lib/create-authority-hub-page";

export const revalidate = 3600;

const { generateMetadata, Page } = createAuthorityHubPage("boonbuy-finds");
export { generateMetadata };
export default Page;
