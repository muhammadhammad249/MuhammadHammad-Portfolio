import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/protectip-master",
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret_key_for_dev",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  SMTP_HOST: process.env.SMTP_HOST || "smtp.ethereal.email",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587"),
  SMTP_USER: process.env.SMTP_USER || "fake_user",
  SMTP_PASS: process.env.SMTP_PASS || "fake_pass",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@protectip-master.local",
};
