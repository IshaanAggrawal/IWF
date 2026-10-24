import { createFileRoute } from "@tanstack/react-router";
import BrandAssetsPage from "@/Pages/Media/BrandAssetsPage";

export const Route = createFileRoute("/media/brand-assets")({
  head: () => ({
    meta: [
      { title: "Brand Assets & Media Kit | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Official logos, brand guidelines, color palettes, and press kits for journalists, partners, and media collaborators.",
      },
    ],
  }),
  component: BrandAssetsPage,
});
