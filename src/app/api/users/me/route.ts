import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: Request) {
  console.log("Handler invoked");

  try {
    await connectToDatabase();
    console.log("Connected to database");

    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session || !session.user) {
      console.log("User not authenticated");
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
    console.error("Fetching user data error:", error);
    return NextResponse.json(
      { message: "Failed to fetch user data", error },
      { status: 500 }
    );
  }
}
