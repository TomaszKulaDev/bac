import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Song } from '@/models/Song';

export async function GET() {
  console.log("GET /api/songs: Start");
  try {
    const db = await connectToDatabase();
    console.log("GET /api/songs: Connected to database");

    const songs = await Song.find({}).lean();
    console.log("GET /api/songs: Songs fetched", songs);

    return new NextResponse(JSON.stringify(songs), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error("GET /api/songs: Error", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Nie udało się połączyć z bazą danych");
    }

    const { title, artist, youtubeLink } = await request.json();

    if (!title || !artist || !youtubeLink) {
      return NextResponse.json(
        { error: "Wszystkie pola są wymagane" },
        { status: 400 }
      );
    }

    const youtubeId = youtubeLink.split('v=')[1];
    if (!youtubeId) {
      return NextResponse.json(
        { error: "Nieprawidłowy link do YouTube" },
        { status: 400 }
      );
    }

    const newSong = new Song({
      title,
      artist,
      youtubeId,
      createdAt: new Date() // Dodajemy datę utworzenia
    });

    await newSong.save();

    return NextResponse.json({ success: true, message: "Piosenka dodana pomyślnie" });
  } catch (error) {
    console.error("Błąd podczas dodawania piosenki:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas dodawania piosenki" },
      { status: 500 }
    );
  }
}
