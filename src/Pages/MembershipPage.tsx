import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Shield, Star, Sparkles, Award, CheckCircle2,
  Download, ArrowRight, ArrowLeft, Check, AlertCircle,
  Calendar, CreditCard, Smartphone, Building2, Banknote,
  Search, Eye, Edit2, FileText, UserX, QrCode, RefreshCw,
  ChevronDown, ChevronUp, Phone, Mail, MapPin, BadgeCheck,
  Lock, UserCheck, Clock, XCircle, Filter, Plus,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";

// ─── Constants ────────────────────────────────────────────────────────────────

type MemberCategory = "Blue" | "Yellow" | "Green";

const CATEGORY_CONFIG: Record<MemberCategory, {
  code: string;
  amount: number;
  color: string;
  darkColor: string;
  bg: string;
  border: string;
  badge: string;
  features: string[];
  icon: typeof Star;
}> = {
  Blue: {
    code: "BL",
    amount: 2500,
    color: "#1D4ED8",
    darkColor: "#1E3A8A",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    features: [
      "Digital Membership ID Card",
      "Annual membership certificate",
      "Access to IWF events & updates",
      "Newsletter subscription",
      "Member recognition on website (optional)",
    ],
    icon: Shield,
  },
  Yellow: {
    code: "YL",
    amount: 4000,
    color: "#D97706",
    darkColor: "#92400E",
    bg: "#FFFBEB",
    border: "#FDE68A",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    features: [
      "All Blue benefits",
      "Priority event invitations",
      "Quarterly impact reports",
      "Access to member dashboard",
      "Direct engagement with IWF programs",
      "Special appreciation mention",
    ],
    icon: Award,
  },
  Green: {
    code: "GR",
    amount: 6000,
    color: "#15803D",
    darkColor: "#14532D",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    badge: "bg-green-100 text-green-700 border-green-200",
    features: [
      "All Yellow benefits",
      "Direct access to program teams",
      "Annual recognition dinner invitation",
      "Co-branding on project materials",
      "Advisory role on relevant programs",
      "Priority volunteer placement",
      "Personalized impact report",
    ],
    icon: Sparkles,
  },
};

const DISTRICTS_BIHAR = [
  "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur",
  "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj",
  "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj",
  "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur",
  "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa",
  "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi",
  "Siwan", "Supaul", "Vaishali", "West Champaran",
];

// ─── Mock Member Data for Admin View ─────────────────────────────────────────

const MOCK_MEMBERS = [
  { id: "IWF-BL-2025-001", name: "Mohammad Rashid", category: "Blue" as MemberCategory, district: "Darbhanga", status: "Active", validTill: "2026-07-01", phone: "9876543210" },
  { id: "IWF-YL-2025-002", name: "Fatima Begum", category: "Yellow" as MemberCategory, district: "Patna", status: "Active", validTill: "2026-06-15", phone: "9765432109" },
  { id: "IWF-GR-2025-003", name: "Arjun Kumar Singh", category: "Green" as MemberCategory, district: "Muzaffarpur", status: "Active", validTill: "2026-05-20", phone: "9654321098" },
  { id: "IWF-BL-2025-004", name: "Saira Khatoon", category: "Blue" as MemberCategory, district: "Bhagalpur", status: "Expired", validTill: "2025-06-01", phone: "9543210987" },
  { id: "IWF-YL-2025-005", name: "Rajesh Verma", category: "Yellow" as MemberCategory, district: "Gaya", status: "Active", validTill: "2026-08-10", phone: "9432109876" },
];

// ─── ID Generation ────────────────────────────────────────────────────────────

function generateMemberId(category: MemberCategory, seq: number) {
  const code = CATEGORY_CONFIG[category].code;
  const year = new Date().getFullYear();
  return `IWF-${code}-${year}-${String(seq).padStart(3, "0")}`;
}

