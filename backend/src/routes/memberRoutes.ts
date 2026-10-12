import { Router } from "express";
import {
  registerMember,
  checkMemberStatus,
  listMembers,
} from "../controllers/memberController.js";

export const memberRouter = Router();

memberRouter.post("/", registerMember);
memberRouter.get("/", listMembers);
memberRouter.get("/status/:memberNo", checkMemberStatus);
