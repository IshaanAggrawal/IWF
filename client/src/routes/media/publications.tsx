import { createFileRoute } from "@tanstack/react-router";
import PublicationsPage from "@/Pages/Media/PublicationsPage";

export const Route = createFileRoute("/media/publications")({
  head: () => ({
    meta: [
      { title: "Research & Publications | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Access white papers, research studies, community surveys, and developmental policy briefs published by Islah.",
      },
    ],
  }),
  component: PublicationsPage,
});
