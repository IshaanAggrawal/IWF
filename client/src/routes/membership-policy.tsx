import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/membership-policy")({
  head: () => ({
    meta: [
      { title: "Membership Policy - Islah Welfare Foundation" },
      { name: "description", content: "Membership principles, rights, categories, responsibilities, and code of conduct for Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="membership-policy" />,
});
