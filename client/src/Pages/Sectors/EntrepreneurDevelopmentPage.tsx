import { useState, useEffect, useCallback } from "react";
import {
  Lightbulb,
  Building2,
  TrendingUp,
  Coins,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import entrepreneurImg from "@/assets/thematic-entrepreneur.jpg";
import sectorEntrepreneur1 from "@/assets/sector_entrepreneur_1.png";
import { ChevronLeft, ChevronRight as ChevronRight2 } from "lucide-react";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function EntrepreneurDevelopmentPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    { image: sectorEntrepreneur1, caption: "Entrepreneurship workshops" },
    { image: entrepreneurImg, caption: "Rural enterprise development" },
  ];
  const goTo = useCallback((i: number) => setSlideIndex((i + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => goTo(slideIndex + 1), [goTo, slideIndex]);
  const prev = useCallback(() => goTo(slideIndex - 1), [goTo, slideIndex]);
  useEffect(() => { const t = setInterval(next, 4500); return () => clearInterval(t); }, [next]);

  const workAreas = [
    {
      title: "1. Rural Entrepreneurship Promotion",
      desc: "Support for small and community-based enterprises including tailoring units, local handicrafts, village retail shops, food processing, and rural service units.",
      icon: Building2,
    },
    {
      title: "2. Youth Entrepreneurship Development",
      desc: "Entrepreneurship awareness, career guidance, digital service enterprise support, motivation for innovation, and sustainable small business planning for unemployed youth.",
      icon: TrendingUp,
    },
    {
      title: "3. Financial Literacy & Business Awareness",
      desc: "Savings habits, household budgeting, basic business planning, digital banking awareness, and responsible financial management workshops.",
      icon: Coins,
    },
  ];

  const highlights = [
    "Interest-free microfinance support under Islah Microfinance at the grassroots level.",
    "Tailored mentoring and technical guidance for women and youth entrepreneurs.",
    "Market linkages and local business setup assistance in rural Darbhanga and nearby districts.",
    "Capacity building workshops on product pricing, packaging, and digital payments.",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Section with Subpage Carousel (Matching About Us Page) */}
        <SubpageHeroCarousel
          tag="WHAT WE DO • LIVELIHOOD & ENTERPRISE"
          title="Entrepreneur Development"
          subtitle="Empowering rural communities through small-scale entrepreneurship, microfinance, and sustainable livelihoods—because self-reliance is the foundation of lasting social development."
          breadcrumbs={[
            { label: "Our Programs", href: "/programs" },
            { label: "Entrepreneur Development" },
          ]}
          images={slides.map((s) => s.image)}
        />

        {/* Floating Action Strip */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-20 mb-8">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-md flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveModal("partner")}
                className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveModal("sponsor")}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer"
              >
                <span>Sponsor an Enterprise</span>
              </button>
            </div>
            <div className="text-xs font-semibold text-slate-500">
              Micro-Enterprise Support • Incubation • Market Linkages
            </div>
          </div>
        </div>

        {/* Vision & Rationale */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200">
                <div className="max-w-3xl">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                    Vision & Rationale
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b] mb-4">
                    Building Economic Resilience in Rural Communities
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                    Entrepreneurship plays a vital role in creating sustainable livelihoods, generating employment, reducing poverty, and strengthening rural economies. Many youth and women possess the determination to grow but lack access to financial resources, market guidance, and technical support.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Key Areas of Work Grid */}
        <section className="py-12 px-4 bg-slate-100/70">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                Core Interventions
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b]">
                Key Work Areas in Entrepreneurship
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {workAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <ScrollReveal key={idx}>
                    <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0b1f3b]">{area.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{area.desc}</p>
                      </div>
                      <div className="pt-6 border-t border-slate-100 mt-6">
                        <span className="text-xs font-extrabold text-brand-orange uppercase tracking-wider">Sustainable Impact</span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-14 px-4 bg-[#0b1f3b] text-white">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold">
              Empowering Rural Youth & Women Towards Self-Reliance
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Join hands with Islah Welfare Foundation to mentor, sponsor, or support aspiring local entrepreneurs across Bihar and India.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => setActiveModal("mentor")}
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-md shadow transition"
              >
                Become a Mentor
              </button>
              <a
                href="/donate"
                className="bg-brand-green hover:bg-green-700 text-white font-bold text-sm px-6 py-3 rounded-md shadow transition"
              >
                Donate for Microfinance
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
