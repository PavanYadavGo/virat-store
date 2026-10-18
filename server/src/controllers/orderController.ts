import { Request, Response } from "express";
import { OrderModel, IOrderItem } from "../models/Order.js";
import { ProductModel } from "../models/Product.js";
import { getIsConnected } from "../config/db.js";
import { memoryStore, StoreOrder } from "../config/memoryStore.js";

// Helper to generate readable Order ID
const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

// POST /api/orders
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customer, shippingAddress, items } = req.body;

    // Validate customer
    if (!customer?.fullName || !customer?.email || !customer?.phone) {
      res.status(400).json({
        success: false,
        error: "Missing customer details (fullName, email, phone required)",
      });
      return;
    }

    // Validate shipping address
    if (
      !shippingAddress?.street ||
      !shippingAddress?.city ||
      !shippingAddress?.state ||
      !shippingAddress?.postalCode
    ) {
      res.status(400).json({
        success: false,
        error: "Missing shipping address fields (street, city, state, postalCode required)",
      });
      return;
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        success: false,
        error: "Order must contain at least one item",
      });
      return;
    }

    // Authoritative Server-Side Price & Product Verification
    const verifiedItems: IOrderItem[] = [];
    let calculatedSubtotal = 0;

    for (const item of items) {
      const quantity = Math.max(1, parseInt(item.quantity || 1, 10));
      const productId = item.productId || item.id;
      const size = item.size || "M";

      let matchedProduct: any = null;

      if (getIsConnected()) {
        matchedProduct = await ProductModel.findOne({
          $or: [{ id: productId }, { _id: productId.match(/^[0-9a-fA-F]{24}$/) ? productId : null }],
        });
      } else {
        matchedProduct = memoryStore.products.find((p) => p.id === productId);
      }

      if (!matchedProduct) {
        res.status(400).json({
          success: false,
          error: `Product with ID "${productId}" is no longer available or does not exist.`,
        });
        return;
      }

      if (!matchedProduct.isActive) {
        res.status(400).json({
          success: false,
          error: `Product "${matchedProduct.name}" is currently inactive.`,
        });
        return;
      }

      if (matchedProduct.price <= 0 || matchedProduct.priceUnconfirmed) {
        res.status(400).json({
          success: false,
          error: `Product "${matchedProduct.name}" has unconfirmed commercial pricing and cannot be ordered online yet.`,
        });
        return;
      }

      // Security Invariant: Always use authoritative server price, ignore client-sent price
      const unitPrice = matchedProduct.price;
      calculatedSubtotal += unitPrice * quantity;

      verifiedItems.push({
        productId: matchedProduct.id,
        name: matchedProduct.name,
        price: unitPrice,
        size: size,
        quantity: quantity,
        image: matchedProduct.images?.[0] || "",
      });
    }

    // Calculate shipping: Free over ₹1,500, else ₹99
    const shippingFee = calculatedSubtotal >= 1500 ? 0 : 99;
    const finalTotal = calculatedSubtotal + shippingFee;
    const orderId = generateOrderId();

    const orderData: StoreOrder = {
      orderId,
      customer: {
        fullName: customer.fullName.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
      },
      shippingAddress: {
        street: shippingAddress.street.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        postalCode: shippingAddress.postalCode.trim(),
        country: shippingAddress.country?.trim() || "India",
      },
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      shippingFee,
      total: finalTotal,
      orderStatus: "placed",
      paymentStatus: "pending_payment", // Invariant: strict unpaid status
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (getIsConnected()) {
      const createdOrder = await OrderModel.create(orderData);
      res.status(201).json({
        success: true,
        message: "Order placed successfully (Payment Pending)",
        data: createdOrder,
      });
      return;
    }

    // In-memory fallback
    memoryStore.orders.unshift(orderData);
    res.status(201).json({
      success: true,
      message: "Order placed successfully (Payment Pending)",
      data: orderData,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/orders/:orderId
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;

    if (getIsConnected()) {
      const order = await OrderModel.findOne({ orderId });
      if (!order) {
        res.status(404).json({ success: false, error: "Order not found" });
        return;
      }
      res.json({ success: true, data: order });
      return;
    }

    const order = memoryStore.orders.find((o) => o.orderId === orderId);
    if (!order) {
      res.status(404).json({ success: false, error: "Order not found" });
      return;
    }

    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/admin/orders (Admin Only)
export const getAdminOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (getIsConnected()) {
      const orders = await OrderModel.find().sort({ createdAt: -1 });
      res.json({ success: true, count: orders.length, data: orders });
      return;
    }

    res.json({
      success: true,
      count: memoryStore.orders.length,
      data: memoryStore.orders,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /api/admin/orders/:orderId/status (Admin Only)
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    // Security Invariant: Reject any attempt to fraudulently set paymentStatus to 'paid'
    if (paymentStatus && paymentStatus !== "pending_payment") {
      res.status(400).json({
        success: false,
        error: "Security Policy Violation: Online payment integration is not active. Orders cannot be marked as paid.",
      });
      return;
    }

    const validStatuses = ["placed", "processing", "shipped", "delivered", "cancelled"];
    if (orderStatus && !validStatuses.includes(orderStatus)) {
      res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
      return;
    }

    if (getIsConnected()) {
      const updated = await OrderModel.findOneAndUpdate(
        { orderId },
        { orderStatus, updatedAt: new Date() },
        { new: true }
      );

      if (!updated) {
        res.status(404).json({ success: false, error: "Order not found" });
        return;
      }

      res.json({ success: true, data: updated });
      return;
    }

    // Memory Store
    const index = memoryStore.orders.findIndex((o) => o.orderId === orderId);
    if (index === -1) {
      res.status(404).json({ success: false, error: "Order not found" });
      return;
    }

    memoryStore.orders[index] = {
      ...memoryStore.orders[index],
      orderStatus: orderStatus || memoryStore.orders[index].orderStatus,
      updatedAt: new Date(),
    };

    res.json({ success: true, data: memoryStore.orders[index] });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

