import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    purpose: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
    },
    propertyType: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);