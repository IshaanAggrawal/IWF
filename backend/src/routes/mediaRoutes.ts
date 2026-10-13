import { Router } from "express";
import { uploadMiddleware } from "../middlewares/upload.js";
import {
  listMedia,
  getMediaByKey,
  upsertMedia,
  deleteMedia,
} from "../controllers/mediaController.js";

export const mediaRouter = Router();

mediaRouter.get("/", listMedia);
mediaRouter.get("/:key", getMediaByKey);
mediaRouter.post("/", uploadMiddleware.single("file"), upsertMedia);
mediaRouter.delete("/:key", deleteMedia);
