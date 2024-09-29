export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: Request) {
  console.log("GET /api/users/me: Start");
  try {
    await connectToDatabase();
    console.log("GET /api/users/me: Connected to database");

    const session = await getServerSession(authOptions);
    console.log("GET /api/users/me: Session:", session);

    if (!session || !session.user) {
      console.log("GET /api/users/me: User not authenticated");
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const userDetails = await User.findOne({ email: session.user.email });
    console.log("User details retrieved:", userDetails);

    if (!userDetails) {
      console.log("User not found with email:", session.user.email);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: userDetails._id,
        name: userDetails.name,
        email: userDetails.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/users/me: Error", error);
    return NextResponse.json(
      { message: "Failed to fetch user data", error },
      { status: 500 }
    );
  }
}
