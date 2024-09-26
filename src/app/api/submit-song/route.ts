import { NextResponse } from "next/server";
import { connectToDatabase } from '@/lib/mongodb';
import { Song } from '@/models/Song';

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
    console.log("POST /api/submit-song: Start");
    const { title, artist, youtubeId } = await request.json();
    console.log("POST /api/submit-song: Received data", { title, artist, youtubeId });

    if (!title || !artist || !youtubeId) {
      console.log("POST /api/submit-song: Missing fields");
      return NextResponse.json(
        { message: "Proszę wypełnić wszystkie pola, aby zgłosić utwór" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    console.log("POST /api/submit-song: Connected to database");

    const newSong = new Song({
      title,
      artist,
      youtubeId,
    });

    await newSong.save();
    console.log("POST /api/submit-song: Song saved");

    return NextResponse.json({ message: "Utwór został zgłoszony pomyślnie" });
  } catch (error) {
    console.error("Błąd podczas zgłaszania utworu:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd podczas zgłaszania utworu" },
      { status: 500 }
    );
  }
}
