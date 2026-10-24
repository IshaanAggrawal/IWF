import { useState, useMemo } from "react";
import { Search, Clock, MapPin, ArrowRight, CheckCircle2, Quote, Sparkles } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { NewsletterStrip } from "@/components/media/NewsletterStrip";
import { StoryModal } from "@/components/media/StoryModal";
import { MediaLayout } from "@/components/media/MediaLayout";
import { LATEST_UPDATES_DATA } from "@/content/mediaContent";
import type { SuccessStoryItem } from "@/content/mediaContent";

export function LatestUpdatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Updates");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStory, setActiveStory] = useState<SuccessStoryItem | null>(null);

  const filteredItems = useMemo(() => {
    return LATEST_UPDATES_DATA.items.filter((item) => {
      const matchesCat =
        selectedCategory === "All Updates" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleReadUpdate = (item: (typeof LATEST_UPDATES_DATA.items)[0]) => {
    const story: SuccessStoryItem = {
      id: String(item.id),
      category: item.category,
      title: item.title,
      personName: item.author,
      village: item.timeAgo,
      state: "Field Operations",
      excerpt: item.summary,
      fullStory: `${item.summary} As part of Islah Welfare Foundation's strategic roadmap, regular monitoring, on-the-ground volunteer mobilization, and verified community audits ensure that every initiative delivers sustained benefits. Our field teams work hand-in-hand with local self-help groups, teachers, and healthcare volunteers to expand our reach and uphold absolute transparency.`,
      image: item.image,
      impactMetrics: ["Real-time Field Verification", "Community-Led Implementation", "Sustainable Long-Term Impact"],
    };
    setActiveStory(story);
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Hero Section */}
      <MediaSubpageHero
        badge={LATEST_UPDATES_DATA.hero.badge}
        title={LATEST_UPDATES_DATA.hero.title}
        description={LATEST_UPDATES_DATA.hero.description}
        breadcrumb={[
          { label: "Media & Updates", href: "/media" },
          { label: "Latest Updates" },
        ]}
        image={LATEST_UPDATES_DATA.hero.image}
        imageAlt="What's Happening at Islah"
        actions={
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedCategory("All Updates")}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm"
            >
              Recent News
            </button>
            <a
              href="#subscribe"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
            >
              Subscribe To Updates
            </a>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* 2. Four Stats Ribbon */}
        <section aria-label="Live Operations Metrics">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {LATEST_UPDATES_DATA.statsRibbon.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition group"
              >
                <div className="text-3xl font-black text-emerald-800 group-hover:text-emerald-600 transition">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 mt-1">{stat.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Filter Bar & Search */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-none">
              {LATEST_UPDATES_DATA.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
            </div>
          </div>
        </section>

        {/* 4. Updates Feed Grid + Right Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Updates (8 cols) */}
          <div className="lg:col-span-8">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-sm font-semibold text-slate-500">
                  No updates found matching your filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All Updates");
                    setSearchQuery("");
                  }}
                  className="mt-3 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col group"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                          {item.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-white/90 text-slate-800 backdrop-blur-sm shadow-sm">
                          <Clock className="w-3 h-3 text-emerald-700" />
                          <span>{item.timeAgo}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                          {item.summary}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-medium">
                          By {item.author}
                        </span>
                        <button
                          onClick={() => handleReadUpdate(item)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                        >
                          <span>Read Full Update</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Impact Numbers This Month */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Monthly Impact Pulse</span>
              </h3>
              <div className="divide-y divide-slate-100 mt-2 space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Scholarships Disbursed</span>
                  <span className="font-bold text-emerald-800">120 Students</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-3">
                  <span className="text-slate-600 font-medium">Health Checkups</span>
                  <span className="font-bold text-emerald-800">1,450 Patients</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-3">
                  <span className="text-slate-600 font-medium">Clean Water Taps Active</span>
                  <span className="font-bold text-emerald-800">42 Units</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-3">
                  <span className="text-slate-600 font-medium">Trees Planted This Season</span>
                  <span className="font-bold text-emerald-800">3,200 Saplings</span>
                </div>
              </div>
            </div>

            {/* Field Voices Quote Card */}
            <div className="bg-gradient-to-br from-[#063319] to-[#0b4d26] text-white rounded-2xl p-6 shadow-md border border-emerald-800 relative">
              <Quote className="w-7 h-7 text-emerald-400/30 absolute top-4 right-4" />
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 mb-2">
                Field Coordinator Dispatch
              </div>
              <p className="text-xs font-semibold italic text-emerald-50 leading-relaxed">
                "Seeing women who once lacked income now confidently running tailoring cooperatives and sending their daughters to school is what drives our field teams every single day."
              </p>
              <p className="text-[11px] font-bold text-emerald-300 mt-4">
                — Shabana Parveen, Lead Coordinator (Madhubani Cluster)
              </p>
            </div>
          </div>
        </section>

        {/* 5. Newsletter Strip */}
        <div id="subscribe">
          <NewsletterStrip
            title="Subscribe for Live Dispatches"
            description="Receive verified field reports, community impact bulletins, and emergency response updates as they are verified."
            buttonText="Join Community List"
          />
        </div>

        {/* 6. Action Strip */}
        <ActionStrip />
      </div>

      {/* Story Modal */}
      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
    </div>
    </MediaLayout>
  );
}

export default LatestUpdatesPage;
