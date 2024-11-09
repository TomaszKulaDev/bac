// UWAGA: Nie używamy .lean() przy zapytaniach do bazy danych, 
    // ponieważ może to powodować problemy z mapowaniem pól w dokumentach,
    // szczególnie dla pól z wartościami domyślnymi (np. Boolean).
    // Problem występował z polem 'dominicana', które nie było zwracane przy użyciu .lean() 
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Song } from "@/models/Song";

export async function GET() {
  console.log("GET /api/songs: Start");
  try {
    const db = await connectToDatabase();
    console.log("GET /api/songs: Connected to database");

    // UWAGA: Nie używamy .lean() przy zapytaniach do bazy danych, 
    // ponieważ może to powodować problemy z mapowaniem pól w dokumentach,
    // szczególnie dla pól z wartościami domyślnymi (np. Boolean).
    // Problem występował z polem 'dominicana', które nie było zwracane przy użyciu .lean()
    const songs = await Song.find({})
      .select('title artist youtubeId impro beginnerFriendly createdAt')
      .sort({ createdAt: -1 });

    return new NextResponse(JSON.stringify(songs), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("GET /api/songs: Error", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Nie udało się połączyć z bazą danych");
    }

    const { title, artist, youtubeLink, impro, beginnerFriendly } = await request.json();

    if (!title || !artist || !youtubeLink) {
      return NextResponse.json(
        { error: "Wszystkie pola są wymagane" },
        { status: 400 }
      );
    }

    const youtubeId = youtubeLink.split("v=")[1];
    if (!youtubeId) {
      return NextResponse.json(
        { error: "Nieprawidłowy link do YouTube" },
        { status: 400 }
      );
    }

    console.log("Received impro value:", impro);
    console.log("Received beginnerFriendly value:", beginnerFriendly);

    const newSong = new Song({
      title,
      artist,
      youtubeId,
      impro,
      beginnerFriendly,
    });

    await newSong.save();

    console.log("New song object:", newSong);

    return NextResponse.json({
      success: true,
      message: "Piosenka dodana pomyślnie",
    });
  } catch (error) {
    console.error("Błąd podczas dodawania piosenki:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas dodawania piosenki" },
      { status: 500 }
    );
  }
}
// UWAGA: Nie używamy .lean() przy zapytaniach do bazy danych, 
    // ponieważ może to powodować problemy z mapowaniem pól w dokumentach,
    // szczególnie dla pól z wartościami domyślnymi (np. Boolean).
    // Problem występował z polem 'dominicana', które nie było zwracane przy użyciu .lean()