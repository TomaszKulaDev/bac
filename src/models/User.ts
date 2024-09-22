import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  isVerified: boolean;
  verificationToken?: string;
  provider?: string;
  role: "user" | "admin";
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    isVerified: { type: Boolean, default: false },
    googleId: { type: String }, // Dodaj to pole
    provider: { type: String }, // Dodaj to pole, jeśli jeszcze nie istnieje
    image: { type: String },
    verificationToken: { type: String },
  },
  {
    timestamps: true,
    _id: true, // Upewniamy się, że MongoDB automatycznie generuje _id
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
