import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { config } from "../config/env.js";
import { connectDB } from "../config/db.js";
import { ProductModel } from "../models/Product.js";
import { AdminModel } from "../models/Admin.js";
import { initialProducts } from "../config/memoryStore.js";

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
          $setOnInsert: {
            id: item.id,
            name: item.name,
            category: item.category,
            subcategory: item.subcategory,
            price: item.price,
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
    console.log("[SEED] Database seed complete.");
  } catch (error: any) {
    console.error("[SEED ERROR]", error.message);
  } finally {
    await mongoose.disconnect();
  }
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

