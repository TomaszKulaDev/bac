import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Nie jesteś zalogowany" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Znajdź i usuń użytkownika
    const result = await User.deleteOne({ email: session.user.email });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Nie znaleziono użytkownika" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Konto zostało pomyślnie usunięte" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Błąd podczas usuwania konta:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd podczas usuwania konta" },
      { status: 500 }
    );
  }
}
