import { createFileRoute } from "@tanstack/react-router";
import OutcomesPage from "@/Pages/Media/OutcomesPage";

export const Route = createFileRoute("/media/outcomes")({
  head: () => ({
    meta: [
      { title: "Our Outcomes — Real Change & Stronger Communities | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Explore the measurable outcomes and long-term socio-economic impact of Islah Welfare Foundation across education, healthcare, and rural empowerment.",
      },
    ],
  }),
  component: OutcomesPage,
});
