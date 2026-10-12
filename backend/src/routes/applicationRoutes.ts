import { Router } from "express";
import {
  submitApplication,
  listApplications,
} from "../controllers/applicationController.js";

export const applicationRouter = Router();

applicationRouter.post("/", submitApplication);
applicationRouter.get("/", listApplications);
