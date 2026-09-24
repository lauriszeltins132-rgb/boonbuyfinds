"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { getDisplayProductName, getDisplayBrand } from "@/lib/product-validation";
import { formatProductPrice, getPriceStatus } from "@/lib/pricing";
import type { CardDisplayProps } from "@/lib/card-display";
import { getProductSource } from "@/lib/affiliate-source";
import { getProductHref } from "@/lib/slugs";
import BrandMark from "./BrandMark";
import { usePreferences } from "@/context/PreferencesContext";
import { useWishlist } from "@/context/WishlistContext";
import { trackProductContext, trackSaveClick } from "@/lib/analytics-events";
import BoonBuyMicroCta from "./BoonBuyMicroCta";
import ProductBadges from "./ProductBadges";
import ProductCardImage from "./ProductCardImage";
import BuyWithAgentButton from "./agents/BuyWithAgentButton";

type ProductCardProps = {
  product: Product;
  onOpen?: (product: Product) => void;
  compact?: boolean;
  showTrendingScore?: boolean;
  priority?: boolean;
  /** Pre-resolved on the server — keeps card-props.json out of the client bundle. */
  display?: CardDisplayProps | null;
};

function getCardImageAlt(product: Product): string {
  const brand = getDisplayBrand(product);
  const name = getDisplayProductName(product);
  if (brand) {
    return `${brand} ${name} — ${product.category} find on BoonBuy Finds`;
  }
  return `${name} — BoonBuy Finds`;
}

async function shareProduct(product: Product, title: string) {
  const url = `${window.location.origin}${getProductHref(product)}`;
  if (navigator.share) {
    await navigator.share({
      title,
      text: `Check out this find on BoonBuy Finds`,
      url,
    });
    return;
  }
  await navigator.clipboard.writeText(url);
}

export default function ProductCard({
  product,
  onOpen,
  compact = false,
  showTrendingScore = false,
  priority = false,
  display = null,
}: ProductCardProps) {
  const { currency } = usePreferences();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [copied, setCopied] = useState(false);
  const saved = isInWishlist(product.id);
  const displayName = getDisplayProductName(product);
  const brand = getDisplayBrand(product);
  const source = getProductSource(product.affiliate_link);
  const productHref = getProductHref(product);
  const imageAlt = getCardImageAlt(product);
  const badges = useMemo(
    () =>
      showTrendingScore
        ? (display?.badgesTrending ?? [])
        : (display?.badges ?? []),
    [display, showTrendingScore]
  );
  const freshness = display?.freshness ?? null;

  async function handleCopy() {
    const url = `${window.location.origin}${productHref}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  function openProduct() {
    if (onOpen) onOpen(product);
  }

  const iconBtn =
    "flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent";

  return (
    <article
      className={`product-card group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-panel active:scale-[0.99] sm:rounded-2xl ${
        compact ? "text-[12px] sm:text-[13px]" : ""
      }`}
    >
      <div className="product-card-media">
        <Link
          href={productHref}
          className="product-image-shell product-image-shell--card product-image-hover relative block aspect-square overflow-hidden"
        >
          <ProductCardImage
            src={product.image}
            fallbacks={display?.fallbacks}
            fillClass={display?.fillClass}
            alt={imageAlt}
            title={imageAlt}
            productHref={productHref}
            priority={priority}
          />
          <div className="product-card-hover-hint bg-gradient-to-t from-background/55 to-transparent px-3 py-2.5 opacity-0 transition-opacity group-hover:opacity-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
              View details
            </p>
          </div>
        </Link>
        <ProductBadges badges={badges} />
      </div>

      <div
        className={`flex flex-1 flex-col ${
          compact ? "gap-1 p-2.5 sm:gap-1.5 sm:p-3" : "gap-1.5 p-3 sm:p-3.5"
        }`}
      >
        <Link href={productHref} className="text-left">
          <h3
            className={`line-clamp-2 font-bold leading-snug text-foreground ${
              compact ? "text-xs sm:text-[13px]" : "text-sm sm:text-[15px]"
            }`}
          >
            {displayName}
          </h3>
        </Link>

        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted">
          {brand ? <BrandMark name={brand} size="sm" /> : null}
          <span className="rounded bg-surface px-1.5 py-0.5 uppercase">{source}</span>
          {freshness ? (
            <span className="text-[10px] font-semibold text-accent/80">{freshness}</span>
          ) : null}
        </div>

        <p
          className={`font-black ${
            getPriceStatus(product.price) === "exact"
              ? "text-accent"
              : "text-muted text-sm"
          } ${compact ? "text-sm" : "text-base sm:text-lg"}`}
        >
          {formatProductPrice(product.price, currency)}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1.5">
          {product.affiliate_link ? (
            <BuyWithAgentButton
              product={product}
              location="product_card"
              showAgentPicker
              compact
            />
          ) : (
            <button
              type="button"
              onClick={openProduct}
              className="rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold text-muted"
            >
              View
            </button>
          )}

          {product.qc_link ? (
            <a
              href={product.qc_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProductContext("qc_click", product, "product_card")}
              className="rounded-full border border-border px-2.5 py-1.5 text-[11px] font-bold text-foreground hover:border-accent/40"
            >
              QC
            </a>
          ) : (
            <span className="rounded-full border border-border/50 px-2.5 py-1.5 text-[11px] text-muted/50">
              QC
            </span>
          )}

          <button
            type="button"
            onClick={() => {
              if (!saved) trackSaveClick(product.id, "product_card");
              toggleWishlist(product.id);
            }}
            aria-label={saved ? "Remove from saved" : "Save item"}
            className={`${iconBtn} ${
              saved ? "border-accent bg-accent text-white" : ""
            }`}
          >
            ♥
          </button>

          <button
            type="button"
            onClick={() => shareProduct(product, displayName)}
            aria-label="Share product"
            className={iconBtn}
          >
            ↗
          </button>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy product link"
            className={iconBtn}
          >
            {copied ? "✓" : "⧉"}
          </button>
        </div>

        {product.affiliate_link && !compact ? (
          <BoonBuyMicroCta location="product_card_boonbuy" />
        ) : null}
      </div>
    </article>
  );
}
