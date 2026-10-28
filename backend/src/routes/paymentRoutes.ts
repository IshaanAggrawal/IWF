import { Router } from "express";
import {
  createOrderController,
  verifyPaymentController,
  handleWebhookController,
} from "../controllers/paymentController.js";

export const paymentRouter = Router();

paymentRouter.post("/create-order", createOrderController);
paymentRouter.post("/verify-payment", verifyPaymentController);
paymentRouter.post("/webhook", handleWebhookController);

