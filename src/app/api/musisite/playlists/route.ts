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
    const session = await getServerSession(authOptions);

    console.log("Session status:", !!session);
    console.log("User email:", session?.user?.email);

    if (!session?.user?.email) {
      console.log("GET /api/musisite/playlists: No session or email");
      return NextResponse.json(
        { error: "Musisz być zalogowany, aby zobaczyć playlisty" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    if (!mongoose.connection.readyState) {
      console.error("Database connection not established");
      return NextResponse.json(
        { error: "Problem z połączeniem do bazy danych" },
        { status: 500 }
      );
    }

    const playlists = await Playlist.find({ userId: session.user.email }).sort({
      createdAt: -1,
    });

    // Przekształć dokumenty Mongoose na zwykłe obiekty JavaScript
    const normalizedPlaylists = playlists.map((playlist) => ({
      _id: playlist._id.toString(),
      id: playlist._id.toString(),
      name: playlist.name,
      userId: playlist.userId,
      songs: Array.isArray(playlist.songs)
        ? playlist.songs.map((song: string | mongoose.Types.ObjectId) =>
            typeof song === "string" ? song : song.toString()
          )
        : [],
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt || playlist.createdAt,
    }));

    console.log(`Znaleziono ${normalizedPlaylists.length} playlist`);

    return NextResponse.json(normalizedPlaylists);
  } catch (error) {
    console.error("GET /api/musisite/playlists: Error:", error);
    return NextResponse.json(
      {
        error: "Wystąpił błąd podczas pobierania playlist",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
