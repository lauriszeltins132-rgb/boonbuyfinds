import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildProductMetaTitleDetailed,
  joinBrandAndProductName,
} from "../metadata-copy";

describe("joinBrandAndProductName", () => {
  it("does not double-prefix brand when name already includes it", () => {
    assert.equal(joinBrandAndProductName("Nike Slippers", "Nike"), "Nike Slippers");
    assert.equal(joinBrandAndProductName("nike dunk", "Nike"), "nike dunk");
  });

  it("prefixes brand when missing from the name", () => {
    assert.equal(joinBrandAndProductName("Slippers", "Nike"), "Nike Slippers");
  });
});

describe("buildProductMetaTitleDetailed", () => {
  it("avoids Nike Nike titles", () => {
    const title = buildProductMetaTitleDetailed({
      name: "Nike Slippers",
      brand: "Nike",
      category: "Shoes",
    });
    assert.equal(title.includes("Nike Nike"), false);
    assert.match(title, /^Nike Slippers/);
  });
});
