import { createFileRoute } from "@tanstack/react-router";
import NewsEventsPage from "@/Pages/NewsEventsPage";

export const Route = createFileRoute("/news-and-events")({
  head: () => ({
    meta: [
      { title: "News & Events — IWF | Islah Welfare Foundation" },
      { name: "description", content: "Stay updated with IWF's latest news — health camps, scholarships, women empowerment events, partnerships, and community impact stories from rural Bihar." },
    ],
  }),
  component: NewsEventsPage,
});
