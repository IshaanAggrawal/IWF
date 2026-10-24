import React from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface MediaSubpageHeroProps {
  badge?: string;
  title: string;
  description: string;
  subtext?: string;
  breadcrumb?: BreadcrumbItem[];
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  rightOverlay?: React.ReactNode;
}

export function MediaSubpageHero({
  badge,
  title,
  description,
  subtext,
  breadcrumb = [],
  image,
  imageAlt = "Islah Welfare Foundation",
  actions,
  rightOverlay,
}: MediaSubpageHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-[#07190f] via-[#0c2718] to-[#123821] text-white overflow-hidden py-10 md:py-14 border-b border-emerald-900/40">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Breadcrumb */}
            {breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-emerald-200/80 mb-2">
                <Link to="/" className="hover:text-white flex items-center gap-1 transition">
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
                {breadcrumb.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400/60 shrink-0" />
                    {crumb.href ? (
                      <Link to={crumb.href} className="hover:text-white transition">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-emerald-400 font-semibold">{crumb.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            {/* Category Badge */}
            {badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {badge}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Subtext Tagline */}
            {subtext && (
              <p className="text-xs md:text-sm text-emerald-300 font-medium flex items-center gap-2 pt-1">
                <span>{subtext}</span>
              </p>
            )}

            {/* Custom Action Buttons */}
            {actions && <div className="pt-2 flex flex-wrap gap-3">{actions}</div>}
          </div>

          {/* Right Visual Column */}
          {image && (
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative group max-w-md w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-orange-500/30 rounded-2xl blur-lg group-hover:opacity-100 transition duration-500 opacity-70" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/60 aspect-[16/10] sm:aspect-[16/11]">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    loading="eager"
                  />
                  {rightOverlay && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                      {rightOverlay}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
