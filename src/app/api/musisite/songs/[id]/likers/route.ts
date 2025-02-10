import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Like } from "@/models/Like";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "5");
    const page = parseInt(url.searchParams.get("page") || "1");
    const random = url.searchParams.get("random") !== "false";

    // Sprawdź poprawność ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid song ID" }, { status: 400 });
    }

    // Pobierz całkowitą liczbę polubień
    const totalLikes = await Like.countDocuments({ songId: id });

    let likes;
    if (random && page === 1) {
      likes = await Like.aggregate([
        { $match: { songId: new mongoose.Types.ObjectId(id) } },
        { $sample: { size: Math.min(limit, totalLikes) } },
      ]);
    } else {
      likes = await Like.find({ songId: id })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

    // Pobierz dane użytkowników
    const userEmails = likes.map((like: any) => like.userEmail);
    const userDetails = await User.find(
      { email: { $in: userEmails } },
      { email: 1, name: 1, image: 1 }
    );

    // Utwórz mapę email -> dane użytkownika
    const emailToUserMap = new Map(
      userDetails.map((user) => [user.email, user])
    );

    // Przygotuj dane do odpowiedzi
    const users = likes.map((like: any) => {
      const userDetail = emailToUserMap.get(like.userEmail);
      return {
        userId: userDetail?._id.toString() || like._id.toString(),
        userName: userDetail?.name || like.userEmail,
        email: like.userEmail,
        userImage: userDetail?.image || null,
      };
    });

    // Zwróć odpowiedź
    return NextResponse.json({
      users,
      totalLikes,
      currentPage: page,
      hasMore: users.length === limit,
      totalPages: Math.ceil(totalLikes / limit),
    });
  } catch (error) {
    console.error("Error in likers endpoint:", error);
    return NextResponse.json(
      { error: "Failed to fetch likers" },
      { status: 500 }
    );
  }
}
