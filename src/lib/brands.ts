import type { Product } from "./types";
import {
  normalizeBrandDisplayName,
  resolveCanonicalBrandSlug,
  slugifyBrandName,
} from "./brand-normalization";
import { getDisplayBrand } from "./product-validation";

const KNOWN_BRANDS = [
  "Chrome Hearts",
  "Balenciaga",
  "Ralph Lauren",
  "Supreme",
  "Essentials",
  "Dior",
  "Rick Owens",
  "Bape",
  "Burberry",
  "Nike",
  "Goyard",
  "Stone Island",
  "New Balance",
  "Sp5der",
  "Chanel",
  "Jordan",
  "Adidas",
  "Louis Vuitton",
  "Moncler",
  "Prada",
  "Gucci",
  "Off-White",
  "Off White",
  "Ami",
  "Lacoste",
  "Hermes",
  "Versace",
  "Fendi",
  "Givenchy",
  "Valentino",
  "Asics",
  "UGG",
  "The North Face",
  "Carhartt",
  "Gallery Dept",
  "Maison Margiela",
  "MM6",
  "Salomon",
  "Alexander McQueen",
  "Golden Goose",
  "GGDB",
  "Corteiz",
  "Stussy",
  "Palace",
  "Arc'teryx",
  "Arcteryx",
  "CP Company",
  "Palm Angels",
  "Amiri",
  "Loewe",
  "Miu Miu",
  "Yeezy",
  "Travis Scott",
  "Nocta",
  "Mertra",
  "Vivienne Westwood",
  "Vetements",
  "Bottega Veneta",
  "Timberland",
  "Converse",
  "Vans",
  "Puma",
  "Reebok",
  "Under Armour",
  "Lululemon",
  "Alo",
  "Zegna",
  "Loro Piana",
  "Canada Goose",
  "Moose Knuckles",
  "Marni",
  "Mihara Yasuhiro",
  "Maison Mihara Yasuhiro",
  "Represent",
  "Fear of God",
  "Acne Studios",
  "Rimowa",
  "Tiffany",
  "Rolex",
  "Casio",
  "Apple",
  "Sony",
];

export type BrandInfo = {
  name: string;
  slug: string;
  count: number;
};

function slugify(name: string) {
  return slugifyBrandName(name);
}

/** Longest-first so "Amiri" wins over "Ami", "Off-White" over shorter tokens, etc. */
const KNOWN_BRANDS_BY_LENGTH = [...KNOWN_BRANDS].sort((a, b) => b.length - a.length);

export function extractBrand(productName: string): string | null {
  const upper = productName.toUpperCase();
  for (const brand of KNOWN_BRANDS_BY_LENGTH) {
    if (upper.includes(brand.toUpperCase())) {
      return normalizeBrandDisplayName(brand);
    }
  }
  return null;
}

/** All distinct brands mentioned in text (longest match first). */
export function extractAllBrands(text: string): string[] {
  const upper = text.toUpperCase();
  const found: string[] = [];
  const used = new Set<string>();

  for (const brand of KNOWN_BRANDS_BY_LENGTH) {
    if (!upper.includes(brand.toUpperCase())) continue;
    const canonical = normalizeBrandDisplayName(brand);
    const key = canonical.toLowerCase();
    if (used.has(key)) continue;
    const overlaps = found.some(
      (existing) =>
        existing.toLowerCase().includes(key) || key.includes(existing.toLowerCase())
    );
    if (overlaps && found.length > 0) continue;
    found.push(canonical);
    used.add(key);
  }

  return found;
}

export function getBrandsFromProducts(products: Product[]): BrandInfo[] {
  const counts = new Map<string, number>();

  for (const product of products) {
    const brand = getDisplayBrand(product);
    if (!brand) continue;
    const canonical = normalizeBrandDisplayName(brand);
    counts.set(canonical, (counts.get(canonical) || 0) + 1);
  }

  // Merge display aliases that share a canonical slug (e.g. Off White / Off-White).
  const summed = new Map<string, BrandInfo>();
  for (const [name, count] of counts.entries()) {
    const slug = resolveCanonicalBrandSlug(slugify(name));
    const existing = summed.get(slug);
    if (!existing) {
      summed.set(slug, { name, slug, count });
    } else {
      summed.set(slug, {
        name: name.length >= existing.name.length ? name : existing.name,
        slug,
        count: existing.count + count,
      });
    }
  }

  return [...summed.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function productMatchesBrand(product: Product, brandSlug: string): boolean {
  const brand = getDisplayBrand(product);
  if (!brand) return false;
  const canonical = normalizeBrandDisplayName(brand);
  const slug = resolveCanonicalBrandSlug(slugify(canonical));
  return slug === resolveCanonicalBrandSlug(brandSlug);
}

export function getBrandBySlug(
  products: Product[],
  brandSlug: string
): BrandInfo | undefined {
  const canonical = resolveCanonicalBrandSlug(brandSlug);
  return getBrandsFromProducts(products).find((brand) => brand.slug === canonical);
}

export function getProductsByBrandSlug(
  products: Product[],
  brandSlug: string
): Product[] {
  return products.filter((product) => productMatchesBrand(product, brandSlug));
}
