import { Router } from "express";
import {
  createOrderController,
  verifyPaymentController,
} from "../controllers/paymentController.js";

export const paymentRouter = Router();

paymentRouter.post("/create-order", createOrderController);
paymentRouter.post("/verify-payment", verifyPaymentController);
