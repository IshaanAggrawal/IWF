import { useState } from "react";
import { Download, Check, Copy, FileText, CheckCircle2, XCircle, Palette, ArrowRight } from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { MediaLayout } from "@/components/media/MediaLayout";
import { BRAND_ASSETS_DATA } from "@/content/mediaContent";

export function BrandAssetsPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Hero Section */}
      <MediaSubpageHero
        badge={BRAND_ASSETS_DATA.hero.badge}
        title={BRAND_ASSETS_DATA.hero.title}
        description={BRAND_ASSETS_DATA.hero.description}
        breadcrumb={[
          { label: "Media & Updates", href: "/media" },
          { label: "Brand Assets" },
        ]}
        image={BRAND_ASSETS_DATA.hero.image}
        imageAlt="Brand Assets & Guidelines"
        actions={
          <div className="flex flex-wrap gap-2.5">
            <a
              href="#brand-download"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Brand Kit (ZIP)</span>
            </a>
            <a
              href="#logo-pack"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
            >
              Logo Pack
            </a>
            <a
              href="#guidelines"
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              Guidelines
            </a>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* 2. Four Stats Ribbon */}
        <section aria-label="Brand Assets Metrics">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {BRAND_ASSETS_DATA.statsRibbon.map((stat, idx) => (
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

        {/* 3. Official Logos Section */}
        <section id="logo-pack" className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Identity Assets
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Official Logo Variations
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Please use the official vector SVG or high-resolution PNG versions. Do not recreate or distort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_ASSETS_DATA.logos.map((logo) => (
              <div
                key={logo.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition group"
              >
                {/* Logo Display Box */}
                <div
                  className={`h-48 flex items-center justify-center p-6 transition ${
                    logo.darkBg ? "bg-[#063319]" : "bg-slate-100"
                  }`}
                >
                  <img
                    src={logo.preview}
                    alt={logo.name}
                    className="max-h-24 max-w-[80%] object-contain group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{logo.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {logo.usage}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href={logo.pngUrl}
                      download
                      className="flex-1 text-center py-2 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold transition cursor-pointer"
                    >
                      PNG
                    </a>
                    <a
                      href={logo.svgUrl}
                      download
                      className="flex-1 text-center py-2 rounded-xl bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-800 text-xs font-bold transition cursor-pointer"
                    >
                      SVG Vector
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Color Palette Section */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Visual System
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Official Color Palette
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Click any color card to copy the hexadecimal code to your clipboard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_ASSETS_DATA.colors.map((color, idx) => (
              <div
                key={idx}
                onClick={() => handleCopyHex(color.hex)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition group"
              >
                <div
                  className="h-28 w-full transition duration-300 group-hover:opacity-90 flex items-end justify-end p-3"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/40 text-white backdrop-blur-sm">
                    {color.role}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{color.name}</h3>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {color.hex} • {color.cmyk}
                    </div>
                  </div>

                  <button
                    aria-label={`Copy ${color.hex}`}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition"
                  >
                    {copiedHex === color.hex ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Typography & Rules (Do's & Don'ts) */}
        <section id="guidelines" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Typography */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-5 h-5 text-emerald-700" />
              <span>Typography Standards</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Primary Typeface
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  Outfit / Inter
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Used for major titles, hero banners, metrics, and high-impact calls to action.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Body & Reading Typeface
                </div>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  Plus Jakarta Sans / Roboto
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Used for body paragraphs, narrative reports, footnotes, and interface labels.
                </p>
              </div>
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <span>Logo Usage Standards</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Do's */}
              <div className="space-y-2.5">
                <div className="font-bold text-emerald-700 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Always Do</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Maintain minimum clear space around logo equal to mark height.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Use the monochrome white version on dark photographic backgrounds.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Scale proportionally with locked aspect ratios.</span>
                  </li>
                </ul>
              </div>

              {/* Don'ts */}
              <div className="space-y-2.5">
                <div className="font-bold text-rose-600 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <XCircle className="w-4 h-4" />
                  <span>Never Do</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>Do not skew, rotate, or stretch the typography or emblem.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>Do not change the official green or orange brand tones.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>Do not add drop shadows, outer glows, or bevel effects.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Complete Brand Pack Download Banner */}
        <section id="brand-download">
          <div className="bg-gradient-to-br from-[#063319] to-[#0b4d26] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Complete Press & Partner Kit
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Download Comprehensive Brand Bundle
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Includes all vector SVG & PNG logos in RGB/CMYK, complete Brand Guidelines PDF (28 pages), executive photos, and boilerplate text.
              </p>
            </div>

            <a
              href="/docs/islah_brochure.pdf"
              download="Islah_Brand_Kit.pdf"
              className="shrink-0 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Brand Kit (PDF • 24.5 MB)</span>
            </a>
          </div>
        </section>

        {/* 7. Action Strip */}
        <ActionStrip />
      </div>
    </div>
    </MediaLayout>
  );
}

export default BrandAssetsPage;
