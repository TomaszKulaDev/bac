import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Funkcja walidacyjna do sprawdzania poprawności linku do YouTube
function isValidYoutubeLink(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
}

// Dodatkowe funkcje walidacyjne
function isValidLength(
  str: string,
  minLength: number,
  maxLength: number
): boolean {
  return str.length >= minLength && str.length <= maxLength;
}

function isUniqueSubmission(title: string, artist: string): Promise<boolean> {
  // Tutaj dodaj logikę sprawdzania w bazie danych
  return Promise.resolve(true); // Tymczasowo zawsze zwraca true
}

function isWithinSubmissionLimit(userId: string): Promise<boolean> {
  // Tutaj dodaj logikę sprawdzania limitu zgłoszeń
  return Promise.resolve(true); // Tymczasowo zawsze zwraca true
}

function containsProfanity(str: string): boolean {
  const profanityList = ["wulgaryzm1", "wulgaryzm2"]; // Rozszerz tę listę
  return profanityList.some((word) => str.toLowerCase().includes(word));
}

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
    const { title, artist, youtubeLink, userId } = req.body;

    if (!title || !artist || !youtubeLink) {
      return res
        .status(400)
        .json({ message: "Proszę wypełnić wszystkie pola, aby zgłosić utwór" });
    }

    if (!isValidLength(title, 1, 100) || !isValidLength(artist, 1, 100)) {
      return res
        .status(400)
        .json({
          message:
            "Tytuł i wykonawca powinny mieć od 1 do 100 znaków. Proszę sprawdzić i spróbować ponownie.",
        });
    }

    if (!isValidYoutubeLink(youtubeLink)) {
      return res
        .status(400)
        .json({
          message:
            "Link do YouTube jest nieprawidłowy. Proszę sprawdzić i spróbować ponownie.",
        });
    }

    if (containsProfanity(title) || containsProfanity(artist)) {
      return res
        .status(400)
        .json({
          message:
            "Tytuł lub wykonawca zawiera słowa, które nie są dozwolone. Proszę spróbować ponownie z innymi słowami.",
        });
    }

    if (!(await isUniqueSubmission(title, artist))) {
      return res
        .status(400)
        .json({
          message:
            "Ten utwór został już zgłoszony. Dziękujemy za Twoje zaangażowanie! Może spróbujesz zgłosić inny utwór?",
        });
    }

    if (!(await isWithinSubmissionLimit(userId))) {
      return res
        .status(400)
        .json({
          message: "Przekroczyłeś limit zgłoszeń. Spróbuj ponownie później.",
        });
    }

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