function generateReceiptNo() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `IWF-MEM-${y}${m}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function addOneYear(dateStr: string) {
  const d = new Date(dateStr);
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split("T")[0];
}

function formatDisplayDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

// ─── PDF Generators ───────────────────────────────────────────────────────────

async function generateMembershipCard(data: {
  memberId: string; fullName: string; category: MemberCategory;
  joinDate: string; validTill: string; district: string; state: string;
}) {
  const { default: jsPDF } = await import("jspdf");
  const cfg = CATEGORY_CONFIG[data.category];

  // Landscape card: 86mm × 54mm
  const doc = new jsPDF({ unit: "mm", format: [86, 54], orientation: "landscape" });

  // Parse color
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b] as const;
  };
  const [r, g, b] = hexToRgb(cfg.color);
  const [dr, dg, db] = hexToRgb(cfg.darkColor);

  // Background gradient simulation
  doc.setFillColor(dr, dg, db);
  doc.rect(0, 0, 86, 54, "F");
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, 86, 36, "F");

  // Decorative circles
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.07 }));
  doc.circle(72, -6, 20, "F");
  doc.circle(80, 48, 16, "F");
  doc.setGState(doc.GState({ opacity: 1 }));

  // IWF Branding
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "bold");
  doc.text("ISLAH WELFARE FOUNDATION", 5, 8);

  // Category badge
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.2 }));
  doc.roundedRect(5, 10, 28, 5.5, 1, 1, "F");
  doc.setGState(doc.GState({ opacity: 1 }));
  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.text(`✦ ${data.category.toUpperCase()} MEMBER`, 19, 13.8, { align: "center" });

  // Member name
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(data.fullName.toUpperCase().slice(0, 22), 5, 25);

  // Details
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "normal");
  doc.text(`${data.district}, ${data.state}`, 5, 31);

  // Bottom section (dark bg)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(5);
  doc.setFont("helvetica", "bold");
  doc.text("MEMBER ID", 5, 41);
  doc.setFontSize(7);
  doc.text(data.memberId, 5, 46);

  // Right side details
  doc.setFontSize(5);
  doc.setFont("helvetica", "normal");
  doc.text("VALID TILL", 55, 41);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.text(formatDisplayDate(data.validTill).toUpperCase(), 55, 46);

  // Validity stripe
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.1 }));
  doc.rect(0, 51, 86, 3, "F");
  doc.setGState(doc.GState({ opacity: 1 }));
  doc.setFontSize(4.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text("iwfindia.org  |  info@iwfindia.org  |  +91 9811861633", 43, 53, { align: "center" });

  // Use base64 data URI — most reliable cross-browser download with proper filename
  const dataUri = doc.output("datauristring");
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = dataUri;
  link.download = `IWF-Member-Card-${data.memberId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function generateMembershipReceipt(data: {
  memberId: string; fullName: string; fatherName: string; category: MemberCategory;
  amount: number; joinDate: string; validTill: string; paymentMode: string;
  transactionId: string; receiptNo: string;
}) {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const cfg = CATEGORY_CONFIG[data.category];
  const hexToRgb = (hex: string) =>
    [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)] as const;
  const [cr, cg, cb] = hexToRgb(cfg.color);
  const green = [21, 88, 47] as const;
  const orange = [234, 88, 12] as const;

  // Header
  doc.setFillColor(...green);
  doc.rect(0, 0, 210, 45, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ISLAH WELFARE FOUNDATION", 105, 16, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text('"Planting Seeds of Hope and Change"', 105, 22, { align: "center" });
  doc.text("Bathiya, Darbhanga, Bihar - 847423 | info@iwfindia.org | +91 9811861633", 105, 28, { align: "center" });

  // Title bar
  doc.setFillColor(...orange);
  doc.rect(0, 45, 210, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("MEMBERSHIP FEE RECEIPT", 105, 52, { align: "center" });

  // Meta
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Receipt No.: ${data.receiptNo}`, 15, 65);
  doc.text(`Date: ${formatDisplayDate(data.joinDate)}`, 150, 65);
  doc.line(15, 68, 195, 68);

  // Member Info
  doc.setFillColor(cr, cg, cb, 0.06);
  doc.roundedRect(12, 72, 186, 65, 3, 3, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(cr, cg, cb);
  doc.text("MEMBER INFORMATION", 20, 82);

  const memberRows: [string, string][] = [
    ["Full Name", data.fullName],
    ["Father / Mother Name", data.fatherName || "—"],
    ["Member ID", data.memberId],
    ["Membership Category", `${data.category} Member`],
    ["Date of Joining", formatDisplayDate(data.joinDate)],
    ["Valid Till", formatDisplayDate(data.validTill)],
    ["Membership Status", "Active"],
  ];
  doc.setFontSize(9);
  memberRows.forEach(([label, value], i) => {
    const y = 91 + i * 8.5;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`${label}:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    doc.text(value, 90, y);
  });

  // Payment Info
  const payY = 145;
  doc.setFillColor(...green);
  doc.roundedRect(12, payY, 186, 40, 3, 3, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("PAYMENT DETAILS", 20, payY + 10);
  doc.setFontSize(9);
  const payRows: [string, string][] = [
    ["Annual Membership Fee", `INR ${data.amount.toLocaleString("en-IN")}`],
    ["Payment Mode", data.paymentMode],
    ["Transaction / Reference ID", data.transactionId || "Cash Payment"],
  ];
  payRows.forEach(([label, value], i) => {
    const y = payY + 19 + i * 8;
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 100, y);
  });

  // Category highlight
  const catY = 195;
  doc.setFillColor(cr, cg, cb);
  doc.roundedRect(12, catY, 186, 18, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.category.toUpperCase()} MEMBERSHIP — Annual Fee: INR ${data.amount.toLocaleString("en-IN")}`, 105, catY + 11, { align: "center" });

  // Declaration
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("We confirm receipt of the annual membership fee. This membership is valid for one year from the date of joining.", 105, 225, { align: "center" });
  doc.text("Islah Welfare Foundation thanks you for your trust and support in our mission.", 105, 231, { align: "center" });

  // Signatures
  doc.line(25, 255, 85, 255);
  doc.line(125, 255, 185, 255);
  doc.setFontSize(8);
  doc.text("Authorized Signatory", 55, 260, { align: "center" });
  doc.text("Member Signature", 155, 260, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...green);
  doc.text("Islah Welfare Foundation", 55, 265, { align: "center" });

  // Footer
  doc.setFillColor(...green);
  doc.rect(0, 285, 210, 12, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text("Islah Welfare Foundation (Reg.) | Bathiya, Darbhanga, Bihar - 847423 | info@iwfindia.org | +91 9811861633", 105, 293, { align: "center" });

  // Use base64 data URI — most reliable cross-browser download with proper filename
  const dataUri = doc.output("datauristring");
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = dataUri;
  link.download = `IWF-Membership-Receipt-${data.receiptNo}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const memberSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  fatherName: z.string().trim().optional(),
  mobile: z.string().trim().min(10, "Valid mobile number required"),
  email: z.string().trim().email("Valid email required"),
  address: z.string().trim().min(5, "Address is required"),
  district: z.string().min(1, "Please select a district"),
  state: z.string().trim().min(2, "State is required"),
  category: z.enum(["Blue", "Yellow", "Green"], { required_error: "Select a membership category" }),
  paymentMode: z.enum(["Cash", "UPI", "Bank Transfer", "Online"]),
  transactionId: z.string().trim().optional(),
  paymentDate: z.string().min(1, "Payment date is required"),
  consent: z.boolean().optional(),
});

type MemberFormData = z.infer<typeof memberSchema>;

// ─── Shared UI ────────────────────────────────────────────────────────────────

