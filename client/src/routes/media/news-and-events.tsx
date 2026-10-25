import { createFileRoute } from "@tanstack/react-router";
import NewsEventsPage from "@/Pages/Media/NewsEventsPage";

export const Route = createFileRoute("/media/news-and-events")({
  head: () => ({
    meta: [
      { title: "News & Events — Field Updates & Calendar | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Catch up on the latest happenings, community health camps, youth seminars, and grassroots events hosted by Islah Welfare Foundation.",
      },
    ],
  }),
  component: NewsEventsPage,
});
