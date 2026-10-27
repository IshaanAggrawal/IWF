import { apiRequest } from "./apiClient";

export interface RegisterMemberPayload {
  name?: string;
  fullName?: string;
  fatherName?: string;
  category: string;
  email: string;
  phone?: string;
  mobile?: string;
  countryCode?: string;
  state: string;
  district: string;
  address?: string;
  pincode?: string;
  membershipPeriod?: number | string;
  paymentMode?: string;
  transactionId?: string;
  paymentDate?: string;
  consentDisplay?: string;
  photoUrl?: string;
  metadata?: Record<string, any>;
}

export interface MemberRecord {
  memberNo: string;
  name: string;
  category: string;
  annualFee: number;
  email: string;
  phone: string;
  state: string;
  district: string;
  address?: string;
  status: "Active" | "Expired" | "Pending";
  validFrom: string;
  validTill: string;
  receiptNo: string;
}

export interface RegisterMemberResponse {
  success: boolean;
  message: string;
  member: MemberRecord;
}

export type MemberCategory = "Community" | "Contributing" | "Patron" | "Blue" | "Yellow" | "Green";

export interface MemberStatusResponse {
  success: boolean;
  member: {
    id: string;
    name: string;
    category: MemberCategory | string;
    state: string;
    district: string;
    status: "Active" | "Expired" | "Pending" | string;
    validTill: string;
    joined: string;
  };
}

export async function registerMember(
  payload: RegisterMemberPayload
): Promise<RegisterMemberResponse> {
  return apiRequest<RegisterMemberResponse>("/members", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function checkMemberStatus(
  memberNo: string
): Promise<MemberStatusResponse> {
  return apiRequest<MemberStatusResponse>(
    `/members/status/${encodeURIComponent(memberNo)}`
  );
}
