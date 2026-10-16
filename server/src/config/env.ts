import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  PORT: parseInt(process.env.PORT || "5000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/virat_store",
  JWT_SECRET: process.env.JWT_SECRET || "default_dev_secret_change_in_production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  INITIAL_ADMIN_EMAIL: process.env.INITIAL_ADMIN_EMAIL || "admin@viratsports.com",
  INITIAL_ADMIN_PASSWORD: process.env.INITIAL_ADMIN_PASSWORD || "Admin@Virat2026!",
  SMTP: {
    HOST: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    PORT: parseInt(process.env.SMTP_PORT || "587", 10),
    USER: process.env.SMTP_USER || "",
    PASS: process.env.SMTP_PASS || "",
    SENDER: process.env.CONTACT_SENDER_EMAIL || "noreply@viratsports.com",
    RECEIVER: process.env.CONTACT_RECEIVER_EMAIL || "support@viratsports.com",
  },
};

