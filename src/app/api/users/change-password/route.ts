import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Schema walidacji dla zmiany hasła
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Aktualne hasło jest wymagane"),
  newPassword: z
    .string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .regex(/[A-Z]/, "Hasło musi zawierać wielką literę")
    .regex(/[a-z]/, "Hasło musi zawierać małą literę")
    .regex(/[0-9]/, "Hasło musi zawierać cyfrę"),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Nie jesteś zalogowany" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const data = await request.json();

    // Walidacja danych wejściowych
    const validatedData = changePasswordSchema.parse(data);

    // Pobierz użytkownika
    const user = await User.findOne(
      { email: session.user.email },
      { password: 1 }
    );

    if (!user) {
      return NextResponse.json(
        { message: "Użytkownik nie istnieje" },
        { status: 404 }
      );
    }

    // Sprawdź aktualne hasło
    const isValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    );
    if (!isValid) {
      return NextResponse.json(
        { message: "Nieprawidłowe aktualne hasło" },
        { status: 400 }
      );
    }

    // Zahaszuj i zapisz nowe hasło
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 12);

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Nie udało się zaktualizować hasła" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Hasło zostało zmienione" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Błąd zmiany hasła:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Wystąpił błąd podczas zmiany hasła" },
      { status: 500 }
    );
  }
}
