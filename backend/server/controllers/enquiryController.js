import Enquiry from "../models/Enquiry.js";

// CREATE ENQUIRY
export const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create({
      property: req.body.property,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      user: req.user?._id,
    });

    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ENQUIRIES - ADMIN
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate("property", "title location price owner")
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ENQUIRIES FOR AGENT/OWNER PROPERTIES
export const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate("property", "title location price owner")
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    const myEnquiries = enquiries.filter(
      (e) => e.property?.owner?.toString() === req.user._id.toString()
    );

    res.json(myEnquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};

// DELETE ENQUIRY - ADMIN
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    await enquiry.deleteOne();

    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};