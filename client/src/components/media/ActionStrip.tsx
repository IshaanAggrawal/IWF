import { Link } from "@tanstack/react-router";
import { Heart, Users, Handshake } from "lucide-react";

interface ActionStripProps {
  title?: string;
  subtitle?: string;
  showPartner?: boolean;
}

export function ActionStrip({
  title = "Together, we can create lasting impact and build sustainable communities.",
  subtitle = "Join us in making a difference today!",
  showPartner = true,
}: ActionStripProps) {
  return (
    <div className="rounded-2xl p-6 sm:p-8 my-10 bg-gradient-to-r from-[#041a0e] via-[#09331a] to-[#041a0e] text-white shadow-xl border border-emerald-900/60 relative overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-6 flex items-center gap-4">
          <div className="p-3.5 bg-emerald-500/20 rounded-2xl text-emerald-400 shrink-0 border border-emerald-400/30">
            <Heart className="w-7 h-7 fill-emerald-400/20" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-300 font-medium mt-1">{subtitle}</p>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-wrap items-center justify-start lg:justify-end gap-3">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md transition transform hover:-translate-y-0.5"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>DONATE NOW</span>
          </Link>

          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md border border-emerald-600/40 transition transform hover:-translate-y-0.5"
          >
            <Users className="w-4 h-4 text-emerald-300" />
            <span>BECOME A VOLUNTEER</span>
          </Link>

          {showPartner && (
            <Link
              to="/partner"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-md transition transform hover:-translate-y-0.5"
            >
              <Handshake className="w-4 h-4 text-emerald-700" />
              <span>PARTNER WITH US</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
