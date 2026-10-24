import { createFileRoute } from "@tanstack/react-router";
import SuccessStoriesPage from "@/Pages/Media/SuccessStoriesPage";

export const Route = createFileRoute("/media/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — Lives Transformed | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Read authentic first-person accounts and real-life stories of change from beneficiaries, students, women artisans, and patients supported by Islah.",
      },
    ],
  }),
  component: SuccessStoriesPage,
});
