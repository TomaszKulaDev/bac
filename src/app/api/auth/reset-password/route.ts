import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { validatePassword } from "@/schemas/passwordSchema";

// Główna funkcja obsługująca żądanie resetowania hasła
export async function POST(request: Request) {
  console.log("Otrzymany token:", request.url.split('?token=')[1]);
  const { password } = await request.json();
  console.log("Otrzymane hasło:", password);

  try {
    // Łączenie z bazą danych
    await connectToDatabase();
    console.log("Connected to database");

    // Pobieranie tokena z URL i hasła z ciała żądania
    const token = request.url.split('?token=')[1];

    // Dodatkowe logi do sprawdzenia tokena
    console.log("Received token:", token);
    console.log("Token type:", typeof token);

    // Sprawdzanie, czy token jest prawidłowy
    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { message: "Token jest wymagany i musi być ciągiem znaków" },
        { status: 400 }
      );
    }

    // Sprawdzanie, czy hasło zostało podane
    if (!password) {
      return NextResponse.json(
        { message: "Hasło jest wymagane" },
        { status: 400 }
      );
    }

    // Walidacja hasła
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      return NextResponse.json(
        { message: passwordValidationError },
        { status: 400 }
      );
    }

    // Znalezienie użytkownika na podstawie tokenu
    const user = await User.findOne({
      resetPasswordToken: token.toString(),
    });
    console.log("Kryteria wyszukiwania:", {
      resetPasswordToken: token.toString(),
    });
    console.log("Znaleziony użytkownik:", user ? "Tak" : "Nie");
    if (user) {
      console.log("ID użytkownika:", user._id);
      console.log("Email użytkownika:", user.email);
      console.log(
        "Token resetowania hasła użytkownika:",
        user.resetPasswordToken
      );
      console.log("Data wygaśnięcia tokena:", user.resetPasswordExpires);
    } else {
      console.log("Nie znaleziono użytkownika z podanym tokenem");
    }

    // Znalezienie wszystkich użytkowników z tokenami resetowania hasła
    const allUsersWithTokens = await User.find(
      { resetPasswordToken: { $exists: true } },
      "email resetPasswordToken resetPasswordExpires lastResetTokenRequest"
    );
    console.log(
      "Wszyscy użytkownicy z tokenami resetowania hasła:",
      allUsersWithTokens
    );

    // Sprawdzanie, czy użytkownik został znaleziony
    if (!user) {
      console.log("Token not found");
      return NextResponse.json(
        { message: "Nieprawidłowy token" },
        { status: 400 }
      );
    }

    if (user.resetPasswordExpires < Date.now()) {
      console.log("Token expired");
      return NextResponse.json(
        { message: "Token wygasł" },
        { status: 400 }
      );
    }

    // Hashowanie nowego hasła
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Usunięcie tokenu po użyciu
    user.resetPasswordExpires = undefined; // Usunięcie daty ważności tokenu
    await user.save();

    const savedUser = await User.findOne({ email: user.email });
    console.log("Użytkownik po zapisaniu:", savedUser);
    console.log(
      "Token resetowania hasła po zapisaniu:",
      savedUser.resetPasswordToken
    );

    console.log("Password reset successfully for user:", user.email);
    return NextResponse.json(
      { message: "Hasło zostało pomyślnie zresetowane" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    if (error instanceof Error) {
      // Obsługa błędów bazy danych
      if (error.name === "MongoError") {
        return NextResponse.json(
          { message: "Błąd bazy danych. Spróbuj ponownie później." },
          { status: 503 }
        );
        // Obsługa błędów walidacji
      } else if (error.name === "ValidationError") {
        return NextResponse.json(
          { message: "Nieprawidłowe dane wejściowe." },
          { status: 400 }
        );
        // Obsługa błędów związanych z duplikatami kluczy
      } else if (error.message.includes("E11000 duplicate key error")) {
        return NextResponse.json(
          { message: "Konflikt danych. Spróbuj ponownie później." },
          { status: 409 }
        );
      }
    }
    // Ogólna obsługa błędów
    return NextResponse.json(
      {
        message: "Nie udało się zresetować hasła. Spróbuj ponownie później.",
      },
      { status: 500 }
    );
  }
}
