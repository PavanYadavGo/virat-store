process.env.NODE_ENV = "test";

import { describe, it, before, after, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import jwt from "jsonwebtoken";
import { config } from "../src/config/env.js";
import {
  disconnectDB,
  _setFallbackActiveForTesting,
} from "../src/config/db.js";
import {
  memoryStore,
  resetMemoryStoreForTesting,
  initialActionVideos,
} from "../src/config/memoryStore.js";
import {
  getActionVideos,
  getAdminActionVideos,
  createActionVideo,
  updateActionVideo,
  deleteActionVideo,
  reorderActionVideos,
} from "../src/controllers/actionVideoController.js";
import { seedActionVideos } from "../src/seeds/seed.js";
import { app } from "../src/index.js";

const createMockReqRes = (
  body: any = {},
  params: any = {},
  query: any = {},
  admin?: any
) => {
  const req = { body, params, query, admin, headers: {} } as any;
  let statusCode = 200;
  let responseData: any = null;
  const res = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(data: any) {
      responseData = data;
      return this;
    },
  } as any;

  return { req, res, getStatus: () => statusCode, getData: () => responseData };
};

describe("Action Videos & Admin Management Suite", () => {
  let server: http.Server;
  let baseUrl: string;
  let adminToken: string;
  let nonAdminToken: string;

  before(async () => {
    _setFallbackActiveForTesting(true);
    process.env.BACKEND_FEATURES_ENABLED = "true";

    if (memoryStore.admins.length === 0) {
      memoryStore.admins.push({
        email: config.INITIAL_ADMIN_EMAIL.toLowerCase(),
        passwordHash: "dummy-hash",
        name: "Store Administrator",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Generate tokens for route tests
    adminToken = jwt.sign(
      { email: config.INITIAL_ADMIN_EMAIL.toLowerCase(), role: "admin" },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );
    nonAdminToken = jwt.sign(
      { email: "user@example.com", role: "customer" },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await new Promise<void>((resolve, reject) => {
      server = app.listen(0, "127.0.0.1", () => {
        const addr = server.address() as any;
        baseUrl = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
      server.on("error", reject);
    });
  });

  after(async () => {
    await disconnectDB();
    _setFallbackActiveForTesting(false);
    if (server && server.listening) {
      await new Promise<void>((resolve) => {
        server.close(() => resolve());
      });
    }
  });

  beforeEach(() => {
    resetMemoryStoreForTesting();
  });

  afterEach(() => {
    resetMemoryStoreForTesting();
  });

  it("public GET /api/action-videos returns only published videos sorted by displayOrder", async () => {
    // Hide one video in memory store
    memoryStore.actionVideos[1].isPublished = false;

    const res = await fetch(`${baseUrl}/api/action-videos`);
    assert.equal(res.status, 200);
    const json: any = await res.json();
    assert.equal(json.success, true);
    assert.equal(Array.isArray(json.data), true);
    // Out of 4 initial videos, 1 was unpublished, so 3 should be returned
    assert.equal(json.data.length, 3);
    assert.equal(json.count, 3);

    // Verify ordering by displayOrder ascending
    for (let i = 0; i < json.data.length - 1; i++) {
      assert(
        json.data[i].displayOrder <= json.data[i + 1].displayOrder,
        "Videos must be sorted by displayOrder ascending"
      );
    }
  });

  it("protects admin action video endpoints against unauthorized and non-admin requests", async () => {
    // No auth header -> 401
    const unauthRes = await fetch(`${baseUrl}/api/admin/action-videos`);
    assert.equal(unauthRes.status, 401);

    // Non-admin token -> 403
    const forbiddenRes = await fetch(`${baseUrl}/api/admin/action-videos`, {
      headers: { Authorization: `Bearer ${nonAdminToken}` },
    });
    assert.equal(forbiddenRes.status, 403);

    // Valid admin token -> 200
    const adminRes = await fetch(`${baseUrl}/api/admin/action-videos`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert.equal(adminRes.status, 200);
    const adminJson: any = await adminRes.json();
    assert.equal(adminJson.success, true);
    assert.equal(adminJson.data.length, 4);
  });

  it("validates required fields and media URLs when admin creates a video", async () => {
    // Missing required fields
    const { req: req1, res: res1, getStatus: getStatus1, getData: getData1 } =
      createMockReqRes({ title: "Incomplete" });
    await createActionVideo(req1, res1);
    assert.equal(getStatus1(), 400);
    assert.equal(getData1().success, false);

    // Dangerous JavaScript scheme in video URL
    const { req: req2, res: res2, getStatus: getStatus2, getData: getData2 } =
      createMockReqRes({
        title: "XSS Attempt",
        description: "Malicious payload test",
        platform: "Instagram",
        videoUrl: "javascript:alert(1)",
        posterUrl: "/images/action/poster-1.webp",
      });
    await createActionVideo(req2, res2);
    assert.equal(getStatus2(), 400);
    assert(getData2().error.includes("Invalid videoUrl"));

    // Valid creation
    const { req: req3, res: res3, getStatus: getStatus3, getData: getData3 } =
      createMockReqRes({
        title: "Test Championship",
        description: "Behind the scenes on match day",
        platform: "YouTube",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        posterUrl: "https://example.com/poster.webp",
        externalUrl: "https://youtube.com/channel/test",
        isPublished: true,
      });
    await createActionVideo(req3, res3);
    assert.equal(getStatus3(), 201);
    const created = getData3().data;
    assert.equal(created.title, "Test Championship");
    assert.equal(created.platform, "YouTube");
    assert.equal(memoryStore.actionVideos.length, 5);
  });

  it("allows admin to update, toggle publish status, and delete an action video", async () => {
    const targetVideo = memoryStore.actionVideos[0];
    const targetId = targetVideo.id;

    // Update title and unpublish
    const { req: req1, res: res1, getStatus: getStatus1, getData: getData1 } =
      createMockReqRes(
        { title: "Updated Match Day Title", isPublished: false },
        { id: targetId }
      );
    await updateActionVideo(req1, res1);
    assert.equal(getStatus1(), 200);
    assert.equal(getData1().data.title, "Updated Match Day Title");
    assert.equal(getData1().data.isPublished, false);

    // Delete the video
    const { req: req2, res: res2, getStatus: getStatus2, getData: getData2 } =
      createMockReqRes({}, { id: targetId });
    await deleteActionVideo(req2, res2);
    assert.equal(getStatus2(), 200);
    assert.equal(getData2().success, true);
    assert.equal(memoryStore.actionVideos.length, 3);
    assert.equal(
      memoryStore.actionVideos.some((v) => v.id === targetId),
      false
    );
  });

  it("handles empty published video lists by returning empty array with count 0", async () => {
    // Mark all videos as unpublished
    memoryStore.actionVideos.forEach((v) => {
      v.isPublished = false;
    });

    const res = await fetch(`${baseUrl}/api/action-videos`);
    assert.equal(res.status, 200);
    const json: any = await res.json();
    assert.equal(json.success, true);
    assert.equal(Array.isArray(json.data), true);
    assert.equal(json.data.length, 0);
    assert.equal(json.count, 0);
  });

  it("verifies end-to-end admin lifecycle: publish, unpublish, delete, and empty state", async () => {
    // Clear all existing videos
    memoryStore.actionVideos = [];

    // 1. Add two videos via admin
    const { req: r1, res: s1, getData: d1 } = createMockReqRes({
      title: "Video Alpha",
      description: "First test video",
      platform: "Instagram",
      videoUrl: "/videos/alpha.mp4",
      posterUrl: "/images/action/alpha.webp",
      isPublished: true,
      displayOrder: 1,
    });
    await createActionVideo(r1, s1);
    const video1 = d1().data;

    const { req: r2, res: s2, getData: d2 } = createMockReqRes({
      title: "Video Beta",
      description: "Second test video",
      platform: "YouTube",
      videoUrl: "/videos/beta.mp4",
      posterUrl: "/images/action/beta.webp",
      isPublished: true,
      displayOrder: 2,
    });
    await createActionVideo(r2, s2);
    const video2 = d2().data;

    // Confirm both appear in public endpoint
    const pubRes1 = await fetch(`${baseUrl}/api/action-videos`);
    const pubJson1: any = await pubRes1.json();
    assert.equal(pubJson1.data.length, 2);
    assert.equal(pubJson1.data[0].title, "Video Alpha");
    assert.equal(pubJson1.data[1].title, "Video Beta");

    // 2. Unpublish one video (Video Alpha)
    const { req: r3, res: s3 } = createMockReqRes(
      { isPublished: false },
      { id: video1.id }
    );
    await updateActionVideo(r3, s3);

    // Confirm only Video Beta appears on public endpoint
    const pubRes2 = await fetch(`${baseUrl}/api/action-videos`);
    const pubJson2: any = await pubRes2.json();
    assert.equal(pubJson2.data.length, 1);
    assert.equal(pubJson2.data[0].title, "Video Beta");

    // 3. Delete Video Beta
    const { req: r4, res: s4 } = createMockReqRes({}, { id: video2.id });
    await deleteActionVideo(r4, s4);

    // Confirm zero published videos
    const pubRes3 = await fetch(`${baseUrl}/api/action-videos`);
    const pubJson3: any = await pubRes3.json();
    assert.equal(pubJson3.data.length, 0);

    // 4. Remove all videos entirely
    memoryStore.actionVideos = [];
    const pubRes4 = await fetch(`${baseUrl}/api/action-videos`);
    const pubJson4: any = await pubRes4.json();
    assert.equal(pubJson4.data.length, 0);
  });

  it("allows admin to reorder action videos sequentially", async () => {
    // Current IDs: "01", "02", "03", "04"
    // Reorder to reverse: "04", "03", "02", "01"
    const newOrder = ["04", "03", "02", "01"];
    const { req, res, getStatus, getData } = createMockReqRes({
      videoIds: newOrder,
    });
    await reorderActionVideos(req, res);
    assert.equal(getStatus(), 200);
    const reordered = getData().data;
    assert.equal(reordered[0].id, "04");
    assert.equal(reordered[0].displayOrder, 1);
    assert.equal(reordered[1].id, "03");
    assert.equal(reordered[1].displayOrder, 2);
    assert.equal(reordered[2].id, "02");
    assert.equal(reordered[2].displayOrder, 3);
    assert.equal(reordered[3].id, "01");
    assert.equal(reordered[3].displayOrder, 4);
  });

  it("is idempotent: seedActionVideos runs without duplicating or breaking existing records", async () => {
    // Initially 4 videos
    assert.equal(memoryStore.actionVideos.length, 4);

    // Run seed again
    await seedActionVideos();
    assert.equal(
      memoryStore.actionVideos.length,
      4,
      "Seeding must not duplicate videos in memory store"
    );

    // Run seed third time
    await seedActionVideos();
    assert.equal(
      memoryStore.actionVideos.length,
      4,
      "Repeated seeding remains idempotent"
    );
  });
});
