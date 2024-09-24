import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { validatePassword } from "@/schemas/passwordSchema";

// Główna funkcja obsługująca żądanie rejestracji użytkownika
export async function POST(request: Request) {
  try {
    // Łączenie z bazą danych
    await connectToDatabase();

    // Pobieranie danych z ciała żądania
    const { email, password, name } = await request.json();

    // Sprawdzanie, czy wszystkie wymagane dane zostały podane
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Imię, email i hasło są wymagane" },
        { status: 400 }
      );
    }

    // Walidacja hasła
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      return NextResponse.json(
        { message: passwordValidationError },
        { status: 400 }
      );
    }

    // Sprawdzanie, czy użytkownik o podanym adresie email już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Użytkownik już istnieje" },
        { status: 409 }
      );
    }

    // Generowanie tokena weryfikacyjnego
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Przycinanie hasła do maksymalnej długości 72 znaków
    const trimmedPassword = password.slice(0, 72);

    // Hashowanie hasła
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    // Tworzenie nowego użytkownika
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      isVerified: false,
    });

    // Zapisywanie nowego użytkownika w bazie danych
    await newUser.save();

    // Konfiguracja transportera do wysyłania e-maili za pomocą Gmaila
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Użytkownik Gmaila
        pass: process.env.GMAIL_PASS, // Hasło do Gmaila
      },
    });

    // Opcje e-maila, który ma zostać wysłany
    const mailOptions = {
      from: "noreply@yourdomain.com", // Nadawca e-maila
      to: newUser.email, // Odbiorca e-maila
      subject: "Witamy w społeczności Baciata! Potwierdź swoje konto", // Temat e-maila
      html: `
        <h1>Witaj ${newUser.name}! 🎉</h1>
        <p>Cieszymy się, że dołączasz do naszej tanecznej społeczności Baciaty! Jesteś o krok od odkrycia świata pełnego rytmu, pasji i nowych przyjaźni.</p>
        <p>Aby rozpocząć swoją przygodę, po prostu kliknij poniższy przycisk:</p>
        <a href="https://www.baciata.pl/verify?token=${verificationToken}" style="background-color: #FF4500; color: white; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; border-radius: 25px; font-weight: bold; font-size: 16px;">Rozpocznij taneczną przygodę!</a>
        <p>Pamiętaj, że link jest ważny przez 24 godziny - ale kto by chciał czekać z taką ekscytującą perspektywą? 😉</p>
        <p>Jeśli masz jakiekolwiek pytania, nasza przyjazna ekipa jest zawsze gotowa do pomocy.</p>
        <p>Nie możemy się doczekać, aby zobaczyć Cię na parkiecie!</p>
        <p>Z tanecznymi pozdrowieniami,<br>Zespół Baciata 💃🕺</p>
      `,
    };

    // Wysyłanie e-maila za pomocą transportera
    await transporter.sendMail(mailOptions);

    // Wysyłanie odpowiedzi o pomyślnej rejestracji użytkownika
    return NextResponse.json(
      { message: "User registered. Please verify your email." },
      { status: 201 }
    );
  } catch (error) {
    // Obsługa błędów podczas rejestracji
    console.error("Registration error:", error);
    if (error instanceof Error) {
      // Obsługa błędów bazy danych
      if (error.name === "MongoError") {
        return NextResponse.json(
          { message: "Błąd bazy danych. Spróbuj ponownie później." },
          { status: 503 }
        );
      // Obsługa błędów walidacji
      } else if (error.name === "ValidationError") {
        return NextResponse.json(
          { message: "Nieprawidłowe dane wejściowe." },
          { status: 400 }
        );
      // Obsługa błędów związanych z duplikatami kluczy
      } else if (error.message.includes("E11000 duplicate key error")) {
        return NextResponse.json(
          { message: "Użytkownik o podanym adresie email już istnieje." },
          { status: 409 }
        );
      }
    }
    // Obsługa nieoczekiwanych błędów
    return NextResponse.json(
      {
        message:
          "Wystąpił nieoczekiwany błąd podczas rejestracji. Spróbuj ponownie później.",
      },
      { status: 500 }
    );
  }
}
