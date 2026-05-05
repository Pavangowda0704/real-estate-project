import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
    phone: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);