import { createFileRoute } from "@tanstack/react-router";
import PressReleasesPage from "@/Pages/Media/PressReleasesPage";

export const Route = createFileRoute("/press-releases")({
  head: () => ({
    meta: [
      { title: "Press Releases & Announcements — Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Official press statements, programmatic announcements and media kits from Islah Welfare Foundation.",
      },
    ],
  }),
  component: PressReleasesPage,
});
