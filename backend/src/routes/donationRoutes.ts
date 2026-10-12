import { Router } from "express";
import {
  createDonation,
  getDonationByReceiptNo,
  listDonations,
} from "../controllers/donationController.js";

export const donationRouter = Router();

donationRouter.post("/", createDonation);
donationRouter.get("/", listDonations);
donationRouter.get("/:receiptNo", getDonationByReceiptNo);
