import { Router } from "express";
import {
  submitApplication,
  listApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

export const applicationRouter = Router();

applicationRouter.post("/", submitApplication);
applicationRouter.get("/", listApplications);
applicationRouter.patch("/:id/status", updateApplicationStatus);

