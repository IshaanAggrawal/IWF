/**
 * Razorpay Standard Checkout Client Utility
 */

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay checkout script");
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export interface RazorpayPaymentSuccess {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface OpenCheckoutOptions {
  orderId: string;
  amount: number; // in paise
  currency?: string;
  keyId?: string;
  name?: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, any>;
  themeColor?: string;
}

export async function openRazorpayModal(
  options: OpenCheckoutOptions
): Promise<RazorpayPaymentSuccess> {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !window.Razorpay) {
    throw new Error("Unable to load Razorpay checkout SDK. Please check your internet connection.");
  }

  const key =
    options.keyId ||
    import.meta.env.VITE_RAZORPAY_KEY_ID ||
    "";

  return new Promise((resolve, reject) => {
    const rzpOptions = {
      key,
      amount: options.amount,
      currency: options.currency || "INR",
      name: options.name || "ISLAH Welfare Foundation",
      description: options.description || "Donation & Social Impact Contribution",
      image: "/favicon.ico",
      order_id: options.orderId,
      prefill: {
        name: options.prefill?.name || "",
        email: options.prefill?.email || "",
        contact: options.prefill?.contact || "",
      },
      notes: options.notes || {},
      theme: {
        color: options.themeColor || "#0b1f3b",
      },
      modal: {
        ondismiss: function () {
          reject(new Error("Payment cancelled by user."));
        },
      },
      handler: function (response: RazorpayPaymentSuccess) {
        resolve(response);
      },
    };

    const rzp = new window.Razorpay(rzpOptions);

    rzp.on("payment.failed", function (response: any) {
      const errorMsg =
        response.error?.description || response.error?.reason || "Payment transaction failed";
      reject(new Error(errorMsg));
    });

    rzp.open();
  });
}
