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
      const mappedSongs = songs.map(song => {
        const songObj = song as any;
        return {
          ...songObj,
          id: songObj._id ? songObj._id.toString() : undefined
        };
      });
      console.log("GET /api/songs: Songs fetched", mappedSongs);
      return NextResponse.json(mappedSongs);
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
