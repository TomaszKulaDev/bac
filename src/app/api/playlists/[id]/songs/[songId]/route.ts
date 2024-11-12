import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Playlist } from "@/models/Playlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; songId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const playlist = await Playlist.findById(params.id);
    
    if (!playlist) {
      return NextResponse.json(
        { error: "Playlista nie została znaleziona" },
        { status: 404 }
      );
    }

    // Usuń utwór z playlisty
    playlist.songs = playlist.songs.filter(
      (songId: string) => songId.toString() !== params.songId
    );

    await playlist.save();

    return NextResponse.json({ 
      message: "Utwór został usunięty z playlisty",
      success: true
    });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas usuwania utworu z playlisty" },
      { status: 500 }
    );
  }
}