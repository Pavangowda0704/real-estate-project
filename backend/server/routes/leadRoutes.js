import express from "express";
import {
  createLead,
  getLeads,
  updateLeadStatus,
  deleteLead,
} from "../controllers/leadController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createLead);

router.get("/", protect, admin, getLeads);
router.put("/:id/status", protect, admin, updateLeadStatus);
router.delete("/:id", protect, admin, deleteLead);

export default router;