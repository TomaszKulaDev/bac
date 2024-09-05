import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectToDatabase from "@/lib/mongodb";
import { authMiddleware } from "@/lib/authMiddleware";
import User, { IUser } from "@/models/User";
import mongoose from "mongoose";
import { z } from "zod";

interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string;
}

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Imię jest wymagane")
    .max(50, "Imię nie może być dłuższe niż 50 znaków"),
  email: z.string().email("Nieprawidłowy adres email"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  const session = await getServerSession(req, res, authOptions);
  console.log("Session:", session);
  if (!session) {
    return res.status(401).json({ message: "Nie jesteś zalogowany" });
  }

  try {
    await connectToDatabase();

    const validationResult = updateProfileSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.errors[0].message });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: validationResult.data },
      { new: true, runValidators: true }
    ).lean() as IUser & { _id: mongoose.Types.ObjectId };

    if (!updatedUser) {
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });
    }

    res.status(200).json({
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      message: "Nie udało się zaktualizować profilu. Spróbuj ponownie później.",
    });
  }
}
