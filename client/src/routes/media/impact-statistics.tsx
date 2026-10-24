import { createFileRoute } from "@tanstack/react-router";
import ImpactStatisticsPage from "@/Pages/Media/ImpactStatisticsPage";

export const Route = createFileRoute("/media/impact-statistics")({
  head: () => ({
    meta: [
      { title: "Impact Statistics — Measuring Progress | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Transparent data, verified milestones, and key metrics highlighting the footprint of Islah Welfare Foundation programs across India.",
      },
    ],
  }),
  component: ImpactStatisticsPage,
});
