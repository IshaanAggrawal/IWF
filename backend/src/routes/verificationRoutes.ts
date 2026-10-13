import { Router } from "express";
import { verifyDocument } from "../controllers/verificationController.js";

export const verificationRouter = Router();

verificationRouter.get("/:documentNo", verifyDocument);
