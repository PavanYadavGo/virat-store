import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config/env.js";
import {
  connectDB,
  getIsConnected,
  getDbStatus,
  isPersistenceAvailable,
  isOperatingInMemory,
} from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Security & Middleware
app.use(
  cors({
    origin: [config.CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Request Logger
app.use((req, _res, next) => {
  if (config.NODE_ENV === "development") {
    console.log(`[HTTP] ${req.method} ${req.path}`);
  }
  next();
});

// Health / Liveness Check Endpoint (Answers: Is process alive?)
app.get("/api/health", (_req, res) => {
  const dbStatus = getDbStatus();
  res.json({
    status: "ok",
    service: "virat-store-api",
    timestamp: new Date().toISOString(),
    database: dbStatus,
    persistence: isPersistenceAvailable()
      ? "mongodb"
      : isOperatingInMemory()
      ? "in-memory-fallback"
      : "unavailable",
    environment: config.NODE_ENV,
  });
});

// Readiness Probe Endpoint (Answers: Is server ready to receive and safely persist traffic?)
app.get("/api/ready", (_req, res) => {
  const dbStatus = getDbStatus();
  const persistenceOk = isPersistenceAvailable();
  const memoryFallbackOk = isOperatingInMemory();

  // In production, readiness requires a verified, live database connection
  if (config.NODE_ENV === "production") {
    if (persistenceOk) {
      res.status(200).json({
        status: "ready",
        ready: true,
        database: dbStatus,
        mode: "production",
      });
      return;
    }

    res.status(503).json({
      status: "not_ready",
      ready: false,
      database: dbStatus,
      mode: "production",
      error: "Database persistence is unavailable in production.",
    });
    return;
  }

  // In development / test, ready if database is connected OR in-memory fallback is active
  if (persistenceOk || memoryFallbackOk) {
    res.status(200).json({
      status: "ready",
      ready: true,
      database: dbStatus,
      mode: persistenceOk ? "database" : "in-memory-fallback",
    });
    return;
  }

  res.status(503).json({
    status: "not_ready",
    ready: false,
    database: dbStatus,
    mode: "unavailable",
    error: "No storage backend is currently available.",
  });
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "API endpoint not found",
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Server Startup
export const startServer = async (port: number = config.PORT) => {
  await connectDB();

  return new Promise<any>((resolve, reject) => {
    const server = app.listen(port);

    server.on("listening", () => {
      console.log(`
=====================================================
  VIRAT STORE API SERVER RUNNING
  Port: ${port}
  Environment: ${config.NODE_ENV}
  Health check: http://localhost:${port}/api/health
  Readiness check: http://localhost:${port}/api/ready
=====================================================
      `);
      resolve(server);
    });

    server.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.error(`[FATAL STARTUP ERROR] Port ${port} is already in use by another process.`);
        console.error(`[FATAL STARTUP ERROR] Please terminate the existing process or choose another PORT.`);
      } else {
        console.error(`[FATAL STARTUP ERROR] HTTP Server error: ${err.message}`);
      }
      reject(err);
    });

    // Graceful Shutdown
    const shutdown = () => {
      console.log("[SERVER] Shutting down gracefully...");
      server.close(() => {
        console.log("[SERVER] Process terminated.");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  });
};

// Detect whether this file is executed directly (e.g. node/tsx src/index.ts) vs imported by test suites
const isMainModule = (): boolean => {
  if (!process.argv[1]) return false;
  try {
    const currentPath = fileURLToPath(import.meta.url).toLowerCase();
    const executedPath = path.resolve(process.argv[1]).toLowerCase();
    return currentPath === executedPath;
  } catch {
    return false;
  }
};

// Only launch automatically when executed as the main entry point (not when imported in test suites)
if (isMainModule() && process.env.NODE_ENV !== "test") {
  startServer().catch((err) => {
    console.error("[FATAL STARTUP ERROR]", err.message);
    process.exit(1);
  });
}

export { app };
export default app;

