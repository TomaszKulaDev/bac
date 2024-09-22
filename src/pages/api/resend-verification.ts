import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Główna funkcja obsługująca żądanie ponownego wysłania e-maila weryfikacyjnego
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Sprawdzanie, czy metoda żądania to POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  // Pobieranie adresu e-mail z ciała żądania
  const { email } = req.body;

  // Sprawdzanie, czy adres e-mail został podany
  if (!email) {
    return res.status(400).json({ message: "Adres e-mail jest wymagany" });
  }

  try {
    // Łączenie z bazą danych
    await connectToDatabase();

    // Wyszukiwanie użytkownika na podstawie adresu e-mail
    const user = await User.findOne({ email });

    // Sprawdzanie, czy użytkownik został znaleziony
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    // Sprawdzanie, czy użytkownik jest już zweryfikowany
    if (user.isVerified) {
      return res.status(400).json({ message: "Użytkownik jest już zweryfikowany" });
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
    res.status(200).json({ message: "E-mail weryfikacyjny został ponownie wysłany pomyślnie" });
  } catch (error) {
    // Obsługa błędów podczas wysyłania e-maila weryfikacyjnego
    console.error("Błąd ponownego wysyłania e-maila weryfikacyjnego:", error);
    res
      .status(500)
      .json({ message: "Nie udało się ponownie wysłać e-maila weryfikacyjnego", error });
  }
}
