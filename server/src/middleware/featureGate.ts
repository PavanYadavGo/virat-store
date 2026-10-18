import { Request, Response, NextFunction } from "express";
import { config } from "../config/env.js";

/**
 * Middleware that guards transactional and mutating endpoints behind the BACKEND_FEATURES_ENABLED gate.
 * When disabled (default), endpoints return HTTP 503 Service Unavailable.
 */
export const requireBackendFeatures = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!config.BACKEND_FEATURES_ENABLED) {
    res.status(503).json({
      success: false,
      error: "Backend features are currently disabled by configuration.",
      code: "BACKEND_FEATURES_DISABLED",
    });
    return;
  }
  next();
};

