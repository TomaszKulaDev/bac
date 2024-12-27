import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Praktis", "Social", "Kurs", "Inne"],
    },
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      place: { type: String, required: true },
    },
    author: {
      name: { type: String, required: true },
      level: {
        type: String,
        enum: ["Początkujący", "Średniozaawansowany", "Zaawansowany"],
      },
      avatar: { type: String },
    },
    description: {
      type: String,
      required: true,
      maxLength: 255,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const Advertisement =
  mongoose.models.Advertisement ||
  mongoose.model("Advertisement", advertisementSchema);
