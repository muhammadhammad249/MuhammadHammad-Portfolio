import type { IncomingMessage, ServerResponse } from "http";
import app from "../src/app";
import { connectDB } from "../src/config/db";

// Reuse DB connection across Vercel serverless invocations
let isConnected = false;

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow");

  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error("DB connection failed:", err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Database connection failed" }));
      return;
    }
  }

  // Cast needed: Express app is a valid RequestListener
  return (app as unknown as (req: IncomingMessage, res: ServerResponse) => void)(req, res);
};

export default handler;
