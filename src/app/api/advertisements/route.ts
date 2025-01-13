import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Advertisement } from "@/models/Advertisement";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

// GET - Pobierz wszystkie ogłoszenia
export async function GET() {
  try {
    await connectToDatabase();
    const ads = await Advertisement.find().exec();

    // Jeśli nie ma ogłoszeń, zwróć pustą tablicę
    if (!ads || ads.length === 0) {
      console.log("No advertisements found in database");
      return NextResponse.json([]);
    }

    const plainAds = ads.map((ad) => ({
      ...ad.toObject(),
      _id: ad._id.toString(),
    }));

    console.log(`Found ${plainAds.length} advertisements`);
    return NextResponse.json(plainAds);
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json(
      { error: "Nie udało się pobrać ogłoszeń" },
      { status: 500 }
    );
  }
}

// POST - Dodaj nowe ogłoszenie
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();

    if (!data.description || data.description.length > 255) {
      return NextResponse.json(
        { error: "Opis jest wymagany i nie może przekraczać 255 znaków" },
        { status: 400 }
      );
    }

    const newAd = new Advertisement({
      ...data,
      author: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image || "/images/default-avatar.png",
        level: data.author.level,
      },
    });

    const savedAd = await newAd.save();

    const plainSavedAd = {
      ...savedAd.toObject(),
      _id: savedAd._id.toString(),
    };

    console.log("Saved ad:", {
      id: plainSavedAd._id,
      author: plainSavedAd.author,
      hasEmail: Boolean(plainSavedAd.author?.email),
    });

    return NextResponse.json(plainSavedAd);
  } catch (error) {
    console.error("Error creating advertisement:", error);
    return NextResponse.json(
      { error: "Nie udało się dodać ogłoszenia" },
      { status: 500 }
    );
  }
}
