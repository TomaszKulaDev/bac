import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// src/app/api/profiles/route.ts
export async function GET() {
  try {
    await connectToDatabase();
    const profiles = await User.find({
      isVerified: true,
    })
      .select("name avatar createdAt dancePreferences socialMedia")
      .sort({ createdAt: -1 })
      .limit(6);

    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json(
      { message: "Nie udało się pobrać profili" },
      { status: 500 }
    );
  }
}
