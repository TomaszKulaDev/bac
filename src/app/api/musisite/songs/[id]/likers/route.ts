import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Like } from "@/models/Like";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    // Pobierz 6 ostatnich użytkowników, którzy polubili utwór
    const likes = await Like.find({ songId: id })
      .sort({ createdAt: -1 })
      .limit(6)
      .select("userEmail _id")
      .exec();

    const users = likes.map((like) => ({
      userId: like._id.toString(),
      email: like.userEmail,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Wystąpił błąd podczas pobierania danych" },
      { status: 500 }
    );
  }
}
