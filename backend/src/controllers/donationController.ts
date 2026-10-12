import { Request, Response } from "express";
import { Donation } from "../models/Donation.js";
import { Patient } from "../models/Patient.js";
import { Verification } from "../models/Verification.js";
import { generateReceiptNumber } from "../utils/idGenerator.js";

export async function createDonation(req: Request, res: Response): Promise<void> {
  try {
    const {
      donorName,
      donorType,
      email,
      phone,
      countryCode,
      address,
      city,
      state,
      pincode,
      financialType,
      frequency,
      amount,
      taxExemption,
      pan,
      patientSlug,
      paymentMode,
    } = req.body;

    if (!donorName || !email || !phone || !amount || !financialType) {
      res.status(400).json({ success: false, message: "Missing required donation fields" });
      return;
    }

    if (taxExemption && (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan))) {
      res.status(400).json({ success: false, message: "A valid 10-character PAN is required for 80G tax exemption" });
      return;
    }

    const count = await Donation.countDocuments();
    const receiptNo = generateReceiptNumber(count + 1);

    const donation = new Donation({
      receiptNo,
      donorName,
      donorType: donorType || "Individual",
      email,
      phone,
      countryCode: countryCode || "+91",
      address: address || `${city}, ${state} - ${pincode}`,
      city,
      state,
      pincode,
      financialType,
      frequency: frequency || "One Time",
      amount: Number(amount),
      taxExemption: Boolean(taxExemption),
      pan: pan ? pan.toUpperCase() : undefined,
      patientSlug,
      paymentMode: paymentMode || "Online",
      paymentStatus: "Success", // In sandbox/mock or after gateway capture
    });

    await donation.save();

    // If donation was for an urgent patient, increment raisedAmount and donorsCount
    if (patientSlug) {
      await Patient.findOneAndUpdate(
        { slug: patientSlug },
        { $inc: { raisedAmount: Number(amount), donorsCount: 1 } }
      );
    }

    // Auto-create document verification record for this receipt
    await Verification.create({
      documentNo: receiptNo,
      documentType: "donation_receipt",
      title: `80G Donation Receipt - ${financialType}`,
      issuedTo: donorName,
      issueDate: new Date(),
      status: "Verified",
      details: {
        amount: Number(amount),
        pan: pan ? pan.toUpperCase() : undefined,
        financialType,
        receiptNo,
      },
    });

    res.status(201).json({
      success: true,
      message: "Donation recorded successfully",
      receipt: donation,
    });
  } catch (error) {
    console.error("createDonation error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getDonationByReceiptNo(req: Request, res: Response): Promise<void> {
  try {
    const { receiptNo } = req.params;
    const donation = await Donation.findOne({ receiptNo });

    if (!donation) {
      res.status(404).json({ success: false, message: "Donation receipt not found" });
      return;
    }

    res.json({ success: true, receipt: donation });
  } catch (error) {
    console.error("getDonationByReceiptNo error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function listDonations(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [donations, total] = await Promise.all([
      Donation.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Donation.countDocuments(),
    ]);

    res.json({
      success: true,
      data: donations,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("listDonations error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
