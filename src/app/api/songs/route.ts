// UWAGA: Nie używamy .lean() przy zapytaniach do bazy danych,
// ponieważ może to powodować problemy z mapowaniem pól w dokumentach,
// szczególnie dla pól z wartościami domyślnymi (np. Boolean).
// Problem występował z polem 'dominicana', które nie było zwracane przy użyciu .lean()
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Song } from "@/models/Song";
import { Like } from "@/models/Like";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET() {
  console.log("GET /api/songs: Start");
  try {
    await connectToDatabase();
    console.log("GET /api/songs: Connected to database");

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const songs = await Song.find({})
      .select(
        "title artist youtubeId impro beginnerFriendly sensual dominicana intermediate advanced slow medium fast createdAt"
      )
      .sort({ createdAt: -1 });

    // Pobierz polubienia dla zalogowanego użytkownika
    const userLikes = userEmail
      ? await Like.find({ userEmail }).select("songId").lean()
      : [];

    const userLikedSongIds = new Set(
      userLikes.map((like) => like.songId.toString())
    );

    // Pobierz liczbę polubień dla każdej piosenki
    const likeCounts = await Like.aggregate([
      {
        $group: {
          _id: "$songId",
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('Aggregated like counts:', likeCounts);

    const likeCountMap = new Map(
      likeCounts.map(item => [item._id.toString(), item.count])
    );

    console.log('Like count map:', Object.fromEntries(likeCountMap));

    const songsWithLikes = songs.map(song => {
      const songId = song._id.toString();
      const songWithLikes = {
        ...song.toObject(),
        isLiked: userLikedSongIds.has(songId),
        likesCount: likeCountMap.get(songId) || 0
      };
      console.log('Prepared song with likes:', songWithLikes);
      return songWithLikes;
    });

    return new NextResponse(JSON.stringify(songsWithLikes), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("GET /api/songs: Error", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Nie udało się połączyć z bazą danych");
    }

    const {
      title,
      artist,
      youtubeLink,
      impro,
      beginnerFriendly,
      sensual,
      dominicana,
      intermediate,
      advanced,
      slow,
      medium,
      fast,
    } = await request.json();

    if (!title || !artist || !youtubeLink) {
      return NextResponse.json(
        { error: "Wszystkie pola są wymagane" },
        { status: 400 }
      );
    }

    const youtubeId = youtubeLink.split("v=")[1];
    if (!youtubeId) {
      return NextResponse.json(
        { error: "Nieprawidłowy link do YouTube" },
        { status: 400 }
      );
    }

    console.log("Received impro value:", impro);
    console.log("Received beginnerFriendly value:", beginnerFriendly);
    console.log("Received sensual value:", sensual);
    console.log("Received dominicana value:", dominicana);
    console.log("Received intermediate value:", intermediate);
    console.log("Received advanced value:", advanced);
    console.log("Received slow value:", slow);
    console.log("Received medium value:", medium);
    console.log("Received fast value:", fast);

    const newSong = new Song({
      title,
      artist,
      youtubeId,
      impro,
      beginnerFriendly,
      sensual,
      dominicana,
      intermediate,
      advanced,
      slow,
      medium,
      fast,
    });

    await newSong.save();

    console.log("New song object:", newSong);

    return NextResponse.json({
      success: true,
      message: "Piosenka dodana pomyślnie",
    });
  } catch (error) {
    console.error("Błąd podczas dodawania piosenki:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas dodawania piosenki" },
      { status: 500 }
    );
  }
}
