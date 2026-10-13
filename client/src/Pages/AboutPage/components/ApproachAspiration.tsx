import { Leaf, Sparkles, CheckCircle2 } from "lucide-react";
import img from "@/assets/vision2047/children-running.png"

function ImgFallback({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`bg-brand-green/10 flex items-center justify-center ${className}`}>
      <span className="text-brand-green/40 text-xs font-medium text-center px-2">{label}</span>
    </div>
  );
}

export default function ApproachAspiration() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT — OUR APPROACH */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Leaf className="text-brand-green w-5 h-5 shrink-0" />
              <h3 className="text-[#0b1f3b] font-bold text-lg uppercase tracking-wide">Our Approach</h3>
            </div>

            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Vision 2047 will be implemented through a community-driven and integrated development model, including:
            </p>

            <ul className="space-y-3">
              {[
                "Establishment of Community Learning & Skill Centres",
                "Local community participation and ownership",
                "Partnerships with corporates (CSR), institutions, and government bodies",
                "Focus on sustainability, scalability, and measurable impact"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-brand-green w-4 h-4 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — OUR ASPIRATION */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="text-brand-orange w-5 h-5 shrink-0" />
              <h3 className="text-[#0b1f3b] font-bold text-lg uppercase tracking-wide">Our Aspiration</h3>
            </div>

            <p className="text-sm text-slate-600 mb-4">
              We aspire to build a society where:
            </p>

            <ul className="space-y-3">
              {[
                "No child is deprived of education",
                "No individual is forced into poverty due to lack of opportunity",
                "Women are empowered and independent",
                "Every family has access to basic needs and dignity",
                "Communities are self-reliant and resilient"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-brand-orange w-4 h-4 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl overflow-hidden h-48 shadow-md">
              <img
                src={img}
                className="w-full h-full object-cover"
              />
              {/* // <ImgFallback label="v2047-aspiration.jpg" className="w-full h-full object-cover" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
