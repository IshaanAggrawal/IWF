import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiRouter } from "./routes/index.js";
import { notFoundHandler, globalErrorHandler } from "./middlewares/errorHandler.js";

export function createApp() {
  const app = express();

  // Security headers & CORS
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "*",
      credentials: true,
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
