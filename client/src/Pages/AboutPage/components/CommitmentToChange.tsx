import { UserX, BookOpen, Crown } from "lucide-react";
import img from "@/assets/vision2047/indian-flag.webp"

function SectionTitle({ children, white }: { children: React.ReactNode; white?: boolean }) {
  return (
    <div className="flex flex-col mb-6">
      <div className="flex items-center gap-3">
        <h2 className={`text-2xl md:text-3xl font-bold tracking-wide uppercase ${white ? "text-white" : "text-brand-green-dark"}`}>
          {children}
        </h2>
        <span className={`h-px flex-1 ${white ? "bg-white/20" : "bg-brand-green"}`} />
      </div>
    </div>
  );
}

export default function CommitmentToChange() {
  const commitments = [
    { icon: UserX, text: "No child is seen begging or forced into labour" },
    { icon: BookOpen, text: "Every child is in school or playing freely" },
    { icon: Crown, text: "Every individual has the opportunity to live with dignity" }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 bg-slate-900"
        style={{
          // backgroundImage: `url(${v2047CommitmentBg})`, 
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-[#0b1f3b]/90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <SectionTitle white>🌿 A COMMITMENT TO CHANGE</SectionTitle>

            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
              We may not measure this journey in years alone, but in the lives transformed along the way. Our mission will continue until:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {commitments.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-orange/20 flex items-center justify-center shrink-0">
                    <item.icon className="text-brand-orange w-4 h-4" />
                  </div>
                  <span className="text-white/85 text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            {/* <span className="text-brand-orange text-7xl font-serif opacity-60 leading-none mb-2 block">"</span> */}
            {/* <p className="text-white font-semibold text-lg leading-relaxed italic">
              Vision 2047 is not just a goal—it is a commitment to build an empowered, equitable, and self-reliant India where no one is left behind.
            </p> */}
            <img
              src={img}
              className="w-full h-full object-cover rounded-lg"
            />
            {/* <div className="h-px bg-brand-orange/40 my-4 w-16"></div> */}
          </div>

        </div>
      </div>
    </section>
  );
}
