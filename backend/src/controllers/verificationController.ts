import { Request, Response } from "express";
import { Verification } from "../models/Verification.js";

export async function verifyDocument(req: Request, res: Response): Promise<void> {
  try {
    const rawNo = req.params.documentNo;
    const documentNo = Array.isArray(rawNo) ? rawNo[0] : rawNo;

    if (!documentNo || !documentNo.trim()) {
      res.status(400).json({ success: false, message: "Document number is required" });
      return;
    }

    const cleanNo = documentNo.trim();
    const doc = await Verification.findOne({
      documentNo: { $regex: new RegExp(`^${cleanNo}$`, "i") },
    });

    if (!doc) {
      res.status(404).json({
        success: false,
        verified: false,
        message: "No matching document found in the ISLAH registry",
      });
      return;
    }

    res.json({
      success: true,
      verified: doc.status === "Verified",
      data: {
        documentNo: doc.documentNo,
        documentType: doc.documentType,
        title: doc.title,
        issuedTo: doc.issuedTo,
        issuer: doc.issuer,
        issueDate: doc.issueDate.toISOString().split("T")[0],
        validTill: doc.validTill ? doc.validTill.toISOString().split("T")[0] : null,
        status: doc.status,
        details: doc.details,
      },
    });
  } catch (error) {
    console.error("verifyDocument error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
