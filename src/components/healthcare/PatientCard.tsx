import { Eye } from "lucide-react";
import type { Patient } from "@/content/patients";

type PatientCardProps = Patient & {
  onViewProfile?: () => void;
};

export function PatientCard({
  name,
  age,
  gender,
  disease,
  hospital,
  urgent,
  image,
  onViewProfile,
}: PatientCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
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
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-[#0d2b1a] text-base leading-tight">{name}</h3>
        <p className="text-xs text-gray-500">
          Age: {age} Yrs | {gender}
        </p>

        <div className="h-px bg-gray-100" />

        <div>
          <span className="text-[10px] font-black text-[#0d2b1a] uppercase tracking-wide">
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

        <button
          type="button"
          onClick={onViewProfile}
          className="mt-auto w-full bg-[#0d2b1a] hover:bg-[#1a4a2e] text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 active:scale-95 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          VIEW PROFILE
        </button>
      </div>
    </article>
  );
}
