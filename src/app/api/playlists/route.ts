import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Playlist } from "@/models/Playlist";

export async function POST(request: Request) {
  console.log("POST /api/playlists: Start");
  try {
    await connectToDatabase();
    console.log("POST /api/playlists: Connected to database");
    
    const { name, songs } = await request.json();
    console.log("POST /api/playlists: Received data", { name, songs });
    
    const newPlaylist = new Playlist({
      name,
      songs,
      createdAt: new Date(),
    });

    await newPlaylist.save();
    console.log("POST /api/playlists: Playlist saved", newPlaylist);

    return NextResponse.json(
      { id: newPlaylist._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/playlists: Error", error);
    return NextResponse.json(
      { error: "Nie udało się utworzyć playlisty" },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log("GET /api/playlists: Start");
  try {
    await connectToDatabase();
    console.log("GET /api/playlists: Connected to database");
    
    const playlists = await Playlist.find({})
      .populate('songs')
      .sort({ createdAt: -1 })
      .lean();
    
    console.log("GET /api/playlists: Fetched playlists count:", playlists.length);
    return NextResponse.json(playlists);
  } catch (error) {
    console.error("GET /api/playlists: Error", error);
    return NextResponse.json(
      { error: "Nie udało się pobrać playlist" },
      { status: 500 }
    );
  }
}