import { Router } from "express";
import { donationRouter } from "./donationRoutes.js";
import { memberRouter } from "./memberRoutes.js";
import { patientRouter } from "./patientRoutes.js";
import { applicationRouter } from "./applicationRoutes.js";
import { verificationRouter } from "./verificationRoutes.js";
import { contactRouter } from "./contactRoutes.js";
import { uploadRouter } from "./uploadRoutes.js";
import { paymentRouter } from "./paymentRoutes.js";
import { mediaRouter } from "./mediaRoutes.js";
import {
  createOrderController,
  verifyPaymentController,
} from "../controllers/paymentController.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "ISLAH Backend API",
    time: new Date().toISOString(),
  });
});

// Primary Resources
apiRouter.use("/donations", donationRouter);
apiRouter.use("/members", memberRouter);
apiRouter.use("/patients", patientRouter);
apiRouter.use("/applications", applicationRouter);
apiRouter.use("/verify", verificationRouter);
apiRouter.use("/contact", contactRouter);
apiRouter.use("/upload", uploadRouter);
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/media", mediaRouter);

// Razorpay Direct Route Aliases
apiRouter.post("/create-order", createOrderController);
apiRouter.post("/verify-payment", verifyPaymentController);
