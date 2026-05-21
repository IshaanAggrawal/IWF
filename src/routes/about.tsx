import { createFileRoute } from "@tanstack/react-router";
import OverviewPage from "@/Pages/AboutPage/OverviewPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Overview | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Learn about Islah Welfare Foundation — a public charitable trust working for socio-economic development through education, healthcare, women empowerment and rural development.",
      },
    ],
  }),
  component: OverviewPage,
});
