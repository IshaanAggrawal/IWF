import { Request, Response } from "express";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/cloudinaryService.js";

export async function uploadSingleFile(req: Request, res: Response): Promise<void> {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ success: false, message: "No file provided in form-data field 'file'" });
      return;
    }

    const folder = (req.body.folder as string) || "islah/general";
    const result = await uploadToCloudinary(file.buffer, folder, file.originalname);

    res.status(201).json({
      success: true,
      message: "File uploaded successfully to Cloudinary",
      file: {
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        url: result.secureUrl,
        publicId: result.publicId,
        format: result.format,
        resourceType: result.resourceType,
      },
    });
  } catch (error: any) {
    console.error("uploadSingleFile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload file to Cloudinary",
    });
  }
}

export async function uploadMultipleFiles(req: Request, res: Response): Promise<void> {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: "No files provided in form-data field 'files'" });
      return;
    }

    const folder = (req.body.folder as string) || "islah/general";

    const uploadPromises = files.map(async (file) => {
      const result = await uploadToCloudinary(file.buffer, folder, file.originalname);
      return {
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        url: result.secureUrl,
        publicId: result.publicId,
        format: result.format,
        resourceType: result.resourceType,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.status(201).json({
      success: true,
      message: `${uploadedFiles.length} files uploaded successfully to Cloudinary`,
      files: uploadedFiles,
    });
  } catch (error: any) {
    console.error("uploadMultipleFiles error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload files to Cloudinary",
    });
  }
}

export async function deleteFile(req: Request, res: Response): Promise<void> {
  try {
    const rawPublicId = req.params.publicId;
    const publicId = Array.isArray(rawPublicId) ? rawPublicId.join("/") : rawPublicId;
    const resourceType = (req.query.resourceType as "image" | "raw" | "video") || "image";

    if (!publicId) {
      res.status(400).json({ success: false, message: "Public ID is required" });
      return;
    }

    const result = await deleteFromCloudinary(publicId, resourceType);

    res.json({
      success: true,
      message: "File deleted successfully from Cloudinary",
      result,
    });
  } catch (error: any) {
    console.error("deleteFile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete file from Cloudinary",
    });
  }
}