const inputCls = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 mt-1.5 text-xs font-medium text-red-600">
      <AlertCircle className="w-3 h-3" /> {msg}
    </p>
  );
}

function InputLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepDots({ step, total }: { step: number; total: number }) {
  const labels = ["Category", "Personal Info", "Payment", "Confirm"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {labels.slice(0, total).map((label, i) => {
        const s = i + 1;
        const isActive = s === step;
        const isDone = s < step;
        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isDone ? "bg-brand-green text-white" : isActive ? "bg-brand-orange text-white scale-110 shadow-lg" : "bg-slate-100 text-slate-400"}`}>
                {isDone ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
              <span className={`text-[10px] mt-1 font-semibold whitespace-nowrap ${isActive ? "text-brand-orange" : isDone ? "text-brand-green" : "text-slate-400"}`}>{label}</span>
            </div>
            {i < total - 1 && <div className={`w-10 sm:w-14 h-0.5 mb-5 mx-1 transition-all ${isDone ? "bg-brand-green" : "bg-slate-200"}`} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Category Selection ───────────────────────────────────────────────

function Step1Category({ form, onNext }: { form: ReturnType<typeof useForm<MemberFormData>>; onNext: () => void }) {
  const { watch, setValue, formState: { errors }, trigger } = form;
  const category = watch("category");

  const handleNext = async () => {
    const valid = await trigger(["category"]);
    if (valid) onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h3 className="text-lg font-bold text-brand-green-dark mb-2">Choose Membership Category</h3>
      <p className="text-sm text-slate-500 mb-6">Select the membership tier that suits you. The annual contribution is auto-filled based on your selection.</p>

      <div className="space-y-4">
        {(["Blue", "Yellow", "Green"] as MemberCategory[]).map((cat) => {
          const cfg = CATEGORY_CONFIG[cat];
          const Icon = cfg.icon;
          const isSelected = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setValue("category", cat, { shouldValidate: true })}
              className="w-full text-left rounded-xl border-2 p-5 transition-all"
              style={{
                borderColor: isSelected ? cfg.color : "#E2E8F0",
                backgroundColor: isSelected ? cfg.bg : "white",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: isSelected ? cfg.color : "#F1F5F9" }}>
                    <Icon className="w-5 h-5" style={{ color: isSelected ? "white" : "#94A3B8" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-800">{cat} Membership</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold border" style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.border }}>
                        ₹{cfg.amount.toLocaleString("en-IN")}/year
                      </span>
                    </div>
                    <ul className="space-y-1 mt-2">
                      {cfg.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3 h-3 shrink-0" style={{ color: cfg.color }} /> {f}
                        </li>
                      ))}
                      {cfg.features.length > 3 && (
                        <li className="text-xs font-semibold" style={{ color: cfg.color }}>+{cfg.features.length - 3} more benefits</li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all`} style={{ borderColor: isSelected ? cfg.color : "#CBD5E1", backgroundColor: isSelected ? cfg.color : "transparent" }}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <FieldError msg={errors.category?.message} />

      {category && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: CATEGORY_CONFIG[category].bg, borderColor: CATEGORY_CONFIG[category].border, border: "1px solid" }}>
          <BadgeCheck className="w-5 h-5 shrink-0" style={{ color: CATEGORY_CONFIG[category].color }} />
          <div>
            <p className="text-sm font-bold" style={{ color: CATEGORY_CONFIG[category].color }}>Annual Contribution: ₹{CATEGORY_CONFIG[category].amount.toLocaleString("en-IN")}</p>
            <p className="text-xs text-slate-500">Valid for 12 months from date of joining. Auto-renews on payment.</p>
          </div>
        </motion.div>
      )}

      <div className="mt-8 flex justify-end">
        <button type="button" onClick={handleNext} className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-brand-green-dark transition-all hover:scale-[1.02]">
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Step 2: Personal Info ────────────────────────────────────────────────────

