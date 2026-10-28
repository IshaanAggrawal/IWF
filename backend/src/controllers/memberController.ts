import { Request, Response } from "express";
import { Member, MemberCategory } from "../models/Member.js";
import { Verification } from "../models/Verification.js";
import { generateMemberNumber, generateReceiptNumber } from "../utils/idGenerator.js";
import { Donation } from "../models/Donation.js";

const CATEGORY_FEE_MAP: Record<MemberCategory, number> = {
  Community: 2500,
  Contributing: 4000,
  Patron: 6000,
  Blue: 2500,
  Yellow: 1000,
  Green: 500,
};

const CATEGORY_CODE_MAP: Record<MemberCategory, string> = {
  Community: "CM",
  Contributing: "CT",
  Patron: "PT",
  Blue: "BL",
  Yellow: "YL",
  Green: "GR",
};

export async function registerMember(req: Request, res: Response): Promise<void> {
  try {
    const {
      name,
      fullName,
      fatherName,
      category,
      email,
      phone,
      mobile,
      countryCode,
      state,
      district,
      address,
      pincode,
      membershipPeriod,
      paymentMode,
      transactionId,
      paymentDate,
      consentDisplay,
      photoUrl,
      metadata,
    } = req.body;

    const memberName = (fullName || name || "").trim();
    const memberPhone = (mobile || phone || "").trim();

    if (!memberName || !category || !email || !memberPhone || !state || !district) {
      res.status(400).json({ success: false, message: "Missing required membership fields" });
      return;
    }

    const catKey = category as MemberCategory;
    const baseFee = CATEGORY_FEE_MAP[catKey] || 2500;
    const periodMultiplier = Number(membershipPeriod) === 2 ? 2 : 1;
    const annualFee = baseFee * periodMultiplier;
    const catCode = CATEGORY_CODE_MAP[catKey] || "MEM";

    const count = await Member.countDocuments({ category });
    const memberNo = generateMemberNumber(catCode, count + 1);

    const donationCount = await Donation.countDocuments();
    const receiptNo = generateReceiptNumber(donationCount + 1);

    const validFrom = new Date();
    const validTill = new Date();
    validTill.setFullYear(validTill.getFullYear() + periodMultiplier);

    const member = new Member({
      memberNo,
      name: memberName,
      fatherName,
      category,
      annualFee,
      membershipPeriod: periodMultiplier,
      email: email.trim(),
      phone: memberPhone,
      countryCode: countryCode || "+91",
      state,
      district,
      address,
      pincode,
      paymentMode: paymentMode || "UPI",
      transactionId,
      paymentDate,
      consentDisplay,
      photoUrl,
      status: "Active",
      validFrom,
      validTill,
      receiptNo,
      metadata: metadata || {},
    });

    await member.save();

    // Auto-create document verification for Membership Card
    await Verification.create({
      documentNo: memberNo,
      documentType: "membership_certificate",
      title: `Official Membership Certificate - ${category}`,
      issuedTo: name,
      issueDate: validFrom,
      validTill: validTill,
      status: "Verified",
      details: {
        memberNo,
        category,
        district,
        state,
        receiptNo,
      },
    });

    res.status(201).json({
      success: true,
      message: "Membership created successfully",
      member,
    });
  } catch (error) {
    console.error("registerMember error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function checkMemberStatus(req: Request, res: Response): Promise<void> {
  try {
    const { memberNo } = req.params;
    const member = await Member.findOne({
      memberNo: { $regex: new RegExp(`^${memberNo}$`, "i") },
    });

    if (!member) {
      res.status(404).json({ success: false, message: "Membership ID not found" });
      return;
    }

    const now = new Date();
    const isExpired = member.validTill < now;
    const effectiveStatus = isExpired ? "Expired" : member.status;

    res.json({
      success: true,
      member: {
        id: member.memberNo,
        name: member.name,
        category: member.category,
        state: member.state,
        district: member.district,
        status: effectiveStatus,
        validTill: member.validTill.toISOString().split("T")[0],
        joined: member.validFrom.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("checkMemberStatus error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function listMembers(req: Request, res: Response): Promise<void> {
  try {
    const { category, state, status, search } = req.query;
    const query: Record<string, any> = {};

    if (category) query.category = category;
    if (state) query.state = state;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: "i" } },
        { memberNo: { $regex: search as string, $options: "i" } },
        { district: { $regex: search as string, $options: "i" } },
      ];
    }

    const members = await Member.find(query).sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, count: members.length, data: members });
  } catch (error) {
    console.error("listMembers error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
