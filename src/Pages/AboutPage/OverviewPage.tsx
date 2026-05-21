import { useState } from "react";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import AboutHero from "./components/AboutHero";
import OverviewSection from "./components/OverviewSection";
import TheoryOfChange from "./components/TheoryOfChange";
import FocusAreas from "./components/FocusAreas";
import OurApproach from "./components/OurApproach";
import Achievements from "./components/Achievements";
import BePartOfChange from "./components/BePartOfChange";

export default function OverviewPage() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <AboutHero />
        <OverviewSection />
        <TheoryOfChange />
        <FocusAreas />
        <OurApproach />
        <Achievements />
        <BePartOfChange onOpenModal={setActiveModal} />
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
