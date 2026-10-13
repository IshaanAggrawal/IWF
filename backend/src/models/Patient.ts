import mongoose, { Schema, Document } from "mongoose";

export interface ICostBreakdown {
  label: string;
  amount: number;
}

export interface IPatient extends Document {
  slug: string;
  name: string;
  age: number;
  gender: string;
  disease: string;
  diagnosis?: string;
  hospital: string;
  hospitalAddress?: string;
  ward?: string;
  admissionDate: string;
  condition: "Critical" | "Serious" | "Stable" | "Recovering" | "Discharged";
  urgent: boolean;
  image?: string;
  neededAmount: number;
  raisedAmount: number;
  donorsCount: number;
  costBreakdown: ICostBreakdown[];
  verificationId: string;
  verifiedBy: string;
  verificationDate: string;
  status: "Active" | "Completed" | "Closed";
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new Schema<IPatient>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    disease: { type: String, required: true },
    diagnosis: { type: String },
    hospital: { type: String, required: true },
    hospitalAddress: { type: String },
    ward: { type: String },
    admissionDate: { type: String, required: true },
    condition: {
      type: String,
      enum: ["Critical", "Serious", "Stable", "Recovering", "Discharged"],
      default: "Critical",
    },
    urgent: { type: Boolean, default: true },
    image: { type: String },
    neededAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    donorsCount: { type: Number, default: 0 },
    costBreakdown: [
      {
        label: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    verificationId: { type: String, required: true },
    verifiedBy: { type: String, default: "ISLAH Medical Welfare Board" },
    verificationDate: { type: String, required: true },
    status: { type: String, enum: ["Active", "Completed", "Closed"], default: "Active" },
  },
  { timestamps: true }
);

export const Patient = mongoose.model<IPatient>("Patient", PatientSchema);
