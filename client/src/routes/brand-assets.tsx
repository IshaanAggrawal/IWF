import { createFileRoute } from "@tanstack/react-router";
import BrandAssetsPage from "@/Pages/Media/BrandAssetsPage";

export const Route = createFileRoute("/brand-assets")({
  head: () => ({
    meta: [
      { title: "Official Brand Assets & Guidelines — Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Official logos, brand identity guidelines, vectors and brand packs of Islah Welfare Foundation.",
      },
    ],
  }),
  component: BrandAssetsPage,
});
