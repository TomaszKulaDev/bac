import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectToDatabase();
    const decodedSlug = decodeURIComponent(params.slug);
    console.log("Szukam profilu dla:", decodedSlug); // Debug log

    const profile = await User.findOne({
      $or: [
        { slug: { $regex: new RegExp(`^${decodedSlug}$`, "i") } },
        {
          name: {
            $regex: new RegExp(`^${decodedSlug.replace(/-/g, " ")}$`, "i"),
          },
        },
      ],
    });

    console.log("Znaleziony profil:", profile); // Debug log

    if (!profile) {
      console.log("Nie znaleziono profilu"); // Debug log
      return new NextResponse(JSON.stringify({ error: "Profile not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Konwertujemy _id na id i generujemy slug z nazwy jeśli nie istnieje
    const formattedProfile = {
      id: profile._id.toString(),
      name: profile.name,
      email: profile.email,
      image: profile.image,
      dancePreferences: profile.dancePreferences,
      age: profile.age,
      height: profile.height,
      gender: profile.gender,
      bio: profile.bio,
      createdAt: profile.createdAt,
      // Generujemy slug z nazwy jeśli nie istnieje
      slug: profile.slug || profile.name.toLowerCase().replace(/\s+/g, "-"),
    };

    return NextResponse.json(formattedProfile);
  } catch (error) {
    console.error("Error w API:", error); // Debug log
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
