import { Request, Response } from "express";
import { Contact } from "../models/Contact.js";

export async function submitContact(req: Request, res: Response): Promise<void> {
  try {
    const {
      name,
      email,
      phone,
      countryCode,
      subject,
      message,
      source,
      enquiryType,
      cityDistrict,
      state,
      pinCode,
      preferredContactMethod,
      regionalOfficeTarget,
      referenceNumber,
      metadata,
    } = req.body;

    if (!name || !email || !phone || !message) {
      res.status(400).json({ success: false, message: "Name, email, phone and message are required" });
      return;
    }

    const contact = new Contact({
      name,
      email,
      phone,
      countryCode: countryCode || "+91",
      subject: subject || enquiryType || "General Enquiry",
      message,
      enquiryType,
      cityDistrict,
      state,
      pinCode,
      preferredContactMethod,
      regionalOfficeTarget,
      referenceNumber,
      source: source || "Contact Page",
      metadata: metadata || {},
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received. Our team will get back to you shortly.",
      contactId: contact._id,
      referenceNumber: contact.referenceNumber,
    });
  } catch (error) {
    console.error("submitContact error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