function Step2PersonalInfo({ form, onNext, onBack }: { form: ReturnType<typeof useForm<MemberFormData>>; onNext: () => void; onBack: () => void }) {
  const { register, formState: { errors }, trigger } = form;

  const handleNext = async () => {
    const valid = await trigger(["fullName", "mobile", "email", "address", "district", "state"]);
    if (valid) onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h3 className="text-lg font-bold text-brand-green-dark mb-6">Personal Information</h3>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <InputLabel required>Full Name</InputLabel>
            <input {...register("fullName")} placeholder="Your full legal name" className={inputCls} />
            <FieldError msg={errors.fullName?.message} />
          </div>
          <div>
            <InputLabel>Father / Mother Name</InputLabel>
            <input {...register("fatherName")} placeholder="Guardian's full name" className={inputCls} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <InputLabel required>Mobile Number</InputLabel>
            <input {...register("mobile")} type="tel" placeholder="+91 98765 43210" className={inputCls} />
            <FieldError msg={errors.mobile?.message} />
          </div>
          <div>
            <InputLabel required>Email Address</InputLabel>
            <input {...register("email")} type="email" placeholder="you@example.com" className={inputCls} />
            <FieldError msg={errors.email?.message} />
          </div>
        </div>

        <div>
          <InputLabel required>Full Address</InputLabel>
          <textarea {...register("address")} placeholder="House no., Street, Village/Town..." rows={2} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none" />
          <FieldError msg={errors.address?.message} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <InputLabel required>District</InputLabel>
            <select {...register("district")} defaultValue="" className={inputCls}>
              <option value="" disabled>Select district…</option>
              {DISTRICTS_BIHAR.map((d) => <option key={d} value={d}>{d}</option>)}
              <option value="Other">Other</option>
            </select>
            <FieldError msg={errors.district?.message} />
          </div>
          <div>
            <InputLabel required>State</InputLabel>
            <input {...register("state")} placeholder="Bihar" defaultValue="Bihar" className={inputCls} />
            <FieldError msg={errors.state?.message} />
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <input id="mem-consent" type="checkbox" {...register("consent")} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green" />
          <label htmlFor="mem-consent" className="text-xs text-slate-600 cursor-pointer leading-relaxed">
            I consent to my name being displayed in the Members & Supporters section on the IWF website (optional).
          </label>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="button" onClick={handleNext} className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-brand-green-dark transition-all hover:scale-[1.02]">
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Step 3: Payment ──────────────────────────────────────────────────────────

function Step3Payment({ form, onNext, onBack }: { form: ReturnType<typeof useForm<MemberFormData>>; onNext: () => void; onBack: () => void }) {
  const { register, watch, setValue, formState: { errors }, trigger } = form;
  const paymentMode = watch("paymentMode");
  const category = watch("category");
  const cfg = category ? CATEGORY_CONFIG[category] : null;

  const handleNext = async () => {
    const valid = await trigger(["paymentMode", "paymentDate"]);
    if (valid) onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h3 className="text-lg font-bold text-brand-green-dark mb-2">Payment Details</h3>
      {cfg && (
        <div className="flex items-center gap-3 mb-6 p-3 rounded-xl border" style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}>
          <cfg.icon className="w-5 h-5" style={{ color: cfg.color }} />
          <div>
            <p className="text-sm font-bold" style={{ color: cfg.color }}>{category} Membership — Annual Fee</p>
            <p className="text-xl font-extrabold text-slate-800">₹{cfg.amount.toLocaleString("en-IN")}</p>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {/* Payment Mode */}
        <div>
          <InputLabel required>Payment Mode</InputLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["Cash", "UPI", "Bank Transfer", "Online"] as const).map((mode) => {
              const icons = { Cash: Banknote, UPI: Smartphone, "Bank Transfer": Building2, Online: CreditCard };
              const Icon = icons[mode];
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setValue("paymentMode", mode)}
                  className={`flex flex-col items-center gap-1.5 py-3.5 rounded-xl border-2 transition-all ${paymentMode === mode ? "border-brand-green bg-brand-green/5" : "border-slate-200 hover:border-slate-300"}`}
                >
                  <Icon className={`w-4 h-4 ${paymentMode === mode ? "text-brand-green" : "text-slate-400"}`} />
                  <span className={`text-xs font-bold ${paymentMode === mode ? "text-brand-green" : "text-slate-600"}`}>{mode}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Transaction ID */}
        {paymentMode !== "Cash" && (
          <div>
            <InputLabel>Transaction / UTR / Reference ID</InputLabel>
            <input {...register("transactionId")} placeholder="e.g. T2507051234567" className={inputCls} />
          </div>
        )}

        {/* Payment Date */}
        <div>
          <InputLabel required>Payment Date</InputLabel>
          <input {...register("paymentDate")} type="date" defaultValue={new Date().toISOString().split("T")[0]} max={new Date().toISOString().split("T")[0]} className={inputCls} />
          <FieldError msg={errors.paymentDate?.message} />
        </div>

        {/* UPI Details */}
        {paymentMode === "UPI" && (
          <div className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-4 space-y-2">
            <p className="text-xs font-bold text-brand-green-dark">Pay via UPI</p>
            <p className="text-sm font-mono font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center justify-between">
              iwfindia@ubgb
              <button type="button" onClick={() => navigator.clipboard.writeText("iwfindia@ubgb")} className="text-brand-green">
                <QrCode className="w-4 h-4" />
              </button>
            </p>
            <p className="text-xs text-slate-500">Enter the UTR/Transaction ID above after payment.</p>
          </div>
        )}

        {/* Bank Details */}
        {paymentMode === "Bank Transfer" && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <p className="text-xs font-bold text-slate-700 mb-2">Bank Transfer Details</p>
            {[["Account", "ISLAH WELFARE FOUNDATION"], ["Account No.", "1004451030069725"], ["Bank", "Uttar Bihar Gramin Bank"], ["IFSC", "CBIN0R10001"], ["Type", "Saving Account"]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-slate-500 font-semibold">{k}</span>
                <span className="text-slate-800 font-mono font-medium">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="button" onClick={handleNext} className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-brand-green-dark transition-all hover:scale-[1.02]">
          Review <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Step 4: Confirm ──────────────────────────────────────────────────────────

function Step4Confirm({
  form, memberId, joinDate, validTill, onBack, onSubmit,
}: {
  form: ReturnType<typeof useForm<MemberFormData>>;
  memberId: string; joinDate: string; validTill: string;
  onBack: () => void; onSubmit: () => void;
}) {
  const data = form.getValues();
  const cfg = CATEGORY_CONFIG[data.category];

  const rows: [string, string][] = [
    ["Full Name", data.fullName],
    ["Father/Mother Name", data.fatherName || "—"],
    ["Mobile", data.mobile],
    ["Email", data.email],
    ["District, State", `${data.district}, ${data.state}`],
    ["Member ID (auto)", memberId],
    ["Category", `${data.category} Membership`],
    ["Annual Fee", `₹${cfg.amount.toLocaleString("en-IN")}`],
    ["Date of Joining", formatDisplayDate(joinDate)],
    ["Valid Till", formatDisplayDate(validTill)],
    ["Payment Mode", data.paymentMode],
    ["Transaction ID", data.transactionId || "Cash"],
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h3 className="text-lg font-bold text-brand-green-dark mb-6 flex items-center gap-2">
        <BadgeCheck className="w-5 h-5 text-brand-green" /> Review & Confirm
      </h3>

      {/* Category banner */}
      <div className="rounded-xl p-4 mb-5 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.darkColor})` }}>
        <div>
          <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-0.5">{data.category} Membership</p>
          <p className="text-white text-2xl font-extrabold">₹{cfg.amount.toLocaleString("en-IN")}/year</p>
          <p className="text-white/70 text-xs mt-0.5">{memberId}</p>
        </div>
        <cfg.icon className="w-10 h-10 text-white/30" />
      </div>

      {/* Details */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden mb-5 shadow-sm">
        {rows.map(([label, value], i) => (
          <div key={label} className={`flex items-start justify-between gap-3 px-4 py-2.5 ${i % 2 === 0 ? "bg-slate-50/60" : ""}`}>
            <span className="text-xs font-semibold text-slate-500 shrink-0 w-36">{label}</span>
            <span className="text-xs text-slate-800 font-medium text-right break-all">{value}</span>
          </div>
        ))}
      </div>

      {/* Docs preview */}
      <div className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-4 mb-6">
        <p className="text-xs font-bold text-brand-green-dark mb-2 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Documents generated:</p>
        <div className="space-y-1">
          {["✅ Membership ID Card (PDF)", "✅ Membership Fee Receipt (PDF)", "📧 Email with documents (backend)"].map((d) => (
            <p key={d} className="text-xs text-slate-700">{d}</p>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="button" onClick={onSubmit} className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-all">
          <UserCheck className="w-4 h-4" /> Register Member
        </button>
      </div>
    </motion.div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({
  data, memberId, joinDate, validTill, receiptNo,
}: {
  data: MemberFormData; memberId: string; joinDate: string; validTill: string; receiptNo: string;
}) {
  const cfg = CATEGORY_CONFIG[data.category];
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleCard = async () => {
    setDownloading("card");
    await generateMembershipCard({ memberId, fullName: data.fullName, category: data.category, joinDate, validTill, district: data.district, state: data.state });
    setDownloading(null);
  };

  const handleReceipt = async () => {
    setDownloading("receipt");
    await generateMembershipReceipt({ memberId, fullName: data.fullName, fatherName: data.fatherName || "", category: data.category, amount: cfg.amount, joinDate, validTill, paymentMode: data.paymentMode, transactionId: data.transactionId || "", receiptNo });
    setDownloading(null);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, type: "spring" }} className="text-center py-4">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 border-4"
        style={{ backgroundColor: `${cfg.color}15`, borderColor: `${cfg.color}30` }}
      >
        <CheckCircle2 className="w-10 h-10" style={{ color: cfg.color }} />
      </motion.div>

      <h2 className="text-2xl font-extrabold text-brand-green-dark mb-2">Welcome, {data.fullName.split(" ")[0]}! 🎉</h2>
      <p className="text-slate-500 text-sm mb-1">Your <strong style={{ color: cfg.color }}>{data.category} Membership</strong> has been registered successfully.</p>
      <p className="text-xs text-slate-400 mb-1">Member ID: <span className="font-mono font-semibold text-slate-700">{memberId}</span></p>
      <p className="text-xs text-slate-400 mb-6">Valid till: <span className="font-semibold text-slate-600">{formatDisplayDate(validTill)}</span></p>

      {/* Category badge */}
      <div className="inline-flex items-center gap-3 rounded-xl border-2 px-5 py-3 mb-8" style={{ borderColor: cfg.color, backgroundColor: cfg.bg }}>
        <cfg.icon className="w-6 h-6" style={{ color: cfg.color }} />
        <div className="text-left">
          <p className="text-sm font-bold" style={{ color: cfg.color }}>{data.category} Member</p>
          <p className="text-xs text-slate-500">Member since {formatDisplayDate(joinDate)}</p>
        </div>
      </div>

      {/* Reminders info */}
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-left">
        <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Auto-reminders will be sent</strong> 30 days and 7 days before your membership expires on <strong>{formatDisplayDate(validTill)}</strong>.
        </p>
      </div>

      {/* Download buttons */}
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        <button onClick={handleCard} disabled={downloading === "card"}
          className="flex items-center justify-center gap-2 font-bold py-3 px-5 rounded-xl border-2 transition-all hover:scale-[1.02] disabled:opacity-60"
          style={{ borderColor: cfg.color, color: cfg.color }}>
          {downloading === "card" ? <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" /> : <Download className="w-4 h-4" />}
          Download ID Card
        </button>
        <button onClick={handleReceipt} disabled={downloading === "receipt"}
          className="flex items-center justify-center gap-2 bg-brand-green text-white font-bold py-3 px-5 rounded-xl shadow-md hover:bg-brand-green-dark transition-all hover:scale-[1.02] disabled:opacity-60">
          {downloading === "receipt" ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FileText className="w-4 h-4" />}
          Download Receipt
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-8">
        <Mail className="w-3.5 h-3.5" />
        <span>Membership card & receipt will be emailed to <strong className="text-slate-600">{data.email}</strong></span>
      </div>

      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-center">
        <a href="/membership#status" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:underline">
          <Search className="w-4 h-4" /> Check Member Status
        </a>
        <span className="text-slate-300 hidden sm:block">|</span>
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </a>
      </div>
    </motion.div>
  );
}

// ─── Member Status Check ──────────────────────────────────────────────────────

function MemberStatusCheck() {
  const [query, setQuery] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [result, setResult] = useState<typeof MOCK_MEMBERS[0] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    const found = MOCK_MEMBERS.find(
      (m) => m.id.toLowerCase() === query.trim().toLowerCase() || m.phone === query.trim()
    );
    if (found) {
      setResult(found);
      setOtpSent(true);
      setNotFound(false);
    } else {
      setNotFound(true);
      setOtpSent(false);
      setResult(null);
    }
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setVerified(true);
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setQuery("");
    setOtpSent(false);
    setOtp("");
    setVerified(false);
    setResult(null);
    setNotFound(false);
  };

  const cfg = result ? CATEGORY_CONFIG[result.category] : null;
  const isExpired = result?.status === "Expired";

  return (
    <section id="status" className="py-16 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Membership Portal</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-dark">Check Your Membership Status</h2>
          <p className="text-slate-500 text-sm mt-2">Enter your Membership ID (e.g. IWF-BL-2025-001) or registered mobile number.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-brand-green to-brand-green-dark px-6 py-4">
            <h3 className="text-white font-bold flex items-center gap-2"><Search className="w-4 h-4" /> Member Lookup</h3>
          </div>
          <div className="p-6">
            <AnimatePresence mode="wait">
              {!otpSent && !verified && (
                <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex gap-2">
                    <input
                      value={query}
                      onChange={(e) => { setQuery(e.target.value); setNotFound(false); }}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="IWF-BL-2025-001 or 9876543210"
                      className={`${inputCls} flex-1`}
                    />
                    <button
                      onClick={handleSearch}
                      disabled={!query.trim()}
                      className="px-5 py-2 bg-brand-green text-white font-bold rounded-lg hover:bg-brand-green-dark transition disabled:opacity-50"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                  <AnimatePresence>
                    {notFound && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                        <XCircle className="w-4 h-4 shrink-0" /> No member found with this ID or mobile number.
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <p className="text-xs text-slate-400 mt-3">Try: IWF-BL-2025-001 or phone 9876543210 (demo data)</p>
                </motion.div>
              )}

              {otpSent && !verified && result && (
                <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-brand-green bg-brand-green/5 border border-brand-green/20 rounded-lg p-3">
                    <Phone className="w-4 h-4" /> OTP sent to ****{result.phone.slice(-4)}
                  </div>
                  <div>
                    <InputLabel required>Enter OTP</InputLabel>
                    <div className="flex gap-2">
                      <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="• • • • • •"
                        maxLength={6}
                        className={`${inputCls} flex-1 text-center tracking-widest font-bold text-xl`}
                      />
                      <button
                        onClick={handleVerifyOtp}
                        disabled={otp.length < 4 || loading}
                        className="px-5 py-2 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-orange-dark transition disabled:opacity-50"
                      >
                        {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" /> : "Verify"}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">For demo: enter any 4+ digit code to proceed.</p>
                  </div>
                  <button onClick={handleReset} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Search again</button>
                </motion.div>
              )}

              {verified && result && cfg && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${isExpired ? "bg-red-50 border-red-200" : "border"}`} style={!isExpired ? { backgroundColor: cfg.bg, borderColor: cfg.border } : {}}>
                    <div className="flex items-center gap-3">
                      <cfg.icon className="w-6 h-6" style={{ color: cfg.color }} />
                      <div>
                        <p className="font-bold text-slate-800">{result.name}</p>
                        <p className="text-xs font-mono text-slate-500">{result.id}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${isExpired ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                      {result.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Category", value: `${result.category} Membership`, icon: cfg.icon },
                      { label: "Valid Till", value: formatDisplayDate(result.validTill), icon: Calendar },
                      { label: "District", value: result.district, icon: MapPin },
                      { label: "Mobile", value: `****${result.phone.slice(-4)}`, icon: Phone },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Icon className="w-3 h-3" /> {label}</p>
                        <p className="text-sm font-bold text-slate-800">{value}</p>
                      </div>
                    ))}
                  </div>

                  {isExpired && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                      <p className="text-sm font-bold text-red-700 mb-2">Membership Expired</p>
                      <p className="text-xs text-red-600 mb-3">Renew your membership to continue enjoying IWF benefits.</p>
                      <a href="#register" className="inline-flex items-center gap-2 bg-brand-orange text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-brand-orange-dark transition">
                        <RefreshCw className="w-3.5 h-3.5" /> Renew Membership
                      </a>
                    </div>
                  )}

                  <button onClick={handleReset} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mx-auto">
                    <Search className="w-3 h-3" /> Search another member
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Admin Dashboard (Mock Prototype) ────────────────────────────────────────

function AdminDashboard() {
  const [filter, setFilter] = useState<MemberCategory | "All">("All");
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleAdminLogin = () => {
    if (adminPin === "1234") { // Demo PIN
      setShowAdmin(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const filtered = filter === "All" ? MOCK_MEMBERS : MOCK_MEMBERS.filter((m) => m.category === filter);
  const stats = {
    total: MOCK_MEMBERS.length,
    active: MOCK_MEMBERS.filter((m) => m.status === "Active").length,
    expired: MOCK_MEMBERS.filter((m) => m.status === "Expired").length,
    blue: MOCK_MEMBERS.filter((m) => m.category === "Blue").length,
    yellow: MOCK_MEMBERS.filter((m) => m.category === "Yellow").length,
    green: MOCK_MEMBERS.filter((m) => m.category === "Green").length,
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Admin Portal</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-dark">Member Management Dashboard</h2>
          <p className="text-slate-500 text-sm mt-2">Administrative view for managing IWF members. Protected access.</p>
        </div>

        <AnimatePresence mode="wait">
          {!showAdmin ? (
            <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-sm mx-auto">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-brand-green" />
                </div>
                <h3 className="font-bold text-brand-green-dark mb-1">Admin Access</h3>
                <p className="text-xs text-slate-500 mb-5">Enter admin PIN to access the dashboard</p>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => { setAdminPin(e.target.value); setPinError(false); }}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  placeholder="Enter PIN"
                  maxLength={6}
                  className={`${inputCls} text-center tracking-widest text-lg font-bold mb-3`}
                />
                {pinError && <p className="text-xs text-red-600 mb-3">Incorrect PIN. Try <strong>1234</strong> (demo).</p>}
                <button onClick={handleAdminLogin} className="w-full bg-brand-green text-white font-bold py-2.5 rounded-xl hover:bg-brand-green-dark transition">
                  Access Dashboard
                </button>
                <p className="text-xs text-slate-400 mt-3">Demo PIN: 1234</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {[
                  { label: "Total", value: stats.total, color: "#1D4ED8", bg: "#EFF6FF" },
                  { label: "Active", value: stats.active, color: "#15803D", bg: "#F0FDF4" },
                  { label: "Expired", value: stats.expired, color: "#DC2626", bg: "#FEF2F2" },
                  { label: "Blue", value: stats.blue, color: "#1D4ED8", bg: "#DBEAFE" },
                  { label: "Yellow", value: stats.yellow, color: "#D97706", bg: "#FEF3C7" },
                  { label: "Green", value: stats.green, color: "#15803D", bg: "#DCFCE7" },
                ].map(({ label, value, color, bg }) => (
                  <div key={label} className="rounded-xl p-4 text-center" style={{ backgroundColor: bg }}>
                    <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">{label} Members</p>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <div className="flex gap-1.5">
                    {(["All", "Blue", "Yellow", "Green"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${filter === f ? "bg-brand-green text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 bg-brand-orange text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-orange-dark transition">
                  <Plus className="w-3.5 h-3.5" /> Add Member
                </button>
              </div>

              {/* Table */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {["#", "Member ID", "Name", "Category", "District", "Status", "Valid Till", "Actions"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filtered.map((member, i) => {
                        const catCfg = CATEGORY_CONFIG[member.category];
                        return (
                          <>
                            <tr key={member.id} className="hover:bg-slate-50 transition">
                              <td className="px-4 py-3 text-slate-400 text-xs">{i + 1}</td>
                              <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">{member.id}</td>
                              <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{member.name}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${catCfg.badge}`}>
                                  {member.category}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-xs text-slate-600">{member.district}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${member.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                                  {member.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{formatDisplayDate(member.validTill)}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => setExpandedRow(expandedRow === member.id ? null : member.id)} title="View" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-brand-green transition">
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button title="Edit" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-brand-orange transition">
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button title="Receipt" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-brand-blue transition">
                                    <FileText className="w-3.5 h-3.5" />
                                  </button>
                                  <button title="ID Card" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-brand-green transition">
                                    <CreditCard className="w-3.5 h-3.5" />
                                  </button>
                                  <button title="Deactivate" className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-500 transition">
                                    <UserX className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <AnimatePresence>
                              {expandedRow === member.id && (
                                <motion.tr key={`exp-${member.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                  <td colSpan={8} className="px-6 py-4 bg-slate-50">
                                    <div className="grid sm:grid-cols-3 gap-3 text-xs">
                                      {[["Member ID", member.id], ["Phone", member.phone], ["Category", `${member.category} Membership`], ["Status", member.status], ["Valid Till", formatDisplayDate(member.validTill)], ["District", member.district]].map(([k, v]) => (
                                        <div key={k} className="bg-white border border-slate-100 rounded-lg p-3">
                                          <p className="text-slate-400 font-semibold mb-0.5">{k}</p>
                                          <p className="text-slate-800 font-bold">{v}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </td>
                                </motion.tr>
                              )}
                            </AnimatePresence>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-500">Showing {filtered.length} of {MOCK_MEMBERS.length} members (demo data)</p>
                  <button onClick={() => setShowAdmin(false)} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Lock Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Registration Form Wrapper ────────────────────────────────────────────────

function RegistrationSection() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split("T")[0];
  const [memberId] = useState(() => generateMemberId("Blue", Math.floor(10 + Math.random() * 990)));
  const [receiptNo] = useState(generateReceiptNo);
  const [joinDate] = useState(today);
  const validTill = addOneYear(joinDate);

  const form = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: { paymentMode: "UPI", consent: false, state: "Bihar", district: "" },
    mode: "onSubmit",
  });

  // Regenerate member ID based on category
  const category = form.watch("category");
  const [currentMemberId, setCurrentMemberId] = useState(memberId);
  const handleCategoryChange = () => {
    if (category) {
      setCurrentMemberId(generateMemberId(category, Math.floor(10 + Math.random() * 990)));
    }
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const handleNext = () => { handleCategoryChange(); setStep((s) => s + 1); scrollToForm(); };
  const handleBack = () => { setStep((s) => s - 1); scrollToForm(); };
  const handleSubmit = () => { setSubmitted(true); scrollToForm(); };

  const data = form.getValues();

  return (
    <section id="register" className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        {/* Form */}
        <div ref={formRef} className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-brand-green to-brand-green-dark px-6 py-5">
            <h2 className="text-white font-extrabold text-xl">Member Registration</h2>
            <p className="text-white/70 text-xs mt-1">Auto-generated Member ID • Digital ID Card • Fee Receipt</p>
          </div>
          <div className="p-6 sm:p-8">
            {!submitted && <StepDots step={step} total={4} />}
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessScreen key="success" data={data} memberId={currentMemberId} joinDate={joinDate} validTill={validTill} receiptNo={receiptNo} />
              ) : step === 1 ? (
                <Step1Category key="step1" form={form} onNext={handleNext} />
              ) : step === 2 ? (
                <Step2PersonalInfo key="step2" form={form} onNext={handleNext} onBack={handleBack} />
              ) : step === 3 ? (
                <Step3Payment key="step3" form={form} onNext={handleNext} onBack={handleBack} />
              ) : (
                <Step4Confirm key="step4" form={form} memberId={currentMemberId} joinDate={joinDate} validTill={validTill} onBack={handleBack} onSubmit={handleSubmit} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Category Summary */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 px-4 py-3">
              <h3 className="font-bold text-brand-green-dark text-sm uppercase tracking-wide">Membership Tiers</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {(["Blue", "Yellow", "Green"] as MemberCategory[]).map((cat) => {
                const cfg = CATEGORY_CONFIG[cat];
                return (
                  <div key={cat} className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.bg }}>
                      <cfg.icon className="w-4 h-4" style={{ color: cfg.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-700">{cat} Membership</p>
                      <p className="text-xs text-slate-500">{cfg.features.length} benefits</p>
                    </div>
                    <span className="text-sm font-extrabold" style={{ color: cfg.color }}>₹{cfg.amount.toLocaleString("en-IN")}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What you get */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-brand-green-dark text-sm mb-4 uppercase tracking-wide">What You Get</h3>
            <div className="space-y-2.5">
              {[
                { icon: CreditCard, title: "Digital ID Card", desc: "Downloadable PDF membership card" },
                { icon: FileText, title: "Fee Receipt", desc: "Instant PDF fee receipt" },
                { icon: Mail, title: "Email Delivery", desc: "Card + receipt sent to your email" },
                { icon: Clock, title: "Renewal Reminders", desc: "30 & 7 day expiry alerts" },
                { icon: BadgeCheck, title: "Verified Status", desc: "Public member status check portal" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">{title}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policy */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Membership Policy</p>
            <ul className="space-y-1.5">
              {["Annual renewal required", "One membership per individual", "Non-transferable", "14-day refund window", "Policy governed by IWF constitution"].map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-amber-700">
                  <Check className="w-3 h-3 shrink-0 mt-0.5" /> {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Need Help?</p>
            <div className="space-y-1.5">
              <a href="tel:+919811861633" className="flex items-center gap-2 text-xs text-brand-green font-semibold hover:underline">
                <Phone className="w-3.5 h-3.5" /> +91 9811861633
              </a>
              <a href="mailto:info@iwfindia.org" className="flex items-center gap-2 text-xs text-brand-green font-semibold hover:underline">
                <Mail className="w-3.5 h-3.5" /> info@iwfindia.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Membership Hero ──────────────────────────────────────────────────────────

function MembershipHero() {
  return (
    <section className="bg-[#0d2b1a] text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">Islah Welfare Foundation</p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Join IWF as a Member</h1>
        <p className="text-white/75 max-w-2xl leading-relaxed text-base mb-6">
          Become part of India's growing movement for equitable development. Your membership directly supports education, healthcare, and livelihood programs across rural communities.
        </p>
        <div className="flex flex-wrap gap-3">
          {(["Blue", "Yellow", "Green"] as MemberCategory[]).map((cat) => {
            const cfg = CATEGORY_CONFIG[cat];
            return (
              <div key={cat} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-semibold">
                <cfg.icon className="w-3.5 h-3.5 text-brand-orange" />
                {cat}: ₹{cfg.amount.toLocaleString("en-IN")}/yr
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-8">
          <a href="#register" className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-7 py-3 rounded-lg shadow-lg transition-all hover:scale-[1.02] inline-flex items-center gap-2">
            <Users className="w-4 h-4" /> Join Now
          </a>
          <a href="#status" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3 rounded-lg transition-all hover:scale-[1.02] inline-flex items-center gap-2">
            <Search className="w-4 h-4" /> Check Status
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Membership Benefits (Comparison) ────────────────────────────────────────

function MembershipComparison() {
  const allFeatures = [
    "Digital Membership ID Card",
    "Annual membership certificate",
    "Access to IWF events & updates",
    "Newsletter subscription",
    "Member recognition on website",
    "Priority event invitations",
    "Quarterly impact reports",
    "Access to member dashboard",
    "Direct engagement with IWF programs",
    "Annual recognition dinner invitation",
    "Co-branding on project materials",
    "Advisory role on relevant programs",
    "Priority volunteer placement",
    "Personalized impact report",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Compare Plans</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-dark">Membership Benefits</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-64">Feature</th>
                {(["Blue", "Yellow", "Green"] as MemberCategory[]).map((cat) => {
                  const cfg = CATEGORY_CONFIG[cat];
                  return (
                    <th key={cat} className="px-5 py-4 text-center" style={{ backgroundColor: `${cfg.color}08` }}>
                      <div className="flex flex-col items-center gap-1">
                        <cfg.icon className="w-5 h-5" style={{ color: cfg.color }} />
                        <span className="text-sm font-extrabold" style={{ color: cfg.color }}>{cat}</span>
                        <span className="text-xs text-slate-500">₹{cfg.amount.toLocaleString("en-IN")}/yr</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {allFeatures.map((feature, i) => (
                <tr key={feature} className={i % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                  <td className="px-5 py-3 text-xs text-slate-700 font-medium">{feature}</td>
                  {(["Blue", "Yellow", "Green"] as MemberCategory[]).map((cat) => {
                    const included = CATEGORY_CONFIG[cat].features.includes(feature);
                    return (
                      <td key={cat} className="px-5 py-3 text-center" style={{ backgroundColor: included ? `${CATEGORY_CONFIG[cat].color}08` : "transparent" }}>
                        {included
                          ? <Check className="w-4 h-4 mx-auto" style={{ color: CATEGORY_CONFIG[cat].color }} />
                          : <span className="text-slate-200 text-lg">—</span>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="border-t border-slate-200">
                <td className="px-5 py-4 text-xs font-bold text-slate-700">Annual Fee</td>
                {(["Blue", "Yellow", "Green"] as MemberCategory[]).map((cat) => {
                  const cfg = CATEGORY_CONFIG[cat];
                  return (
                    <td key={cat} className="px-5 py-4 text-center">
                      <a href="#register" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition hover:scale-[1.02]" style={{ backgroundColor: cfg.color }}>
                        Join ₹{cfg.amount.toLocaleString("en-IN")} <ArrowRight className="w-3 h-3" />
                      </a>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MembershipPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        <MembershipHero />
        <MembershipComparison />
        <RegistrationSection />
        <MemberStatusCheck />
        <AdminDashboard />
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
