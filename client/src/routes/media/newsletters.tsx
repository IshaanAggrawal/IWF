import { createFileRoute } from "@tanstack/react-router";
import NewslettersPage from "@/Pages/Media/NewslettersPage";

export const Route = createFileRoute("/media/newsletters")({
  head: () => ({
    meta: [
      { title: "Newsletters & Impact Bulletins | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Browse and download quarterly newsletters and monthly impact chronicles published by Islah Welfare Foundation.",
      },
    ],
  }),
  component: NewslettersPage,
});
