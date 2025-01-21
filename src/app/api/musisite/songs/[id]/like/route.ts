import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import { Like } from "@/models/Like";
import { Song } from "@/models/Song";
import mongoose from "mongoose";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized - No email in session" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const songId = params.id;
    if (!mongoose.Types.ObjectId.isValid(songId)) {
      return NextResponse.json(
        { error: "Invalid song ID format" },
        { status: 400 }
      );
    }

    const song = await Song.findById(songId);
    if (!song) {
      return NextResponse.json({ error: "Song not found" }, { status: 404 });
    }

    const existingLike = await Like.findOne({
      userEmail,
      songId,
    });

    let liked;
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      liked = false;
    } else {
      await Like.create({
        userEmail,
        songId,
      });
      liked = true;
    }

    const likeCount = await Like.countDocuments({ songId });

    return NextResponse.json({
      liked,
      likesCount: likeCount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
