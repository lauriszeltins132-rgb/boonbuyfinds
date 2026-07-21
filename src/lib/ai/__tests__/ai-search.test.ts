import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseSearchIntent, isHaulRequest, extractBudget } from "../query-parser";
import { expandSynonyms, detectColors } from "../synonyms";
import { buildHaulFromCatalog, searchCatalog } from "../product-search";

describe("query parser", () => {
  it("parses price ceiling and color", () => {
    const intent = parseSearchIntent("Find black Nike shoes under $45");
    assert.equal(intent.maxPrice, 45);
    assert.ok(intent.colors.includes("black"));
    assert.ok(intent.brands.some((b) => b.includes("nike")));
  });

  it("detects haul requests and budgets", () => {
    assert.equal(isHaulRequest("Build me a summer outfit under $100"), true);
    assert.equal(extractBudget("haul under $150"), 150);
  });
});

describe("synonyms", () => {
  it("expands trainers to sneakers", () => {
    assert.match(expandSynonyms("white trainers"), /sneakers/);
  });

  it("detects colors", () => {
    assert.deepEqual(detectColors("navy jacket"), ["blue"]);
  });
});

describe("catalog search grounding", () => {
  it("returns only products with ids and never invents", () => {
    const result = searchCatalog(
      parseSearchIntent("shoes under $80", 5)
    );
    for (const product of result.products) {
      assert.ok(product.id);
      assert.ok(product.productUrl.includes("/find/"));
      assert.ok(product.name.length > 0);
    }
  });

  it("keeps haul subtotal within budget", () => {
    const haul = buildHaulFromCatalog({
      budget: 100,
      maximumItems: 4,
      query: "streetwear",
    });
    assert.ok(haul.subtotal <= 100 + 0.01);
    assert.equal(
      Number(
        haul.products
          .reduce((s, p) => s + (p.price ?? 0), 0)
          .toFixed(2)
      ),
      haul.subtotal
    );
    assert.equal(haul.shippingExcluded, true);
  });
});
