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
  bio: z
    .string()
    .max(500, "Opis nie może być dłuższy niż 500 znaków")
    .optional(),
  height: z
    .number()
    .min(140, "Wzrost nie może być mniejszy niż 140 cm")
    .max(220, "Wzrost nie może być większy niż 220 cm")
    .optional(),
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
    console.log("Otrzymane dane:", data);

    // Sprawdź czy użytkownik istnieje
    let user = await User.findOne({ email: session.user.email });

    // Jeśli nie istnieje, stwórz nowy dokument
    if (!user) {
      user = await User.create({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        dancePreferences: {
          styles: [],
          level: "",
          availability: "",
          location: "",
        },
        socialMedia: {
          instagram: "",
          facebook: "",
          youtube: "",
        },
      });
    }

    // Aktualizuj tylko przesłane pola
    const updateData: Record<string, any> = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key.includes(".")) {
          const [parent, child] = key.split(".");
          if (!updateData[parent]) {
            updateData[parent] = {};
          }
          (updateData[parent] as Record<string, any>)[child] = value;
        } else {
          updateData[key] = value;
        }
      }
    });

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updateData },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      {
        message: "Failed to update profile",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
