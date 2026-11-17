import { Request, Response } from "express";
import crypto from "crypto";
import { ActionVideoModel } from "../models/ActionVideo.js";
import {
  isPersistenceAvailable,
  isOperatingInMemory,
} from "../config/db.js";
import { memoryStore, StoreActionVideo } from "../config/memoryStore.js";

// Helper: check if a string is a valid 24-character hexadecimal MongoDB ObjectId
export const is24HexObjectId = (val: string): boolean => {
  return typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val);
};

// Helper: build query matching by slug id or MongoDB _id if 24-hex
export const buildActionVideoLookupQuery = (identifier: string) => {
  if (is24HexObjectId(identifier)) {
    return { $or: [{ id: identifier }, { _id: identifier }] };
  }
  return { id: identifier };
};

// Helper: find in memoryStore by id or _id
export const findInMemoryActionVideo = (
  identifier: string
): StoreActionVideo | undefined => {
  const isHex = is24HexObjectId(identifier);
  return memoryStore.actionVideos.find(
    (v) => v.id === identifier || (isHex && v._id === identifier)
  );
};

// URL validation helper: disallows dangerous URI schemes
export const isValidMediaUrl = (urlStr: string): boolean => {
  if (typeof urlStr !== "string") return false;
  const trimmed = urlStr.trim();
  if (!trimmed) return false;

  // Block dangerous schemes
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("file:")
  ) {
    return false;
  }

  // Allow root-relative paths like /videos/seeitinaction1.mp4 or /images/action/poster-1.webp
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return true;
  }

  // Allow standard http and https URLs
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const VALID_PLATFORMS = ["Instagram", "Facebook", "YouTube", "Other"];

// ==========================================
// PUBLIC CONTROLLERS
// ==========================================

