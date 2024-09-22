// src/pages/api/reset-password.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { validatePassword } from "@/schemas/passwordSchema";

// Główna funkcja obsługująca żądanie resetowania hasła
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Otrzymany token:", req.query.token);
  console.log("Otrzymane hasło:", req.body.password);

  // Sprawdzanie, czy metoda żądania to POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  try {
    // Łączenie z bazą danych
    await connectToDatabase();
    console.log("Connected to database");

    // Pobieranie tokena i hasła z zapytania
    const { token } = req.query;
    const { password } = req.body;

    // Sprawdzanie, czy token jest prawidłowy
    if (!token || typeof token !== "string") {
      return res
        .status(400)
        .json({ message: "Token jest wymagany i musi być ciągiem znaków" });
    }

    // Sprawdzanie, czy hasło zostało podane
    if (!password) {
      return res.status(400).json({ message: "Hasło jest wymagane" });
    }

    // Walidacja hasła
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      return res.status(400).json({ message: passwordValidationError });
    }

    // Znalezienie użytkownika na podstawie tokenu
    const user = await User.findOne({
      resetPasswordToken: token,
    });
    console.log("Search criteria:", { resetPasswordToken: token });
    console.log("Found user:", user);

    // Sprawdzanie, czy użytkownik został znaleziony
    if (!user) {
      console.log("Token not found");
      return res
        .status(400)
        .json({ message: "Nieprawidłowy token" });
    }

    if (user.resetPasswordExpires < Date.now()) {
      console.log("Token expired");
      return res
        .status(400)
        .json({ message: "Token wygasł" });
    }

    // Hashowanie nowego hasła
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Usunięcie tokenu po użyciu
    user.resetPasswordExpires = undefined; // Usunięcie daty ważności tokenu
    await user.save();

    console.log("Password reset successfully for user:", user.email);
    res.status(200).json({ message: "Hasło zostało pomyślnie zresetowane" });
  } catch (error) {
    console.error("Reset password error:", error);
    if (error instanceof Error) {
      // Obsługa błędów bazy danych
      if (error.name === "MongoError") {
        return res
          .status(503)
          .json({ message: "Błąd bazy danych. Spróbuj ponownie później." });
        // Obsługa błędów walidacji
      } else if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Nieprawidłowe dane wejściowe." });
        // Obsługa błędów związanych z duplikatami kluczy
      } else if (error.message.includes("E11000 duplicate key error")) {
        return res
          .status(409)
          .json({ message: "Konflikt danych. Spróbuj ponownie później." });
      }
    }
    // Ogólna obsługa błędów
    res.status(500).json({
      message: "Nie udało się zresetować hasła. Spróbuj ponownie później.",
    });
  }
}
