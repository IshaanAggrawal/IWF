import { createFileRoute } from "@tanstack/react-router";
import { NewsEventsPage } from "@/Pages/Media/NewsEventsPage";

export const Route = createFileRoute("/latest-updates")({
  head: () => ({
    meta: [
      { title: "Latest Updates & News — Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Stay updated with live dispatches, health camps, volunteer achievements and community news from Islah Welfare Foundation.",
      },
    ],
  }),
  component: NewsEventsPage,
});
