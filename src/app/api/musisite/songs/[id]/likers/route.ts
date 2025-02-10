import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Like } from "@/models/Like";
import User from "@/models/User";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    // Pobierz polubienia
    const likes = await Like.find({ songId: id })
      .sort({ createdAt: -1 })
      .limit(6)
      .select("userEmail _id")
      .exec();

    // Pobierz dane użytkowników na podstawie ich emaili
    const userEmails = likes.map((like) => like.userEmail);

    // Dodajmy console.log do debugowania
    console.log("Emails to fetch:", userEmails);

    const userDetails = await User.find(
      { email: { $in: userEmails } },
      { email: 1, name: 1, image: 1 } // Dodajemy image do zwracanych pól
    );

    // Dodajmy console.log do debugowania
    console.log("Found users:", userDetails);

    // Utwórz mapę email -> dane użytkownika
    const emailToUserMap = new Map(
      userDetails.map((user) => [user.email, user])
    );

    const users = likes.map((like) => {
      const userDetail = emailToUserMap.get(like.userEmail);
      return {
        userId: like._id.toString(),
        userName: userDetail?.name || like.userEmail, // Używamy name z userDetail
        email: like.userEmail,
        userImage: userDetail?.image || null,
      };
    });

    // Dodajmy console.log do debugowania
    console.log("Returning users:", users);

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error in likers endpoint:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas pobierania danych" },
      { status: 500 }
    );
  }
}
