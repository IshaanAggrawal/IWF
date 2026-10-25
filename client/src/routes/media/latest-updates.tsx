import { createFileRoute } from "@tanstack/react-router";
import { NewsEventsPage } from "@/Pages/Media/NewsEventsPage";

export const Route = createFileRoute("/media/latest-updates")({
  head: () => ({
    meta: [
      { title: "Latest Updates & Field Dispatches | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Real-time news and direct dispatches from our field coordinators, volunteers, and rural program directors.",
      },
    ],
  }),
  component: NewsEventsPage,
});
