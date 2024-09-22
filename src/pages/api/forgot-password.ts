// src/pages/api/forgot-password.ts

// Importowanie wymaganych modułów i typów
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { z } from "zod";

// Schemat walidacji adresu e-mail
const emailSchema = z.string().email("Nieprawidłowy adres email");

// Główna funkcja obsługująca żądanie resetowania hasła
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Sprawdzanie, czy metoda żądania to POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  try {
    // Łączenie z bazą danych
    await connectToDatabase();

    // Pobieranie adresu e-mail z ciała żądania
    const { email } = req.body;

    // Walidacja adresu e-mail
    const emailValidationResult = emailSchema.safeParse(email);
    if (!emailValidationResult.success) {
      return res.status(400).json({ message: emailValidationResult.error.errors[0].message });
    }

    // Wyszukiwanie użytkownika na podstawie adresu e-mail
    const user = await User.findOne({ email });

    // Sprawdzanie, czy użytkownik został znaleziony
    if (!user) {
      return res
        .status(400)
        .json({ message: "Nie znaleziono użytkownika z tym adresem e-mail" });
    }

    // Sprawdzanie, czy użytkownik jest zweryfikowany
    if (!user.isVerified) {
      return res.status(400).json({
        message:
          "Konto nie zostało jeszcze zweryfikowane. Sprawdź swoją skrzynkę e-mail.",
      });
    }

    // Sprawdzanie, czy link do resetowania hasła został już wysłany
    if (
      user.resetPasswordToken &&
      user.resetPasswordExpires &&
      user.resetPasswordExpires > Date.now()
    ) {
      return res.status(400).json({
        message:
          "Link do resetowania hasła został już wysłany. Sprawdź swoją skrzynkę e-mail lub spróbuj ponownie później.",
      });
    }

    // Generowanie tokena do resetowania hasła
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000 * 24; // Token ważny przez 24 godziny
    await user.save();

    console.log("User before save:", user);
    await user.save();
    console.log("User after save:", user);
    console.log("Saved reset token:", user.resetPasswordToken);

    // Tworzenie URL do resetowania hasła
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://bac-eta.vercel.app";
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    console.log("Base URL:", baseUrl);
    console.log("Reset URL:", resetUrl);

    // Konfiguracja transportera do wysyłania e-maili za pomocą Gmaila
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Opcje e-maila, który ma zostać wysłany
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Resetowanie hasła",
      html: `
        <h1>Resetowanie hasła</h1>
        <p>Kliknij poniższy link, aby zresetować swoje hasło:</p>
        <a href="${resetUrl}">Resetuj hasło</a>
        <p>Link wygaśnie za godzinę.</p>
        <p>Jeśli nie prosiłeś o reset hasła, zignoruj tę wiadomość.</p>
      `,
    };

    // Wysyłanie e-maila z linkiem do resetowania hasła
    await transporter.sendMail(mailOptions);

    // Wysyłanie odpowiedzi o pomyślnym wysłaniu e-maila
    res
      .status(200)
      .json({ message: "Link do resetowania hasła został wysłany" });
  } catch (error) {
    console.error("Błąd podczas resetowania hasła:", error);

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
      // Obsługa błędów związanych z wysyłaniem e-maila
      } else if (error.message === "Nodemailer error") {
        return res
          .status(502)
          .json({
            message: "Nie udało się wysłać e-maila. Spróbuj ponownie później.",
          });
      }
    }

    // Obsługa nieoczekiwanych błędów
    res
      .status(500)
      .json({
        message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
      });
  }
}
