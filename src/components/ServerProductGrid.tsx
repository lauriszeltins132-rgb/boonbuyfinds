import { getCardDisplayMap } from "@/lib/card-props";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

type ServerProductGridProps = {
  products: Product[];
  emptyMessage?: string;
};

/** Server wrapper — attaches card display props for client ProductCards. */
export default function ServerProductGrid({
  products,
  emptyMessage,
}: ServerProductGridProps) {
  const cardDisplays = getCardDisplayMap(products.map((product) => product.id));
  return (
    <ProductGrid
      products={products}
      emptyMessage={emptyMessage}
      cardDisplays={cardDisplays}
    />
  );
}
