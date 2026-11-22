import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createDailySnapshot,
  emptyPresence,
  type SnapshotProductInput,
} from "./catalog-snapshot";

function product(overrides: Partial<SnapshotProductInput> = {}): SnapshotProductInput {
  return {
    listingId: "weidian:1",
    price: 20,
    imageUrl: "https://i.postimg.cc/example.jpg",
    qcLinked: true,
    brand: "Nike",
    category: "shoes",
    sourceUrl: "https://boonbuy.com/product/weidian/1",
    boonbuyUrl: "https://boonbuy.com/product/weidian/1?inviteCode=JOINUP",
    ...overrides,
  };
}

describe("daily catalog snapshot", () => {
  it("is idempotent for the same UTC day", () => {
    const first = createDailySnapshot({
      date: "2026-11-23",
      products: [product()],
      presence: emptyPresence(),
      dayExists: false,
    });
    assert.equal(first.status, "created");
    if (first.status !== "created") return;

    const second = createDailySnapshot({
      date: "2026-11-23",
      products: [product({ price: 5 })],
      presence: first.presence,
      dayExists: true,
    });
    assert.deepEqual(second, { status: "exists" });
    assert.equal(first.presence.listings["weidian:1"].price, 20);
    assert.equal(first.day.priceChanges.length, 0);
  });

  it("sets first seen once and moves last seen forward", () => {
    const dayOne = createDailySnapshot({
      date: "2026-11-23",
      products: [product(), product({ listingId: "weidian:2", price: 40, brand: "Moncler", category: "coats-and-jackets" })],
      presence: emptyPresence(),
      dayExists: false,
    });
    assert.equal(dayOne.status, "created");
    if (dayOne.status !== "created") return;

    const kept = dayOne.day.products.find((row) => row.listingId === "weidian:1");
    assert.equal(kept?.firstSeenAt, "2026-11-23");
    assert.equal(kept?.lastSeenAt, "2026-11-23");

    const dayTwo = createDailySnapshot({
      date: "2026-11-24",
      products: [product({ price: 20 })],
      presence: dayOne.presence,
      dayExists: false,
    });
    assert.equal(dayTwo.status, "created");
    if (dayTwo.status !== "created") return;

    const stillThere = dayTwo.day.products.find((row) => row.listingId === "weidian:1");
    assert.equal(stillThere?.firstSeenAt, "2026-11-23");
    assert.equal(stillThere?.lastSeenAt, "2026-11-24");
    assert.equal(dayTwo.presence.listings["weidian:1"].firstSeenAt, "2026-11-23");
    assert.equal(dayTwo.presence.listings["weidian:2"].firstSeenAt, "2026-11-23");
    assert.equal(dayTwo.presence.listings["weidian:2"].lastSeenAt, "2026-11-23");
    assert.deepEqual(dayTwo.day.removed, ["weidian:2"]);

    const newcomer = product({ listingId: "weidian:3", price: 12, brand: "Stussy", category: "hoodies-and-pants" });
    const dayThree = createDailySnapshot({
      date: "2026-11-25",
      products: [product(), newcomer],
      presence: dayTwo.presence,
      dayExists: false,
    });
    assert.equal(dayThree.status, "created");
    if (dayThree.status !== "created") return;
    assert.deepEqual(dayThree.day.added, ["weidian:3"]);
    assert.equal(dayThree.presence.listings["weidian:3"].firstSeenAt, "2026-11-25");
    assert.equal(dayThree.presence.listings["weidian:1"].firstSeenAt, "2026-11-23");
  });

  it("records a price change only when the stored price differs", () => {
    const dayOne = createDailySnapshot({
      date: "2026-11-23",
      products: [product({ price: 30 }), product({ listingId: "weidian:9", price: 15, qcLinked: false, brand: null, category: "accessories" })],
      presence: emptyPresence(),
      dayExists: false,
    });
    assert.equal(dayOne.status, "created");
    if (dayOne.status !== "created") return;
    assert.deepEqual(dayOne.day.priceChanges, []);

    const same = createDailySnapshot({
      date: "2026-11-24",
      products: [product({ price: 30.001 }), product({ listingId: "weidian:9", price: 15, qcLinked: false, brand: null, category: "accessories" })],
      presence: dayOne.presence,
      dayExists: false,
    });
    assert.equal(same.status, "created");
    if (same.status !== "created") return;
    assert.deepEqual(same.day.priceChanges, []);

    const changed = createDailySnapshot({
      date: "2026-11-25",
      products: [product({ price: 22 }), product({ listingId: "weidian:9", price: null, qcLinked: false, brand: null, category: "accessories" })],
      presence: same.presence,
      dayExists: false,
    });
    assert.equal(changed.status, "created");
    if (changed.status !== "created") return;
    assert.deepEqual(changed.day.priceChanges, [
      { listingId: "weidian:1", from: 30, to: 22 },
      { listingId: "weidian:9", from: 15, to: null },
    ]);
    assert.equal(changed.day.aggregates.totalProducts, 2);
    assert.equal(changed.day.aggregates.qcProducts, 1);
    assert.equal(changed.day.aggregates.productsByCategory.shoes, 1);
    assert.equal(changed.day.aggregates.medianPriceByCategory.shoes, 22);
  });
});
