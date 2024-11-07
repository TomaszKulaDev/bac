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
  console.log("DELETE /api/playlists/[id]: Start", { id: params.id });
  
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session?.user?.email);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
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
      success: true
    });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas usuwania playlisty" },
      { status: 500 }
    );
  }
}
