import { createFileRoute } from "@tanstack/react-router";
import AnnualReportsPage from "@/Pages/Media/AnnualReportsPage";

export const Route = createFileRoute("/annual-reports")({
  head: () => ({
    meta: [
      { title: "Annual Reports & Governance — Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Download audited annual reports, financial disclosures, and impact evaluations of Islah Welfare Foundation.",
      },
    ],
  }),
  component: AnnualReportsPage,
});
