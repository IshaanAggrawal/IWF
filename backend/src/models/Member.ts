import mongoose, { Schema, Document } from "mongoose";

export type MemberCategory = "Community" | "Contributing" | "Patron" | "Blue" | "Yellow" | "Green";

export interface IMember extends Document {
  memberNo: string;
  name: string;
  category: MemberCategory;
  annualFee: number;
  email: string;
  phone: string;
  state: string;
  district: string;
  address?: string;
  status: "Active" | "Expired" | "Pending";
  validFrom: Date;
  validTill: Date;
  receiptNo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    memberNo: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Community", "Contributing", "Patron", "Blue", "Yellow", "Green"],
      required: true,
    },
    annualFee: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String },
    status: { type: String, enum: ["Active", "Expired", "Pending"], default: "Active" },
    validFrom: { type: Date, default: Date.now },
    validTill: {
      type: Date,
      default: () => {
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        return nextYear;
      },
    },
    receiptNo: { type: String },
  },
  { timestamps: true }
);

export const Member = mongoose.model<IMember>("Member", MemberSchema);
