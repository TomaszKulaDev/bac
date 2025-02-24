import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Playlist } from "@/models/Playlist";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

interface IPlaylistDocument {
  _id: mongoose.Types.ObjectId;
  name: string;
  userId: string;
  songs: string[];
  createdAt: Date;
  updatedAt: Date;
}

export async function POST(request: Request) {
  console.log("POST /api/musisite/playlists: Start");
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    console.log("POST /api/musisite/playlists: Connected to database");

    const { name, songs } = await request.json();
    console.log("POST /api/musisite/playlists: Received data", { name, songs });

    const newPlaylist = new Playlist({
      name,
      songs,
      userId: session.user.email,
      createdAt: new Date(),
    });

    await newPlaylist.save();
    console.log("POST /api/musisite/playlists: Playlist saved", newPlaylist);

    return NextResponse.json(
      {
        playlist: {
          _id: newPlaylist._id,
          id: newPlaylist._id,
          name: newPlaylist.name,
          userId: newPlaylist.userId,
          songs: newPlaylist.songs,
          createdAt: newPlaylist.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/musisite/playlists: Error", error);
    return NextResponse.json(
      { error: "Nie udało się utworzyć playlisty" },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log("GET /api/musisite/playlists: Start");

  try {
    // Sprawdź sesję
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.log("GET /api/musisite/playlists: No authenticated session");
      return NextResponse.json(
        { error: "Zaloguj się, aby zobaczyć swoje playlisty" },
        { status: 401 }
      );
    }

    // Połącz z bazą danych
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { error: "Błąd połączenia z bazą danych" },
        { status: 503 }
      );
    }

    // Sprawdź stan połączenia
    if (mongoose.connection.readyState !== 1) {
      console.error("Database not connected");
      return NextResponse.json(
        { error: "Brak połączenia z bazą danych" },
        { status: 503 }
      );
    }

    // Pobierz playlisty
    const playlists = await Playlist.find({ userId: session.user.email })
      .populate({
        path: "songs",
        select: "title artist youtubeId impro beginnerFriendly",
      })
      .sort({ createdAt: -1 })
      .lean<IPlaylistDocument[]>();

    // Normalizuj dane
    const normalizedPlaylists = playlists.map((playlist) => ({
      id: playlist._id.toString(),
      _id: playlist._id.toString(),
      name: playlist.name,
      userId: playlist.userId,
      songs: Array.isArray(playlist.songs)
        ? playlist.songs.map((song) =>
            typeof song === "string" ? song : (song as any)._id?.toString()
          )
        : [],
      createdAt: playlist.createdAt,
      updatedAt: playlist.createdAt,
    }));

    console.log(
      `GET /api/musisite/playlists: Successfully fetched ${normalizedPlaylists.length} playlists`
    );

    return NextResponse.json(normalizedPlaylists, {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("GET /api/musisite/playlists: Unexpected error:", error);
    return NextResponse.json(
      {
        error: "Wystąpił błąd podczas pobierania playlist",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
