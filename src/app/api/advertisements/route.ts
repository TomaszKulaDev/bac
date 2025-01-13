import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Advertisement } from "@/models/Advertisement";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

// GET - Pobierz wszystkie ogłoszenia
export async function GET() {
  try {
    console.log("Connecting to MongoDB...");
    await connectToDatabase();

    console.log("Fetching advertisements...");
    const ads = await Advertisement.find().sort({ createdAt: -1 }).exec();

    console.log("Found advertisements:", {
      count: ads.length,
      ids: ads.map((ad) => ({
        fullId: ad._id.toString(),
        shortId: ad._id.toString().substring(0, 5),
      })),
    });

    const plainAds = ads.map((ad) => ({
      ...ad.toObject(),
      _id: ad._id.toString(),
    }));

    return NextResponse.json(plainAds);
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    return NextResponse.json(
      { error: "Failed to fetch advertisements" },
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
