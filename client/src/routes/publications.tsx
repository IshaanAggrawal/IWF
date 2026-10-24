import { createFileRoute } from "@tanstack/react-router";
import PublicationsPage from "@/Pages/Media/PublicationsPage";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications & Research — Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Explore peer-informed reports, policy briefs and research papers from Islah Welfare Foundation.",
      },
    ],
  }),
  component: PublicationsPage,
});
