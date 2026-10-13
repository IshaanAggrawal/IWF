import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Home, ChevronRight } from "lucide-react";
import defaultHeroImg from "@/assets/contact-hands-hero.jpg";

export interface HeroCardItem {
  icon?: any;
  title: string;
  subtitle: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface StandardPageHeroProps {
  badge?: string;
  title: string | ReactNode;
  description: string | ReactNode;
  breadcrumb?: BreadcrumbItem[];
  cards?: HeroCardItem[];
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  taglineTop?: string;
  taglineMid?: string;
  taglineBot?: string;
  verticalWords?: string[];
  waveFill?: string;
}

export function StandardPageHero({
  badge,
  title,
  description,
  breadcrumb = [],
  cards,
  children,
  image = defaultHeroImg,
  imageAlt = "Islah Welfare Foundation — Together We Can Do More",
  taglineTop = "Together",
  taglineMid = "We Can Do",
  taglineBot = "More",
  verticalWords = ["PEOPLE", "SUPPORT", "CHANGE", "TOGETHER"],
  waveFill = "#ffffff",
}: StandardPageHeroProps) {
  return (
    <section className="bg-[#071527] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex flex-col justify-center py-10 md:py-14 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/70 mb-4 flex-wrap select-none">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-brand-orange" />
              <span>Home</span>
            </Link>
            {breadcrumb.map((b, idx) => {
              const isLast = idx === breadcrumb.length - 1;
              return (
                <div key={idx} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-white/40" />
                  {isLast || !b.href ? (
                    <span className="text-brand-orange font-bold">{b.label}</span>
                  ) : (
                    <a href={b.href} className="hover:text-white transition-colors">
                      {b.label}
                    </a>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Main Hero Grid: Left Content + Right Organic Composition */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Copy & Cards */}
          <div className="space-y-4 sm:space-y-5 text-left">
            {badge && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                {badge}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {title}
            </h1>

            {typeof description === "string" ? (
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal">
                {description}
              </p>
            ) : (
              description
            )}

            {/* Quick Cards Grid */}
            {cards && cards.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {cards.map((card, i) => {
                  const Icon = card.icon;
                  const cardContent = (
                    <>
                      {Icon && (
                        <div className="w-9 h-9 rounded-full bg-[#1b4478] text-sky-300 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4 text-sky-300" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-sky-200 transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-[11px] text-slate-300 font-medium mt-0.5 whitespace-nowrap truncate">
                          {card.subtitle}
                        </p>
                      </div>
                    </>
                  );

                  if (card.href) {
                    return (
                      <a
                        key={i}
                        href={card.href}
                        className="bg-[#0b1f36] border border-[#163559] hover:border-sky-400/80 hover:bg-[#0f2947] rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition group shadow-sm text-left"
                      >
                        {cardContent}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={card.onClick}
                      className="bg-[#0b1f36] border border-[#163559] hover:border-sky-400/80 hover:bg-[#0f2947] rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition group shadow-sm text-left cursor-pointer"
                    >
                      {cardContent}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Additional Custom Children (e.g. Buttons, Tabs) */}
            {children && <div className="pt-2">{children}</div>}
          </div>

          {/* Right Column: Native Organic Composition */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] aspect-[1.15/1]">
              {/* Background Soft Blue Organic Backdrop Layer */}
              <div
                className="absolute inset-2 bg-[#122e54] -rotate-3 scale-105 opacity-90 transition-transform pointer-events-none"
                style={{
                  borderRadius: "50% 50% 65% 35% / 45% 45% 55% 55%",
                }}
              />

              {/* Organic Frame with Razor-Sharp Photograph */}
              <div
                className="relative w-full h-full overflow-hidden border-[5px] sm:border-[6px] border-white shadow-2xl z-10"
                style={{
                  borderRadius: "44% 56% 68% 32% / 42% 44% 56% 58%",
                }}
              >
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-full object-cover object-[center_30%] select-none scale-105"
                  loading="eager"
                />
              </div>

              {/* Left Botanical Leaves SVG */}
              <div className="absolute -left-6 sm:-left-8 top-1/4 w-12 sm:w-16 h-24 sm:h-32 pointer-events-none z-20">
                <svg viewBox="0 0 60 120" fill="none" className="w-full h-full text-[#4a729e]">
                  <path
                    d="M50,110 Q35,80 15,60 Q5,40 10,15 Q30,20 40,40 Q48,60 50,110 Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <path
                    d="M48,80 Q25,70 18,48 Q35,45 42,65 Z"
                    fill="#385e88"
                    opacity="0.95"
                  />
                  <path
                    d="M52,45 Q38,30 35,10 Q50,15 52,45 Z"
                    fill="currentColor"
                    opacity="0.85"
                  />
                </svg>
              </div>

              {/* Handwritten Note: Together We Can Do More ♡ */}
              <div className="absolute -top-3 right-0 sm:right-2 z-20 select-none text-right">
                <p className="font-['Caveat',cursive] text-2xl sm:text-3xl lg:text-[32px] font-bold text-white leading-tight rotate-[-6deg] drop-shadow-md">
                  {taglineTop}<br />
                  {taglineMid}<br />
                  {taglineBot} <span className="inline-block text-sky-200">♡</span>
                </p>
                <div className="w-10 sm:w-12 h-[2px] bg-sky-300 ml-auto mt-0.5 rounded-full rotate-[-6deg]" />
              </div>

              {/* Bottom Right Botanical Leaves & Tagline */}
              <div className="absolute -bottom-2 sm:bottom-1 right-0 sm:right-1 z-20 select-none flex flex-col items-end">
                {/* Small leaf motif */}
                <div className="w-10 h-10 mb-1 pointer-events-none">
                  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-[#4a729e]">
                    <path
                      d="M35,5 Q20,15 10,28 Q15,35 28,25 Q35,18 35,5 Z"
                      fill="currentColor"
                      opacity="0.85"
                    />
                    <path
                      d="M25,20 Q12,25 5,38 Q18,36 25,20 Z"
                      fill="#385e88"
                      opacity="0.9"
                    />
                  </svg>
                </div>

                <div className="w-8 sm:w-10 h-[1.5px] bg-sky-400/60 mb-2" />

                <div className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.22em] text-slate-300 uppercase space-y-0.5 text-right leading-tight">
                  {verticalWords.map((word, i) => (
                    <p key={i}>{word}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Curved Bottom Wave Divider ── */}
      <div className="relative w-full overflow-hidden leading-none z-10 mt-6 md:mt-8">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-20 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C380,85 760,25 1440,65 L1440,90 L0,90 Z"
            fill="#122e54"
            opacity="0.35"
          />
          <path
            d="M0,68 C420,95 820,35 1440,75 L1440,90 L0,90 Z"
            fill="#1e4675"
            opacity="0.45"
          />
          <path
            d="M0,76 C460,105 880,45 1440,85 L1440,90 L0,90 Z"
            fill={waveFill}
          />
        </svg>
      </div>
    </section>
  );
}
