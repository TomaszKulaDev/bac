import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Song from '@/models/Song';
import { connectToDatabase } from '@/lib/mongodb';

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
export async function POST(request: Request) {
  try {
    const { title, artist, youtubeLink, userId } = await request.json();

    if (!title || !artist || !youtubeLink) {
      return NextResponse.json(
        { message: "Proszę wypełnić wszystkie pola, aby zgłosić utwór" },
        { status: 400 }
      );
    }

    if (!isValidLength(title, 1, 100) || !isValidLength(artist, 1, 100)) {
      return NextResponse.json(
        {
          message:
            "Tytuł i wykonawca powinny mieć od 1 do 100 znaków. Proszę sprawdzić i spróbować ponownie.",
        },
        { status: 400 }
      );
    }

    if (!isValidYoutubeLink(youtubeLink)) {
      return NextResponse.json(
        {
          message:
            "Link do YouTube jest nieprawidłowy. Proszę sprawdzić i spróbować ponownie.",
        },
        { status: 400 }
      );
    }

    if (containsProfanity(title) || containsProfanity(artist)) {
      return NextResponse.json(
        {
          message:
            "Tytuł lub wykonawca zawiera słowa, które nie są dozwolone. Proszę spróbować ponownie z innymi słowami.",
        },
        { status: 400 }
      );
    }

    if (!(await isUniqueSubmission(title, artist))) {
      return NextResponse.json(
        {
          message:
            "Ten utwór został już zgłoszony. Dziękujemy za Twoje zaangażowanie! Może spróbujesz zgłosić inny utwór?",
        },
        { status: 400 }
      );
    }

    if (!(await isWithinSubmissionLimit(userId))) {
      return NextResponse.json(
        {
          message: "Przekroczyłeś limit zgłoszeń. Spróbuj ponownie później.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newSong = new Song({
      title,
      artist,
      youtubeId: extractYoutubeId(youtubeLink),
    });

    await newSong.save();

    return NextResponse.json({ message: "Utwór został pomyślnie dodany" }, { status: 201 });
  } catch (error) {
    console.error("Błąd podczas dodawania utworu:", error);
    return NextResponse.json({ message: "Wystąpił błąd podczas dodawania utworu" }, { status: 500 });
  }
}

function extractYoutubeId(url: string): string {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}
