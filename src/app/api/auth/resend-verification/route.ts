import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Główna funkcja obsługująca żądanie ponownego wysłania e-maila weryfikacyjnego
export async function POST(request: Request) {
  // Pobieranie adresu e-mail z ciała żądania
  const { email } = await request.json();

  // Sprawdzanie, czy adres e-mail został podany
  if (!email) {
    return NextResponse.json({ message: "Adres e-mail jest wymagany" }, { status: 400 });
  }

  try {
    // Łączenie z bazą danych
    await connectToDatabase();

    // Wyszukiwanie użytkownika na podstawie adresu e-mail
    const user = await User.findOne({ email });

    // Sprawdzanie, czy użytkownik został znaleziony
    if (!user) {
      return NextResponse.json({ message: "Użytkownik nie znaleziony" }, { status: 404 });
    }

    // Sprawdzanie, czy użytkownik jest już zweryfikowany
    if (user.isVerified) {
      return NextResponse.json({ message: "Użytkownik jest już zweryfikowany" }, { status: 400 });
    }

    // Generowanie nowego tokena weryfikacyjnego
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    await user.save();

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
      to: user.email, // Odbiorca e-maila
      subject: "Potwierdź swoje konto w Baciata - Czekamy na Ciebie!", // Temat e-maila
      html: `
        <h1>Cześć Tancerko, tancerzu! 💃🕺</h1>
        <p>Ups! Wygląda na to, że jeszcze nie potwierdziłeś swojego konta w Baciata. Nic straconego!</p>
        <p>Kliknij poniższy przycisk, aby dołączyć do naszej roztańczonej społeczności:</p>
        <a href="https://www.baciata.pl/verify?token=${verificationToken}" style="background-color: #FF4500; color: white; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; border-radius: 25px; font-weight: bold; font-size: 16px;">Potwierdź konto i zaczynamy taniec!</a>
        <p>Parkiet czeka, a muzyka gra. Nie możemy się doczekać, aby zobaczyć Twoje pierwsze kroki!</p>
        <p>Do zobaczenia wkrótce,<br>Zespół Baciata 🎵</p>
      `, // Treść e-maila w formacie HTML
    };

    // Wysyłanie e-maila za pomocą transportera
    await transporter.sendMail(mailOptions);

    // Wysyłanie odpowiedzi o pomyślnym wysłaniu e-maila weryfikacyjnego
    return NextResponse.json({ message: "E-mail weryfikacyjny został ponownie wysłany pomyślnie" });
  } catch (error) {
    // Obsługa błędów podczas wysyłania e-maila weryfikacyjnego
    console.error("Błąd ponownego wysyłania e-maila weryfikacyjnego:", error);
    return NextResponse.json({ message: "Nie udało się ponownie wysłać e-maila weryfikacyjnego", error }, { status: 500 });
  }
}
