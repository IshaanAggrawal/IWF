import { createFileRoute } from "@tanstack/react-router";
import { OutcomesPage } from "@/Pages/Media/OutcomesPage";

export const Route = createFileRoute("/impact-statistics")({
  head: () => ({
    meta: [
      { title: "Outcomes & Impact — Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Verified metrics, district reach, and cumulative impact data of Islah Welfare Foundation.",
      },
    ],
  }),
  component: OutcomesPage,
});
