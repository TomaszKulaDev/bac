import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Playlist } from "@/models/Playlist";
import { Types } from 'mongoose';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

interface IPlaylistDocument {
  _id: Types.ObjectId;
  name: string;
  userId: string;
  songs: Array<string | { _id: Types.ObjectId }>;
  createdAt: Date;
}

export async function POST(request: Request) {
  console.log("POST /api/playlists: Start");
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    console.log("POST /api/playlists: Connected to database");
    
    const { name, songs } = await request.json();
    console.log("POST /api/playlists: Received data", { name, songs });
    
    const newPlaylist = new Playlist({
      name,
      songs,
      userId: session.user.email,
      createdAt: new Date(),
    });

    await newPlaylist.save();
    console.log("POST /api/playlists: Playlist saved", newPlaylist);

    return NextResponse.json({
      playlist: {
        _id: newPlaylist._id,
        id: newPlaylist._id,
        name: newPlaylist.name,
        userId: newPlaylist.userId,
        songs: newPlaylist.songs,
        createdAt: newPlaylist.createdAt
      }
    }, { status: 201 });
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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    console.log("GET /api/playlists: Connected to database");
    
    const playlists = await Playlist.find({ userId: session.user.email })
      .populate({
        path: 'songs',
        select: 'title artist youtubeId impro beginnerFriendly'
      })
      .sort({ createdAt: -1 })
      .lean<IPlaylistDocument[]>();
    
    const normalizedPlaylists = playlists.map(playlist => ({
      _id: playlist._id.toString(),
      id: playlist._id.toString(),
      name: playlist.name,
      userId: playlist.userId,
      songs: Array.isArray(playlist.songs) 
        ? playlist.songs.map(song => 
            typeof song === 'string' ? song : song._id.toString()
          )
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