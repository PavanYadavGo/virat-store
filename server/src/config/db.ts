import mongoose from "mongoose";
import { config } from "./env.js";

let isConnected = false;

export const connectDB = async (): Promise<boolean> => {
  try {
    mongoose.set("strictQuery", true);
    
    // Set a 3-second connection timeout so we don't hang if mongod isn't running
    const conn = await mongoose.connect(config.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });

    isConnected = true;
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error: any) {
    isConnected = false;
    console.warn(`[DATABASE WARNING] Could not connect to MongoDB at "${config.MONGODB_URI}".`);
    console.warn(`[DATABASE WARNING] Error: ${error.message}`);
    console.warn(`[DATABASE WARNING] Operating in fallback in-memory mode so local development & testing continue uninterrupted.`);
    return false;
  }
};

export const getIsConnected = () => isConnected;

