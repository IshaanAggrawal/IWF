import { Eye, IndianRupee } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Patient } from "@/content/patients";

type PatientCardProps = Patient & {
  compact?: boolean;
};

export function PatientCard({
  slug,
  name,
  age,
  gender,
  disease,
  hospital,
  urgent,
  image,
  neededAmount,
  raisedAmount,
  donorsCount,
  condition,
  compact = false,
}: PatientCardProps) {
  const pct = Math.min(100, Math.round((raisedAmount / neededAmount) * 100));

  const conditionColor =
    condition === "Critical"
      ? "bg-red-600 text-white"
      : condition === "Serious"
        ? "bg-orange-500 text-white"
        : condition === "Recovering"
          ? "bg-blue-500 text-white"
          : "bg-green-600 text-white";

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Image */}
      <div className="relative h-40 w-full">
        <img
          src={image}
          alt={`${name} — patient needing urgent support`}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {urgent && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
            URGENT
          </span>
        )}
        <span
          className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${conditionColor}`}
        >
          {condition}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-[#0d2b1a] text-base leading-tight">{name}</h3>
        <p className="text-xs text-gray-500">
          Age: {age} Yrs | {gender}
        </p>

        <div className="h-px bg-gray-100" />

        <div>
          <span className="text-[10px] font-black text-[#f97316] uppercase tracking-wide">
            Disease:
          </span>
          <p className="text-xs text-gray-700 mt-0.5 leading-snug">{disease}</p>
        </div>

        <div>
          <span className="text-[10px] font-black text-[#0d2b1a] uppercase tracking-wide">
            Hospital:
          </span>
          <p className="text-xs text-gray-600 mt-0.5 leading-snug">{hospital}</p>
        </div>

        {/* Financial section */}
        <div className="mt-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-[#0d2b1a] uppercase tracking-wide">
              Needed Amount
            </span>
            <span className="text-[10px] text-gray-400">{donorsCount} donors</span>
          </div>
          <div className="flex items-center gap-1 mb-1.5">
            <IndianRupee className="w-3 h-3 text-[#f97316] shrink-0" />
            <span className="text-base font-black text-[#f97316]">
              {neededAmount.toLocaleString("en-IN")}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-[#f97316] rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-500">
              Raised: ₹{raisedAmount.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-gray-400">
              Goal: ₹{neededAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/patients/$patientSlug"
          params={{ patientSlug: slug }}
          className="mt-auto w-full bg-[#0d2b1a] hover:bg-[#1a4a2e] text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 active:scale-95"
        >
          <Eye className="w-3.5 h-3.5" />
          VIEW MORE
        </Link>
      </div>
    </article>
  );
}
