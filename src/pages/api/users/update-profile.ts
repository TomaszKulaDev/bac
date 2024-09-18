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
  console.log("Handler invoked");
  const session = await getServerSession(req, res, authOptions);
  console.log("Session:", session);

  if (!session) {
    console.log("User not authenticated");
    return res.status(401).json({ message: "Nie jesteś zalogowany" });
  }

  await connectToDatabase();
  console.log("Connected to database");

  if (req.method === "GET") {
    try {
      const user = await User.findOne({ email: session.user?.email });
      console.log("User details retrieved:", user);
      if (!user) {
        return res.status(404).json({ message: "Nie znaleziono użytkownika" });
      }
      return res.status(200).json({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({
        message: "Wystąpił błąd podczas pobierania danych użytkownika",
      });
    }
  } else if (req.method === "POST") {
    try {
      await connectToDatabase();

      const validationResult = updateProfileSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res
          .status(400)
          .json({ message: validationResult.error.errors[0].message });
      }

      const updatedUser = await User.findOneAndUpdate(
        { email: session.user?.email },
        { $set: validationResult.data },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Nie znaleziono użytkownika" });
      }

      return res.status(200).json({
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      });
    } catch (error) {
      console.error("Profile update error:", error);
      return res.status(500).json({
        message:
          "Nie udało się zaktualizować profilu. Spróbuj ponownie później.",
      });
    }
  } else {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }
}
