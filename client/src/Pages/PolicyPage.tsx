import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";
import type { ExtendedPolicySlug } from "@/content/policyContent";

export default function PolicyPage({ slug }: { slug: string }) {
  return <GenericPolicyPage slug={slug as ExtendedPolicySlug} />;
}
