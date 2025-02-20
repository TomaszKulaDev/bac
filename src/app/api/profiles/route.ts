export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// src/app/api/profiles/route.ts
export async function GET() {
  try {
    await connectToDatabase();

    const profiles = await User.find(
      {
        isPublicProfile: true,
        isVerified: true,
      },
      {
        name: 1,
        email: 1,
        image: 1,
        dancePreferences: 1,
        gender: 1,
        age: 1,
        slug: 1,
        createdAt: 1,
        isPublicProfile: 1,
        isVerified: 1,
      }
    ).sort({ createdAt: -1 });

    const formattedProfiles = profiles.map((profile) => ({
      id: profile._id.toString(),
      name: profile.name,
      image: profile.image,
      dancePreferences: profile.dancePreferences,
      gender: profile.gender,
      age: profile.age,
      slug: profile.slug,
      createdAt: profile.createdAt,
      isPublicProfile: profile.isPublicProfile,
      isVerified: profile.isVerified,
    }));

    return NextResponse.json(formattedProfiles, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}
