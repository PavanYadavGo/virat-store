import mongoose from "mongoose";
import { config } from "./env.js";

export type DbConnectionState =
  | "connected"
  | "connecting"
  | "reconnecting"
  | "disconnected"
  | "disconnecting"
  | "failed"
  | "in-memory-fallback";

export class DatabaseConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseConnectionError";
  }
}

let fallbackActive = false;
let hasConnectedOnce = false;
let listenersAttached = false;
let isConnecting = false;

// Sanitize MongoDB URI to prevent leaking credentials in logs
export const sanitizeMongoUri = (uri: string): string => {
  try {
    return uri.replace(/\/\/[^:]+:[^@]+@/, "//***:***@");
  } catch {
    return "[REDACTED_URI]";
  }
};

const attachConnectionListeners = () => {
  if (listenersAttached) return;
  listenersAttached = true;

  mongoose.connection.on("connected", () => {
    hasConnectedOnce = true;
    fallbackActive = false;
    console.log("[DATABASE] MongoDB connection established.");
  });

  mongoose.connection.on("open", () => {
    hasConnectedOnce = true;
    fallbackActive = false;
    console.log("[DATABASE] MongoDB connection opened.");
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("[DATABASE WARNING] MongoDB disconnected.");
  });

  mongoose.connection.on("reconnected", () => {
    hasConnectedOnce = true;
    fallbackActive = false;
    console.log("[DATABASE] MongoDB reconnected successfully.");
  });

  mongoose.connection.on("error", (err: any) => {
    console.error("[DATABASE ERROR] MongoDB connection error:", err.message);
  });

  mongoose.connection.on("close", () => {
    console.log("[DATABASE] MongoDB connection closed.");
  });
};

export const connectDB = async (): Promise<boolean> => {
  attachConnectionListeners();

  // If already connected, return true immediately
  if (mongoose.connection.readyState === 1) {
    hasConnectedOnce = true;
    fallbackActive = false;
    return true;
  }

  isConnecting = true;
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(config.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });

    hasConnectedOnce = true;
    fallbackActive = false;
    isConnecting = false;
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error: any) {
    isConnecting = false;

    // In production or when in-memory fallback is disallowed: fail fast
    if (!canUseInMemoryFallback()) {
      fallbackActive = false;
      console.error(
        `[DATABASE FATAL] Could not connect to MongoDB at "${sanitizeMongoUri(config.MONGODB_URI)}".`
      );
      console.error(`[DATABASE FATAL] Error: ${error.message}`);
      console.error(
        "[DATABASE FATAL] Operating in memory fallback is strictly prohibited in production."
      );
      throw new DatabaseConnectionError(
        `Failed to connect to MongoDB in production mode: ${error.message}`
      );
    }

    // Operating in development / test fallback mode
    fallbackActive = true;
    console.warn(
      `[DATABASE WARNING] Could not connect to MongoDB at "${sanitizeMongoUri(config.MONGODB_URI)}".`
    );
    console.warn(`[DATABASE WARNING] Error: ${error.message}`);
    console.warn(
      "[DATABASE WARNING] Operating in fallback in-memory mode so local development & testing continue uninterrupted."
    );
    return false;
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  fallbackActive = false;
  hasConnectedOnce = false;
  isConnecting = false;
};

// Returns live connection readyState (true only when active)
export const getIsConnected = (): boolean => mongoose.connection.readyState === 1;

export const isPersistenceAvailable = (): boolean => mongoose.connection.readyState === 1;

export const canUseInMemoryFallback = (): boolean => {
  if (config.NODE_ENV === "production") {
    return false;
  }
  return config.ALLOW_IN_MEMORY_FALLBACK;
};

export const isOperatingInMemory = (): boolean => {
  return fallbackActive && !isPersistenceAvailable() && canUseInMemoryFallback();
};

export const getDbStatus = (): DbConnectionState => {
  const readyState = mongoose.connection.readyState;
  if (readyState === 1) {
    return "connected";
  }
  if (readyState === 2) {
    return hasConnectedOnce ? "reconnecting" : "connecting";
  }
  if (readyState === 3) {
    return "disconnecting";
  }
  if (fallbackActive) {
    return "in-memory-fallback";
  }
  if (hasConnectedOnce) {
    return "disconnected";
  }
  if (isConnecting) {
    return "connecting";
  }
  return "failed";
};

// Helper for test suites to toggle fallback state deterministically
export const _setFallbackActiveForTesting = (active: boolean) => {
  fallbackActive = active;
};
