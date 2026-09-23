import { getCardDisplayMap } from "@/lib/card-props";
import type { BrandInfo } from "@/lib/brands";
import type { CategoryInfo, Product } from "@/lib/types";
import CatalogPanel from "./CatalogPanel";

type ServerCatalogPanelProps = {
  products: Product[];
  categories: CategoryInfo[];
  brands: BrandInfo[];
  basePath?: string;
};

/** Attaches card display props on the server before hydrating CatalogPanel. */
export default function ServerCatalogPanel({
  products,
  categories,
  brands,
  basePath,
}: ServerCatalogPanelProps) {
  const cardDisplays = getCardDisplayMap(products.map((product) => product.id));
  return (
    <CatalogPanel
      products={products}
      categories={categories}
      brands={brands}
      basePath={basePath}
      cardDisplays={cardDisplays}
    />
  );
}
