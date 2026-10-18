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
  createOrder,
  getOrderById,
  updateOrderStatus,
} from "../src/controllers/orderController.js";
import { submitContactForm } from "../src/controllers/contactController.js";
import { adminLogin } from "../src/controllers/adminController.js";
import { getProductById } from "../src/controllers/productController.js";
import { app } from "../src/index.js";

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

describe("Order Safety, Database Outages & Readiness Checks", () => {
  const originalEnv = config.NODE_ENV;
  const originalFallback = config.ALLOW_IN_MEMORY_FALLBACK;

  beforeEach(async () => {
    await disconnectDB();
    _setFallbackActiveForTesting(false);
    resetMemoryStoreForTesting();
  });

  afterEach(async () => {
    config.NODE_ENV = originalEnv;
    config.ALLOW_IN_MEMORY_FALLBACK = originalFallback;
    await disconnectDB();
    _setFallbackActiveForTesting(false);
    resetMemoryStoreForTesting();
  });

  it("strictly rejects order creation with HTTP 503 during database outage when fallback is disallowed", async () => {
    config.NODE_ENV = "production";
    config.ALLOW_IN_MEMORY_FALLBACK = false;
    _setFallbackActiveForTesting(false);

    const { req, res, getStatus, getData } = createMockReqRes({
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
      items: [
        {
          productId: "virat-classic-cap-black",
          quantity: 1,
        },
      ],
    });

    await createOrder(req, res);

    assert.equal(getStatus(), 503, "Must return HTTP 503 Service Unavailable");
    const data = getData();
    assert.equal(data.success, false);
    assert.equal(data.code, "DATABASE_UNAVAILABLE");
    assert.equal(memoryStore.orders.length, 0, "No orders may be written to volatile memory during an outage");
  });

  it("strictly rejects contact form submissions with HTTP 503 during database outage", async () => {
    config.NODE_ENV = "production";
    config.ALLOW_IN_MEMORY_FALLBACK = false;
    _setFallbackActiveForTesting(false);

    const { req, res, getStatus, getData } = createMockReqRes({
      name: "Enquiry Sender",
      email: "sender@example.com",
      subject: "Wholesale Inquiry",
      message: "Looking for wholesale sports apparel pricing and bulk delivery.",
    });

    await submitContactForm(req, res);

    assert.equal(getStatus(), 503);
    const data = getData();
    assert.equal(data.success, false);
    assert.equal(data.code, "DATABASE_UNAVAILABLE");
    assert.equal(memoryStore.contacts.length, 0, "No contacts may be written to volatile memory during an outage");
  });

  it("strictly rejects admin authentication with HTTP 503 during database outage", async () => {
    config.NODE_ENV = "production";
    config.ALLOW_IN_MEMORY_FALLBACK = false;
    _setFallbackActiveForTesting(false);

    const { req, res, getStatus, getData } = createMockReqRes({
      email: "admin@viratsports.com",
      password: "TestPassword123",
    });

    await adminLogin(req, res);

    assert.equal(getStatus(), 503);
    const data = getData();
    assert.equal(data.success, false);
    assert.equal(data.code, "DATABASE_UNAVAILABLE");
  });

  it("strictly rejects purchasing unconfirmed-price products with HTTP 400 in permitted local dev fallback", async () => {
    config.NODE_ENV = "development";
    config.ALLOW_IN_MEMORY_FALLBACK = true;
    _setFallbackActiveForTesting(true);

    const { req, res, getStatus, getData } = createMockReqRes({
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
      items: [
        {
          productId: "virat-classic-cap-black", // priceUnconfirmed: true
          quantity: 1,
        },
      ],
    });

    await createOrder(req, res);

    assert.equal(getStatus(), 400, "Must return HTTP 400 Bad Request");
    const data = getData();
    assert.equal(data.success, false);
    assert(
      data.error.includes("unconfirmed commercial pricing"),
      `Error must mention unconfirmed pricing, got: ${data.error}`
    );
    assert.equal(memoryStore.orders.length, 0, "Order must not be recorded");
  });

  it("enforces authoritative server pricing when purchasing confirmed test products in memory fallback", async () => {
    config.NODE_ENV = "development";
    config.ALLOW_IN_MEMORY_FALLBACK = true;
    _setFallbackActiveForTesting(true);

    // Add a confirmed product to memory store for test
    const testProductId = "test-verified-jersey";
    memoryStore.products.push({
      id: testProductId,
      _id: "111122223333444455556666",
      name: "Test Verified Jersey",
      category: "Apparel",
      price: 1999, // Authoritative price: ₹1,999
      priceUnconfirmed: false,
      description: "Test description",
      features: [],
      images: ["/test.png"],
      sizes: ["M", "L"],
      stock: 10,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Client maliciously attempts to send price: 1
    const { req, res, getStatus, getData } = createMockReqRes({
      customer: {
        fullName: "Jane Doe",
        email: "jane@example.com",
        phone: "+91 9876543210",
      },
      shippingAddress: {
        street: "456 Marine Drive",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400020",
      },
      items: [
        {
          productId: testProductId,
          price: 1, // Malicious spoofed price
          quantity: 2,
        },
      ],
    });

    await createOrder(req, res);

    assert.equal(getStatus(), 201, "Order should be placed successfully");
    const data = getData();
    assert.equal(data.success, true);
    assert.equal(data.data.subtotal, 1999 * 2, "Server must use authoritative price (1999 * 2 = 3998)");
    assert.equal(data.data.total, 1999 * 2, "Free shipping over ₹1500");
    assert.equal(data.data.paymentStatus, "pending_payment");
    assert.equal(memoryStore.orders.length, 1);
  });
});
