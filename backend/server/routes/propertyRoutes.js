import express from "express";
import {
  createProperty,
  getProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/my", protect, getMyProperties);
router.get("/:id", getPropertyById);

router.post("/", protect, createProperty);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

export default router;