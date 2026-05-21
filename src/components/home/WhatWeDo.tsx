import { GraduationCap, HeartPulse, Users, Sprout, Wrench, Leaf } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function WhatWeDo() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle>What We Do</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: GraduationCap, l: "Education", s: "Learning Centres & Scholarships" },
            { icon: HeartPulse, l: "Healthcare", s: "Free camps, care & awareness" },
            { icon: Users, l: "Women Empowerment", s: "SHGs, skills & financial literacy" },
            { icon: Sprout, l: "Rural Development", s: "Infrastructure & livelihoods" },
            { icon: Wrench, l: "Skill Development", s: "Vocational & entrepreneurship" },
            { icon: Leaf, l: "Environment", s: "Plantation & sustainability" },
          ].map(({ icon: Icon, l, s }) => (
            <div key={l} className="bg-white rounded-md p-5 text-center shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-green/10 flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-brand-green" />
              </div>
              <div className="text-xs font-semibold text-slate-700">{l}</div>
              <div className="text-[10px] text-slate-500 mt-1">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
