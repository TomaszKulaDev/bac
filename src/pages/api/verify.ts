// src/pages/api/verify.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export default async function verifyHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    console.error("Invalid token:", token);
    return res
      .status(400)
      .json({ message: "Token is required and must be a string" });
  }

  try {
    await connectToDatabase();
    console.log("Connected to database");

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      console.error("User not found or token expired:", token);
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Aktualizacja statusu użytkownika na zweryfikowany
    user.isVerified = true;
    user.verificationToken = undefined; // Usuwamy token po weryfikacji
    await user.save();
    console.log("User verified successfully:", user.email);

    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.error("Verification failed: ", error);
    res.status(500).json({ message: "Verification failed", error });
  }
}
