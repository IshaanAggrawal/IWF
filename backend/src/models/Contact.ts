import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  subject?: string;
  message: string;
  source: "Quick Float Modal" | "Contact Page" | "Other";
  status: "Unread" | "Read" | "Resolved";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    subject: { type: String },
    message: { type: String, required: true },
    source: {
      type: String,
      enum: ["Quick Float Modal", "Contact Page", "Other"],
      default: "Contact Page",
    },
    status: { type: String, enum: ["Unread", "Read", "Resolved"], default: "Unread" },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);
