import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { getListingId } from "./listing-id";
import {
  getAllProducts,
  getAllSourceProducts,
  getLatestProducts,
  getListingCatalog,
  getProductById,
  getProductsByCategorySlug,
  getTrendingProducts,
} from "./products";
import { productBelongsToCategory } from "./product-membership";
import { getAllProductSlugs, getProductSlug, resolveFindSlug } from "./slugs";

describe("listing canonicalization", () => {
  const catalog = getListingCatalog();
  const redirectFile = JSON.parse(readFileSync("src/data/listing-redirects.json", "utf8")) as {
    redirects: {
      from: string;
      to: string;
      fromId: string;
      toId: string;
      listingId: string;
      sourceWasPublic: boolean;
    }[];
  };

  it("keeps every source row and publishes one product per listing", () => {
    assert.equal(catalog.sourceRows, getAllSourceProducts().length);
    assert.equal(getAllProducts().length, catalog.canonicalProducts.length);
    assert.ok(catalog.canonicalProducts.length < catalog.sourceRows);
    assert.ok(catalog.duplicateListingGroups > 0);
    assert.equal(catalog.uniqueListingIds > 0, true);

    const listingIds = getAllProducts()
      .map((product) => product.listingId)
      .filter((id): id is string => Boolean(id));
    assert.equal(new Set(listingIds).size, listingIds.length);
  });

  it("redirects every duplicate row to one canonical slug and does not chain", () => {
    assert.equal(redirectFile.redirects.length, catalog.redirects.length);
    const publicIds = new Set(getAllProducts().map((product) => product.id));
    const sources = new Set<string>();
    const targets = new Set<string>();

    for (const record of catalog.redirects) {
      assert.equal(publicIds.has(record.fromId), false);
      assert.equal(publicIds.has(record.toId), true);
      assert.notEqual(record.fromId, record.toId);
      sources.add(record.fromId);
      targets.add(record.toId);

      const source = getAllSourceProducts().find((product) => product.id === record.fromId);
      const canonical = getProductById(record.toId);
      assert.ok(source);
      assert.ok(canonical);
      const from = `/find/${getProductSlug(source)}`;
      const to = `/find/${getProductSlug(canonical)}`;
      assert.notEqual(from, to);
      const saved = redirectFile.redirects.find((redirect) => redirect.fromId === record.fromId);
      assert.ok(saved);
      assert.equal(saved.from, from);
      assert.equal(saved.to, to);
      assert.equal(saved.toId, record.toId);

      const resolved = resolveFindSlug(from.slice("/find/".length));
      assert.equal(resolved.type, "redirect");
      if (resolved.type === "redirect") {
        assert.equal(resolved.path, to);
        assert.equal(resolved.product.id, canonical.id);
      }
      const canonicalResolved = resolveFindSlug(to.slice("/find/".length));
      assert.equal(canonicalResolved.type, "ok");
    }

    for (const target of targets) {
      assert.equal(sources.has(target), false);
    }
  });

  it("omits duplicate slugs from the sitemap set and keeps relations", () => {
    const slugs = new Set(getAllProductSlugs());
    for (const redirect of redirectFile.redirects) {
      assert.equal(slugs.has(redirect.from.slice("/find/".length)), false);
      if (redirect.sourceWasPublic) {
        assert.equal(slugs.has(redirect.to.slice("/find/".length)), true);
      }
    }

    const related = getAllProducts().find((product) =>
      (product.listingRelations ?? []).some((relation) => relation.group === "category")
    );
    assert.ok(related);
    for (const relation of related.listingRelations ?? []) {
      if (relation.group !== "category") continue;
      assert.equal(
        getProductsByCategorySlug(relation.category_slug).some(
          (product) => product.id === related.id
        ),
        true
      );
    }
    const featured = getAllProducts().find((product) =>
      productBelongsToCategory(product, "trending-now") &&
      product.category_slug !== "trending-now"
    );
    if (featured) {
      assert.equal(
        getTrendingProducts().some((product) => product.id === featured.id),
        true
      );
    }
    const latest = getAllProducts().find((product) =>
      productBelongsToCategory(product, "latest-finds") &&
      product.category_slug !== "latest-finds"
    );
    if (latest) {
      assert.equal(
        getLatestProducts().some((product) => product.id === latest.id),
        true
      );
    }
  });

  it("logs price, title, and image disagreements instead of inventing values", () => {
    const conflicts = JSON.parse(readFileSync("src/data/listing-conflicts.json", "utf8")) as {
      conflicts: { status: string; field: string; kept: string; alternatives: unknown[] }[];
    };
    assert.equal(conflicts.conflicts.length, catalog.conflicts.length);
    const review = catalog.conflicts.filter((conflict) => conflict.status === "review");
    assert.ok(review.some((conflict) => conflict.field === "title"));
    assert.ok(review.some((conflict) => conflict.field === "image"));
    for (const conflict of catalog.conflicts) {
      assert.notEqual(conflict.keptFromId, "");
      if (conflict.field === "price" && conflict.status === "resolved" && conflict.kept) {
        assert.equal(Number.isFinite(Number(conflict.kept)), true);
      }
    }

    const sample = getAllSourceProducts().find(
      (product) => getListingId(product.affiliate_link) && getProductById(product.id)
    );
    assert.ok(sample);
    const listingId = getListingId(sample.affiliate_link);
    const siblings = getAllSourceProducts().filter(
      (product) => getListingId(product.affiliate_link) === listingId
    );
    const canonical = getProductById(sample.id);
    assert.ok(canonical);
    assert.equal(canonical.listingId, listingId);
    assert.equal(canonical.listingAliasIds?.length, siblings.length);
  });
});
