import { useState, useMemo } from "react";
import { Download, Search, Mail, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { MediaLayout } from "@/components/media/MediaLayout";
import { NEWSLETTERS_DATA } from "@/content/mediaContent";

export function NewslettersPage() {
  const [selectedYear, setSelectedYear] = useState<string>("All Issues");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "done">("idle");

  const filteredIssues = useMemo(() => {
    return NEWSLETTERS_DATA.issues.filter((item) => {
      const matchesYear =
        selectedYear === "All Issues" || item.year === selectedYear;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesYear && matchesSearch;
    });
  }, [selectedYear, searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail) return;
    setSubscribeStatus("done");
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Hero Section */}
      <MediaSubpageHero
        badge={NEWSLETTERS_DATA.hero.badge}
        title={NEWSLETTERS_DATA.hero.title}
        description={NEWSLETTERS_DATA.hero.description}
        breadcrumb={[
          { label: "Media & Updates", href: "/media" },
          { label: "Newsletters" },
        ]}
        image={NEWSLETTERS_DATA.hero.image}
        imageAlt="Islah Newsletters"
        actions={
          <div className="flex flex-wrap gap-2.5">
            <a
              href="#issues-grid"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              Latest Issue
            </a>
            <a
              href="#subscribe-box"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
            >
              Subscribe
            </a>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* 2. Four Stats Ribbon */}
        <section aria-label="Newsletter Readership Metrics">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {NEWSLETTERS_DATA.statsRibbon.map((stat, idx) => (
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
              {NEWSLETTERS_DATA.years.map((year) => (
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
                placeholder="Search newsletters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
            </div>
          </div>
        </section>

        {/* 4. Newsletter Grid + Right Sidebar */}
        <section id="issues-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Issues Grid (8 cols) */}
          <div className="lg:col-span-8">
            {filteredIssues.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-sm font-semibold text-slate-500">
                  No newsletters found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedYear("All Issues");
                    setSearchQuery("");
                  }}
                  className="mt-3 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Show all issues
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col group"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <img
                        src={issue.cover}
                        alt={issue.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-white shadow-sm">
                          {issue.issue}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                          {issue.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {issue.summary}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                        <a
                          href={issue.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold transition cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF ({issue.fileSize})</span>
                        </a>

                        <a
                          href={issue.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-slate-700 hover:text-emerald-700 flex items-center gap-1 transition"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Read Online</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Newsletter Subscription Box */}
            <div id="subscribe-box" className="bg-gradient-to-br from-[#063319] to-[#0b4d26] text-white rounded-2xl p-6 shadow-md border border-emerald-800">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Mail className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Subscribe</span>
              </div>
              <h3 className="text-lg font-black text-white">Receive Future Editions</h3>
              <p className="text-xs text-emerald-100 leading-relaxed mt-1">
                Delivered quarterly directly to your inbox. Unsubscribe at any time.
              </p>

              {subscribeStatus === "done" ? (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-xs text-emerald-200 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>You're subscribed! Welcome to our community.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-4 space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={subscribedEmail}
                    onChange={(e) => setSubscribedEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>

            {/* What's Inside Every Issue */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100">
                Inside Every Issue
              </h3>
              <div className="divide-y divide-slate-100 mt-2">
                {NEWSLETTERS_DATA.sidebarInside.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Action Strip */}
        <ActionStrip />
      </div>
    </div>
    </MediaLayout>
  );
}

export default NewslettersPage;
