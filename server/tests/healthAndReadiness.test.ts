process.env.NODE_ENV = "test";

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { config } from "../src/config/env.js";
import { app } from "../src/index.js";
import {
  disconnectDB,
  _setFallbackActiveForTesting,
} from "../src/config/db.js";

describe("Health & Readiness HTTP Probes", () => {
  let server: http.Server;
  let baseUrl: string;
  const originalEnv = config.NODE_ENV;
  const originalFallback = config.ALLOW_IN_MEMORY_FALLBACK;

  before(async () => {
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
    config.NODE_ENV = originalEnv;
    config.ALLOW_IN_MEMORY_FALLBACK = originalFallback;
    await disconnectDB();
    _setFallbackActiveForTesting(false);
    if (server && server.listening) {
      await new Promise<void>((resolve) => {
        server.close(() => resolve());
      });
    }
  });

  it("GET /api/health returns HTTP 200 with diagnostics", async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const body: any = await res.json();
    assert.equal(body.status, "ok");
    assert.equal(body.service, "virat-store-api");
    assert(body.timestamp);
    assert(body.database);
    assert(body.persistence);
  });

  it("GET /api/ready returns HTTP 503 in production during database outage", async () => {
    config.NODE_ENV = "production";
    config.ALLOW_IN_MEMORY_FALLBACK = false;
    _setFallbackActiveForTesting(false);
    await disconnectDB();

    const res = await fetch(`${baseUrl}/api/ready`);
    assert.equal(res.status, 503, "Must return HTTP 503 in production without live database");
    const body: any = await res.json();
    assert.equal(body.ready, false);
    assert.equal(body.status, "not_ready");
    assert.equal(body.mode, "production");
  });

  it("GET /api/ready returns HTTP 200 in development when in-memory fallback is active", async () => {
    config.NODE_ENV = "development";
    config.ALLOW_IN_MEMORY_FALLBACK = true;
    _setFallbackActiveForTesting(true);

    const res = await fetch(`${baseUrl}/api/ready`);
    assert.equal(res.status, 200, "Must return HTTP 200 in development fallback mode");
    const body: any = await res.json();
    assert.equal(body.ready, true);
    assert.equal(body.status, "ready");
    assert.equal(body.mode, "in-memory-fallback");
  });
});
