import { useState } from "react";
import { Shield, Copy, CheckCircle2, FileText, Download, ArrowRight, ExternalLink } from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

const REGISTRATIONS = [
  { label: "Name of Organization", value: "Islah Welfare Foundation", icon: "🏛️" },
  { label: "Type of Organization", value: "Public Charitable Trust", icon: "⚖️" },
  { label: "Registration Act", value: "Indian Trust Act, 1882", icon: "📜" },
  { label: "Year of Establishment", value: "2016", icon: "📅" },
  { label: "Registered Address", value: "Bathiya, Via-Putai Manigachhi, Darbhanga, Bihar – 847423", icon: "📍" },
  { label: "PAN Number", value: "AABTI1234F (Representative)", icon: "💳" },
  { label: "12A Registration", value: "Registered (Income Tax Exemption)", icon: "✅" },
  { label: "80G Registration", value: "Registered (Donor Tax Exemption — 50%)", icon: "✅" },
  { label: "FCRA Registration", value: "FCRA Compliant for Foreign Contributions", icon: "🌐" },
  { label: "CSR Eligible", value: "Listed under Schedule VII of Companies Act 2013", icon: "🤝" },
];

const EXEMPTIONS = [
  {
    title: "12A — Income Tax Exemption",
    color: "#15803d",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    desc: "IWF is registered under Section 12A of the Income Tax Act, exempting its income from taxation provided it is applied for charitable purposes.",
    benefit: "For IWF: Entire income used for programs is tax-free.",
  },
  {
    title: "80G — Donor Tax Deduction",
    color: "#1D4ED8",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    desc: "Donations made to IWF qualify for 50% deduction under Section 80G of the Income Tax Act. Donors must furnish their PAN to claim this benefit.",
    benefit: "For Donors: 50% of your donation is deductible from taxable income.",
  },
  {
    title: "FCRA — Foreign Contribution",
    color: "#ea580c",
    bg: "#FFF7ED",
    border: "#FED7AA",
    desc: "IWF is compliant with the Foreign Contribution Regulation Act (FCRA), allowing it to receive and utilize contributions from foreign individuals, organizations, and governments.",
    benefit: "For International Donors: Contributions can be made directly to FCRA account.",
  },
  {
    title: "CSR Eligibility",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    desc: "IWF is an eligible recipient for Corporate Social Responsibility (CSR) funds as per Schedule VII of the Companies Act, 2013.",
    benefit: "For Corporates: CSR contributions to IWF count toward your CSR obligations.",
  },
];

const BANK_ACCOUNTS = [
  {
    type: "Domestic Donations",
    bank: "Uttar Bihar Gramin Bank",
    account: "1004451030069725",
    ifsc: "CBIN0R10001",
    branch: "Manigachhi, Darbhanga",
    accountType: "Savings Account",
    color: "#15803d",
  },
  {
    type: "FCRA — Foreign Donations",
    bank: "Contact IWF for FCRA Account Details",
    account: "On Request",
    ifsc: "On Request",
    branch: "FCRA Designated Branch",
    accountType: "FCRA Account",
    color: "#1D4ED8",
  },
];

function CopyField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="ml-2 p-1 rounded hover:bg-slate-100 transition text-slate-400 hover:text-brand-green"
      title="Copy"
    >
      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function LegalStatusPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  return (
    <div className="min-h-screen bg-white font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#0b1f3b] text-white py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">About IWF</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Legal Status & Registration</h1>
            <p className="text-white/75 max-w-2xl leading-relaxed">
              IWF is a registered public charitable trust with full legal standing under Indian law, eligible for income tax exemptions, donor deductions, and CSR funding.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {["12A Registered", "80G Certified", "FCRA Compliant", "CSR Eligible"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" /> {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">

            {/* Registration Details */}
            <ScrollReveal>
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Registration</p>
                <h2 className="text-2xl font-extrabold text-brand-green-dark">Organization Details</h2>
              </div>
            </ScrollReveal>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-10">
              {REGISTRATIONS.map((item, i) => (
                <div key={item.label} className={`flex items-start gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-slate-50/40" : "bg-white"} ${i < REGISTRATIONS.length - 1 ? "border-b border-slate-100" : ""}`}>
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tax Exemptions */}
            <ScrollReveal>
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Exemptions</p>
                <h2 className="text-2xl font-extrabold text-brand-green-dark">Tax & Legal Status</h2>
              </div>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-5 mb-12">
              {EXEMPTIONS.map((ex) => (
                <ScrollReveal key={ex.title}>
                  <div className="rounded-2xl border-2 p-5 h-full" style={{ borderColor: ex.border, backgroundColor: ex.bg }}>
                    <h3 className="font-extrabold text-sm mb-2" style={{ color: ex.color }}>{ex.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{ex.desc}</p>
                    <div className="flex items-start gap-2 p-3 rounded-xl border" style={{ borderColor: ex.border, backgroundColor: "white" }}>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: ex.color }} />
                      <p className="text-xs font-semibold text-slate-700">{ex.benefit}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Bank Accounts */}
            <ScrollReveal>
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Banking</p>
                <h2 className="text-2xl font-extrabold text-brand-green-dark">Official Bank Accounts</h2>
                <p className="text-slate-500 text-sm mt-1">All donations must be made to IWF's official accounts only. Beware of fraud.</p>
              </div>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-5 mb-12">
              {BANK_ACCOUNTS.map((acct) => (
                <div key={acct.type} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${acct.color}15` }}>
                      <Shield className="w-4 h-4" style={{ color: acct.color }} />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: acct.color }}>
                      {acct.type}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      ["Bank", acct.bank],
                      ["Account No.", acct.account],
                      ["IFSC Code", acct.ifsc],
                      ["Branch", acct.branch],
                      ["Account Type", acct.accountType],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between text-xs border-b border-slate-50 pb-2">
                        <span className="text-slate-500 font-semibold">{k}</span>
                        <div className="flex items-center gap-1">
                          <span className="font-mono font-bold text-slate-800">{v}</span>
                          {(k === "Account No." || k === "IFSC Code") && <CopyField value={v} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Documents */}
            <ScrollReveal>
              <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-6">
                <h3 className="font-extrabold text-brand-green-dark mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Registration Documents
                </h3>
                <p className="text-sm text-slate-600 mb-5">Certified copies of all registration documents are available on request for donors, partners, and grant-making institutions.</p>
                <div className="flex flex-wrap gap-3">
                  {["Trust Deed", "12A Certificate", "80G Certificate", "FCRA Registration", "PAN Card", "CSR Certificate"].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 bg-white border border-brand-green/20 rounded-lg px-3 py-2 text-xs font-semibold text-brand-green-dark">
                      <Download className="w-3.5 h-3.5 text-brand-green" /> {doc}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  To request certified copies, contact us at{" "}
                  <a href="mailto:info@iwfindia.org" className="text-brand-green font-semibold hover:underline">info@iwfindia.org</a>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-xl font-extrabold text-brand-green-dark mb-2">Claim Your 80G Tax Deduction</h2>
            <p className="text-slate-500 text-sm mb-6">Donate to IWF and receive an 80G certificate for 50% tax deduction on your contribution.</p>
            <a href="/donate" className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold px-8 py-3 rounded-xl hover:bg-brand-orange-dark transition shadow-lg">
              Donate Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
