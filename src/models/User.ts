import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string; // upewnij się, że to pole istnieje i jest wymagane
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true }, // upewnij się, że `name` jest wymagane
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
