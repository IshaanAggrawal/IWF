import { apiRequest } from "./apiClient";

export interface VerificationData {
  documentNo: string;
  documentType: string;
  title: string;
  issuedTo: string;
  issuer: string;
  issueDate: string;
  validTill: string | null;
  status: "Verified" | "Revoked" | "Expired";
  details: Record<string, any>;
}

export interface VerificationResponse {
  success: boolean;
  verified: boolean;
  data?: VerificationData;
  message?: string;
}

export async function verifyDocument(
  documentNo: string
): Promise<VerificationResponse> {
  return apiRequest<VerificationResponse>(
    `/verify/${encodeURIComponent(documentNo.trim())}`
  );
}
