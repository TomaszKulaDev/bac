// src/models/User.ts

import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string; // Nowe pole: token resetu hasła
  resetPasswordExpires?: Date; // Nowe pole: data wygaśnięcia tokenu resetującego
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, required: false },
  resetPasswordToken: { type: String, required: false }, // Dodajemy token resetu hasła
  resetPasswordExpires: { type: Date, required: false }, // Dodajemy datę wygaśnięcia tokenu
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
