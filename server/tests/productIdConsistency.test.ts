import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  is24HexObjectId,
  buildProductLookupQuery,
  findInMemoryProduct,
} from "../src/controllers/productController.js";
import { initialProducts, memoryStore } from "../src/config/memoryStore.js";

describe("Product Identifier Consistency (MongoDB vs In-Memory)", () => {
  it("accurately classifies 24-character hex ObjectIds vs standard slug identifiers", () => {
    // Valid 24-hex ObjectIds
    assert.equal(is24HexObjectId("507f1f77bcf86cd799439011"), true);
    assert.equal(is24HexObjectId("67104b2a59a9fa0012345678"), true);
    assert.equal(is24HexObjectId("abcdef0123456789ABCDEF01"), true);

    // Invalid identifiers (slugs, malformed, non-hex)
    assert.equal(is24HexObjectId("virat-classic-cap-black"), false);
    assert.equal(is24HexObjectId("classic-crew-tshirt-navy"), false);
    assert.equal(is24HexObjectId("507f1f77bcf86cd79943901"), false); // 23 chars
    assert.equal(is24HexObjectId("507f1f77bcf86cd7994390112"), false); // 25 chars
    assert.equal(is24HexObjectId("507f1f77bcf86cd79943901z"), false); // 'z' not hex
    assert.equal(is24HexObjectId(""), false);
    assert.equal(is24HexObjectId(null as any), false);
    assert.equal(is24HexObjectId(undefined as any), false);
  });

  it("constructs unambiguous MongoDB lookup queries without matching nulls", () => {
    // Slug ID lookup
    const slugQuery = buildProductLookupQuery("virat-classic-cap-black");
    assert.deepEqual(slugQuery, { id: "virat-classic-cap-black" });

    // 24-hex ObjectId lookup
    const hexId = "507f1f77bcf86cd799439011";
    const hexQuery = buildProductLookupQuery(hexId);
    assert.deepEqual(hexQuery, {
      $or: [{ id: hexId }, { _id: hexId }],
    });
  });

  it("ensures all 17 catalog products possess both a slug ID and a deterministic 24-hex _id", () => {
    assert.equal(initialProducts.length, 17, "Catalog must contain exactly 17 approved client products");
    assert.equal(memoryStore.products.length, 17);

    for (const product of memoryStore.products) {
      assert(typeof product.id === "string" && product.id.length > 0, `Product ${product.name} must have a valid string id`);
      assert(typeof product._id === "string", `Product ${product.id} must have a string _id`);
      assert.equal(
        is24HexObjectId(product._id!),
        true,
        `Product ${product.id} _id "${product._id}" must be a valid 24-character hex string`
      );
    }
  });

  it("finds products identically using either slug ID or 24-hex _id in memoryStore", () => {
    const targetProduct = memoryStore.products[0]; // virat-classic-cap-black
    const slug = targetProduct.id;
    const hexId = targetProduct._id!;

    // Lookup by slug ID
    const foundBySlug = findInMemoryProduct(slug);
    assert(foundBySlug, "Must find product by slug id");
    assert.equal(foundBySlug.id, slug);

    // Lookup by 24-hex ObjectId
    const foundByHex = findInMemoryProduct(hexId);
    assert(foundByHex, "Must find product by 24-hex _id");
    assert.equal(foundByHex.id, slug);
    assert.equal(foundByHex._id, hexId);

    // Identity check: both resolutions return the exact same product
    assert.equal(foundBySlug, foundByHex);
  });

  it("returns undefined for non-existent slugs or unknown 24-hex ObjectIds", () => {
    assert.equal(findInMemoryProduct("non-existent-product-slug"), undefined);
    assert.equal(findInMemoryProduct("000000000000000000000000"), undefined);
    assert.equal(findInMemoryProduct(""), undefined);
  });
});
