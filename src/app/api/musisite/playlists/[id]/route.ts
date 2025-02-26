import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Playlist } from "@/models/Playlist";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import mongoose, { Types } from "mongoose";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("PUT /api/musisite/playlists/[id]: Start", { id: params.id });

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    console.log("PUT /api/musisite/playlists/[id]: Connected to database");

    const playlist = await Playlist.findOne({
      _id: params.id,
      userId: session.user.email,
    });

    if (!playlist) {
      console.error("Playlist not found:", {
        id: params.id,
        userId: session.user.email,
      });
      return NextResponse.json(
        { error: "Nie znaleziono playlisty lub brak uprawnień" },
        { status: 404 }
      );
    }

    const { songId } = await request.json();
    console.log("PUT /api/musisite/playlists/[id]: Received data", {
      songId,
      currentSongs: playlist.songs,
    });

    if (!songId) {
      return NextResponse.json({ error: "Brak ID utworu" }, { status: 400 });
    }

    // Konwertuj songId na ObjectId
    const songObjectId = new mongoose.Types.ObjectId(songId);

    // Sprawdź, czy utwór już istnieje w playliście
    const songExists = playlist.songs.some(
      (existingSongId: Types.ObjectId) =>
        existingSongId.toString() === songObjectId.toString()
    );

    if (!songExists) {
      playlist.songs.push(songObjectId);
      await playlist.save();
      console.log("Song added to playlist:", {
        playlistId: playlist._id,
        songId,
        newSongsCount: playlist.songs.length,
      });
    } else {
      console.log("Song already exists in playlist:", {
        playlistId: playlist._id,
        songId,
      });
    }

    const updatedPlaylist = await Playlist.findOne({
      _id: params.id,
      userId: session.user.email,
    });

    if (!updatedPlaylist) {
      throw new Error("Nie można pobrać zaktualizowanej playlisty");
    }

    // Przygotuj odpowiedź z poprawnymi ID
    const response = {
      _id: updatedPlaylist._id.toString(),
      id: updatedPlaylist._id.toString(),
      name: updatedPlaylist.name,
      userId: updatedPlaylist.userId,
      songs: updatedPlaylist.songs.map((songId: Types.ObjectId) =>
        songId.toString()
      ),
      createdAt: updatedPlaylist.createdAt,
    };

    console.log("Sending updated playlist:", response);
    return NextResponse.json(response);
  } catch (error) {
    console.error("PUT /api/musisite/playlists/[id]: Error", error);
    return NextResponse.json(
      {
        error: "Nie udało się zaktualizować playlisty",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("DELETE /api/musisite/playlists/[id]: Start", { id: params.id });

  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session?.user?.email);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const result = await Playlist.findByIdAndDelete(params.id);
    console.log("Delete result:", result);

    if (!result) {
      return NextResponse.json(
        { error: "Playlista nie została znaleziona" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Playlista została usunięta",
      success: true,
    });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas usuwania playlisty" },
      { status: 500 }
    );
  }
}
