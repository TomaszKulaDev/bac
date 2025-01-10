// Importowanie wymaganych modułów i typów
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { z } from "zod";

// Schemat walidacji adresu e-mail
const emailSchema = z.string().email("Nieprawidłowy adres email");

// Główna funkcja obsługująca żądanie resetowania hasła
export async function POST(request: Request) {
  try {
    // Łączenie z bazą danych
    await connectToDatabase();

    // Pobieranie adresu e-mail z ciała żądania
    const { email } = await request.json();

    // Walidacja adresu e-mail
    const emailValidationResult = emailSchema.safeParse(email);
    if (!emailValidationResult.success) {
      return NextResponse.json({ message: emailValidationResult.error.errors[0].message }, { status: 400 });
    }

    // Wyszukiwanie użytkownika na podstawie adresu e-mail
    const user = await User.findOne({ email });

    // Sprawdzanie, czy użytkownik został znaleziony
    if (!user) {
      return NextResponse.json({ message: "Nie znaleziono użytkownika z tym adresem e-mail" }, { status: 400 });
    }

    // Sprawdzanie, czy użytkownik jest zweryfikowany
    if (!user.isVerified) {
      return NextResponse.json({
        message: "Konto nie zostało jeszcze zweryfikowane. Sprawdź swoją skrzynkę e-mail.",
      }, { status: 400 });
    }

    // Sprawdzanie, czy link do resetowania hasła został już wysłany
    if (
      user.resetPasswordToken &&
      user.resetPasswordExpires &&
      user.resetPasswordExpires > Date.now()
    ) {
      return NextResponse.json({
        message: "Link do resetowania hasła został już wysłany. Sprawdź swoją skrzynkę e-mail lub spróbuj ponownie później.",
      }, { status: 400 });
    }

    // Generowanie tokena do resetowania hasła
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000 * 24; // Token ważny przez 24 godziny
    user.lastResetTokenRequest = new Date();
    await user.save();

    console.log("User before save:", user);
    await user.save();
    console.log("User after save:", user);
    console.log("Saved reset token:", user.resetPasswordToken);
    console.log("User saved with reset token:", user.resetPasswordToken);

    // Tworzenie URL do resetowania hasła
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.baciata.pl";
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
    return NextResponse.json({ message: "Link do resetowania hasła został wysłany" }, { status: 200 });

    // Dodatkowe logi do sprawdzenia wszystkich użytkowników z tokenami resetowania hasła
    const allUsersWithResetTokens = await User.find({ resetPasswordToken: { $exists: true } }, 'email resetPasswordToken resetPasswordExpires');
    console.log("Wszyscy użytkownicy z tokenami resetowania hasła:", allUsersWithResetTokens);
  } catch (error) {
    console.error("Błąd podczas resetowania hasła:", error);

    if (error instanceof Error) {
      // Obsługa błędów bazy danych
      if (error.name === "MongoError") {
        return NextResponse.json({ message: "Błąd bazy danych. Spróbuj ponownie później." }, { status: 503 });
      // Obsługa błędów walidacji
      } else if (error.name === "ValidationError") {
        return NextResponse.json({ message: "Nieprawidłowe dane wejściowe." }, { status: 400 });
      // Obsługa błędów związanych z wysyłaniem e-maila
      } else if (error.message === "Nodemailer error") {
        return NextResponse.json({
          message: "Nie udało się wysłać e-maila. Spróbuj ponownie później.",
        }, { status: 502 });
      }
    }

    // Obsługa nieoczekiwanych błędów
    return NextResponse.json({
      message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    }, { status: 500 });
  }
}
