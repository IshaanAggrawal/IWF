import { Router } from "express";
import { uploadMiddleware } from "../middlewares/upload.js";
import {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteFile,
} from "../controllers/uploadController.js";

export const uploadRouter = Router();

// Single file upload (field: "file")
uploadRouter.post("/single", uploadMiddleware.single("file"), uploadSingleFile);

// Multiple files upload (field: "files", max 10 files)
uploadRouter.post("/multiple", uploadMiddleware.array("files", 10), uploadMultipleFiles);

// Delete file by Cloudinary publicId (supports query ?publicId=..., body { publicId }, or /:publicId)
uploadRouter.delete("/", deleteFile);
uploadRouter.delete("/:publicId", deleteFile);

