"use client";

import Image from "next/image";
import Link from "next/link";
import type { PublicProduct } from "@/lib/ai/schemas";
import { track } from "@vercel/analytics";

type AiProductCardProps = {
  product: PublicProduct;
};

export default function AiProductCard({ product }: AiProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface/60">
      <Link
        href={`/find/${product.slug}`}
        className="block"
        onClick={() =>
          track("ai_product_clicked", {
            productId: product.id,
            category: product.categorySlug,
          })
        }
      >
        <div className="relative aspect-square bg-background">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 640px) 45vw, 160px"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted">
              No image
            </div>
          )}
        </div>
        <div className="space-y-1 p-3">
          {product.brand ? (
            <p className="text-[10px] font-bold uppercase tracking-wide text-accent">
              {product.brand}
            </p>
          ) : null}
          <h3 className="line-clamp-2 text-sm font-bold text-foreground">
            {product.name}
          </h3>
          <p className="text-sm font-black text-foreground">
            {product.price != null ? `$${product.price}` : "Price TBA"}
          </p>
          <p className="text-[11px] text-muted">{product.category}</p>
          {product.matchReason ? (
            <p className="text-[11px] leading-snug text-muted">
              {product.matchReason}
            </p>
          ) : null}
        </div>
      </Link>
      {product.affiliateUrl ? (
        <div className="border-t border-border p-2">
          <a
            href={product.affiliateUrl}
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-full bg-accent px-3 py-2 text-xs font-bold text-white hover:opacity-90"
            onClick={() =>
              track("ai_affiliate_link_clicked", { productId: product.id })
            }
          >
            Buy with BoonBuy
          </a>
        </div>
      ) : null}
    </article>
  );
}
