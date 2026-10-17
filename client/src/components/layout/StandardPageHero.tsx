import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Home, ChevronRight, ChevronLeft, Pause, Play } from "lucide-react";
import defaultHeroImg from "@/assets/contact-hands-hero.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";
import slide3 from "@/assets/hero-carousel/hero-slide-3.jpg";
import slide4 from "@/assets/hero-carousel/hero-slide-4.jpg";

const DEFAULT_SLIDES = [aboutHero, slide1, slide2, slide3, slide4];

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
  images?: string[];
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
  images,
  imageAlt = "Islah Welfare Foundation — Together We Can Do More",
  taglineTop = "Together",
  taglineMid = "We Can Do",
  taglineBot = "More",
  verticalWords = ["PEOPLE", "SUPPORT", "CHANGE", "TOGETHER"],
  waveFill = "#ffffff",
}: StandardPageHeroProps) {
  const resolvedImages =
    images && images.length > 0
      ? images
      : image && image !== defaultHeroImg
      ? [image, aboutHero, slide1, slide2]
      : DEFAULT_SLIDES;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const isPaused = isManualPaused || isPressed;
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 4500;

  useEffect(() => {
    if (isPaused || resolvedImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % resolvedImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused, resolvedImages.length]);

  useEffect(() => {
    setProgress(0);
    if (isPaused || resolvedImages.length <= 1) return;
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 40);
    return () => clearInterval(tick);
  }, [currentSlide, isPaused, resolvedImages.length]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % resolvedImages.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + resolvedImages.length) % resolvedImages.length);

  // Touch swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  return (
    <section
      className="bg-[#071527] text-white min-h-[300px] sm:min-h-[330px] md:min-h-[360px] lg:min-h-[390px] flex flex-col justify-center py-6 sm:py-8 md:py-10 relative overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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

            {/* Slide Navigation Controls */}
            {resolvedImages.length > 1 && (
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-1.5 bg-[#0b1f36] px-3 py-1.5 rounded-full border border-[#163559]">
                  {/* Play/Pause Button */}
                  <button
                    onClick={() => setIsManualPaused((p) => !p)}
                    aria-label={isPaused ? "Play slider" : "Pause slider"}
                    title={isPaused ? "Play slider" : "Pause slider"}
                    className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer mr-0.5"
                  >
                    {isPaused ? <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" /> : <Pause className="w-2.5 h-2.5 fill-white text-white" />}
                  </button>

                  {resolvedImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className="relative cursor-pointer py-1"
                    >
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          currentSlide === idx ? "w-6 h-1.5 bg-white/30" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                      {currentSlide === idx && (
                        <div
                          className="absolute top-1 left-0 h-1.5 rounded-full bg-brand-orange"
                          style={{ width: `${progress}%`, transition: "width 40ms linear" }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="w-8 h-8 rounded-full bg-[#0b1f36] hover:bg-[#163559] text-white flex items-center justify-center border border-[#163559] transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-8 h-8 rounded-full bg-[#0b1f36] hover:bg-[#163559] text-white flex items-center justify-center border border-[#163559] transition cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
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

          {/* Right Column: Native Organic Composition with Smooth Slider */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] aspect-[1.15/1]">
              {/* Background Soft Blue Organic Backdrop Layer */}
              <div
                className="absolute inset-2 bg-[#122e54] -rotate-3 scale-105 opacity-90 transition-transform pointer-events-none"
                style={{
                  borderRadius: "50% 50% 65% 35% / 45% 45% 55% 55%",
                }}
              />

              {/* Organic Frame with Razor-Sharp Photograph Slider */}
              <div
                className={`relative w-full h-full overflow-hidden border-[5px] sm:border-[6px] border-white shadow-2xl z-10 ${
                  isPressed ? "cursor-grabbing" : "cursor-default"
                }`}
                style={{
                  borderRadius: "44% 56% 68% 32% / 42% 44% 56% 58%",
                }}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
              >
                {resolvedImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      opacity: idx === currentSlide ? 1 : 0,
                      transform: idx === currentSlide ? "scale(1.05)" : "scale(1.12)",
                      transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      zIndex: idx === currentSlide ? 1 : 0,
                    }}
                  >
                    <img
                      src={img}
                      alt={typeof title === "string" ? title : imageAlt}
                      className="w-full h-full object-cover object-[center_30%] select-none"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
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
      <div className="relative w-full overflow-hidden leading-none z-10 mt-3 md:mt-4">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-10 md:h-12 block"
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
