import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiRouter } from "./routes/index.js";
import { notFoundHandler, globalErrorHandler } from "./middlewares/errorHandler.js";

export function createApp() {
  const app = express();

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

  // API Routes
  app.use("/api", apiRouter);

  // Fallback handlers
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
}
