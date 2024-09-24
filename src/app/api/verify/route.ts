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
    console.error("Invalid token:", token);
    return NextResponse.json(
      { message: "Token is required and must be a string" },
      { status: 400 }
    );
  }

  try {
    // Łączenie z bazą danych
    await connectToDatabase();
    console.log("Connected to database");

    // Wyszukiwanie użytkownika na podstawie tokena weryfikacyjnego
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      console.error("User not found or token expired:", token);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Aktualizacja statusu użytkownika na zweryfikowany
    user.isVerified = true;
    user.verificationToken = undefined; // Usuwamy token po weryfikacji
    await user.save();
    console.log("User verified successfully:", user.email);

    // Wysyłanie odpowiedzi o pomyślnej weryfikacji
    return NextResponse.json({ message: "Account verified successfully" });
  } catch (error) {
    // Obsługa błędów podczas weryfikacji
    console.error("Verification failed: ", error);
    return NextResponse.json(
      { message: "Verification failed", error },
      { status: 500 }
    );
  }
}
