import { createFileRoute } from "@tanstack/react-router";
import PatientProfilePage from "@/Pages/Healthcare/PatientProfilePage";

export const Route = createFileRoute("/patients/$patientSlug")({
  component: PatientProfilePage,
});
