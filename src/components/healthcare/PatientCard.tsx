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
  condition,
}: PatientCardProps) {
  const conditionColor =
    condition === "Critical"
      ? "bg-red-600 text-white"
      : condition === "Serious"
        ? "bg-orange-500 text-white"
        : condition === "Recovering"
          ? "bg-blue-500 text-white"
          : "bg-green-600 text-white";

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Image */}
      <div className="relative h-28 sm:h-32 w-full">
        <img
          src={image}
          alt={`${name} — patient needing urgent support`}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {urgent && (
          <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
            URGENT
          </span>
        )}
        <span
          className={`absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm ${conditionColor}`}
        >
          {condition}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <h3 className="font-bold text-[#0b1f3b] text-sm leading-tight truncate">{name}</h3>
        <p className="text-[11px] font-medium text-slate-500">
          Age: {age} Yrs | {gender}
        </p>

        <div className="h-px bg-slate-100 my-0.5" />

        <div>
          <span className="text-[9px] font-black text-[#f97316] uppercase tracking-wide">
            Disease:
          </span>
          <p className="text-[11px] text-slate-700 font-medium leading-snug line-clamp-1">{disease}</p>
        </div>

        <div>
          <span className="text-[9px] font-black text-[#0b1f3b] uppercase tracking-wide">
            Hospital:
          </span>
          <p className="text-[11px] text-slate-600 font-normal leading-snug line-clamp-1">{hospital}</p>
        </div>

        {/* Financial section */}
        <div className="mt-1 py-1 flex items-center justify-between border-t border-b border-slate-100">
          <span className="text-[9px] font-extrabold text-[#0b1f3b] uppercase tracking-wide">
            Needed
          </span>
          <div className="flex items-center gap-0.5 text-xs text-[#f97316] font-extrabold">
            <IndianRupee className="w-3 h-3 text-[#f97316] shrink-0" />
            <span>{neededAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/patients/$patientSlug"
          params={{ patientSlug: slug }}
          className="mt-1.5 w-full bg-[#0b1f3b] hover:bg-brand-green text-white font-bold text-[11px] py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors duration-200 active:scale-95"
        >
          <Eye className="w-3 h-3" />
          VIEW MORE
        </Link>
      </div>
    </article>
  );
}

