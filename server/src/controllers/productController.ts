import { Request, Response } from "express";
import crypto from "crypto";
import { ProductModel } from "../models/Product.js";
import {
  isPersistenceAvailable,
  isOperatingInMemory,
} from "../config/db.js";
import { memoryStore, StoreProduct } from "../config/memoryStore.js";

// Helper: check if a string is a valid 24-character hexadecimal MongoDB ObjectId
export const is24HexObjectId = (val: string): boolean => {
  return typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val);
};

// Helper: build query matching by slug id or MongoDB _id if 24-hex
export const buildProductLookupQuery = (identifier: string) => {
  if (is24HexObjectId(identifier)) {
    return { $or: [{ id: identifier }, { _id: identifier }] };
  }
  return { id: identifier };
};

// Helper: find in memoryStore by slug id or _id
export const findInMemoryProduct = (identifier: string): StoreProduct | undefined => {
  const isHex = is24HexObjectId(identifier);
  return memoryStore.products.find(
    (p) => p.id === identifier || (isHex && p._id === identifier)
  );
};

// GET /api/products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, subcategory, activeOnly } = req.query;
    const shouldFilterActive = activeOnly !== "false";

    if (isPersistenceAvailable()) {
      const query: any = {};
      if (shouldFilterActive) query.isActive = true;
      if (category) query.category = new RegExp(`^${category}$`, "i");
      if (subcategory) query.subcategory = new RegExp(`^${subcategory}$`, "i");

      const products = await ProductModel.find(query).sort({ createdAt: -1 });
      res.json({ success: true, count: products.length, data: products });
      return;
    }

    if (isOperatingInMemory()) {
      let items = memoryStore.products;
      if (shouldFilterActive) {
        items = items.filter((p) => p.isActive);
      }
      if (category) {
        items = items.filter(
          (p) => p.category.toLowerCase() === String(category).toLowerCase()
        );
      }
      if (subcategory) {
        items = items.filter(
          (p) => p.subcategory?.toLowerCase() === String(subcategory).toLowerCase()
        );
      }

      res.json({ success: true, count: items.length, data: items });
      return;
    }

    res.status(503).json({
      success: false,
      error: "Service temporarily unavailable. Database connection is down.",
      code: "DATABASE_UNAVAILABLE",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/products/:id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      res.status(400).json({ success: false, error: "Invalid product identifier" });
      return;
    }

    if (isPersistenceAvailable()) {
      const product = await ProductModel.findOne(buildProductLookupQuery(id));

      if (!product) {
        res.status(404).json({ success: false, error: "Product not found" });
        return;
      }

      res.json({ success: true, data: product });
      return;
    }

    if (isOperatingInMemory()) {
      const item = findInMemoryProduct(id);
      if (!item) {
        res.status(404).json({ success: false, error: "Product not found" });
        return;
      }

      res.json({ success: true, data: item });
      return;
    }

    res.status(503).json({
      success: false,
      error: "Service temporarily unavailable. Database connection is down.",
      code: "DATABASE_UNAVAILABLE",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST /api/admin/products
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isPersistenceAvailable() && !isOperatingInMemory()) {
      res.status(503).json({
        success: false,
        error: "Service temporarily unavailable. Product modifications require database persistence.",
        code: "DATABASE_UNAVAILABLE",
      });
      return;
    }

    const {
      name,
      category,
      subcategory,
      price,
      description,
      features,
      images,
      badge,
      sizes,
      stock,
      isActive,
    } = req.body;

    if (!name || !category || price === undefined || !description) {
      res.status(400).json({
        success: false,
        error: "Missing required fields: name, category, price, description",
      });
      return;
    }

    if (
      price === null ||
      price === "" ||
      (typeof price === "string" && price.trim() === "")
    ) {
      res.status(400).json({
        success: false,
        error: "Invalid price: price cannot be empty or null",
      });
      return;
    }

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      res.status(400).json({
        success: false,
        error: "Invalid price: price must be a valid non-negative number",
      });
      return;
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const uniqueId = `${slug}-${Date.now().toString().slice(-4)}`;
    const randomHexId = crypto.randomBytes(12).toString("hex");

    const priceUnconfirmed =
      req.body.priceUnconfirmed !== undefined
        ? Boolean(req.body.priceUnconfirmed) || parsedPrice <= 0
        : parsedPrice <= 0;

    const newProductData = {
      _id: randomHexId,
      id: uniqueId,
      name,
      category,
      subcategory,
      price: parsedPrice,
      priceUnconfirmed,
      description,
      features: Array.isArray(features) ? features : [],
      images: Array.isArray(images) && images.length > 0 ? images : ["/src/assets/products/performance-tee.png"],
      badge: badge || undefined,
      sizes: Array.isArray(sizes) && sizes.length > 0 ? sizes : ["XS", "S", "M", "L", "XL", "XXL"],
      stock: stock !== undefined ? Number(stock) : 50,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isPersistenceAvailable()) {
      const created = await ProductModel.create(newProductData);
      res.status(201).json({ success: true, data: created });
      return;
    }

    // In-memory fallback
    memoryStore.products.unshift(newProductData);
    res.status(201).json({ success: true, data: newProductData });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /api/admin/products/:id
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isPersistenceAvailable() && !isOperatingInMemory()) {
      res.status(503).json({
        success: false,
        error: "Service temporarily unavailable. Product modifications require database persistence.",
        code: "DATABASE_UNAVAILABLE",
      });
      return;
    }

    const { id } = req.params;
    if (!id || typeof id !== "string") {
      res.status(400).json({ success: false, error: "Invalid product identifier" });
      return;
    }

    // Verify product exists
    let existingProduct: any = null;
    if (isPersistenceAvailable()) {
      existingProduct = await ProductModel.findOne(buildProductLookupQuery(id));
    } else if (isOperatingInMemory()) {
      existingProduct = findInMemoryProduct(id);
    }

    if (!existingProduct) {
      res.status(404).json({ success: false, error: "Product not found" });
      return;
    }

    const updates: any = { ...req.body, updatedAt: new Date() };

    // Deliberate price validation & price confirmation handling
    if ("price" in req.body) {
      const rawPrice = req.body.price;
      if (
        rawPrice === null ||
        rawPrice === "" ||
        (typeof rawPrice === "string" && rawPrice.trim() === "")
      ) {
        res.status(400).json({
          success: false,
          error: "Invalid price: price cannot be empty or null",
        });
        return;
      }

      const parsedPrice = Number(rawPrice);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        res.status(400).json({
          success: false,
          error: "Invalid price: price must be a valid non-negative number",
        });
        return;
      }

      updates.price = parsedPrice;

      if (parsedPrice === 0) {
        // Numeric zero is strictly unconfirmed according to pricing rules
        updates.priceUnconfirmed = true;
      } else {
        // Positive valid price (> 0)
        // If priceUnconfirmed was explicitly passed, honor it; otherwise mark as confirmed
        updates.priceUnconfirmed =
          req.body.priceUnconfirmed !== undefined
            ? Boolean(req.body.priceUnconfirmed)
            : false;
      }
    } else if ("priceUnconfirmed" in req.body) {
      const desiredUnconfirmed = Boolean(req.body.priceUnconfirmed);
      if (!desiredUnconfirmed && existingProduct.price <= 0) {
        res.status(400).json({
          success: false,
          error: "Cannot confirm price: product price is zero or unconfirmed",
        });
        return;
      }
      updates.priceUnconfirmed = desiredUnconfirmed;
    }

    // Ensure stock is numeric if provided
    if ("stock" in req.body && req.body.stock !== undefined) {
      const parsedStock = Number(req.body.stock);
      if (!isNaN(parsedStock) && parsedStock >= 0) {
        updates.stock = parsedStock;
      }
    }

    if (isPersistenceAvailable()) {
      const updated = await ProductModel.findOneAndUpdate(
        buildProductLookupQuery(id),
        updates,
        { new: true, runValidators: true }
      );

      if (!updated) {
        res.status(404).json({ success: false, error: "Product not found" });
        return;
      }

      res.json({ success: true, data: updated });
      return;
    }

    // Fallback memory store
    const isHex = is24HexObjectId(id);
    const index = memoryStore.products.findIndex(
      (p) => p.id === id || (isHex && p._id === id)
    );
    if (index === -1) {
      res.status(404).json({ success: false, error: "Product not found" });
      return;
    }

    memoryStore.products[index] = {
      ...memoryStore.products[index],
      ...updates,
      id: memoryStore.products[index].id, // preserve id
      _id: memoryStore.products[index]._id, // preserve _id
    };

    res.json({ success: true, data: memoryStore.products[index] });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE /api/admin/products/:id
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isPersistenceAvailable() && !isOperatingInMemory()) {
      res.status(503).json({
        success: false,
        error: "Service temporarily unavailable. Product modifications require database persistence.",
        code: "DATABASE_UNAVAILABLE",
      });
      return;
    }

    const { id } = req.params;

    if (isPersistenceAvailable()) {
      const deleted = await ProductModel.findOneAndDelete(buildProductLookupQuery(id));

      if (!deleted) {
        res.status(404).json({ success: false, error: "Product not found" });
        return;
      }

      res.json({ success: true, message: "Product deleted successfully" });
      return;
    }

    const isHex = is24HexObjectId(id);
    const index = memoryStore.products.findIndex(
      (p) => p.id === id || (isHex && p._id === id)
    );
    if (index === -1) {
      res.status(404).json({ success: false, error: "Product not found" });
      return;
    }

    memoryStore.products.splice(index, 1);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
