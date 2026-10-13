import { Router } from "express";
import {
  listPatients,
  getPatientBySlug,
  createPatient,
} from "../controllers/patientController.js";

export const patientRouter = Router();

patientRouter.get("/", listPatients);
patientRouter.get("/:slug", getPatientBySlug);
patientRouter.post("/", createPatient);
