import express from "express";
import {
  createEnquiry,
  getEnquiries,
  getMyEnquiries,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, createEnquiry);

router.get("/", protect, admin, getEnquiries);
router.get("/my", protect, getMyEnquiries);

router.delete("/:id", protect, admin, deleteEnquiry);

export default router;