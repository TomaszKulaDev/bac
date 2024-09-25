import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Song from '@/models/Song';
import { connectToDatabase } from '@/lib/mongodb';

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
  // Tutaj dodaj logikę sprawdzania limitu zgłoszeń.
  return Promise.resolve(true); // Tymczasowo zawsze zwraca true
}

function containsProfanity(str: string): boolean {
  const profanityList = ["wulgaryzm1", "wulgaryzm2"]; // Rozszerz tę listę
  return profanityList.some((word) => str.toLowerCase().includes(word));
}

export async function POST(request: Request) {
  try {
    const { title, artist, youtubeId, userId } = await request.json();

    if (!title || !artist || !youtubeId) {
      return NextResponse.json(
        { message: "Proszę wypełnić wszystkie pola, aby zgłosić utwór" },
        { status: 400 }
      );
    }

    // Reszta walidacji pozostaje bez zmian

    await connectToDatabase();

    const newSong = new Song({
      title,
      artist,
      youtubeId,
      userId,
      status: "pending"
    });

    await newSong.save();

    console.log("Otrzymane dane:", { title, artist, youtubeId, userId });
    console.log("Nowy utwór zapisany:", newSong);

    return NextResponse.json({ message: "Utwór został pomyślnie dodany", song: newSong }, { status: 201 });
  } catch (error) {
    console.error("Błąd podczas dodawania utworu:", error);
    return NextResponse.json({ message: "Wystąpił błąd podczas dodawania utworu", error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?([a-zA-Z0-9_-]{11})/i,
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
