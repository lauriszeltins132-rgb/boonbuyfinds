import { getCardDisplayMap } from "@/lib/card-props";
import type { Product } from "@/lib/types";
import DiscoveryRail from "./DiscoveryRail";

type ServerDiscoveryRailProps = {
  title: string;
  subtitle?: string;
  href: string;
  products: Product[];
  showTrendingScore?: boolean;
  preloadImages?: boolean;
};

/** Server wrapper — resolves card display props without bundling card-props.json into the client. */
export default function ServerDiscoveryRail({
  products,
  ...rest
}: ServerDiscoveryRailProps) {
  const cardDisplays = getCardDisplayMap(products.map((product) => product.id));
  return (
    <DiscoveryRail {...rest} products={products} cardDisplays={cardDisplays} />
  );
}
