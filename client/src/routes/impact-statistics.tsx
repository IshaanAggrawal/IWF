import { createFileRoute } from "@tanstack/react-router";
import ImpactStatisticsPage from "@/Pages/Media/ImpactStatisticsPage";

export const Route = createFileRoute("/impact-statistics")({
  head: () => ({
    meta: [
      { title: "Impact Statistics & Reach — Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Verified metrics, district reach, and cumulative impact data of Islah Welfare Foundation.",
      },
    ],
  }),
  component: ImpactStatisticsPage,
});
