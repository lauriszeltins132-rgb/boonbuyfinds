import Image from "next/image";
import Link from "next/link";
import { getDisplayBrand, getDisplayProductName } from "@/lib/product-validation";
import { getProductHref } from "@/lib/slugs";
import type { Product } from "@/lib/types";

type HomepageProductMosaicProps = {
  products: Product[];
};

/**
 * Early product mosaic only — long-form SEO copy lives lower on the page
 * (HomepageSeoContent) so mobile users reach products within ~1–2 viewports.
 */
export default function HomepageProductMosaic({
  products,
}: HomepageProductMosaicProps) {
  const featured = products.slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="px-4 py-4 sm:px-6 sm:py-5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-black sm:text-xl">Top BoonBuy Finds</h2>
            <p className="mt-0.5 text-xs text-muted sm:text-sm">
              Featured items from the BoonBuy spreadsheet catalog
            </p>
          </div>
          <Link
            href="/boonbuy-finds"
            className="text-sm font-bold text-accent hover:underline"
          >
            Browse all →
          </Link>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {featured.map((product, index) => {
            const name = getDisplayProductName(product);
            const brand = getDisplayBrand(product);
            // Always use the catalog original — never processed cutouts.
            const src = product.image;
            const alt = brand
              ? `${brand} ${name} — BoonBuy spreadsheet item`
              : `${name} — BoonBuy Finds`;

            return (
              <Link
                key={product.id}
                href={getProductHref(product)}
                className="group overflow-hidden rounded-xl border border-border bg-panel transition hover:border-accent/35 sm:rounded-2xl"
              >
                <div className="relative aspect-square bg-[#fffcf8]">
                  {src ? (
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width:640px) 50vw, 16vw"
                      quality={85}
                      priority={index < 2}
                      className="object-contain p-[5%] transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="space-y-0.5 p-2 sm:p-3">
                  <p className="line-clamp-2 text-xs font-bold leading-snug text-foreground">
                    {name}
                  </p>
                  <p className="text-[10px] font-semibold text-muted sm:text-[11px]">
                    {brand || "BoonBuy"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
