import { Router } from "express";
import { getActionVideos } from "../controllers/actionVideoController.js";

const router = Router();

// GET /api/action-videos — Public endpoint for published videos
router.get("/", getActionVideos);

export default router;
