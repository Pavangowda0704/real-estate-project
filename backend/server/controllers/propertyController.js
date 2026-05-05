import Property from "../models/Property.js";

const canManageProperties = (role) => {
  return role === "agent" || role === "seller" || role === "admin";
};

// CREATE PROPERTY
export const createProperty = async (req, res) => {
  try {
    if (!canManageProperties(req.user.role)) {
      return res.status(403).json({
        message: "Buyers are not allowed to post properties",
      });
    }

    const property = await Property.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROPERTIES
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email role")
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY PROPERTIES
export const getMyProperties = async (req, res) => {
  try {
    if (!canManageProperties(req.user.role)) {
      return res.status(403).json({
        message: "Buyers do not have property management access",
      });
    }

    const properties = await Property.find({ owner: req.user._id })
      .populate("owner", "name email role")
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PROPERTY
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email role"
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res) => {
  try {
    if (!canManageProperties(req.user.role)) {
      return res.status(403).json({
        message: "Buyers are not allowed to edit properties",
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const isOwner = property.owner?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "You can edit only your own properties",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("owner", "name email role");

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROPERTY
export const deleteProperty = async (req, res) => {
  try {
    if (!canManageProperties(req.user.role)) {
      return res.status(403).json({
        message: "Buyers are not allowed to delete properties",
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const isOwner = property.owner?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "You can delete only your own properties",
      });
    }

    await property.deleteOne();

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};