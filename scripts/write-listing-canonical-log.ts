/**
 * Write the review log and the duplicate URL map.
 * Does not edit products.json.
 */
import { writeFileSync } from "node:fs";
import { getAllSourceProducts, getListingCatalog, getProductById } from "../src/lib/products";
import { getProductSlug } from "../src/lib/slugs";

const catalog = getListingCatalog();
const redirects = catalog.redirects.map((record) => {
  const source = getAllSourceProducts().find((product) => product.id === record.fromId);
  const canonical = getProductById(record.toId);
  if (!source || !canonical) {
    throw new Error(`Missing redirect endpoints for ${record.fromId} -> ${record.toId}`);
  }
  const from = `/find/${getProductSlug(source)}`;
  const to = `/find/${getProductSlug(canonical)}`;
  if (from === to) {
    throw new Error(`Redirect ${from} points at itself`);
  }
  return {
    from,
    to,
    fromId: record.fromId,
    toId: record.toId,
    listingId: record.listingId,
    sourceWasPublic: record.sourceWasPublic,
  };
});

const fromPaths = new Set<string>();
for (const redirect of redirects) {
  if (fromPaths.has(redirect.from)) {
    throw new Error(`Ambiguous redirect source ${redirect.from}`);
  }
  fromPaths.add(redirect.from);
}
const targets = new Set(redirects.map((redirect) => redirect.to));
for (const redirect of redirects) {
  if (targets.has(redirect.from)) {
    throw new Error(`Redirect chain at ${redirect.from}`);
  }
}

const resolved = catalog.conflicts.filter((conflict) => conflict.status === "resolved");
const review = catalog.conflicts.filter((conflict) => conflict.status === "review");

const summary = {
  sourceRows: catalog.sourceRows,
  uniqueListingIds: catalog.uniqueListingIds,
  rowsWithoutListingId: catalog.rowsWithoutListingId,
  duplicateListingGroups: catalog.duplicateListingGroups,
  duplicateSourceRows: catalog.duplicateSourceRows,
  urlOnlyDuplicateGroups: catalog.urlOnlyDuplicateGroups,
  publicProducts: catalog.canonicalProducts.length,
  redirects: redirects.length,
  publicRedirects: redirects.filter((redirect) => redirect.sourceWasPublic).length,
  conflictsResolved: resolved.length,
  conflictsReview: review.length,
  conflictsByField: {
    price: catalog.conflicts.filter((conflict) => conflict.field === "price").length,
    title: catalog.conflicts.filter((conflict) => conflict.field === "title").length,
    image: catalog.conflicts.filter((conflict) => conflict.field === "image").length,
    qc_link: catalog.conflicts.filter((conflict) => conflict.field === "qc_link").length,
  },
};

writeFileSync(
  "src/data/listing-redirects.json",
  `${JSON.stringify({ summary, redirects }, null, 2)}\n`
);
writeFileSync(
  "src/data/listing-conflicts.json",
  `${JSON.stringify({ summary, conflicts: catalog.conflicts }, null, 2)}\n`
);
console.log(JSON.stringify(summary, null, 2));
