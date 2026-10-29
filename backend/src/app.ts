import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiRouter } from "./routes/index.js";
import { notFoundHandler, globalErrorHandler } from "./middlewares/errorHandler.js";
import { connectDB } from "./config/db.js";

export function createApp() {
  const app = express();

  // Lazy DB connection middleware for serverless environments (e.g. Vercel)
  app.use(async (_req, _res, next) => {
    try {
      await connectDB();
    } catch (err) {
      console.error("[DB Middleware] Connection error:", err);
    }
    next();
  });

  // Security headers & CORS
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow mobile apps, curl, postman, and local dev ports
        if (
          !origin ||
          /^http:\/\/localhost(:\d+)?$/.test(origin) ||
          /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin) ||
          (process.env.CLIENT_URL && origin === process.env.CLIENT_URL)
        ) {
          callback(null, true);
        } else {
          callback(null, true); // Permissive during preview/dev
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "x-razorpay-signature"],
    })
  );

  // Request body parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Logging
  app.use(morgan("dev"));

  // Root welcome / health check
  app.get("/", (_req, res) => {
    res.json({
      status: "ok",
      service: "ISLAH Backend API",
      message: "Server is running. Endpoints are available with or without /api prefix.",
      health: "/health",
    });
  });

  // API Routes - mount at both '/api' and root '/'
  // This allows callers requesting '/create-order' and '/api/create-order' to both succeed
  app.use("/api", apiRouter);
  app.use(apiRouter);

  // Fallback handlers
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
}

const app = createApp();
export default app;
