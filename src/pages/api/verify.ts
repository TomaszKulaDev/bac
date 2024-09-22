// src/pages/api/verify.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// Główna funkcja obsługująca żądanie weryfikacji
export default async function verifyHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Pobieranie tokena z zapytania
  const { token } = req.query;

  // Sprawdzanie, czy token jest prawidłowy
  if (!token || typeof token !== "string") {
    console.error("Invalid token:", token);
    return res
      .status(400)
      .json({ message: "Token is required and must be a string" });
  }

  try {
    // Łączenie z bazą danych
    await connectToDatabase();
    console.log("Connected to database");

    // Wyszukiwanie użytkownika na podstawie tokena weryfikacyjnego
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

    // Wysyłanie odpowiedzi o pomyślnej weryfikacji
    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    // Obsługa błędów podczas weryfikacji
    console.error("Verification failed: ", error);
    res.status(500).json({ message: "Verification failed", error });
  }
}
