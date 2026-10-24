import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Calendar, MapPin, ArrowRight, Bell } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { NewsletterStrip } from "@/components/media/NewsletterStrip";
import { StoryModal } from "@/components/media/StoryModal";
import { MediaLayout } from "@/components/media/MediaLayout";
import { NEWS_EVENTS_DATA, SUCCESS_STORIES_DATA } from "@/content/mediaContent";
import type { SuccessStoryItem } from "@/content/mediaContent";

export function NewsEventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStory, setActiveStory] = useState<SuccessStoryItem | null>(null);

  const filteredItems = useMemo(() => {
    return NEWS_EVENTS_DATA.items.filter((item) => {
      const matchesCat =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleReadMore = (item: (typeof NEWS_EVENTS_DATA.items)[0]) => {
    const story: SuccessStoryItem = {
      id: String(item.id),
      category: item.category,
      title: item.title,
      personName: "Community Initiative",
      village: item.date,
      state: "Bihar",
      excerpt: item.excerpt,
      fullStory: `${item.excerpt} Islah Welfare Foundation continues to mobilize localized support and field leadership to bring sustainable, community-driven change to the grassroots. Through regular monitoring, transparent communication, and dedicated volunteer action, our programs achieve tangible, measurable results for every family involved.`,
      image: item.image,
      impactMetrics: ["Field Assessment Completed", "Community Participation 100%", "Ongoing Follow-up"],
    };
    setActiveStory(story);
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Hero Section */}
      <MediaSubpageHero
        badge={NEWS_EVENTS_DATA.hero.badge}
        title={NEWS_EVENTS_DATA.hero.title}
        description={NEWS_EVENTS_DATA.hero.description}
        breadcrumb={[{ label: "Media & Updates", href: "/media" }, { label: "News & Events" }]}
        image={NEWS_EVENTS_DATA.hero.image}
        imageAlt="Islah News & Events"
        actions={
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSelectedCategory("News")}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm"
            >
              Latest News
            </button>
            <button
              onClick={() => setSelectedCategory("Events")}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition cursor-pointer backdrop-blur-sm"
            >
              Upcoming Events
            </button>
            <Link
              to="/media/gallery"
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              Photo Gallery
            </Link>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* 2. Filter Bar & Search */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-none">
              {NEWS_EVENTS_DATA.categories.map((cat) => (
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
                placeholder="Search news & events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
            </div>
          </div>
        </section>

        {/* 3. Main Content Grid + Right Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main News/Events (8 cols) */}
          <div className="lg:col-span-8">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-sm font-semibold text-slate-500">
                  No news or events found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-3 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Reset filter
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
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-sm shadow-sm">
                          <Calendar className="w-3 h-3 text-emerald-700" />
                          <span>{item.date}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleReadMore(item)}
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
            )}
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Upcoming Events Box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Upcoming Events</span>
              </h3>

              <div className="divide-y divide-slate-100 mt-2">
                {NEWS_EVENTS_DATA.upcomingEvents.map((evt, idx) => (
                  <div key={idx} className="py-3.5 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 text-center shrink-0 w-14 border border-emerald-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider">{evt.month}</div>
                      <div className="text-lg font-black leading-tight">{evt.day}</div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{evt.title}</h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 mt-2">
                <button
                  onClick={() => setSelectedCategory("Events")}
                  className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Events</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Categories Count */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100">
                Categories
              </h3>
              <div className="divide-y divide-slate-100 mt-2">
                {NEWS_EVENTS_DATA.categoryCounts.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCategory(cat.name)}
                    className="py-2.5 flex items-center justify-between text-xs cursor-pointer hover:text-emerald-700 transition"
                  >
                    <span className="font-medium text-slate-700">{cat.name}</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Newsletter Strip */}
        <NewsletterStrip
          title="Never Miss an Update"
          description="Subscribe to receive our latest news, event invitations, and press bulletins directly in your inbox."
          buttonText="Subscribe Now"
        />

        {/* 5. Action Strip */}
        <ActionStrip />
      </div>

      {/* Story Reader Modal */}
      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
    </div>
    </MediaLayout>
  );
}

export default NewsEventsPage;
