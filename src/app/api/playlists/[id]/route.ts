import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Playlist } from "@/models/Playlist";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("PUT /api/playlists/[id]: Start", { id: params.id });
  
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    console.log("PUT /api/playlists/[id]: Connected to database");
    
    const playlist = await Playlist.findOne({
      _id: params.id,
      userId: session.user.email
    });

    if (!playlist) {
      return NextResponse.json(
        { error: "Nie znaleziono playlisty lub brak uprawnień" },
        { status: 404 }
      );
    }

    const { songId } = await request.json();
    console.log("PUT /api/playlists/[id]: Received data", { songId });

    if (!songId) {
      return NextResponse.json(
        { error: "Brak ID utworu" },
        { status: 400 }
      );
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    const updatedPlaylist = await Playlist.findOne({
      _id: params.id,
      userId: session.user.email
    }).populate('songs');

    return NextResponse.json(updatedPlaylist);
  } catch (error) {
    console.error("PUT /api/playlists/[id]: Error", error);
    return NextResponse.json(
      { error: "Nie udało się zaktualizować playlisty" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Nie udało się połączyć z bazą danych");
    }

    const { id } = params;
    console.log("DELETE /api/playlists/[id]: Attempting to delete playlist with ID:", id);

    const result = await Playlist.findOneAndDelete({
      _id: id,
      userId: session.user.email
    });

    if (!result) {
      return NextResponse.json(
        { error: "Playlista nie została znaleziona lub brak uprawnień" },
        { status: 404 }
      );
    }

    console.log("DELETE /api/playlists/[id]: Playlist deleted", id);
    return NextResponse.json({ message: "Playlista została usunięta" });
  } catch (error) {
    console.error("Błąd podczas usuwania playlisty:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas usuwania playlisty" },
      { status: 500 }
    );
  }
}
