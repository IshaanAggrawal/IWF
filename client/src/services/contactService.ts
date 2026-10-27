import { apiRequest } from "./apiClient";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  subject?: string;
  message: string;
  source?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  contactId?: string;
}

export async function submitContact(
  payload: ContactPayload
): Promise<ContactResponse> {
  return apiRequest<ContactResponse>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
