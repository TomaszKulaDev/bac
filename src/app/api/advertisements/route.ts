import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Advertisement } from "@/models/Advertisement";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

// GET - Pobierz wszystkie ogłoszenia
export async function GET() {
  try {
    await connectToDatabase();
    const ads = await Advertisement.find()
      .sort({ date: 1, time: 1 }) // Sortuj po dacie i czasie
      .lean();
    return NextResponse.json(ads);
  } catch (error) {
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
    if (!session?.user) {
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
        level: data.author.level,
        avatar: session.user.image,
      },
    });

    await newAd.save();
    return NextResponse.json(newAd);
  } catch (error) {
    return NextResponse.json(
      { error: "Nie udało się dodać ogłoszenia" },
      { status: 500 }
    );
  }
}
