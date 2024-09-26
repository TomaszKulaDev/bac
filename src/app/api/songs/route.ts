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
    const songs = await Song.find().lean();
    console.log("GET /api/songs: Songs fetched", songs);
    return NextResponse.json(songs);
  } catch (error) {
    console.error("Błąd podczas pobierania piosenek:", error);
    return NextResponse.json({ error: "Wystąpił błąd podczas pobierania piosenek" }, { status: 500 });
  }
}