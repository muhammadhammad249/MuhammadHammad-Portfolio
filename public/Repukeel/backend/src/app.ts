import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import contactRouter from "./routes/contact";
import authRouter from "./routes/auth";

const app = express();

app.use(helmet());
app.use((_req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  next();
});
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        env.CLIENT_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
      ];
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "RepuKeel API is running 🚀" });
});

// Google Search Console verification
app.get("/googlec3bb70e782680902.html", (req, res) => {
  res.type("text/html").send("google-site-verification: googlec3bb70e782680902.html");
});

// API health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "RepuKeel API is running" });
});

// Routes
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/auth", authRouter);

export default app;
