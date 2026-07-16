import Image from "next/image";
import Link from "next/link";
import {
  HOMEPAGE_SEO_INDEX_BLURB,
  SEO_HUB_FOOTER_LINKS,
} from "@/lib/boonbuy-seo-hub";
import { getDisplayBrand, getDisplayProductName } from "@/lib/product-validation";
import { getProductHref } from "@/lib/slugs";
import { resolveProductDisplayImage } from "@/lib/product-image-presentation";
import type { Product } from "@/lib/types";

type HomepageSeoLandingProps = {
  products: Product[];
};

export default function HomepageSeoLanding({ products }: HomepageSeoLandingProps) {
  const featured = products.slice(0, 6);

  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-black sm:text-2xl">Top BoonBuy Finds</h2>
            <p className="mt-1 text-sm text-muted">
              Featured items from the BoonBuy spreadsheet catalog
            </p>
          </div>
          <Link
            href="/boonbuy-spreadsheet"
            className="text-sm font-bold text-accent hover:underline"
          >
            View BoonBuy Spreadsheet →
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((product) => {
            const name = getDisplayProductName(product);
            const brand = getDisplayBrand(product);
            const resolved = resolveProductDisplayImage(product);
            const src = resolved?.displaySrc || product.image;
            const alt = brand
              ? `${brand} ${name} — BoonBuy spreadsheet item`
              : `${name} — BoonBuy Finds QC photo`;

            return (
              <Link
                key={product.id}
                href={getProductHref(product)}
                className="group overflow-hidden rounded-2xl border border-border bg-surface/30 transition hover:border-accent/35"
              >
                <div className="relative aspect-square bg-background">
                  {src ? (
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width:640px) 50vw, 16vw"
                      className="object-contain p-2 transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="space-y-1 p-3">
                  <p className="line-clamp-2 text-xs font-bold leading-snug text-foreground">
                    {name}
                  </p>
                  <p className="text-[11px] font-semibold text-muted">
                    {brand || "BoonBuy"} · Found on BoonBuy Spreadsheet
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-border/80 bg-surface/20 p-5 sm:p-6">
          <h2 className="text-lg font-black">BoonBuy Finds hub</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            {HOMEPAGE_SEO_INDEX_BLURB}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SEO_HUB_FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-accent/40 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
