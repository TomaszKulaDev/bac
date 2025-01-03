export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// src/app/api/profiles/route.ts
export async function GET() {
  try {
    await connectToDatabase();
    const profiles = await User.find(
      {},
      {
        name: 1,
        email: 1,
        image: 1,
        dancePreferences: 1,
        age: 1,
      }
    ).sort({ createdAt: -1 });

    const formattedProfiles = profiles.map((profile) => ({
      id: profile._id.toString(),
      name: profile.name,
      email: profile.email,
      image: profile.image,
      dancePreferences: profile.dancePreferences,
      age: profile.age,
    }));

    return NextResponse.json(formattedProfiles, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}
