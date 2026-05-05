import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["Buy", "Rent"], required: true },
    propertyType: String,
    price: { type: String, required: true },
    location: { type: String, required: true },
    bhk: String,
    area: String,
    image: String,
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);