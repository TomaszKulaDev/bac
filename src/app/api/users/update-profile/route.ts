import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Imię jest wymagane")
    .max(50, "Imię nie może być dłuższe niż 50 znaków"),
  email: z.string().email("Nieprawidłowy adres email"),
});

export async function GET(request: Request) {
  await connectToDatabase();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Nie jesteś zalogowany" },
      { status: 401 }
    );
  }

  try {
    console.log("Fetching user data for email:", session.user?.email);
    const user = await User.findOne({ email: session.user?.email });
    console.log("User data fetched:", user);
    if (!user) {
      console.log("User not found");
      return NextResponse.json(
        { message: "Nie znaleziono użytkownika" },
        { status: 404 }
      );
    }
    console.log("Sending user data:", {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });
    return NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        message: "Wystąpił błąd podczas pobierania danych użytkownika",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectToDatabase();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Nie jesteś zalogowany" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const validationResult = updateProfileSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user?.email },
      { $set: validationResult.data },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Nie znaleziono użytkownika" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      {
        message:
          "Nie udało się zaktualizować profilu. Spróbuj ponownie później.",
      },
      { status: 500 }
    );
  }
}
