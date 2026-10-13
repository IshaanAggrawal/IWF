import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Home, ChevronRight as BreadcrumbArrow } from "lucide-react";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";
import slide3 from "@/assets/hero-carousel/hero-slide-3.jpg";
import slide4 from "@/assets/hero-carousel/hero-slide-4.jpg";
import aboutHero from "@/assets/about-hero.jpg";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SubpageHeroCarouselProps {
  tag?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  images?: string[];
  heightClass?: string;
}

const DEFAULT_SLIDES = [aboutHero, slide1, slide2, slide3, slide4];

export default function SubpageHeroCarousel({
  tag = "ABOUT ISLAH",
  title,
  subtitle,
  breadcrumbs = [{ label: "About Us", href: "/about" }],
  images = DEFAULT_SLIDES,
  heightClass = "min-h-[480px] md:min-h-[520px] lg:min-h-[580px]",
}: SubpageHeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 5000;

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, images.length]);

  useEffect(() => {
    setProgress(0);
    if (isPaused || images.length <= 1) return;
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 50);
    return () => clearInterval(tick);
  }, [currentSlide, isPaused, images.length]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % images.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + images.length) % images.length);

  return (
    <section
      className={`bg-[#071527] text-white flex flex-col justify-center py-10 md:py-14 relative overflow-hidden select-none group ${heightClass}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/70 mb-4 flex-wrap select-none">
            <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-brand-orange" />
              <span>Home</span>
            </a>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div key={idx} className="flex items-center gap-1.5">
                  <BreadcrumbArrow className="w-3 h-3 text-white/40" />
                  {isLast || !crumb.href ? (
                    <span className="text-brand-orange font-bold">{crumb.label}</span>
                  ) : (
                    <a href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </a>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Main Grid: Left Content + Right Organic Composition Slider */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Subtitle */}
          <div className="space-y-4 sm:space-y-5 text-left">
            {tag && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                {tag}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal">
                {subtitle}
              </p>
            )}

            {/* Slide Navigation Controls */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 bg-[#0b1f36] px-3 py-1.5 rounded-full border border-[#163559]">
                  {images.map((_, idx) => (
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
                          style={{ width: `${progress}%`, transition: "width 50ms linear" }}
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
                className="relative w-full h-full overflow-hidden border-[5px] sm:border-[6px] border-white shadow-2xl z-10"
                style={{
                  borderRadius: "44% 56% 68% 32% / 42% 44% 56% 58%",
                }}
              >
                {images.map((img, idx) => (
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
                      alt={title}
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
                  Together<br />
                  We Can Do<br />
                  More <span className="inline-block text-sky-200">♡</span>
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
                  <p>PEOPLE</p>
                  <p>SUPPORT</p>
                  <p>CHANGE</p>
                  <p>TOGETHER</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curved Bottom Wave Divider */}
      <div className="relative w-full overflow-hidden leading-none z-10 mt-6 md:mt-8">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-20 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C320,80 720,90 1080,45 C1240,25 1360,55 1440,75 L1440,90 L0,90 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}

