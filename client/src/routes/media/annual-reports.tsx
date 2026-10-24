import { createFileRoute } from "@tanstack/react-router";
import AnnualReportsPage from "@/Pages/Media/AnnualReportsPage";

export const Route = createFileRoute("/media/annual-reports")({
  head: () => ({
    meta: [
      { title: "Annual Reports & Financial Audits | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Download official audited annual reports, financial disclosures, and programmatic evaluations from Islah Welfare Foundation.",
      },
    ],
  }),
  component: AnnualReportsPage,
});
