import express from "express";
import cors from "cors";
import { config } from "./config/env.js";
import { connectDB, getIsConnected } from "./config/db.js";
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

// Health Check Endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "virat-store-api",
    timestamp: new Date().toISOString(),
    database: getIsConnected() ? "connected" : "in-memory-fallback",
    environment: config.NODE_ENV,
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
const startServer = async () => {
  await connectDB();

  const server = app.listen(config.PORT, () => {
    console.log(`
=====================================================
  VIRAT STORE API SERVER RUNNING
  Port: ${config.PORT}
  Environment: ${config.NODE_ENV}
  Health check: http://localhost:${config.PORT}/api/health
=====================================================
    `);
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
};

startServer().catch((err) => {
  console.error("[FATAL STARTUP ERROR]", err);
  process.exit(1);
});

export default app;

