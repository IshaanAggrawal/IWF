import { createFileRoute } from "@tanstack/react-router";
import { PublicationsPage } from "@/Pages/Media/PublicationsPage";

export const Route = createFileRoute("/newsletters")({
  head: () => ({
    meta: [
      { title: "Quarterly Newsletters — Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Read and download quarterly newsletters and impact digests from Islah Welfare Foundation.",
      },
    ],
  }),
  component: PublicationsPage,
});
