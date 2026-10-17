import { createAuthorityHubPage } from "@/lib/create-authority-hub-page";

export const revalidate = 300;

const { generateMetadata, Page } = createAuthorityHubPage("boonbuy-review");
export { generateMetadata };
export default Page;
