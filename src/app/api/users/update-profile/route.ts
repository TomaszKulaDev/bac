import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  email: z.string().email("Nieprawidłowy adres email"),
  dancePreferences: z
    .object({
      styles: z.array(z.string()),
      level: z.string(),
      availability: z.string(),
      location: z.string(),
    })
    .optional(),
  image: z.string().optional(),
  age: z
    .number()
    .min(16, "Musisz mieć co najmniej 16 lat")
    .max(120, "Wprowadź prawidłowy wiek")
    .optional(),
  gender: z.enum(["male", "female"]).optional(),
});

export async function GET(request: Request) {
  console.log("GET request received");
  await connectToDatabase();
  console.log("Connected to database");

  const session = await getServerSession(authOptions);
  console.log("Session:", session);

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
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();

    const validatedData = updateProfileSchema.parse(data);

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          name: validatedData.name,
          email: validatedData.email,
          image: validatedData.image,
          dancePreferences: validatedData.dancePreferences,
          age: validatedData.age,
          gender: validatedData.gender,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      dancePreferences: updatedUser.dancePreferences,
      age: updatedUser.age,
      gender: updatedUser.gender,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
