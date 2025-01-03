import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// src/app/api/profiles/route.ts
export async function GET() {
  try {
    await connectToDatabase();
    const profiles = await User.find();

    // Konwertujemy _id na id dla frontendu
    const formattedProfiles = profiles.map((profile) => ({
      id: profile._id.toString(),
      name: profile.name,
      email: profile.email,
      image: profile.image,
      dancePreferences: profile.dancePreferences,
      // ... reszta pól
    }));

    return NextResponse.json(formattedProfiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}
