import { Request, Response } from "express";
import { ProductModel } from "../models/Product.js";
import { getIsConnected } from "../config/db.js";
import { memoryStore } from "../config/memoryStore.js";

// GET /api/products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, subcategory, activeOnly } = req.query;
    const shouldFilterActive = activeOnly !== "false";

    if (getIsConnected()) {
      const query: any = {};
      if (shouldFilterActive) query.isActive = true;
      if (category) query.category = new RegExp(`^${category}$`, "i");
      if (subcategory) query.subcategory = new RegExp(`^${subcategory}$`, "i");

      const products = await ProductModel.find(query).sort({ createdAt: -1 });
      res.json({ success: true, count: products.length, data: products });
      return;
    }

    // Fallback memory store
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
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/products/:id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const product = await ProductModel.findOne({
        $or: [{ id: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });

      if (!product) {
        res.status(404).json({ success: false, error: "Product not found" });
        return;
      }

      res.json({ success: true, data: product });
      return;
    }

    // Fallback memory store
    const item = memoryStore.products.find((p) => p.id === id);
    if (!item) {
      res.status(404).json({ success: false, error: "Product not found" });
      return;
    }

    res.json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST /api/admin/products
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
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

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const uniqueId = `${slug}-${Date.now().toString().slice(-4)}`;

    const newProductData = {
      id: uniqueId,
      name,
      category,
      subcategory,
      price: Number(price),
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

    if (getIsConnected()) {
      const created = await ProductModel.create(newProductData);
      res.status(201).json({ success: true, data: created });
      return;
    }

    memoryStore.products.unshift(newProductData);
    res.status(201).json({ success: true, data: newProductData });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /api/admin/products/:id
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date() };

    if (getIsConnected()) {
      const updated = await ProductModel.findOneAndUpdate(
        { $or: [{ id: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        updates,
        { new: true }
      );

      if (!updated) {
        res.status(404).json({ success: false, error: "Product not found" });
        return;
      }

      res.json({ success: true, data: updated });
      return;
    }

    // Fallback memory store
    const index = memoryStore.products.findIndex((p) => p.id === id);
    if (index === -1) {
      res.status(404).json({ success: false, error: "Product not found" });
      return;
    }

    memoryStore.products[index] = {
      ...memoryStore.products[index],
      ...updates,
      id: memoryStore.products[index].id, // preserve id
    };

    res.json({ success: true, data: memoryStore.products[index] });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE /api/admin/products/:id
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const deleted = await ProductModel.findOneAndDelete({
        $or: [{ id: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });

      if (!deleted) {
        res.status(404).json({ success: false, error: "Product not found" });
        return;
      }

      res.json({ success: true, message: "Product deleted successfully" });
      return;
    }

    const index = memoryStore.products.findIndex((p) => p.id === id);
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

