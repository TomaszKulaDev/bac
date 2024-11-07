import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Playlist } from "@/models/Playlist";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("PUT /api/playlists/[id]: Start", { id: params.id });
  
  try {
    await connectToDatabase();
    console.log("PUT /api/playlists/[id]: Connected to database");
    
    const { songId } = await request.json();
    console.log("PUT /api/playlists/[id]: Received data", { songId });

    if (!songId) {
      return NextResponse.json(
        { error: "Brak ID utworu" },
        { status: 400 }
      );
    }

    const playlist = await Playlist.findById(params.id);
    if (!playlist) {
      return NextResponse.json(
        { error: "Nie znaleziono playlisty" },
        { status: 404 }
      );
    }

    // Sprawdź czy utwór już istnieje w playliście
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    const updatedPlaylist = await Playlist.findById(params.id)
      .populate('songs');

    return NextResponse.json(updatedPlaylist);
  } catch (error) {
    console.error("PUT /api/playlists/[id]: Error", error);
    return NextResponse.json(
      { error: "Nie udało się zaktualizować playlisty" },
      { status: 500 }
    );
  }
}
