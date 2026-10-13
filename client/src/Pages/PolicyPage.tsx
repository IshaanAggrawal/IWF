import { useState } from "react";
import { Home, ChevronRight } from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import { CONTACT_DETAILS, POLICY_CONTENT, type PolicySlug } from "@/content/siteContent";

import { StandardPageHero } from "@/components/layout/StandardPageHero";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

export default function PolicyPage({ slug }: { slug: PolicySlug }) {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const content = POLICY_CONTENT[slug];

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <StandardPageHero
          badge="LEGAL & COMPLIANCE"
          title={content.title}
          description={content.subtitle}
          breadcrumb={[
            { label: "Legal & Policies" },
            { label: content.title },
          ]}
        />
        <section className="py-14 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white border border-slate-100 rounded-md shadow-sm divide-y divide-slate-100">
              {content.sections.map((section) => (
                <section key={section.heading} className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-brand-green-dark mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {section.body}
                  </p>
                </section>
              ))}
              <section className="p-6 md:p-8 bg-brand-green/5">
                <h2 className="text-xl font-bold text-brand-green-dark mb-3">
                  Contact
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  For questions, contact Islah at{" "}
                  <a href={`mailto:${CONTACT_DETAILS.email}`} className="font-semibold text-brand-green">
                    {CONTACT_DETAILS.email}
                  </a>{" "}
                  or {CONTACT_DETAILS.phone}.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
