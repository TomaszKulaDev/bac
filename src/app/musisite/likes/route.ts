import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Like from "@/models/Like";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const songId = searchParams.get("songId");

  console.log("Received request for songId:", songId);

  if (!songId) {
    console.error("Song ID is required");
    return NextResponse.json(
      { message: "Song ID is required" },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      console.error("Unauthorized request");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Przykładowe dane testowe
    const testData = [
      {
        _id: "1",
        name: "Test User 1",
        avatarUrl: "/images/default-avatar.png",
      },
      {
        _id: "2",
        name: "Test User 2",
        avatarUrl: "/images/default-avatar.png",
      },
      {
        _id: "3",
        name: "Test User 3",
        avatarUrl: "/images/default-avatar.png",
      },
      {
        _id: "4",
        name: "Test User 4",
        avatarUrl: "/images/default-avatar.png",
      },
      {
        _id: "5",
        name: "Test User 5",
        avatarUrl: "/images/default-avatar.png",
      },
      {
        _id: "6",
        name: "Test User 6",
        avatarUrl: "/images/default-avatar.png",
      },
    ];

    console.log("Returning test data for songId:", songId);
    return NextResponse.json(testData);

    // Prawdziwe zapytanie do bazy danych
    // const likes = await Like.find({ songId }).populate('userId', 'name avatarUrl');
    // const users = likes.map(like => ({
    //   _id: like.userId._id,
    //   name: like.userId.name,
    //   avatarUrl: like.userId.avatarUrl
    // }));
    // return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
