export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userDetails = await User.findOne({ email: session.user.email });
    if (!userDetails) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      image: userDetails.image,
      dancePreferences: userDetails.dancePreferences,
      age: userDetails.age,
      gender: userDetails.gender,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
