export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userProfile = await User.findOne({ email: session.user.email });
    console.log("📱 Pobrane dane użytkownika:", userProfile);

    if (!userProfile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: userProfile._id.toString(),
      name: userProfile.name,
      email: userProfile.email,
      image: userProfile.image,
      dancePreferences: userProfile.dancePreferences,
      age: userProfile.age,
      height: userProfile.height,
      gender: userProfile.gender,
      bio: userProfile.bio,
      isPublicProfile: userProfile.isPublicProfile,
      settings: userProfile.settings,
      socialMedia: userProfile.socialMedia,
    });
  } catch (error) {
    console.error("❌ Błąd podczas pobierania profilu:", error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
