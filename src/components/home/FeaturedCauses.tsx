import { BookOpen, Stethoscope, Users } from "lucide-react";
import causeEdu from "@/assets/cause-education.jpg";
import causeMed from "@/assets/cause-medical.jpg";
import causeWomen from "@/assets/cause-women.jpg";
import { SectionTitle } from "./SectionTitle";

export function FeaturedCauses() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle>Featured Causes</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: causeEdu, icon: BookOpen, title: "Child Education", desc: "Through our 'Shiksha Na Ruke' campaign, we fund school fees, learning materials, and scholarships to keep every child in school and out of child labour.", raised: "1,65,240", pct: 75 },
            { img: causeMed, icon: Stethoscope, title: "Medical Help", desc: "Our 'Health Cannot Wait' initiative funds free health camps, medicines, emergency treatment, and health awareness drives in underserved rural communities.", raised: "2,12,880", pct: 48 },
            { img: causeWomen, icon: Users, title: "Women Empowerment", desc: "The 'She Can Fly' & 'Swabhiman' campaigns train women in vocational skills, promote Self-Help Groups, and build financial independence for lasting change.", raised: "1,48,720", pct: 60 },
          ].map((c) => (
            <article key={c.title} className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-100">
              <div className="relative h-44">
                <img src={c.img} alt={c.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                  <c.icon className="w-5 h-5 text-brand-green" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{c.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{c.desc}</p>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>₹ {c.raised} Raised</span>
                  <span>{c.pct}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-green" style={{ width: `${c.pct}%` }} />
                </div>
                <button className="mt-4 w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm py-2.5 rounded transition">DONATE NOW</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
