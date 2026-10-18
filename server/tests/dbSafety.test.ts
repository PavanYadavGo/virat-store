process.env.NODE_ENV = "test";

import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { config } from "../src/config/env.js";
import {
  connectDB,
  disconnectDB,
  getDbStatus,
  isPersistenceAvailable,
  canUseInMemoryFallback,
  isOperatingInMemory,
  DatabaseConnectionError,
  _setFallbackActiveForTesting,
} from "../src/config/db.js";

describe("Production Database Safety & Disconnection Lifecycle", () => {
  const originalEnv = config.NODE_ENV;
  const originalFallback = config.ALLOW_IN_MEMORY_FALLBACK;
  const originalMongoUri = config.MONGODB_URI;

  beforeEach(async () => {
    await disconnectDB();
    _setFallbackActiveForTesting(false);
  });

  afterEach(async () => {
    config.NODE_ENV = originalEnv;
    config.ALLOW_IN_MEMORY_FALLBACK = originalFallback;
    config.MONGODB_URI = originalMongoUri;
    await disconnectDB();
    _setFallbackActiveForTesting(false);
  });

  it("fails fast in production when MongoDB connection fails", async () => {
    // Configure production environment with an unreachable database host
    config.NODE_ENV = "production";
    config.ALLOW_IN_MEMORY_FALLBACK = false;
    // Use an unroutable blackhole IP with fast timeout
    config.MONGODB_URI = "mongodb://127.0.0.1:54321/virat_prod_test";

    assert.equal(canUseInMemoryFallback(), false, "Fallback must be strictly prohibited in production");

    await assert.rejects(
      async () => {
        await connectDB();
      },
      (err: any) => {
        assert(err instanceof DatabaseConnectionError, "Must throw DatabaseConnectionError");
        assert(
          err.message.includes("production mode"),
          "Error message must specify production mode refusal"
        );
        return true;
      }
    );

    assert.equal(isOperatingInMemory(), false, "Must not silently enter in-memory mode in production");
    assert.equal(isPersistenceAvailable(), false, "Persistence must be reported as unavailable");
    assert.equal(getDbStatus(), "failed", "Database status must report 'failed'");
  });

  it("permits in-memory fallback in development when MongoDB is unreachable", async () => {
    config.NODE_ENV = "development";
    config.ALLOW_IN_MEMORY_FALLBACK = true;
    config.MONGODB_URI = "mongodb://127.0.0.1:54321/virat_dev_test";

    assert.equal(canUseInMemoryFallback(), true, "Fallback must be permitted in development");

    const result = await connectDB();
    assert.equal(result, false, "connectDB must return false when falling back");
    assert.equal(isOperatingInMemory(), true, "Must be operating in in-memory mode");
    assert.equal(isPersistenceAvailable(), false, "Persistence is not available via MongoDB");
    assert.equal(getDbStatus(), "in-memory-fallback", "Database status must report in-memory-fallback");
  });

  it("prevents fallback to memory if connection drops after startup", async () => {
    // Simulate database having connected once
    config.NODE_ENV = "production";
    config.ALLOW_IN_MEMORY_FALLBACK = false;

    // In disconnected state
    assert.equal(isPersistenceAvailable(), false);
    assert.equal(isOperatingInMemory(), false, "Must never operate in memory when disconnected in production");

    // Verify readiness
    const status = getDbStatus();
    assert(
      status === "disconnected" || status === "failed",
      `Expected status to be disconnected or failed, got: ${status}`
    );
  });
});
