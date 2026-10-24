import { createFileRoute } from "@tanstack/react-router";
import PressReleasesPage from "@/Pages/Media/PressReleasesPage";

export const Route = createFileRoute("/media/press-releases")({
  head: () => ({
    meta: [
      { title: "Press Releases & Official Announcements | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Official press statements, public notices, partnership announcements, and media releases from Islah Welfare Foundation.",
      },
    ],
  }),
  component: PressReleasesPage,
});
