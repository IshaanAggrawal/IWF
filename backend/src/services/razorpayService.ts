import crypto from "crypto";
import { razorpayInstance, RAZORPAY_CONFIG } from "../config/razorpay.js";

export interface CreateOrderParams {
  amountRupees: number;
  receipt?: string;
  notes?: Record<string, string | number>;
}

export interface RazorpayOrderResult {
  order_id: string;
  amount: number; // in paise
  currency: string;
}

export async function createRazorpayOrder({
  amountRupees,
  receipt,
  notes,
}: CreateOrderParams): Promise<RazorpayOrderResult> {
  const amountPaise = Math.round(Number(amountRupees) * 100);

  // Minimum amount validation: 100 paise (₹1.00)
  if (isNaN(amountPaise) || amountPaise < 100) {
    throw new Error("Amount must be at least ₹1.00 (100 paise)");
  }

  const options = {
    amount: amountPaise,
    currency: "INR",
    receipt: receipt || `rcpt_${Date.now()}`,
    notes: notes || {},
  };

  const order = await razorpayInstance.orders.create(options);

  return {
    order_id: order.id,
    amount: typeof order.amount === "number" ? order.amount : Number(order.amount),
    currency: order.currency || "INR",
  };
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!orderId || !paymentId || !signature) {
    return false;
  }

  const secret = RAZORPAY_CONFIG.key_secret;
  if (!secret) {
    throw new Error("Razorpay key_secret is not configured on the server");
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  // Constant-time buffer comparison to prevent timing attacks
  try {
    const expectedBuf = Buffer.from(expectedSignature, "utf8");
    const signatureBuf = Buffer.from(signature, "utf8");
    if (expectedBuf.length !== signatureBuf.length) {
      return false;
    }
    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
  } catch {
    return expectedSignature === signature;
  }
}
