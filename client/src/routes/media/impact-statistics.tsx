import { createFileRoute } from "@tanstack/react-router";
import { OutcomesPage } from "@/Pages/Media/OutcomesPage";

export const Route = createFileRoute("/media/impact-statistics")({
  head: () => ({
    meta: [
      { title: "Outcomes & Impact — Measuring Progress | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Transparent data, verified milestones, and key metrics highlighting the footprint of Islah Welfare Foundation programs across India.",
      },
    ],
  }),
  component: OutcomesPage,
});
