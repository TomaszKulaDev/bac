import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// Główna funkcja obsługująca żądanie weryfikacji
export async function GET(request: Request) {
  // Pobieranie tokena z zapytania
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  // Sprawdzanie, czy token jest prawidłowy
  if (!token || typeof token !== "string") {
    return NextResponse.json(
      { message: "Token is required and must be a string" },
      { status: 400 }
    );
  }

  try {
    // Łączenie z bazą danych
    await connectToDatabase();

    // Wyszukiwanie użytkownika na podstawie tokena weryfikacyjnego
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }

    // Aktualizacja statusu użytkownika na zweryfikowany
    user.isVerified = true;
    user.verificationToken = undefined; // Usuwamy token po weryfikacji
    await user.save();

    // Wysyłanie odpowiedzi o pomyślnej weryfikacji
    return NextResponse.json({ message: "Account verified successfully" });
  } catch (error) {
    // Obsługa błędów podczas weryfikacji
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 500 }
    );
  }
}
