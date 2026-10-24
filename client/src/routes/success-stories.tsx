import { createFileRoute } from "@tanstack/react-router";
import SuccessStoriesPage from "@/Pages/Media/SuccessStoriesPage";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Grassroots Success Stories — Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Read personal narratives of resilience, transformation and hope from communities supported by Islah Welfare Foundation.",
      },
    ],
  }),
  component: SuccessStoriesPage,
});
