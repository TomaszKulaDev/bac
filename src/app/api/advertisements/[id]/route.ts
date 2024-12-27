import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Advertisement } from "@/models/Advertisement";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

// GET - Pobierz pojedyncze ogłoszenie
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const ad = await Advertisement.findById(params.id).lean();

    if (!ad) {
      return NextResponse.json(
        { error: "Nie znaleziono ogłoszenia" },
        { status: 404 }
      );
    }

    return NextResponse.json(ad);
  } catch (error) {
    return NextResponse.json(
      { error: "Nie udało się pobrać ogłoszenia" },
      { status: 500 }
    );
  }
}

// PUT - Aktualizuj ogłoszenie
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();

    const ad = await Advertisement.findById(params.id);
    if (!ad) {
      return NextResponse.json(
        { error: "Nie znaleziono ogłoszenia" },
        { status: 404 }
      );
    }

    // Sprawdź czy użytkownik jest autorem
    if (ad.author.name !== session.user.name) {
      return NextResponse.json(
        { error: "Nie masz uprawnień do edycji tego ogłoszenia" },
        { status: 403 }
      );
    }

    const updatedAd = await Advertisement.findByIdAndUpdate(
      params.id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(updatedAd);
  } catch (error) {
    return NextResponse.json(
      { error: "Nie udało się zaktualizować ogłoszenia" },
      { status: 500 }
    );
  }
}

// DELETE - Usuń ogłoszenie
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const ad = await Advertisement.findById(params.id);
    if (!ad) {
      return NextResponse.json(
        { error: "Nie znaleziono ogłoszenia" },
        { status: 404 }
      );
    }

    // Sprawdź czy użytkownik jest autorem
    if (ad.author.name !== session.user.name) {
      return NextResponse.json(
        { error: "Nie masz uprawnień do usunięcia tego ogłoszenia" },
        { status: 403 }
      );
    }

    await Advertisement.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Ogłoszenie zostało usunięte" });
  } catch (error) {
    return NextResponse.json(
      { error: "Nie udało się usunąć ogłoszenia" },
      { status: 500 }
    );
  }
}
