// src/models/User.ts

import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  isVerified: boolean; // Nowe pole: status weryfikacji konta
  verificationToken?: string; // Nowe pole: token weryfikacyjny, opcjonalny
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Domyślnie konto jest niezweryfikowane
  verificationToken: { type: String, required: false }, // Token weryfikacyjny, który może być pusty po weryfikacji
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
