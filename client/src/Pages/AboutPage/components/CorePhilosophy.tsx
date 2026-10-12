import { Heart, Users, ShieldCheck, Globe } from "lucide-react";
import imgphilosophy from "@/assets/vision2047/planting-tree.webp"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className="h-px w-8 bg-brand-green" />
      <h2 className="text-2xl md:text-3xl font-bold tracking-wide uppercase text-brand-green-dark">
        {children}
      </h2>
      <span className="h-px w-8 bg-brand-green" />
    </div>
  );
}

function ImgFallback({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`bg-brand-green/10 flex items-center justify-center ${className}`}>
      <span className="text-brand-green/40 text-xs font-medium text-center px-2">{label}</span>
    </div>
  );
}

export default function CorePhilosophy() {
  const pillars = [
    { title: "Humanity and social responsibility", icon: Heart },
    { title: "Inclusive growth and equality", icon: Users },
    { title: "Self-reliance and dignity", icon: ShieldCheck },
    { title: "Holistic development—social, economic, and moral", icon: Globe },
  ];

  return (
    <section className="bg-brand-green/5 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle>🌿 CORE PHILOSOPHY</SectionTitle>

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-8">
          {/* LEFT: Text & Pillars */}
          <div>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base mb-4">
              Vision 2047 goes beyond charity. It is rooted in the belief that true development comes from empowerment, not dependency.
            </p>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base mb-4">
              The initiative focuses on enabling individuals and communities to realize their full potential through access to opportunities, resources, and knowledge.
            </p>
            <p className="text-slate-700 font-medium text-sm md:text-base mb-4">
              It reflects a commitment to:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {pillars.map((pillar, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-brand-green/15 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 bg-brand-green/10 rounded-full flex items-center justify-center shrink-0">
                    <pillar.icon className="text-brand-green w-4 h-4" />
                  </div>
                  <span className="text-sm text-slate-700 font-medium leading-relaxed">
                    {pillar.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="relative group mt-8 lg:mt-0">
            <div className="absolute -inset-2 bg-gradient-to-tr from-brand-green/20 to-brand-orange/10 rounded-3xl blur-lg"></div>
            <img
              src={imgphilosophy}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
