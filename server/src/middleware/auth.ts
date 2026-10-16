import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { getIsConnected } from "../config/db.js";
import { AdminModel } from "../models/Admin.js";
import { memoryStore } from "../config/memoryStore.js";

export interface AuthRequest extends Request {
  admin?: {
    email: string;
    role: string;
  };
}

export const requireAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: "Unauthorized: Missing or invalid Authorization header",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_SECRET) as {
      email: string;
      role: string;
    };

    if (!decoded || decoded.role !== "admin") {
      res.status(403).json({
        success: false,
        error: "Forbidden: Administrative access required",
      });
      return;
    }

    // Verify admin existence in database or memory store
    if (getIsConnected()) {
      const adminDoc = await AdminModel.findOne({ email: decoded.email.toLowerCase() });
      if (!adminDoc) {
        res.status(401).json({ success: false, error: "Unauthorized: Admin account not found" });
        return;
      }
    } else {
      const memAdmin = memoryStore.admins.find(
        (a) => a.email.toLowerCase() === decoded.email.toLowerCase()
      );
      if (!memAdmin) {
        res.status(401).json({ success: false, error: "Unauthorized: Admin account not found" });
        return;
      }
    }

    req.admin = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: "Unauthorized: Token expired or invalid",
    });
  }
};

