import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Download, Search, Mail, Phone, MapPin, Share2, FileText, ArrowRight } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { NewsletterStrip } from "@/components/media/NewsletterStrip";
import { StoryModal } from "@/components/media/StoryModal";
import { MediaLayout } from "@/components/media/MediaLayout";
import { PRESS_RELEASES_DATA } from "@/content/mediaContent";
import type { SuccessStoryItem } from "@/content/mediaContent";

export function PressReleasesPage() {
  const [selectedYear, setSelectedYear] = useState<string>("All Releases");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStory, setActiveStory] = useState<SuccessStoryItem | null>(null);

  const filteredReleases = useMemo(() => {
    return PRESS_RELEASES_DATA.releases.filter((item) => {
      const matchesYear =
        selectedYear === "All Releases" || item.year === selectedYear;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesYear && matchesSearch;
    });
  }, [selectedYear, searchQuery]);

  const handleReadRelease = (item: (typeof PRESS_RELEASES_DATA.releases)[0]) => {
    const story: SuccessStoryItem = {
      id: String(item.id),
      category: "Official Press Release",
      title: item.title,
      personName: "Media Relations Office",
      village: item.date,
      state: "New Delhi & Bihar",
      excerpt: item.summary,
      fullStory: `${item.summary} \n\nNEW DELHI / DARBHANGA — Islah Welfare Foundation (IWF) has issued this official release reaffirming its long-term strategic commitment to inclusive development, quality education, accessible rural healthcare, and women's financial autonomy across North and Eastern India.\n\nMedia representatives wishing to schedule executive interviews, request high-resolution assets, or arrange on-site field visits are encouraged to connect with our media desk at media@islahwelfare.org or by phone at +91 93102 96911.`,
      image: item.image,
      impactMetrics: ["Official Non-Profit Announcement", "Verified Public Record", "Media Kit Ready"],
    };
    setActiveStory(story);
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Hero Section */}
      <MediaSubpageHero
        badge={PRESS_RELEASES_DATA.hero.badge}
        title={PRESS_RELEASES_DATA.hero.title}
        description={PRESS_RELEASES_DATA.hero.description}
        breadcrumb={[
          { label: "Media & Updates", href: "/media" },
          { label: "Press Releases" },
        ]}
        image={PRESS_RELEASES_DATA.hero.image}
        imageAlt="Islah Press Releases"
        actions={
          <div className="flex flex-wrap gap-2.5">
            <a
              href="#releases-grid"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              Latest Releases
            </a>
            <a
              href="#media-contact"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
            >
              Media Contact
            </a>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* 2. Four Stats Ribbon */}
        <section aria-label="Media Authority Metrics">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESS_RELEASES_DATA.statsRibbon.map((stat, idx) => (
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
              {PRESS_RELEASES_DATA.years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedYear === year
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search press releases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
            </div>
          </div>
        </section>

        {/* 4. Releases Grid + Right Sidebar */}
        <section id="releases-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Releases (8 cols) */}
          <div className="lg:col-span-8">
            {filteredReleases.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-sm font-semibold text-slate-500">
                  No press releases found matching your search.
                </p>
                <button
                  onClick={() => {
                    setSelectedYear("All Releases");
                    setSearchQuery("");
                  }}
                  className="mt-3 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Show all releases
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReleases.map((rel) => (
                  <div
                    key={rel.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col group"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                          {rel.date}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                          {rel.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                          {rel.summary}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                        <a
                          href={rel.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold transition cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF ({rel.fileSize})</span>
                        </a>

                        <button
                          onClick={() => handleReadRelease(rel)}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Read Full</span>
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
            {/* Media Contact Card */}
            <div id="media-contact" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-700" />
                <span>Media Relations Desk</span>
              </h3>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                For press inquiries, official statements, high-res photos, or to arrange field interviews:
              </p>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href={`mailto:${PRESS_RELEASES_DATA.sidebarContact.email}`} className="font-semibold hover:text-emerald-700">
                    {PRESS_RELEASES_DATA.sidebarContact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{PRESS_RELEASES_DATA.sidebarContact.phone}</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-700">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{PRESS_RELEASES_DATA.sidebarContact.locations}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  to="/media/brand-assets"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Media Kit</span>
                </Link>
              </div>
            </div>

            {/* Boilerplate */}
            <div className="bg-gradient-to-br from-[#063319] to-[#0b4d26] text-white rounded-2xl p-6 shadow-md border border-emerald-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 mb-2">
                About Islah Welfare Foundation
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                {PRESS_RELEASES_DATA.sidebarContact.boilerplate}
              </p>
            </div>
          </div>
        </section>

        {/* 5. Newsletter Strip */}
        <NewsletterStrip
          title="Stay Updated with Official News"
          description="Subscribe to receive our official press releases, event announcements, and media kits as they are issued."
          buttonText="Subscribe to Press Desk"
        />

        {/* 6. Action Strip */}
        <ActionStrip />
      </div>

      {/* Story Modal */}
      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
    </div>
    </MediaLayout>
  );
}

export default PressReleasesPage;
