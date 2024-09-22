import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Główna funkcja obsługująca żądanie zgłoszenia utworu
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Sprawdzanie, czy metoda żądania to POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda niedozwolona" });
  }

  try {
    // Pobieranie danych z ciała żądania
    const { title, artist, youtubeLink } = req.body;

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
      from: process.env.GMAIL_USER, // Nadawca e-maila
      to: "baciatapl@gmail.com", // Odbiorca e-maila
      subject: "Nowe zgłoszenie utworu", // Temat e-maila
      html: `
        <h1>Nowy utwór został zgłoszony</h1>
        <p><strong>Tytuł:</strong> ${title}</p>
        <p><strong>Wykonawca:</strong> ${artist}</p>
        <p><strong>Link do YouTube:</strong> <a href="${youtubeLink}">${youtubeLink}</a></p>
      `, // Treść e-maila w formacie HTML
    };

    // Wysyłanie e-maila za pomocą transportera
    await transporter.sendMail(mailOptions);

    // Wysyłanie odpowiedzi o pomyślnym wysłaniu e-maila
    res.status(200).json({ message: "E-mail został wysłany pomyślnie" });
  } catch (error) {
    // Obsługa błędów podczas wysyłania e-maila
    console.error("Błąd wysyłania e-maila:", error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas wysyłania e-maila" });
  }
}
