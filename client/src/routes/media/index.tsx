import { createFileRoute } from "@tanstack/react-router";
import MediaHubPage from "@/Pages/Media/MediaHubPage";

export const Route = createFileRoute("/media/")({
  head: () => ({
    meta: [
      { title: "Media & Updates — Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Official media center of Islah Welfare Foundation. Access latest updates, press releases, newsletters, publications, photo and video galleries, and field reports.",
      },
    ],
  }),
  component: MediaHubPage,
});
