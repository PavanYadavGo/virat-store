process.env.NODE_ENV = "test";

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import jwt from "jsonwebtoken";
import { config } from "../src/config/env.js";
import {
  disconnectDB,
  _setFallbackActiveForTesting,
} from "../src/config/db.js";
import {
  memoryStore,
  resetMemoryStoreForTesting,
} from "../src/config/memoryStore.js";
import { app, ALLOWED_ORIGINS } from "../src/index.js";

describe("Production CORS Policy & Preflight Suite", () => {
  let server: http.Server;
  let baseUrl: string;
  let adminToken: string;

  const PRODUCTION_ORIGINS = [
    "https://www.viratsports.in",
    "https://viratsports.in",
    "https://virat-store.vercel.app",
  ];

  const DEV_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ];

  const UNAPPROVED_ORIGINS = [
    "https://malicious-site.com",
    "https://evil-attacker.org",
    "http://localhost:8080",
  ];

  before(async () => {
    _setFallbackActiveForTesting(true);
    process.env.BACKEND_FEATURES_ENABLED = "true";

    if (memoryStore.admins.length === 0) {
      memoryStore.admins.push({
        email: config.INITIAL_ADMIN_EMAIL.toLowerCase(),
        passwordHash: "dummy-hash",
        name: "Store Administrator",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    adminToken = jwt.sign(
      { email: config.INITIAL_ADMIN_EMAIL.toLowerCase(), role: "admin" },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

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
    await disconnectDB();
    _setFallbackActiveForTesting(false);
    resetMemoryStoreForTesting();
    if (server && server.listening) {
      await new Promise<void>((resolve) => {
        server.close(() => resolve());
      });
    }
  });

  it("verifies explicit origin allowlist contains all required production and local origins without wildcards", () => {
    assert.equal(ALLOWED_ORIGINS.includes("*"), false, "Wildcard '*' must never be in allowlist");
    for (const prodOrigin of PRODUCTION_ORIGINS) {
      assert.equal(
        ALLOWED_ORIGINS.includes(prodOrigin),
        true,
        `Production origin ${prodOrigin} must be in ALLOWED_ORIGINS`
      );
    }
    for (const devOrigin of DEV_ORIGINS) {
      assert.equal(
        ALLOWED_ORIGINS.includes(devOrigin),
        true,
        `Development origin ${devOrigin} must be in ALLOWED_ORIGINS`
      );
    }
  });

  it("GET /api/action-videos grants CORS headers to all three allowed production origins", async () => {
    for (const origin of PRODUCTION_ORIGINS) {
      const res = await fetch(`${baseUrl}/api/action-videos`, {
        headers: { Origin: origin },
      });
      assert.equal(res.status, 200);
      assert.equal(
        res.headers.get("access-control-allow-origin"),
        origin,
        `Must return Access-Control-Allow-Origin: ${origin}`
      );
      assert.equal(
        res.headers.get("access-control-allow-credentials"),
        "true",
        "Must return Access-Control-Allow-Credentials: true"
      );
      assert.equal(
        res.headers.get("vary"),
        "Origin",
        "Must include Vary: Origin"
      );
      const json: any = await res.json();
      assert.equal(json.success, true);
    }
  });

  it("OPTIONS preflight succeeds with correct methods and headers for production origins", async () => {
    for (const origin of PRODUCTION_ORIGINS) {
      const res = await fetch(`${baseUrl}/api/action-videos`, {
        method: "OPTIONS",
        headers: {
          Origin: origin,
          "Access-Control-Request-Method": "GET",
          "Access-Control-Request-Headers": "Authorization, Content-Type",
        },
      });

      // Standard CORS preflight responds with 204 No Content
      assert.equal(res.status, 204);
      assert.equal(
        res.headers.get("access-control-allow-origin"),
        origin,
        `Preflight must reflect allowed origin: ${origin}`
      );
      assert.equal(
        res.headers.get("access-control-allow-credentials"),
        "true",
        "Preflight must allow credentials"
      );

      const allowedMethods = res.headers.get("access-control-allow-methods") || "";
      assert(allowedMethods.includes("GET"), "Methods must include GET");
      assert(allowedMethods.includes("POST"), "Methods must include POST");
      assert(allowedMethods.includes("PUT"), "Methods must include PUT");
      assert(allowedMethods.includes("PATCH"), "Methods must include PATCH");
      assert(allowedMethods.includes("DELETE"), "Methods must include DELETE");
      assert(allowedMethods.includes("OPTIONS"), "Methods must include OPTIONS");

      const allowedHeaders = res.headers.get("access-control-allow-headers") || "";
      assert(
        allowedHeaders.toLowerCase().includes("authorization"),
        "Headers must include Authorization"
      );
      assert(
        allowedHeaders.toLowerCase().includes("content-type"),
        "Headers must include Content-Type"
      );
    }
  });

  it("strictly denies CORS headers to unapproved origins", async () => {
    for (const unapproved of UNAPPROVED_ORIGINS) {
      // 1. GET request from unapproved origin
      const getRes = await fetch(`${baseUrl}/api/action-videos`, {
        headers: { Origin: unapproved },
      });
      assert.equal(
        getRes.headers.get("access-control-allow-origin"),
        null,
        `Unapproved origin ${unapproved} must not receive Access-Control-Allow-Origin header`
      );

      // 2. Preflight OPTIONS request from unapproved origin
      const optRes = await fetch(`${baseUrl}/api/action-videos`, {
        method: "OPTIONS",
        headers: {
          Origin: unapproved,
          "Access-Control-Request-Method": "GET",
        },
      });
      assert.equal(
        optRes.headers.get("access-control-allow-origin"),
        null,
        `Unapproved origin ${unapproved} preflight must not receive Access-Control-Allow-Origin header`
      );
    }
  });

  it("admin endpoints still require valid JWT authentication with CORS headers", async () => {
    const prodOrigin = "https://www.viratsports.in";

    // Request without auth header -> 401 Unauthorized, but CORS header is still set for allowed origin
    const unauthRes = await fetch(`${baseUrl}/api/admin/action-videos`, {
      headers: { Origin: prodOrigin },
    });
    assert.equal(unauthRes.status, 401);
    assert.equal(
      unauthRes.headers.get("access-control-allow-origin"),
      prodOrigin
    );

    // Request with valid admin JWT -> 200 OK with CORS header
    const authRes = await fetch(`${baseUrl}/api/admin/action-videos`, {
      headers: {
        Origin: prodOrigin,
        Authorization: `Bearer ${adminToken}`,
      },
    });
    assert.equal(authRes.status, 200);
    assert.equal(
      authRes.headers.get("access-control-allow-origin"),
      prodOrigin
    );
    const json: any = await authRes.json();
    assert.equal(json.success, true);
  });

  it("preserves local development origins (localhost and 127.0.0.1)", async () => {
    for (const devOrigin of DEV_ORIGINS) {
      const res = await fetch(`${baseUrl}/api/action-videos`, {
        headers: { Origin: devOrigin },
      });
      assert.equal(res.status, 200);
      assert.equal(
        res.headers.get("access-control-allow-origin"),
        devOrigin,
        `Local dev origin ${devOrigin} must be granted CORS`
      );
    }
  });
});
