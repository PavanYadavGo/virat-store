process.env.NODE_ENV = "test";

import { describe, it, before, after, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { config, isBackendFeaturesEnabled } from "../src/config/env.js";
import { app } from "../src/index.js";
import {
  disconnectDB,
  _setFallbackActiveForTesting,
} from "../src/config/db.js";

describe("Backend Features Gate (BACKEND_FEATURES_ENABLED)", () => {
  let server: http.Server;
  let baseUrl: string;
  const originalFeaturesEnv = process.env.BACKEND_FEATURES_ENABLED;

  before(async () => {
    _setFallbackActiveForTesting(true);
    await new Promise<void>((resolve, reject) => {
      server = app.listen(0, "127.0.0.1", () => {
        const addr = server.address() as any;
        baseUrl = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
      server.on("error", reject);
    });
  });

  after(async () => {
    process.env.BACKEND_FEATURES_ENABLED = originalFeaturesEnv;
    await disconnectDB();
    _setFallbackActiveForTesting(false);
    if (server && server.listening) {
      await new Promise<void>((resolve) => {
        server.close(() => resolve());
      });
    }
  });

  beforeEach(() => {
    delete process.env.BACKEND_FEATURES_ENABLED;
  });

  afterEach(() => {
    delete process.env.BACKEND_FEATURES_ENABLED;
  });

  it("defaults to false when BACKEND_FEATURES_ENABLED is unset", () => {
    delete process.env.BACKEND_FEATURES_ENABLED;
    assert.equal(isBackendFeaturesEnabled(), false);
    assert.equal(config.BACKEND_FEATURES_ENABLED, false);
  });

  it("strictly validates boolean strings: only 'true' or '1' enable features", () => {
    process.env.BACKEND_FEATURES_ENABLED = "yes";
    assert.equal(config.BACKEND_FEATURES_ENABLED, false);

    process.env.BACKEND_FEATURES_ENABLED = "TRUE";
    assert.equal(config.BACKEND_FEATURES_ENABLED, false);

    process.env.BACKEND_FEATURES_ENABLED = "true";
    assert.equal(config.BACKEND_FEATURES_ENABLED, true);

    process.env.BACKEND_FEATURES_ENABLED = "1";
    assert.equal(config.BACKEND_FEATURES_ENABLED, true);

    process.env.BACKEND_FEATURES_ENABLED = "false";
    assert.equal(config.BACKEND_FEATURES_ENABLED, false);
  });

  it("keeps health, readiness, and product catalog accessible when features are disabled", async () => {
    delete process.env.BACKEND_FEATURES_ENABLED;

    const healthRes = await fetch(`${baseUrl}/api/health`);
    assert.equal(healthRes.status, 200);
    const healthJson: any = await healthRes.json();
    assert.equal(healthJson.status, "ok");
    assert.equal(healthJson.backendFeaturesEnabled, false);

    const readyRes = await fetch(`${baseUrl}/api/ready`);
    assert.equal(readyRes.status, 200);

    const productsRes = await fetch(`${baseUrl}/api/products`);
    assert.equal(productsRes.status, 200);
  });

  it("blocks orders, contact, and admin endpoints with HTTP 503 when features are disabled", async () => {
    delete process.env.BACKEND_FEATURES_ENABLED;

    // POST /api/orders
    const orderPostRes = await fetch(`${baseUrl}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.equal(orderPostRes.status, 503);
    const orderPostJson: any = await orderPostRes.json();
    assert.equal(orderPostJson.code, "BACKEND_FEATURES_DISABLED");
    assert.equal(orderPostJson.success, false);

    // GET /api/orders/:id
    const orderGetRes = await fetch(`${baseUrl}/api/orders/test-id`);
    assert.equal(orderGetRes.status, 503);
    const orderGetJson: any = await orderGetRes.json();
    assert.equal(orderGetJson.code, "BACKEND_FEATURES_DISABLED");

    // POST /api/contact
    const contactRes = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.equal(contactRes.status, 503);
    const contactJson: any = await contactRes.json();
    assert.equal(contactJson.code, "BACKEND_FEATURES_DISABLED");

    // POST /api/admin/login
    const adminLoginRes = await fetch(`${baseUrl}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.equal(adminLoginRes.status, 503);
    const adminLoginJson: any = await adminLoginRes.json();
    assert.equal(adminLoginJson.code, "BACKEND_FEATURES_DISABLED");
  });

  it("allows requests through to handler when BACKEND_FEATURES_ENABLED=true", async () => {
    process.env.BACKEND_FEATURES_ENABLED = "true";

    // When enabled, POST /api/orders reaches controller validation (returns 400 for empty body, not 503)
    const orderRes = await fetch(`${baseUrl}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.equal(orderRes.status, 400, "Should reach order controller validation and return HTTP 400");
    const orderJson: any = await orderRes.json();
    assert.notEqual(orderJson.code, "BACKEND_FEATURES_DISABLED");

    // Health endpoint reports backendFeaturesEnabled: true
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthJson: any = await healthRes.json();
    assert.equal(healthJson.backendFeaturesEnabled, true);
  });
});

