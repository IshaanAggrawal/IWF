import { createFileRoute } from "@tanstack/react-router";
import LeadershipPage from "@/Pages/AboutPage/LeadershipPage";

export const Route = createFileRoute("/about_/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership & Management — IWF | Islah Welfare Foundation" },
      { name: "description", content: "Meet IWF's Board of Trustees, Executive Body, Advisory Panel, and Field Team — the people leading India's grassroots development." },
    ],
  }),
  component: LeadershipPage,
});
