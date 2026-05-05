import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

import User from "../models/User.js";
import Property from "../models/Property.js";
import Enquiry from "../models/Enquiry.js";
import Lead from "../models/Lead.js";

const router = express.Router();

// GET ADMIN STATS
router.get("/stats", protect, admin, async (req, res) => {
  try {
    const [users, properties, enquiries, leads] = await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      Enquiry.countDocuments(),
      Lead.countDocuments(),
    ]);

    res.json({ users, properties, enquiries, leads });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});
// GET ALL USERS
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// UPDATE USER ROLE
router.put("/users/:id/role", protect, admin, async (req, res) => {
  try {
    const { role } = req.body;

    if (!["buyer", "seller", "agent", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update role" });
  }
});

// DELETE USER
router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "Admin cannot delete own account" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Property.deleteMany({ owner: req.params.id });
    await Enquiry.deleteMany({ user: req.params.id });
    await user.deleteOne();

    res.json({ message: "User and related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// GET ALL PROPERTIES
router.get("/properties", protect, admin, async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email role")
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

// CREATE PROPERTY AS ADMIN
router.post("/properties", protect, admin, async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner: req.body.owner || req.user._id,
    });

    const populatedProperty = await Property.findById(property._id).populate(
      "owner",
      "name email role"
    );

    res.status(201).json(populatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Failed to create property" });
  }
});

// UPDATE PROPERTY AS ADMIN
router.put("/properties/:id", protect, admin, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("owner", "name email role");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Failed to update property" });
  }
});

// DELETE PROPERTY AS ADMIN
router.delete("/properties/:id", protect, admin, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await Enquiry.deleteMany({ property: req.params.id });
    await property.deleteOne();

    res.json({ message: "Property deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete property" });
  }
});

export default router;