// GET /api/action-videos — Public published videos sorted by displayOrder
export const getActionVideos = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    if (isPersistenceAvailable()) {
      const videos = await ActionVideoModel.find({ isPublished: true }).sort({
        displayOrder: 1,
        createdAt: -1,
      });
      res.json({ success: true, count: videos.length, data: videos });
      return;
    }

    if (isOperatingInMemory()) {
      const items = memoryStore.actionVideos
        .filter((v) => v.isPublished)
        .sort((a, b) => a.displayOrder - b.displayOrder);
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

// ==========================================
// ADMIN CONTROLLERS
// ==========================================

// GET /api/admin/action-videos — All videos (including drafts) for admin
export const getAdminActionVideos = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    if (isPersistenceAvailable()) {
      const videos = await ActionVideoModel.find().sort({
        displayOrder: 1,
        createdAt: -1,
      });
      res.json({ success: true, count: videos.length, data: videos });
      return;
    }

    if (isOperatingInMemory()) {
      const items = [...memoryStore.actionVideos].sort(
        (a, b) => a.displayOrder - b.displayOrder
      );
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

// POST /api/admin/action-videos — Create a new video
export const createActionVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!isPersistenceAvailable() && !isOperatingInMemory()) {
      res.status(503).json({
        success: false,
        error: "Service temporarily unavailable. Modifications require database persistence.",
        code: "DATABASE_UNAVAILABLE",
      });
      return;
    }

    const {
      title,
      description,
      platform,
      videoUrl,
      posterUrl,
      externalUrl,
      isPublished,
      displayOrder,
    } = req.body;

    // Validate required fields
    if (!title || !description || !platform || !videoUrl || !posterUrl) {
      res.status(400).json({
        success: false,
        error: "Missing required fields: title, description, platform, videoUrl, posterUrl",
      });
      return;
    }

    // Validate platform
    if (!VALID_PLATFORMS.includes(platform)) {
      res.status(400).json({
        success: false,
        error: `Invalid platform. Allowed values: ${VALID_PLATFORMS.join(", ")}`,
      });
      return;
    }

    // Validate URLs
    if (!isValidMediaUrl(videoUrl)) {
      res.status(400).json({
        success: false,
        error: "Invalid videoUrl. Must be a valid HTTP/HTTPS URL or root-relative path.",
      });
      return;
    }

    if (!isValidMediaUrl(posterUrl)) {
      res.status(400).json({
        success: false,
        error: "Invalid posterUrl. Must be a valid HTTP/HTTPS URL or root-relative path.",
      });
      return;
    }

    if (externalUrl && !isValidMediaUrl(externalUrl)) {
      res.status(400).json({
        success: false,
        error: "Invalid externalUrl. Must be a valid HTTP/HTTPS URL.",
      });
      return;
    }

    // Calculate display order
    let orderNum = Number(displayOrder);
    if (isNaN(orderNum) || orderNum < 0) {
      // Default to end of list
      const currentCount = isPersistenceAvailable()
        ? await ActionVideoModel.countDocuments()
        : memoryStore.actionVideos.length;
      orderNum = currentCount + 1;
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const uniqueId = `${slug}-${Date.now().toString().slice(-4)}`;
    const randomHexId = crypto.randomBytes(12).toString("hex");

    const newVideoData = {
      _id: randomHexId,
      id: uniqueId,
      title: title.trim(),
      description: description.trim(),
      platform,
      videoUrl: videoUrl.trim(),
      posterUrl: posterUrl.trim(),
      externalUrl: externalUrl ? externalUrl.trim() : undefined,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      displayOrder: orderNum,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isPersistenceAvailable()) {
      const created = await ActionVideoModel.create(newVideoData);
      res.status(201).json({ success: true, data: created });
      return;
    }

    // In-memory fallback
    memoryStore.actionVideos.push(newVideoData);
    res.status(201).json({ success: true, data: newVideoData });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /api/admin/action-videos/:id — Update a video
export const updateActionVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!isPersistenceAvailable() && !isOperatingInMemory()) {
      res.status(503).json({
        success: false,
        error: "Service temporarily unavailable. Modifications require database persistence.",
        code: "DATABASE_UNAVAILABLE",
      });
      return;
    }

    const { id } = req.params;
    const {
      title,
      description,
      platform,
      videoUrl,
      posterUrl,
      externalUrl,
      isPublished,
      displayOrder,
    } = req.body;

    // Validate platform if provided
    if (platform && !VALID_PLATFORMS.includes(platform)) {
      res.status(400).json({
        success: false,
        error: `Invalid platform. Allowed values: ${VALID_PLATFORMS.join(", ")}`,
      });
      return;
    }

    // Validate URLs if provided
    if (videoUrl !== undefined && !isValidMediaUrl(videoUrl)) {
      res.status(400).json({
        success: false,
        error: "Invalid videoUrl. Must be a valid HTTP/HTTPS URL or root-relative path.",
      });
      return;
    }

    if (posterUrl !== undefined && !isValidMediaUrl(posterUrl)) {
      res.status(400).json({
        success: false,
        error: "Invalid posterUrl. Must be a valid HTTP/HTTPS URL or root-relative path.",
      });
      return;
    }

    if (externalUrl && !isValidMediaUrl(externalUrl)) {
      res.status(400).json({
        success: false,
        error: "Invalid externalUrl. Must be a valid HTTP/HTTPS URL.",
      });
      return;
    }

    const updateFields: any = {};
    if (title !== undefined) updateFields.title = title.trim();
    if (description !== undefined) updateFields.description = description.trim();
    if (platform !== undefined) updateFields.platform = platform;
    if (videoUrl !== undefined) updateFields.videoUrl = videoUrl.trim();
    if (posterUrl !== undefined) updateFields.posterUrl = posterUrl.trim();
    if (externalUrl !== undefined) {
      updateFields.externalUrl = externalUrl ? externalUrl.trim() : "";
    }
    if (isPublished !== undefined) updateFields.isPublished = Boolean(isPublished);
    if (displayOrder !== undefined) {
      const parsedOrder = Number(displayOrder);
      if (isNaN(parsedOrder) || parsedOrder < 0) {
        res.status(400).json({
          success: false,
          error: "Invalid displayOrder: must be a non-negative number",
        });
        return;
      }
      updateFields.displayOrder = parsedOrder;
    }
    updateFields.updatedAt = new Date();

    if (isPersistenceAvailable()) {
      const query = buildActionVideoLookupQuery(id);
      const updated = await ActionVideoModel.findOneAndUpdate(query, updateFields, {
        new: true,
      });

      if (!updated) {
        res.status(404).json({ success: false, error: "Action video not found" });
        return;
      }

      res.json({ success: true, data: updated });
      return;
    }

    // In-memory fallback
    const target = findInMemoryActionVideo(id);
    if (!target) {
      res.status(404).json({ success: false, error: "Action video not found" });
      return;
    }

    Object.assign(target, updateFields);
    res.json({ success: true, data: target });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE /api/admin/action-videos/:id — Delete a video
export const deleteActionVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!isPersistenceAvailable() && !isOperatingInMemory()) {
      res.status(503).json({
        success: false,
        error: "Service temporarily unavailable. Deletion requires database persistence.",
        code: "DATABASE_UNAVAILABLE",
      });
      return;
    }

    const { id } = req.params;

    if (isPersistenceAvailable()) {
      const query = buildActionVideoLookupQuery(id);
      const deleted = await ActionVideoModel.findOneAndDelete(query);
      if (!deleted) {
        res.status(404).json({ success: false, error: "Action video not found" });
        return;
      }
      res.json({ success: true, message: "Action video deleted successfully" });
      return;
    }

    // In-memory fallback
    const index = memoryStore.actionVideos.findIndex(
      (v) => v.id === id || (is24HexObjectId(id) && v._id === id)
    );
    if (index === -1) {
      res.status(404).json({ success: false, error: "Action video not found" });
      return;
    }

    memoryStore.actionVideos.splice(index, 1);
    res.json({ success: true, message: "Action video deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /api/admin/action-videos/reorder — Reorder videos
export const reorderActionVideos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!isPersistenceAvailable() && !isOperatingInMemory()) {
      res.status(503).json({
        success: false,
        error: "Service temporarily unavailable. Reordering requires database persistence.",
        code: "DATABASE_UNAVAILABLE",
      });
      return;
    }

    const { videoIds } = req.body;
    if (!Array.isArray(videoIds) || videoIds.length === 0) {
      res.status(400).json({
        success: false,
        error: "Invalid input: videoIds must be a non-empty array of video IDs",
      });
      return;
    }

    if (isPersistenceAvailable()) {
      const updates = videoIds.map((vid, index) => {
        const query = buildActionVideoLookupQuery(vid);
        return ActionVideoModel.updateOne(query, {
          $set: { displayOrder: index + 1, updatedAt: new Date() },
        });
      });
      await Promise.all(updates);

      const allVideos = await ActionVideoModel.find().sort({
        displayOrder: 1,
        createdAt: -1,
      });
      res.json({
        success: true,
        message: "Action videos reordered successfully",
        data: allVideos,
      });
      return;
    }

    // In-memory fallback
    videoIds.forEach((vid, index) => {
      const target = findInMemoryActionVideo(vid);
      if (target) {
        target.displayOrder = index + 1;
        target.updatedAt = new Date();
      }
    });

    const sortedMemory = [...memoryStore.actionVideos].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
    res.json({
      success: true,
      message: "Action videos reordered successfully",
      data: sortedMemory,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
