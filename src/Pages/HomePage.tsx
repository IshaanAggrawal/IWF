import { useState } from "react";
import { ArrowRight, CheckCircle2, Heart, Mail, Phone } from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import { CONTACT_DETAILS, HOME_CONTENT, IMPACT_HIGHLIGHTS } from "@/content/siteContent";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-10">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
        {eyebrow}
      </p>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">
          {title}
        </h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      {subtitle && (
        <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function HeroSection({ onOpenModal }: { onOpenModal: (type: RoleType) => void }) {
  return (
    <section className="relative min-h-[560px] flex items-center overflow-hidden">
      <img
        src={HOME_CONTENT.hero.image}
        alt="Islah Welfare Foundation community work"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/78 to-slate-900/25" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-6">
            <Heart className="w-4 h-4 text-brand-orange fill-brand-orange" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
              {HOME_CONTENT.hero.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-5">
            {HOME_CONTENT.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-brand-orange font-semibold mb-4">
            "{HOME_CONTENT.hero.subtitle}"
          </p>
          <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
            {HOME_CONTENT.hero.description}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="#focus-areas"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm px-5 py-3 rounded-md shadow-md transition-colors"
            >
              Explore Our Work <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => onOpenModal("sponsor")}
              className="inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3 rounded-md transition-colors cursor-pointer"
            >
              Donate Now
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 max-w-xl mt-12">
          {HOME_CONTENT.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 border border-white/15 rounded-md p-4 backdrop-blur-sm"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs text-white/65 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-md shadow-lg border border-slate-100">
                <img
                  src={HOME_CONTENT.about.image}
                  alt="About Islah Welfare Foundation"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-2">
                    Care | Empower | Uplift
                  </p>
                  <p className="text-lg font-bold">Planting Seeds of Hope and Change</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                About Us
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-green-dark leading-tight mb-5">
                {HOME_CONTENT.about.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-7">
                {HOME_CONTENT.about.copy}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {HOME_CONTENT.about.values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={value.title}
                      className="flex gap-4 bg-slate-50 border border-slate-100 rounded-md p-4"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-md bg-brand-green text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-green-dark text-sm">{value.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed mt-1">{value.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FocusAreas() {
  return (
    <section id="focus-areas" className="py-16 bg-slate-50 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            eyebrow="What We Do"
            title="Core Focus Areas"
            subtitle="Integrated work across education, health, livelihood, dignity and sustainability."
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.06}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOME_CONTENT.focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <a
                  key={area.title}
                  href={area.href}
                  className="group bg-white rounded-md overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-md bg-brand-orange text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-brand-green-dark mb-2 group-hover:text-brand-green transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{area.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-orange">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Campaigns() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Campaigns"
            title="Featured Causes"
            subtitle="High-visibility campaigns from the client brief, presented as polished frontend touchpoints."
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.08}>
          <div className="grid md:grid-cols-3 gap-5">
            {HOME_CONTENT.campaigns.map((campaign) => (
              <a
                key={campaign.title}
                href={campaign.href}
                className="group relative min-h-[320px] rounded-md overflow-hidden shadow-sm border border-slate-100"
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-900/35 to-transparent" />
                <div className="absolute left-5 right-5 bottom-5 text-white">
                  <h3 className="text-2xl font-extrabold mb-2">{campaign.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">{campaign.text}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange">
                    Support This Cause <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="py-16 bg-[#0d2b1a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Long-Term Vision
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5">
                {HOME_CONTENT.vision2047.title}
              </h2>
              <p className="text-white/75 leading-relaxed mb-7">
                {HOME_CONTENT.vision2047.copy}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {HOME_CONTENT.vision2047.pillars.map((pillar) => (
                  <div key={pillar} className="flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                    {pillar}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.1}>
              <div className="relative rounded-md overflow-hidden border border-white/10 shadow-xl">
                <img
                  src={HOME_CONTENT.vision2047.image}
                  alt="Vision 2047"
                  className="w-full h-[360px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-sm font-semibold italic leading-relaxed">
                    "An empowered, equitable and self-reliant India where no one is left behind."
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Impact"
            title="How Change Takes Shape"
            subtitle="IWF's work combines service delivery, awareness, training and community ownership."
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.07}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {IMPACT_HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white border border-slate-100 rounded-md p-6 shadow-sm">
                  <div className="w-11 h-11 rounded-md bg-brand-green/10 text-brand-green flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-brand-green-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

          {/* Mega Panel Dropdown */}
          {activeMenu && MEGA_DATA[activeMenu] && (
            <div
              className="absolute left-0 right-0 top-full bg-white shadow-2xl z-50 border-t-2 border-brand-orange py-8 px-16 flex gap-10"
              style={{
                clipPath: activeMenu ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
                transition: "clip-path 280ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {/* Left columns group */}
              <div className="flex-1">
                {/* Column Section Heading */}
                <div className="text-brand-orange uppercase text-xs tracking-widest font-bold mb-4">
                  {activeMenu}
                </div>

                {/* Columns grid */}
                <div
                  className="grid gap-8"
                  style={{ gridTemplateColumns: `repeat(${MEGA_DATA[activeMenu].cols}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: MEGA_DATA[activeMenu].cols }).map((_, colIndex) => {
                    const items = MEGA_DATA[activeMenu].items;
                    const colsCount = MEGA_DATA[activeMenu].cols;
                    const itemsPerCol = Math.ceil(items.length / colsCount);
                    const colItems = items.slice(colIndex * itemsPerCol, (colIndex + 1) * itemsPerCol);
                    return (
                      <div key={colIndex} className="flex flex-col gap-3">
                        {colItems.map((subItem, itemIndex) => {
                          const globalIndex = colIndex * itemsPerCol + itemIndex;
                          return (
                            <a
                              key={subItem}
                              href={
                                activeMenu === "About Us" && subItem === "Overview"
                                  ? "/about"
                                  : activeMenu === "About Us" && subItem === "Our Objective & Vision"
                                  ? "/about/objective-and-vision"
                                  : activeMenu === "About Us" && subItem === "Vision 2047"
                                  ? "/about/vision-2047"
                                  : activeMenu === "What We Do" && subItem === "Health Care"
                                  ? "/programs/healthcare"
                                  : activeMenu === "Programs" && subItem === "View All Programs →"
                                  ? "/programs/healthcare"
                                  : "#"
                              }
                              className="flex items-center gap-2 text-gray-700 hover:text-[#0d2b1a] text-sm hover:translate-x-1 transition-all duration-200"
                              style={{
                                transitionDelay: `${globalIndex * 30}ms`,
                              }}
                              onClick={() => setActiveMenu(null)}
                            >
                              <span className="text-brand-orange text-sm font-semibold">→</span>
                              {subItem}
                            </a>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Accent Column (Optional feature card for About Us, What We Do, Get Involved) */}
              {(activeMenu === "About Us" || activeMenu === "What We Do" || activeMenu === "Get Involved") && (
                <div className="w-72 shrink-0 border-l border-gray-100 pl-8 flex flex-col justify-between">
                  <div className="bg-[#f9fdf9] border border-green-100/50 rounded-lg p-5 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-[#0d2b1a] text-sm leading-snug">
                      Planting Seeds of Hope and Change
                    </div>
                    <div className="text-xs text-gray-600 leading-normal">
                      10,000+ lives impacted since 2019. Join us in bringing sustainable growth.
                    </div>
                    <a
                      href="#"
                      className="text-brand-orange text-xs font-bold hover:underline inline-flex items-center gap-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      Learn More →
                    </a>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </header>

      {/* Mobile Drawer Slide-in Panel */}
      {mobileOpen && (
        <>
          {/* Backdrop for Mobile Drawer */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Left slide drawer */}
          <div
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl overflow-y-auto mobile-drawer lg:hidden flex flex-col"
            role="dialog"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#0d2b1a] shrink-0 text-white">
              <div className="flex items-center gap-2.5">
                <Leaf className="w-6 h-6 text-brand-green fill-brand-green/20" />
                <div className="flex flex-col leading-none">
                  <span className="font-extrabold text-white text-base">IWF</span>
                  <span className="font-semibold text-[8px] text-white/70 tracking-wider">ISLAH WELFARE FOUNDATION</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-white/80 hover:text-white transition-colors rounded cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav List */}
            <nav className="flex-1 py-2" aria-label="Mobile navigation items">
              {NAV_ITEMS.map((item) => {
                const hasMega = !!MEGA_DATA[item];
                const isExpanded = mobileExpanded === item;
                return (
                  <div key={item} className="border-b border-slate-100 last:border-0">
                    <div className="flex items-center">
                      <a
                        href={
                          item === "Home"
                            ? "/"
                            : item === "About Us"
                            ? "/about"
                            : item === "Programs"
                            ? "/programs/healthcare"
                            : "#"
                        }
                        className="flex-1 px-5 py-3.5 text-sm font-semibold text-slate-800 hover:text-brand-green transition-colors"
                        onClick={() => {
                          if (!hasMega) {
                            setMobileOpen(false);
                          } else {
                            setMobileExpanded(isExpanded ? null : item);
                          }
                        }}
                      >
                        {item}
                      </a>
                      {hasMega && (
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : item)}
                          className="px-4 py-3.5 text-slate-400 hover:text-brand-green transition-colors cursor-pointer"
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item}`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180 text-brand-green" : ""}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion Sub-items */}
                    {hasMega && isExpanded && (
                      <div className="bg-slate-50 border-l-4 border-brand-green ml-4 mr-2 rounded-sm mb-1.5 py-1">
                        {MEGA_DATA[item].items.map((sub) => (
                          <a
                            key={sub}
                            href={
                              item === "About Us" && sub === "Overview"
                                ? "/about"
                                : item === "About Us" && sub === "Our Objective & Vision"
                                ? "/about/objective-and-vision"
                                : item === "About Us" && sub === "Vision 2047"
                                ? "/about/vision-2047"
                                : item === "What We Do" && sub === "Health Care"
                                ? "/programs/healthcare"
                                : item === "Programs" && sub === "View All Programs →"
                                ? "/programs/healthcare"
                                : "#"
                            }
                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-brand-green hover:bg-white transition-all"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="text-brand-orange text-xs">→</span>
                            {sub}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Footer / Donate Button */}
            <div className="p-4 border-t border-slate-100 shrink-0">
              <button
                onClick={() => {
                  setMobileOpen(false);
                }}
                className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors uppercase tracking-wide text-sm cursor-pointer"
              >
                DONATE NOW
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative">
      <div className="relative min-h-[600px] lg:min-h-[680px] overflow-hidden flex items-center">
        {/* Background Image */}
        <img
          src={hero}
          alt="Empowering kids in rural India"
          width={1600}
          height={900}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Modern dark/green gradient overlay for rich premium feel and high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 w-full z-10">
          <div className="max-w-3xl text-white">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/30 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs md:text-sm font-semibold tracking-wide uppercase text-white/95">
                "Planting Seeds of Hope and Change" — Islah Welfare Foundation (Reg.)
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6">
              Welcome to <span className="text-brand-orange">Islah Welfare Foundation</span>
            </h1>

            {/* Body Paragraph */}
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6 font-normal">
              Islah Welfare Foundation is an effort to lay a positive foundation of change in the field of education for the underprivileged kids. We believe that happiness for a lifetime can only be achieved by helping and enriching the next generation. Some of us give our time, some money, and some give skills, but ultimately, we strongly feel everyone has something to give to these kids in need. Most importantly, working for ISLAH does not translate to sacrificing personal lives or needs.
            </p>

            {/* Styled Mother Teresa Quote Block */}
            <blockquote className="border-l-4 border-brand-orange bg-white/5 backdrop-blur-sm p-4 rounded-r-lg my-6 max-w-2xl">
              <p className="text-sm md:text-base italic text-slate-100 font-medium">
                “We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop.”
              </p>
              <cite className="block text-xs md:text-sm font-semibold text-brand-orange mt-2 not-italic">
                — Mother Teresa
              </cite>
            </blockquote>

            {/* Join CTA Paragraph */}
            <p className="text-base md:text-lg font-semibold text-slate-100 mb-8 tracking-wide">
              IWF‘s doors are always open. If you feel you can fill the gap of a missing drop, <span className="text-brand-orange underline underline-offset-4 decoration-brand-orange/60">come join us….</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-sm">
                DONATE NOW
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-sm backdrop-blur-sm">
                GET INVOLVED
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-brand-green text-white rounded-md shadow-xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {[
            { icon: Users, n: "5,000+", l: "Lives Impacted" },
            { icon: HeartPulse, n: "100+", l: "Health Camps" },
            { icon: GraduationCap, n: "2,000+", l: "Students Supported" },
            { icon: Leaf, n: "10,000+", l: "Beneficiaries" },
          ].map(({ icon: Icon, n, l }) => (
            <div key={l} className="p-5 flex items-center gap-3 justify-center">
              <Icon className="w-9 h-9 opacity-90" />
              <div>
                <div className="text-2xl font-extrabold">{n}</div>
                <div className="text-xs opacity-90">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCauses() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>Featured Causes</SectionTitle></ScrollReveal>
        <ScrollReveal stagger={0.1}>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: causeEdu, icon: BookOpen, title: "Child Education", desc: "Through our 'Shiksha Na Ruke' campaign, we fund school fees, learning materials, and scholarships to keep every child in school and out of child labour.", raised: "1,65,240", pct: 75 },
            { img: causeMed, icon: Stethoscope, title: "Medical Help", desc: "Our 'Health Cannot Wait' initiative funds free health camps, medicines, emergency treatment, and health awareness drives in underserved rural communities.", raised: "2,12,880", pct: 48 },
            { img: causeWomen, icon: Users, title: "Women Empowerment", desc: "The 'She Can Fly' & 'Swabhiman' campaigns train women in vocational skills, promote Self-Help Groups, and build financial independence for lasting change.", raised: "1,48,720", pct: 60 },
          ].map((c) => (
            <CardContainer key={c.title} className="inter-var w-full">
              <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-black/[0.1] w-full h-auto rounded-xl p-6 border flex flex-col justify-between">
                <div>
                  <CardItem translateZ="50" className="text-xl font-bold text-[#0d2b1a] mb-1">
                    {c.title}
                  </CardItem>
                  <CardItem translateZ="60" as="p" className="text-slate-600 text-sm max-w-sm mt-2 mb-4">
                    {c.desc}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4 h-44 relative">
                    <img src={c.img} alt={c.title} className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl" />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                      <c.icon className="w-5 h-5 text-brand-green" />
                    </div>
                  </CardItem>
                </div>
                <div>
                  <div className="mt-6">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>₹ {c.raised} Raised</span>
                      <span>{c.pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-green" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal text-slate-500 hover:text-black cursor-pointer">
                      Read More →
                    </CardItem>
                    <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-[#f97316] text-white text-xs font-bold hover:bg-orange-600 cursor-pointer">
                      Donate Now
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
        </ScrollReveal>
        <ScrollReveal stagger={0.04}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {HOME_CONTENT.gallery.map((image, index) => (
              <div key={image} className="relative overflow-hidden rounded-md aspect-[4/3] group">
                <img
                  src={image}
                  alt={`IWF gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function GetInvolved({ onOpenModal }: { onOpenModal: (type: RoleType) => void }) {
  const actions: Array<{ title: string; text: string; type: RoleType }> = [
    { title: "Volunteer With Us", text: "Contribute your time and skills to community work.", type: "volunteer" },
    { title: "Partner With Us", text: "Collaborate through CSR, institutions or development networks.", type: "partner" },
    { title: "Sponsor a Programme", text: "Support education, healthcare, women empowerment or livelihood work.", type: "sponsor" },
    { title: "Become a Mentor", text: "Guide youth, learners and aspiring entrepreneurs.", type: "mentor" },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Get Involved"
            title="IWF's Doors Are Always Open"
            subtitle="If you feel you can fill the gap of a missing drop, come join us."
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.07}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {actions.map((action) => (
              <button
                key={action.title}
                onClick={() => onOpenModal(action.type)}
                className="text-left bg-white hover:bg-[#0d2b1a] border border-slate-100 hover:border-[#0d2b1a] rounded-md p-6 shadow-sm hover:shadow-md group transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-bold text-brand-green-dark group-hover:text-white mb-2 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-600 group-hover:text-white/75 leading-relaxed transition-colors">
                  {action.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand-orange">
                  Open Form <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center text-sm text-slate-600">
          <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-brand-green" />
            {CONTACT_DETAILS.phone}
          </a>
          <a href={`mailto:${CONTACT_DETAILS.email}`} className="inline-flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-brand-green" />
            {CONTACT_DETAILS.email}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <HeroSection onOpenModal={setActiveModal} />
        <AboutPreview />
        <FocusAreas />
        <Campaigns />
        <VisionSection />
        <ImpactSection />
        <GallerySection />
        <GetInvolved onOpenModal={setActiveModal} />
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
