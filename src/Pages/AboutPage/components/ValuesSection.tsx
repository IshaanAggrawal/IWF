import { Heart, Zap, Scale, ShieldCheck } from "lucide-react";

function SectionTitle({ children, white }: { children: React.ReactNode; white?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className={`h-px w-8 ${white ? "bg-white" : "bg-brand-green"}`} />
      <h2 className={`text-2xl md:text-3xl font-bold tracking-wide uppercase text-center ${white ? "text-white" : "text-brand-green-dark"}`}>
        {children}
      </h2>
      <span className={`h-px w-8 ${white ? "bg-white" : "bg-brand-green"}`} />
    </div>
  );
}

export default function ValuesSection() {
  const values = [
    {
      title: "COMPASSION",
      icon: Heart,
      desc: "A person cannot be compassionate unless he/she is sensitive to others' needs and conditions."
    },
    {
      title: "EMPOWERMENT",
      icon: Zap,
      desc: "To empower people to unleash their potential."
    },
    {
      title: "JUSTICE",
      icon: Scale,
      desc: "Each person has the right to live and be treated with dignity. Justice is achieved by considering the rights of others and the respect they deserve, regardless of ethnic background."
    },
    {
      title: "ACCOUNTABILITY",
      icon: ShieldCheck,
      desc: "We hold ourselves accountable for our actions. We hold our project implementation partners accountable for their actions."
    }
  ];

  return (
    <>
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-brand-orange" />
        <div className="flex-1 bg-white border-y border-slate-200" />
        <div className="flex-1 bg-brand-green" />
      </div>
      
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle>OUR CORE VALUES</SectionTitle>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-green/20 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-orange/10 mb-4 flex items-center justify-center">
                  <val.icon className="text-brand-orange w-7 h-7" />
                </div>
                <h3 className="font-bold text-[#0b1f3b] text-sm uppercase tracking-widest mb-3">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
