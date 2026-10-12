import mongoose, { Schema, Document } from "mongoose";

export type VerifiableDocType =
  | "donation_receipt"
  | "membership_certificate"
  | "volunteer_certificate"
  | "sponsorship_certificate"
  | "programme_certificate"
  | "institutional_document"
  | "authorisation_letter";

export interface IVerification extends Document {
  documentNo: string;
  documentType: VerifiableDocType;
  title: string;
  issuedTo: string;
  issueDate: Date;
  validTill?: Date;
  issuer: string;
  status: "Verified" | "Revoked" | "Expired";
  details: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const VerificationSchema = new Schema<IVerification>(
  {
    documentNo: { type: String, required: true, unique: true, index: true },
    documentType: {
      type: String,
      enum: [
        "donation_receipt",
        "membership_certificate",
        "volunteer_certificate",
        "sponsorship_certificate",
        "programme_certificate",
        "institutional_document",
        "authorisation_letter",
      ],
      required: true,
    },
    title: { type: String, required: true },
    issuedTo: { type: String, required: true },
    issueDate: { type: Date, required: true },
    validTill: { type: Date },
    issuer: { type: String, default: "ISLAH (Islah Welfare Foundation)" },
    status: { type: String, enum: ["Verified", "Revoked", "Expired"], default: "Verified" },
    details: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Verification = mongoose.model<IVerification>("Verification", VerificationSchema);
