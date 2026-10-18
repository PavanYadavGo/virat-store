import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { AdminModel } from "../models/Admin.js";
import { ProductModel } from "../models/Product.js";
import { OrderModel } from "../models/Order.js";
import { ContactMessageModel } from "../models/ContactMessage.js";
import { isPersistenceAvailable, isOperatingInMemory } from "../config/db.js";
import { memoryStore } from "../config/memoryStore.js";

// POST /api/admin/login
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isPersistenceAvailable() && !isOperatingInMemory()) {
      res.status(503).json({
        success: false,
        error: "Admin authentication is temporarily unavailable while database connection is down.",
        code: "DATABASE_UNAVAILABLE",
      });
      return;
    }

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    let adminRecord: any = null;

    if (isPersistenceAvailable()) {
      adminRecord = await AdminModel.findOne({ email: cleanEmail });
    } else if (isOperatingInMemory()) {
      adminRecord = memoryStore.admins.find((a) => a.email.toLowerCase() === cleanEmail);
    }

    if (!adminRecord) {
      res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, adminRecord.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
      return;
    }

    const token = jwt.sign(
      {
        email: adminRecord.email,
        name: adminRecord.name,
        role: adminRecord.role || "admin",
      },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Admin authentication successful",
      token,
      admin: {
        email: adminRecord.email,
        name: adminRecord.name,
        role: adminRecord.role || "admin",
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/admin/stats
export const getAdminStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    let totalProducts = 0;
    let activeProducts = 0;
    let totalOrders = 0;
    let pendingPaymentOrders = 0;
    let totalContacts = 0;

    if (isPersistenceAvailable()) {
      totalProducts = await ProductModel.countDocuments();
      activeProducts = await ProductModel.countDocuments({ isActive: true });
      totalOrders = await OrderModel.countDocuments();
      pendingPaymentOrders = await OrderModel.countDocuments({ paymentStatus: "pending_payment" });
      totalContacts = await ContactMessageModel.countDocuments();
    } else if (isOperatingInMemory()) {
      totalProducts = memoryStore.products.length;
      activeProducts = memoryStore.products.filter((p) => p.isActive).length;
      totalOrders = memoryStore.orders.length;
      pendingPaymentOrders = memoryStore.orders.filter(
        (o) => o.paymentStatus === "pending_payment"
      ).length;
      totalContacts = memoryStore.contacts.length;
    } else {
      res.status(503).json({
        success: false,
        error: "Service temporarily unavailable. Database connection is down.",
        code: "DATABASE_UNAVAILABLE",
      });
      return;
    }

    res.json({
      success: true,
      data: {
        totalProducts,
        activeProducts,
        totalOrders,
        pendingPaymentOrders,
        totalContacts,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

