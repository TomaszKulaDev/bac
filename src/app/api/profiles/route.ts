import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// src/app/api/profiles/route.ts
export async function GET() {
  try {
    await connectToDatabase();
    const profiles = await User.find({
      isVerified: true,
      // Możemy dodać więcej filtrów
    })
      .select("name avatar createdAt")
      .sort({ createdAt: -1 })
      .limit(6); // Limit dla najnowszych profili

    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json(
      { message: "Nie udało się pobrać profili" },
      { status: 500 }
    );
  }
}
