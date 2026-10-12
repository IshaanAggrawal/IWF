import mongoose, { Schema, Document } from "mongoose";

export type MediaCategory =
  | "hero"
  | "causes"
  | "thematic"
  | "gallery"
  | "patients"
  | "general"
  | "partners";

export interface IMedia extends Document {
  key: string; // e.g. "hero_slide_1", "cause_education", "gallery_1"
  title: string;
  category: MediaCategory;
  url: string; // Cloudinary secure URL
  publicId?: string; // Cloudinary public_id
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  altText?: string;
  caption?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    key: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["hero", "causes", "thematic", "gallery", "patients", "general", "partners"],
      default: "general",
      index: true,
    },
    url: { type: String, required: true },
    publicId: { type: String },
    format: { type: String },
    bytes: { type: Number },
    width: { type: Number },
    height: { type: Number },
    altText: { type: String },
    caption: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const Media = mongoose.model<IMedia>("Media", MediaSchema);
