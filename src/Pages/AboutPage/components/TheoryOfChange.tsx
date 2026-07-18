import { ClipboardList, Zap, Package, TrendingUp, Globe } from "lucide-react";

function SectionTitle({ children, white }: { children: React.ReactNode; white?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className={`h-px w-8 ${white ? "bg-white" : "bg-brand-green"}`} />
      <h2 className={`text-2xl md:text-3xl font-bold tracking-wide uppercase ${white ? "text-white" : "text-brand-green-dark"}`}>
        {children}
      </h2>
      <span className={`h-px w-8 ${white ? "bg-white" : "bg-brand-green"}`} />
    </div>
  );
}

const STEPS = [
  {
    label: "INPUT",
    Icon: ClipboardList,
    desc: "Resources, partnerships, community assessment",
  },
  {
    label: "ACTIVITIES",
    Icon: Zap,
    desc: "Implementing targeted community interventions",
  },
  {
    label: "OUTPUT",
    Icon: Package,
    desc: "Delivering inclusive capacities",
  },
  {
    label: "OUTCOME",
    Icon: TrendingUp,
    desc: "Improved skills, increased access, sustainable change",
  },
  {
    label: "IMPACT",
    Icon: Globe,
    desc: "Empowered individuals, thriving communities",
  },
];

function StepCard({ label, Icon, desc }: { label: string; Icon: React.FC<{ className?: string }>; desc: string }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-center w-44 shrink-0">
      <div className="w-12 h-12 mx-auto rounded-full bg-brand-orange/20 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-brand-orange" />
      </div>
      <div className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-2">{label}</div>
      <p className="text-white/75 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

export default function TheoryOfChange() {
  return (
    <section className="bg-[#0b1f3b] py-16 px-4">
      <SectionTitle white>Theory of Change</SectionTitle>
      <p className="text-slate-300 text-sm max-w-2xl mx-auto text-center mb-12">
        Our work follows a clear pathway — from inputs and activities to meaningful, lasting impact in communities across India.
      </p>

      {/* Desktop */}
      <div className="hidden md:flex items-start justify-center gap-0 max-w-5xl mx-auto">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <StepCard {...step} />
            {i < STEPS.length - 1 && (
              <span className="text-brand-orange text-3xl font-bold self-center mx-1">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile scroll */}
      <div className="md:hidden overflow-x-auto flex gap-4 pb-4 w-full max-w-full">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <StepCard {...step} />
            {i < STEPS.length - 1 && (
              <span className="text-brand-orange text-3xl font-bold self-center mx-1">→</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
