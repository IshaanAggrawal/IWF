import { createFileRoute } from "@tanstack/react-router";
import GalleryPage from "@/Pages/Media/GalleryPage";

export const Route = createFileRoute("/media/gallery")({
  head: () => ({
    meta: [
      { title: "Photo & Video Gallery — Visual Archive | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "High-resolution photos, field recordings, and documentaries highlighting Islah Welfare Foundation's grassroots initiatives in rural India.",
      },
    ],
  }),
  component: GalleryPage,
});
