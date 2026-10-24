import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Quote, ArrowRight, Sparkles } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { StoryModal } from "@/components/media/StoryModal";
import { MediaLayout } from "@/components/media/MediaLayout";
import { OUTCOMES_DATA, SUCCESS_STORIES_DATA } from "@/content/mediaContent";
import type { SuccessStoryItem } from "@/content/mediaContent";

export function OutcomesPage() {
  const [activeStory, setActiveStory] = useState<SuccessStoryItem | null>(null);

  const handleOpenStory = (link: string) => {
    const id = link.includes("id=") ? link.split("id=")[1] : "";
    const found = SUCCESS_STORIES_DATA.stories.find((s) => s.id === id);
    if (found) {
      setActiveStory(found);
    } else {
      setActiveStory(SUCCESS_STORIES_DATA.stories[0]);
    }
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Standardized Hero Section */}
      <MediaSubpageHero
        badge={OUTCOMES_DATA.hero.badge}
        title={OUTCOMES_DATA.hero.title}
        description={OUTCOMES_DATA.hero.description}
        subtext={`🌿 ${OUTCOMES_DATA.hero.subtext}`}
        breadcrumb={[{ label: "Media & Updates", href: "/media" }, { label: "Outcomes" }]}
        image={OUTCOMES_DATA.hero.image}
        imageAlt="Islah Outcomes Community"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* 2. Top Stats Ribbon (6 Cards) */}
        <section aria-label="Key Outcomes Statistics">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {OUTCOMES_DATA.statsRibbon.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-200/80 hover:shadow-md transition group"
              >
                <div className="text-2xl sm:text-3xl font-black text-emerald-800 group-hover:text-emerald-600 transition">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Outcomes Across Key Areas */}
        <section aria-labelledby="key-areas-heading">
          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-slate-300 flex-1" />
            <h2 id="key-areas-heading" className="text-sm sm:text-base font-black tracking-widest uppercase text-slate-700 text-center">
              Our Outcomes Across Key Areas
            </h2>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {OUTCOMES_DATA.keyAreas.map((area, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-md transition flex flex-col group"
              >
                <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-[11px] font-bold text-white line-clamp-1 drop-shadow">
                      {area.title}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div className="space-y-1.5">
                    {area.achievements.map((item, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Impact in Communities & Inspirational Quote */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 5 Metrics */}
            <div className="lg:col-span-7">
              <h3 className="text-xs font-black tracking-widest uppercase text-emerald-800 mb-6">
                Impact in Communities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {OUTCOMES_DATA.communityMetrics.map((item, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xl sm:text-2xl font-black text-emerald-700">
                      {item.value}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 mt-1 leading-tight">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Quote Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100/60 border border-emerald-200 relative">
              <Quote className="w-8 h-8 text-emerald-600/40 absolute top-4 right-4" />
              <p className="text-sm font-semibold italic text-emerald-950 leading-relaxed pr-6">
                "{OUTCOMES_DATA.quote.text}"
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>— {OUTCOMES_DATA.quote.author}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Stories Behind the Change */}
        <section aria-labelledby="stories-heading">
          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-slate-300 flex-1" />
            <h2 id="stories-heading" className="text-sm sm:text-base font-black tracking-widest uppercase text-slate-700 text-center">
              Stories Behind the Change
            </h2>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OUTCOMES_DATA.featuredStories.map((story, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 hover:shadow-md transition flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                      {story.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      {story.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {story.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenStory(story.link)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Action Strip */}
        <ActionStrip />
      </div>

      {/* Interactive Story Reader Modal */}
      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
      </div>
    </MediaLayout>
  );
}

export default OutcomesPage;
