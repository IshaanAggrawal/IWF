import { useState } from "react";
import {
  NotificationTicker, UtilityBar, Header, Footer, RoleFormModal,
} from "@/components/layout/SiteLayout";
import ObjVisionHero from "./components/ObjVisionHero.tsx";
import ObjectivesSection from "./components/ObjectivesSection.tsx";
import ValuesSection from "./components/ValuesSection.tsx";

export default function ObjectiveVisionPage() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <ObjVisionHero />
        <ObjectivesSection />
        <ValuesSection />
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
