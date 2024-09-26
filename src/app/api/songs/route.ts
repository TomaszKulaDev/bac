import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Song } from '@/models/Song';

export async function GET() {
  console.log("GET /api/songs: Start");
  try {
    const db = await connectToDatabase();
    console.log("GET /api/songs: Connected to database");
    if (!db) {
      throw new Error("Nie udało się połączyć z bazą danych");
    }
    try {
      const songs = await Song.find().lean();
      console.log("GET /api/songs: Number of songs fetched", songs.length);
      console.log("GET /api/songs: Songs fetched", JSON.stringify(songs));
      return NextResponse.json(songs);
    } catch (dbError) {
      console.error("Błąd podczas pobierania piosenek z bazy danych:", dbError);
      return NextResponse.json(
        { error: "Wystąpił błąd podczas pobierania piosenek z bazy danych", details: dbError instanceof Error ? dbError.message : 'Unknown error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Błąd podczas pobierania piosenek:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas pobierania piosenek", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
