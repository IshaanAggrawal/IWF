import { Request, Response } from "express";
import { Application } from "../models/Application.js";

export async function submitApplication(req: Request, res: Response): Promise<void> {
  try {
    const {
      type,
      fullName,
      email,
      phone,
      countryCode,
      city,
      state,
      organization,
      selectedSectors,
      subclassifications,
      message,
      formData,
    } = req.body;

    if (!type || !fullName || !email || !phone) {
      res.status(400).json({ success: false, message: "Type, Full Name, Email, and Phone are required" });
      return;
    }

    const application = new Application({
      type,
      fullName,
      email,
      phone,
      countryCode: countryCode || "+91",
      city,
      state,
      organization,
      selectedSectors: selectedSectors || [],
      subclassifications: subclassifications || [],
      message,
      formData: formData || {},
    });

    await application.save();

    const shortId = application._id.toString().slice(-6).toUpperCase();
    const formattedAppId = `ISLAH-${type.toUpperCase().slice(0, 3)}-${new Date().getFullYear()}-${shortId}`;

    res.status(201).json({
      success: true,
      message: `Your ${type} application has been submitted successfully. Our team will review and get in touch with you.`,
      applicationId: formattedAppId,
      id: application._id,
    });
  } catch (error) {
    console.error("submitApplication error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function listApplications(req: Request, res: Response): Promise<void> {
  try {
    const { type, status } = req.query;
    const query: Record<string, any> = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error("listApplications error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function updateApplicationStatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status, reviewNotes } = req.body;

    const validStatuses = [
      "Submitted",
      "Under Review",
      "More Information Required",
      "Interview Scheduled",
      "Approved",
      "Rejected",
      "Withdrawn",
    ];

    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
      return;
    }

    const application = await Application.findByIdAndUpdate(
      id,
      {
        status,
        ...(reviewNotes ? { "formData.reviewNotes": reviewNotes } : {}),
      },
      { new: true }
    );

    if (!application) {
      res.status(404).json({ success: false, message: "Application not found" });
      return;
    }

    res.json({
      success: true,
      message: `Application status updated to ${status}`,
      application,
    });
  } catch (error) {
    console.error("updateApplicationStatus error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

