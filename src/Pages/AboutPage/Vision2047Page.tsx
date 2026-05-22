import { useState } from "react";
import {
  NotificationTicker, UtilityBar, Header, Footer, RoleFormModal,
} from "@/components/layout/SiteLayout";
import V2047Hero from "./components/V2047Hero.tsx";
import LongTermVision from "./components/LongTermVision.tsx";
import CorePhilosophy from "./components/CorePhilosophy.tsx";
import StrategicFocusAreas from "./components/StrategicFocusAreas.tsx";
import ApproachAspiration from "./components/ApproachAspiration.tsx";
import CommitmentToChange from "./components/CommitmentToChange.tsx";
import FinalQuote from "./components/FinalQuote.tsx";

export default function Vision2047Page() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null
  >(null);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        <V2047Hero />
        <LongTermVision />
        <CorePhilosophy />
        <StrategicFocusAreas />
        <ApproachAspiration />
        <CommitmentToChange />
        <FinalQuote onOpenModal={setActiveModal} />
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
