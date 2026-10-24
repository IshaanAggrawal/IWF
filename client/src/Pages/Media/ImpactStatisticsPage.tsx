import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Download,
  MapPin,
  Users,
  Target,
  FileText,
  PieChart as PieIcon,
  Leaf,
  Sparkles,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { MediaLayout } from "@/components/media/MediaLayout";
import { IMPACT_STATISTICS_DATA } from "@/content/mediaContent";

export function ImpactStatisticsPage() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Hero Section */}
      <MediaSubpageHero
        badge={IMPACT_STATISTICS_DATA.hero.badge}
        title={IMPACT_STATISTICS_DATA.hero.title}
        description={IMPACT_STATISTICS_DATA.hero.description}
        breadcrumb={[{ label: "Media & Updates", href: "/media" }, { label: "Impact Statistics" }]}
        image={IMPACT_STATISTICS_DATA.hero.image}
        imageAlt="Islah Impact Statistics"
        actions={
          <div className="flex flex-wrap gap-3">
            <a
              href="#theme-breakdown"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              Our Impact
            </a>
            <a
              href="/media/annual-reports"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </a>
          </div>
        }
        rightOverlay={
          <div className="text-white text-xs font-semibold italic bg-black/60 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            "{IMPACT_STATISTICS_DATA.hero.quote}"
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* 2. Top Stats Ribbon (6 Cards) */}
        <section aria-label="High-Level Impact Metrics">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {IMPACT_STATISTICS_DATA.statsRibbon.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-200 hover:shadow-md transition group"
              >
                <div className="text-2xl sm:text-3xl font-black text-emerald-800 group-hover:text-emerald-600 transition">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">{stat.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Charts: Impact by Theme (Donut) & Growth Over Years (Bar Chart) */}
        <section id="theme-breakdown" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Theme Breakdown (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-emerald-700" />
                  <span>Impact by Theme</span>
                </h3>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Total: {IMPACT_STATISTICS_DATA.totalCumulativeImpact}
                </span>
              </div>

              {/* Progress Bars representation */}
              <div className="mt-5 space-y-3.5">
                {IMPACT_STATISTICS_DATA.themes.map((theme, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveTheme(theme.name)}
                    onMouseLeave={() => setActiveTheme(null)}
                    className="p-2 rounded-xl transition hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">{theme.name}</span>
                      <span className="font-black text-slate-900">
                        {theme.count} ({theme.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${theme.percentage * 2.8}%`,
                          backgroundColor: theme.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 italic text-center">
              * Cumulative figures across all operational districts since inception.
            </div>
          </div>

          {/* Growth Over Years Bar Chart (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-700" />
                  <span>Impact Over the Years</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">2016-17 to 2023-24</span>
              </div>

              {/* Bar Chart Visualizer */}
              <div className="mt-8 h-56 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-6">
                {IMPACT_STATISTICS_DATA.growthHistory.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-emerald-700 transition">
                      {item.value}
                    </span>
                    <div className="w-full bg-slate-100 rounded-t-lg relative flex items-end h-40">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-800 to-emerald-500 group-hover:from-emerald-700 group-hover:to-orange-500 rounded-t-lg transition-all duration-300"
                        style={{ height: `${item.heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 transform -rotate-45 sm:rotate-0 mt-1 whitespace-nowrap">
                      {item.year.replace("20", "")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-950 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>{IMPACT_STATISTICS_DATA.growthNote}</span>
            </div>
          </div>
        </section>

        {/* 4. Geographic Reach & Demographic Reach */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Geographic Reach (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#063319] to-[#0b4d26] text-white rounded-2xl p-7 shadow-sm border border-emerald-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Geographic Footprint</span>
              </div>
              <h3 className="text-2xl font-black text-white">Our Reach on the Ground</h3>
              <p className="text-xs text-emerald-200 mt-2 leading-relaxed">
                Reaching the most marginalized communities across northern and eastern India with localized infrastructure.
              </p>

              <div className="grid grid-cols-3 gap-3 my-6">
                <div className="p-3 rounded-xl bg-white/10 text-center border border-white/10">
                  <div className="text-xl font-black text-emerald-300">
                    {IMPACT_STATISTICS_DATA.reach.villages}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-300">Villages</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 text-center border border-white/10">
                  <div className="text-xl font-black text-emerald-300">
                    {IMPACT_STATISTICS_DATA.reach.districts}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-300">Districts</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 text-center border border-white/10">
                  <div className="text-xl font-black text-emerald-300">
                    {IMPACT_STATISTICS_DATA.reach.states}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-300">Focus States</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                  Core Operation Hubs:
                </div>
                {IMPACT_STATISTICS_DATA.reach.stateList.map((state, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{state}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-700/60">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition"
              >
                View Operations Map
              </Link>
            </div>
          </div>

          {/* Demographic Beneficiaries (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-7 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>Our Beneficiaries</span>
                </h3>
                <span className="text-xs font-bold text-slate-500">Demographic Impact</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {IMPACT_STATISTICS_DATA.beneficiaries.map((b, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-2xl font-black text-emerald-800">{b.count}</div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-0.5">
                      {b.label}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/80 flex items-start gap-3">
              <Quote className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs italic font-medium text-emerald-950 leading-relaxed">
                "{IMPACT_STATISTICS_DATA.beneficiaryQuote}"
              </p>
            </div>
          </div>
        </section>

        {/* 5. Core Principles Strip */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            {IMPACT_STATISTICS_DATA.principles.map((p, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50/50 transition">
                <div className="text-sm font-black text-slate-900">{p.title}</div>
                <div className="text-xs font-semibold text-emerald-700">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Action Strip */}
        <ActionStrip />
      </div>
    </div>
    </MediaLayout>
  );
}

export default ImpactStatisticsPage;
