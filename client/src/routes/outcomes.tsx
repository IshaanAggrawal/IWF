import { createFileRoute } from "@tanstack/react-router";
import OutcomesPage from "@/Pages/Media/OutcomesPage";

export const Route = createFileRoute("/outcomes")({
  head: () => ({
    meta: [
      { title: "Our Outcomes — Real Change & Stronger Communities | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Explore verifiable outcomes and systemic impacts across health, education, women empowerment and livelihoods.",
      },
    ],
  }),
  component: OutcomesPage,
});
