import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  isVerified: boolean;
  verificationToken?: string;
  role: "user" | "admin";
  dancePreferences: {
    styles: string[];
    level: string;
    availability: string;
    location: string;
  };
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastResetTokenRequest: Date,
    dancePreferences: {
      styles: [String],
      level: String,
      availability: String,
      location: String,
    },
  },
  {
    timestamps: true,
    _id: true, // Upewniamy się, że MongoDB automatycznie generuje _id
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
