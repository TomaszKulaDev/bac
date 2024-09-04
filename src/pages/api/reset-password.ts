// src/pages/api/reset-password.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Token received:", req.query.token);
  console.log("Password received:", req.body.password);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  try {
    await connectToDatabase();
    console.log("Connected to database");

    const { token } = req.query;
    const { password } = req.body;

    if (!token || typeof token !== "string") {
      return res
        .status(400)
        .json({ message: "Token jest wymagany i musi być ciągiem znaków" });
    }

    if (!password) {
      return res.status(400).json({ message: "Hasło jest wymagane" });
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      !(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) ||
      password.length < 6 ||
      password.length > 72
    ) {
      return res.status(400).json({
        message:
          "Hasło musi mieć od 6 do 72 znaków i zawierać duże i małe litery, cyfry oraz znaki specjalne",
      });
    }

    // Znalezienie użytkownika na podstawie tokenu
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Sprawdzenie czy token nie wygasł
    });
    console.log("Found user:", user);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Nieprawidłowy lub wygasły token" });
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
      if (error.name === "MongoError") {
        return res
          .status(503)
          .json({ message: "Błąd bazy danych. Spróbuj ponownie później." });
      } else if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Nieprawidłowe dane wejściowe." });
      } else if (error.message.includes("E11000 duplicate key error")) {
        return res
          .status(409)
          .json({ message: "Konflikt danych. Spróbuj ponownie później." });
      }
    }
    res.status(500).json({
      message: "Nie udało się zresetować hasła. Spróbuj ponownie później.",
    });
  }
}
