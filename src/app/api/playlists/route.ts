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
      .populate({
        path: 'songs',
        select: 'title artist youtubeId impro beginnerFriendly'
      })
      .sort({ createdAt: -1 })
      .lean();
    
    const normalizedPlaylists = playlists.map(playlist => ({
      _id: playlist._id.toString(),
      id: playlist._id.toString(),
      name: playlist.name,
      songs: Array.isArray(playlist.songs) 
        ? playlist.songs.map(song => typeof song === 'string' ? song : song._id.toString())
        : [],
      createdAt: playlist.createdAt
    }));

    console.log("GET /api/playlists: Fetched playlists count:", normalizedPlaylists.length);
    return NextResponse.json(normalizedPlaylists, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    console.error("GET /api/playlists: Error", error);
    return NextResponse.json(
      { error: "Nie udało się pobrać playlist" },
      { status: 500 }
    );
  }
}