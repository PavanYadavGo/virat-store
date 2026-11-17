import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { config } from "../config/env.js";
import { connectDB, getIsConnected } from "../config/db.js";
import { ProductModel } from "../models/Product.js";
import { AdminModel } from "../models/Admin.js";
import { ActionVideoModel } from "../models/ActionVideo.js";
import { initialProducts, initialActionVideos, memoryStore } from "../config/memoryStore.js";

export const seedDatabase = async (): Promise<void> => {
  console.log("[SEED] Starting database seed process...");
  const connected = await connectDB();

  if (!connected) {
    console.warn("[SEED] MongoDB is offline. Memory store contains the default seed data automatically.");
    return;
  }

  try {
    // 1. Seed Admin
    const existingAdmin = await AdminModel.findOne({
      email: config.INITIAL_ADMIN_EMAIL.toLowerCase(),
    });

    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(config.INITIAL_ADMIN_PASSWORD, 10);
      await AdminModel.create({
        email: config.INITIAL_ADMIN_EMAIL.toLowerCase(),
        passwordHash,
        name: "Store Administrator",
        role: "admin",
      });
      console.log(`[SEED] Created default admin account: ${config.INITIAL_ADMIN_EMAIL}`);
    } else {
      console.log(`[SEED] Admin account already exists: ${config.INITIAL_ADMIN_EMAIL}`);
    }

    // 2. Seed Products (Idempotent upsert by id/slug)
    let seededCount = 0;
    for (const item of initialProducts) {
      await ProductModel.findOneAndUpdate(
        { id: item.id },
        {
          $set: {
            id: item.id,
            name: item.name,
            category: item.category,
            subcategory: item.subcategory,
            price: item.price,
            priceUnconfirmed: item.priceUnconfirmed,
            description: item.description,
            features: item.features,
            images: item.images,
            badge: item.badge,
            sizes: item.sizes,
            stock: item.stock,
            isActive: item.isActive,
          },
        },
        { upsert: true, new: true }
      );
      seededCount++;
    }

    console.log(`[SEED] Processed ${seededCount} products idempotently.`);

    // Remove deprecated mock products so only approved client catalog exists
    const validIds = initialProducts.map((p) => p.id);
    const deleteResult = await ProductModel.deleteMany({ id: { $nin: validIds } });
    if (deleteResult.deletedCount > 0) {
      console.log(`[SEED] Cleaned up ${deleteResult.deletedCount} obsolete mock products.`);
    }

    // 3. Seed Action Videos (Idempotent seed using $setOnInsert to preserve existing admin edits)
    const seededVideosCount = await seedActionVideos();
    console.log(`[SEED] Processed ${seededVideosCount} action videos idempotently.`);

    console.log("[SEED] Database seed complete.");
  } catch (error: any) {
    console.error("[SEED ERROR]", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

export const seedActionVideos = async (): Promise<number> => {
  if (!getIsConnected()) {
    // If not connected to MongoDB, seed memory store idempotently
    let count = 0;
    for (const video of initialActionVideos) {
      const exists = memoryStore.actionVideos.some((v) => v.id === video.id);
      if (!exists) {
        memoryStore.actionVideos.push({ ...video });
      }
      count++;
    }
    return count;
  }

  let count = 0;
  for (const video of initialActionVideos) {
    await ActionVideoModel.findOneAndUpdate(
      { id: video.id },
      {
        $setOnInsert: {
          id: video.id,
          title: video.title,
          description: video.description,
          platform: video.platform,
          videoUrl: video.videoUrl,
          posterUrl: video.posterUrl,
          externalUrl: video.externalUrl,
          isPublished: video.isPublished,
          displayOrder: video.displayOrder,
        },
      },
      { upsert: true, new: true }
    );
    count++;
  }
  return count;
};

// Execute if run directly
if (process.argv[1]?.endsWith("seed.ts") || process.argv[1]?.endsWith("seed.js")) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

