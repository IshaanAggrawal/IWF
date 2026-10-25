import { useState, type ReactNode } from "react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";

export interface MediaLayoutProps {
  children: ReactNode;
}

export function MediaLayout({ children }: MediaLayoutProps) {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <NotificationTicker />
      <UtilityBar onOpenModal={(role) => setActiveModal(role)} />
      <Header onOpenModal={(role) => setActiveModal(role)} />

      <main className="flex-1">{children}</main>

      <Footer onOpenModal={(role) => setActiveModal(role)} />
      <RoleFormModal
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}

export default MediaLayout;
