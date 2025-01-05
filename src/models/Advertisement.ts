import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Praktis", "Social", "Kurs", "Inne"],
    },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      place: { type: String, required: true },
    },
    author: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      image: String,
      level: { type: String, required: true },
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

// Dodajmy middleware do logowania przy zapisie
advertisementSchema.pre("save", function (next) {
  console.log("Saving advertisement with author:", this.author);
  next();
});

export const Advertisement =
  mongoose.models.Advertisement ||
  mongoose.model("Advertisement", advertisementSchema);
