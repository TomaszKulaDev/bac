import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    // Sprawdzamy czy ID jest poprawnym ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return new NextResponse("Invalid ID format", { status: 400 });
    }

    const profile = await User.findById(params.id).select({
      name: 1,
      email: 1,
      image: 1,
      dancePreferences: 1,
      age: 1,
      height: 1,
      gender: 1,
      bio: 1,
      createdAt: 1,
    });

    if (!profile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    // Konwertujemy _id na id dla spójności z frontendem
    const formattedProfile = {
      id: profile._id.toString(),
      name: profile.name,
      email: profile.email,
      image: profile.image,
      dancePreferences: profile.dancePreferences,
      age: profile.age,
      height: profile.height,
      gender: profile.gender,
      bio: profile.bio,
      createdAt: profile.createdAt,
    };

    return NextResponse.json(formattedProfile, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
