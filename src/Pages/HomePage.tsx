import { useState } from "react";
import { ArrowRight, CheckCircle2, Heart, Mail, Phone } from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import { CONTACT_DETAILS, HOME_CONTENT, IMPACT_HIGHLIGHTS } from "@/content/siteContent";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-10">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
        {eyebrow}
      </p>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide">
          {title}
        </h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      {subtitle && (
        <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function HeroSection({ onOpenModal }: { onOpenModal: (type: RoleType) => void }) {
  return (
    <section className="relative min-h-[560px] flex items-center overflow-hidden">
      <img
        src={HOME_CONTENT.hero.image}
        alt="Islah Welfare Foundation community work"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/78 to-slate-900/25" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-6">
            <Heart className="w-4 h-4 text-brand-orange fill-brand-orange" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
              {HOME_CONTENT.hero.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-5">
            {HOME_CONTENT.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-brand-orange font-semibold mb-4">
            "{HOME_CONTENT.hero.subtitle}"
          </p>
          <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
            {HOME_CONTENT.hero.description}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="#focus-areas"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-sm px-5 py-3 rounded-md shadow-md transition-colors"
            >
              Explore Our Work <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => onOpenModal("sponsor")}
              className="inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3 rounded-md transition-colors cursor-pointer"
            >
              Donate Now
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 max-w-xl mt-12">
          {HOME_CONTENT.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 border border-white/15 rounded-md p-4 backdrop-blur-sm"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs text-white/65 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-md shadow-lg border border-slate-100">
                <img
                  src={HOME_CONTENT.about.image}
                  alt="About Islah Welfare Foundation"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs uppercase tracking-widest text-brand-orange font-bold mb-2">
                    Care | Empower | Uplift
                  </p>
                  <p className="text-lg font-bold">Planting Seeds of Hope and Change</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                About Us
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-green-dark leading-tight mb-5">
                {HOME_CONTENT.about.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-7">
                {HOME_CONTENT.about.copy}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {HOME_CONTENT.about.values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={value.title}
                      className="flex gap-4 bg-slate-50 border border-slate-100 rounded-md p-4"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-md bg-brand-green text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-green-dark text-sm">{value.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed mt-1">{value.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FocusAreas() {
  return (
    <section id="focus-areas" className="py-16 bg-slate-50 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            eyebrow="What We Do"
            title="Core Focus Areas"
            subtitle="Integrated work across education, health, livelihood, dignity and sustainability."
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.06}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOME_CONTENT.focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <a
                  key={area.title}
                  href={area.href}
                  className="group bg-white rounded-md overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-md bg-brand-orange text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-brand-green-dark mb-2 group-hover:text-brand-green transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{area.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-orange">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Campaigns() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Campaigns"
            title="Featured Causes"
            subtitle="High-visibility campaigns from the client brief, presented as polished frontend touchpoints."
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.08}>
          <div className="grid md:grid-cols-3 gap-5">
            {HOME_CONTENT.campaigns.map((campaign) => (
              <a
                key={campaign.title}
                href={campaign.href}
                className="group relative min-h-[320px] rounded-md overflow-hidden shadow-sm border border-slate-100"
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-900/35 to-transparent" />
                <div className="absolute left-5 right-5 bottom-5 text-white">
                  <h3 className="text-2xl font-extrabold mb-2">{campaign.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">{campaign.text}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange">
                    Support This Cause <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="py-16 bg-[#0d2b1a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                Long-Term Vision
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5">
                {HOME_CONTENT.vision2047.title}
              </h2>
              <p className="text-white/75 leading-relaxed mb-7">
                {HOME_CONTENT.vision2047.copy}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {HOME_CONTENT.vision2047.pillars.map((pillar) => (
                  <div key={pillar} className="flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                    {pillar}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.1}>
              <div className="relative rounded-md overflow-hidden border border-white/10 shadow-xl">
                <img
                  src={HOME_CONTENT.vision2047.image}
                  alt="Vision 2047"
                  className="w-full h-[360px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-sm font-semibold italic leading-relaxed">
                    "An empowered, equitable and self-reliant India where no one is left behind."
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Impact"
            title="How Change Takes Shape"
            subtitle="IWF's work combines service delivery, awareness, training and community ownership."
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.07}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {IMPACT_HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white border border-slate-100 rounded-md p-6 shadow-sm">
                  <div className="w-11 h-11 rounded-md bg-brand-green/10 text-brand-green flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-brand-green-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Media & Updates"
            title="Events & Gallery"
            subtitle="A visual showpiece area ready for client photos, event updates and community stories."
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.04}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {HOME_CONTENT.gallery.map((image, index) => (
              <div key={image} className="relative overflow-hidden rounded-md aspect-[4/3] group">
                <img
                  src={image}
                  alt={`IWF gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function GetInvolved({ onOpenModal }: { onOpenModal: (type: RoleType) => void }) {
  const actions: Array<{ title: string; text: string; type: RoleType }> = [
    { title: "Volunteer With Us", text: "Contribute your time and skills to community work.", type: "volunteer" },
    { title: "Partner With Us", text: "Collaborate through CSR, institutions or development networks.", type: "partner" },
    { title: "Sponsor a Programme", text: "Support education, healthcare, women empowerment or livelihood work.", type: "sponsor" },
    { title: "Become a Mentor", text: "Guide youth, learners and aspiring entrepreneurs.", type: "mentor" },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle
            eyebrow="Get Involved"
            title="IWF's Doors Are Always Open"
            subtitle="If you feel you can fill the gap of a missing drop, come join us."
          />
        </ScrollReveal>
        <ScrollReveal stagger={0.07}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {actions.map((action) => (
              <button
                key={action.title}
                onClick={() => onOpenModal(action.type)}
                className="text-left bg-white hover:bg-[#0d2b1a] border border-slate-100 hover:border-[#0d2b1a] rounded-md p-6 shadow-sm hover:shadow-md group transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-bold text-brand-green-dark group-hover:text-white mb-2 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-600 group-hover:text-white/75 leading-relaxed transition-colors">
                  {action.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand-orange">
                  Open Form <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center text-sm text-slate-600">
          <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-brand-green" />
            {CONTACT_DETAILS.phone}
          </a>
          <a href={`mailto:${CONTACT_DETAILS.email}`} className="inline-flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-brand-green" />
            {CONTACT_DETAILS.email}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <HeroSection onOpenModal={setActiveModal} />
        <AboutPreview />
        <FocusAreas />
        <Campaigns />
        <VisionSection />
        <ImpactSection />
        <GallerySection />
        <GetInvolved onOpenModal={setActiveModal} />
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
