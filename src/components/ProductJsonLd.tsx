import type { Product } from "@/lib/types";
import { SITE_NAME } from "@/lib/constants";
import { extractBrand } from "@/lib/brands";
import { hasExactPrice } from "@/lib/pricing";
import { getProductImageAlt } from "@/lib/product-details";
import { resolveProductDisplayImage } from "@/lib/product-image-presentation";
import { buildImageObjectSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import SchemaScript from "@/components/SchemaScript";

type ProductJsonLdProps = {
  product: Product;
  slug: string;
};

export default function ProductJsonLd({ product, slug }: ProductJsonLdProps) {
  const brand = extractBrand(product.product_name);
  const url = `${SITE_URL}/find/${slug}`;
  const resolved = resolveProductDisplayImage(product);
  const imageSrc = resolved?.displaySrc || product.image;
  const imageUrl = imageSrc
    ? imageSrc.startsWith("http")
      ? imageSrc
      : `${SITE_URL}${imageSrc}`
    : undefined;
  const alt = getProductImageAlt(product);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.product_name,
    description: `${product.product_name} — curated on ${SITE_NAME}`,
    image: imageUrl
      ? buildImageObjectSchema({
          url: imageUrl,
          name: product.product_name,
          caption: alt,
        })
      : undefined,
    category: product.category,
    url,
    ...(brand
      ? {
          brand: {
            "@type": "Brand",
            name: brand,
          },
        }
      : {}),
    offers: hasExactPrice(product.price)
      ? {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: product.affiliate_link || url,
        }
      : undefined,
  };

  return <SchemaScript data={schema} />;
}
