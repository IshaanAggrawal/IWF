import { BookOpen, HeartPulse, Users, Sprout, ArrowRight } from "lucide-react";
import thEnv from "@/assets/thematic-environment.jpg";
import thEnt from "@/assets/thematic-entrepreneur.jpg";
import thWom from "@/assets/thematic-women.jpg";
import thAgr from "@/assets/thematic-agriculture.jpg";
import { SectionTitle } from "./SectionTitle";

export function ProgramsThematic() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
        {/* Programs */}
        <div>
          <SectionTitle>Our Programs</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: BookOpen, title: "Education Support", desc: "We run Community Learning Centres and 'Shiksha Na Ruke' scholarships to keep underprivileged children in school, providing materials and academic support." },
              { icon: HeartPulse, title: "Healthcare Camps", desc: "Through 'Health Cannot Wait', we organise free medical check-up camps, distribute medicines, and spread awareness on health, hygiene, and nutrition." },
              { icon: Users, title: "Women Empowerment", desc: "We form Self-Help Groups (SHGs), provide vocational training, promote financial literacy, and support leadership development for rural women." },
              { icon: Sprout, title: "Rural Development", desc: "We work on sanitation, safe housing, clean water access, and community infrastructure under our 'Model Village' initiative for self-reliant communities." },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-md p-5 border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-md bg-brand-orange/15 flex items-center justify-center mb-3">
                  <p.icon className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="font-bold text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-slate-600 mb-2">{p.desc}</p>
                <a href="#" className="text-xs font-semibold text-brand-green inline-flex items-center gap-1">Read More <ArrowRight className="w-3 h-3" /></a>
              </div>
            ))}
          </div>
        </div>

        {/* Thematic */}
        <div>
          <SectionTitle>Major Thematic Areas</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            {[
              { img: thEnv, l: "Environment Conservation" },
              { img: thEnt, l: "Entrepreneurship & Skills" },
              { img: thWom, l: "Women Empowerment" },
              { img: thAgr, l: "Agriculture Support" },
            ].map((t) => (
              <div key={t.l} className="relative h-40 rounded-md overflow-hidden group">
                <img src={t.img} alt={t.l} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white font-semibold text-sm">{t.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
