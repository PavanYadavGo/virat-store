import { Router } from "express";
import { adminLogin, getAdminStats } from "../controllers/adminController.js";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { getAdminOrders, updateOrderStatus } from "../controllers/orderController.js";
import { getAdminContacts } from "../controllers/contactController.js";
import {
  getAdminActionVideos,
  createActionVideo,
  updateActionVideo,
  deleteActionVideo,
  reorderActionVideos,
} from "../controllers/actionVideoController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// Public Admin Login
router.post("/login", adminLogin);

// Protected Admin Routes
router.use(requireAdmin);

// Dashboard Statistics
router.get("/stats", getAdminStats);

// Product Management
router.get("/products", (req, res, next) => {
  // Allow admin to see all products including inactive ones
  req.query.activeOnly = "false";
  getProducts(req, res);
});
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Order Management
router.get("/orders", getAdminOrders);
router.put("/orders/:orderId/status", updateOrderStatus);

// Inquiries Management
router.get("/contacts", getAdminContacts);

// Action Video Management (See It in Action)
router.get("/action-videos", getAdminActionVideos);
router.post("/action-videos", createActionVideo);
router.put("/action-videos/reorder", reorderActionVideos);
router.put("/action-videos/:id", updateActionVideo);
router.delete("/action-videos/:id", deleteActionVideo);

export default router;

