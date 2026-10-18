process.env.NODE_ENV = "test";

import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { config } from "../src/config/env.js";
import {
  disconnectDB,
  _setFallbackActiveForTesting,
} from "../src/config/db.js";
import {
  memoryStore,
  resetMemoryStoreForTesting,
} from "../src/config/memoryStore.js";
import {
  updateProduct,
  getProductById,
  createProduct,
} from "../src/controllers/productController.js";
import { createOrder } from "../src/controllers/orderController.js";

// Helper to create mock Express req/res
const createMockReqRes = (body: any = {}, params: any = {}, query: any = {}) => {
  const req = { body, params, query } as any;
  let statusCode = 200;
  let responseData: any = null;
  const res = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(data: any) {
      responseData = data;
      return this;
    },
  } as any;

  return { req, res, getStatus: () => statusCode, getData: () => responseData };
};

describe("Product Price Confirmation & Validation Regression Tests", () => {
  const originalEnv = config.NODE_ENV;
  const originalFallback = config.ALLOW_IN_MEMORY_FALLBACK;

  beforeEach(async () => {
    config.NODE_ENV = "development";
    config.ALLOW_IN_MEMORY_FALLBACK = true;
    await disconnectDB();
    _setFallbackActiveForTesting(true);
    resetMemoryStoreForTesting();
  });

  afterEach(async () => {
    config.NODE_ENV = originalEnv;
    config.ALLOW_IN_MEMORY_FALLBACK = originalFallback;
    await disconnectDB();
    _setFallbackActiveForTesting(false);
    resetMemoryStoreForTesting();
  });

  it("successfully saves a valid price and updates confirmation status to false", async () => {
    const productId = "virat-classic-cap-black";

    // 1. Verify initial unconfirmed state
    const initialProduct = memoryStore.products.find((p) => p.id === productId);
    assert(initialProduct, "Target product must exist in memoryStore");
    assert.equal(initialProduct.price, 0);
    assert.equal(initialProduct.priceUnconfirmed, true);

    // 2. Admin saves price: 799
    const { req: updateReq, res: updateRes, getStatus: getUpdateStatus, getData: getUpdateData } = createMockReqRes(
      {
        name: initialProduct.name,
        category: initialProduct.category,
        price: 799,
        stock: 45,
      },
      { id: productId }
    );

    await updateProduct(updateReq, updateRes);

    assert.equal(getUpdateStatus(), 200, "Update must succeed with HTTP 200");
    const updated = getUpdateData().data;
    assert.equal(updated.price, 799, "Price must be updated to 799");
    assert.equal(updated.priceUnconfirmed, false, "priceUnconfirmed must be updated to false");

    // 3. Reload product via getProductById and verify persistent confirmation
    const { req: getReq, res: getRes, getStatus: getGetStatus, getData: getGetData } = createMockReqRes(
      {},
      { id: productId }
    );

    await getProductById(getReq, getRes);

    assert.equal(getGetStatus(), 200);
    const reloaded = getGetData().data;
    assert.equal(reloaded.price, 799);
    assert.equal(reloaded.priceUnconfirmed, false);
  });

  it("ensures unconfirmed products remain unconfirmed when untouched or when non-price fields are updated", async () => {
    const unconfirmedId = "virat-classic-cap-red";

    // Untouched product remains unconfirmed
    const { req: getReq1, res: getRes1, getData: getData1 } = createMockReqRes({}, { id: unconfirmedId });
    await getProductById(getReq1, getRes1);
    assert.equal(getData1().data.price, 0);
    assert.equal(getData1().data.priceUnconfirmed, true);

    // Update non-price field (stock & isActive) without price in payload
    const { req: updateReq, res: updateRes, getStatus: updateStatus, getData: updateData } = createMockReqRes(
      { stock: 99, isActive: true },
      { id: unconfirmedId }
    );
    await updateProduct(updateReq, updateRes);

    assert.equal(updateStatus(), 200);
    assert.equal(updateData().data.stock, 99);
    assert.equal(updateData().data.price, 0, "Price must remain 0");
    assert.equal(updateData().data.priceUnconfirmed, true, "Missing price payload must NOT mark as confirmed");

    // Reload check
    const { req: getReq2, res: getRes2, getData: getData2 } = createMockReqRes({}, { id: unconfirmedId });
    await getProductById(getReq2, getRes2);
    assert.equal(getData2().data.priceUnconfirmed, true);
  });

  it("deliberately handles numeric zero by marking/preserving priceUnconfirmed: true", async () => {
    const productId = "virat-classic-cap-white";

    const { req, res, getStatus, getData } = createMockReqRes(
      { price: 0 },
      { id: productId }
    );
    await updateProduct(req, res);

    assert.equal(getStatus(), 200);
    assert.equal(getData().data.price, 0);
    assert.equal(getData().data.priceUnconfirmed, true, "Price 0 must result in priceUnconfirmed: true");
  });

  it("rejects empty strings, null, negative numbers, and non-numeric price inputs with HTTP 400", async () => {
    const productId = "virat-classic-cap-black";

    // Test null price
    const { req: reqNull, res: resNull, getStatus: statusNull, getData: dataNull } = createMockReqRes(
      { price: null },
      { id: productId }
    );
    await updateProduct(reqNull, resNull);
    assert.equal(statusNull(), 400, "Null price must be rejected with HTTP 400");
    assert(dataNull().error.includes("Invalid price"));

    // Test empty string price
    const { req: reqEmpty, res: resEmpty, getStatus: statusEmpty } = createMockReqRes(
      { price: "" },
      { id: productId }
    );
    await updateProduct(reqEmpty, resEmpty);
    assert.equal(statusEmpty(), 400, "Empty string price must be rejected with HTTP 400");

    // Test negative price
    const { req: reqNeg, res: resNeg, getStatus: statusNeg } = createMockReqRes(
      { price: -150 },
      { id: productId }
    );
    await updateProduct(reqNeg, resNeg);
    assert.equal(statusNeg(), 400, "Negative price must be rejected with HTTP 400");

    // Test NaN string price
    const { req: reqNaN, res: resNaN, getStatus: statusNaN } = createMockReqRes(
      { price: "not-a-number" },
      { id: productId }
    );
    await updateProduct(reqNaN, resNaN);
    assert.equal(statusNaN(), 400, "Non-numeric price must be rejected with HTTP 400");
  });

  it("honors intentional priceUnconfirmed: true flag even if a positive price is provided", async () => {
    const productId = "virat-camo-track-pant";

    const { req, res, getStatus, getData } = createMockReqRes(
      { price: 1499, priceUnconfirmed: true },
      { id: productId }
    );
    await updateProduct(req, res);

    assert.equal(getStatus(), 200);
    assert.equal(getData().data.price, 1499);
    assert.equal(getData().data.priceUnconfirmed, true, "Explicit priceUnconfirmed: true must be preserved");
  });

  it("rejects attempting to set priceUnconfirmed: false when the product price is zero", async () => {
    const productId = "virat-camo-training-shorts"; // starts with price: 0

    const { req, res, getStatus, getData } = createMockReqRes(
      { priceUnconfirmed: false },
      { id: productId }
    );
    await updateProduct(req, res);

    assert.equal(getStatus(), 400, "Cannot confirm a product whose price is 0");
    assert(getData().error.includes("Cannot confirm price"));
  });

  it("unblocks order placement once a valid price is confirmed by admin update", async () => {
    const productId = "virat-pro-match-shorts";

    // 1. Order placement fails while price is unconfirmed
    const orderPayload = {
      customer: {
        fullName: "Test Customer",
        email: "customer@example.com",
        phone: "+91 9876543210",
      },
      shippingAddress: {
        street: "123 Stadium Road",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400001",
      },
      items: [{ productId, quantity: 1, size: "L" }],
    };

    const { req: orderReq1, res: orderRes1, getStatus: orderStatus1, getData: orderData1 } = createMockReqRes(orderPayload);
    await createOrder(orderReq1, orderRes1);
    assert.equal(orderStatus1(), 400);
    assert(orderData1().error.includes("unconfirmed commercial pricing"));

    // 2. Admin sets confirmed price: 899
    const { req: updateReq, res: updateRes, getStatus: updateStatus } = createMockReqRes(
      { price: 899 },
      { id: productId }
    );
    await updateProduct(updateReq, updateRes);
    assert.equal(updateStatus(), 200);

    // 3. Order placement now succeeds with authoritative price 899
    const { req: orderReq2, res: orderRes2, getStatus: orderStatus2, getData: orderData2 } = createMockReqRes(orderPayload);
    await createOrder(orderReq2, orderRes2);
    assert.equal(orderStatus2(), 201, "Order must succeed after price confirmation");
    assert.equal(orderData2().data.items[0].price, 899);
    assert.equal(orderData2().data.subtotal, 899);
  });
});
