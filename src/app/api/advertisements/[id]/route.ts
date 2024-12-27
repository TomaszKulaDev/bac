import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Advertisement } from "@/models/Advertisement";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import { Document } from "mongoose";

interface MongoAdvertisement extends Document {
  _id: any;
  type: string;
  title: string;
  date: string;
  time: string;
  location: {
    city: string;
    place: string;
  };
  author: {
    name: string;
    level: string;
    avatar?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// GET - Pobierz pojedyncze ogłoszenie
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Received request for ID:", params.id);

    await connectToDatabase();

    // Sprawdzamy czy ID jest poprawne
    if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid ID format");
      return NextResponse.json(
        { error: "Nieprawidłowy format ID" },
        { status: 400 }
      );
    }

    const ad = (await Advertisement.findById(params.id)) as MongoAdvertisement;
    console.log("Found advertisement:", ad);

    if (!ad) {
      console.log("Advertisement not found");
      return NextResponse.json(
        { error: "Nie znaleziono ogłoszenia" },
        { status: 404 }
      );
    }

    // Konwertujemy dokument MongoDB do zwykłego obiektu
    const adObject = ad.toObject();

    // Formatujemy daty jeśli istnieją
    const formattedAd = {
      ...adObject,
      _id: adObject._id.toString(),
      createdAt: adObject.createdAt
        ? new Date(adObject.createdAt).toISOString()
        : undefined,
      updatedAt: adObject.updatedAt
        ? new Date(adObject.updatedAt).toISOString()
        : undefined,
    };

    return NextResponse.json(formattedAd);
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas pobierania ogłoszenia" },
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
      return NextResponse.json(
        { error: "Wymagane zalogowanie" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const data = await request.json();

    // Walidacja ID
    if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Nieprawidłowy format ID" },
        { status: 400 }
      );
    }

    const ad = await Advertisement.findById(params.id);
    if (!ad) {
      return NextResponse.json(
        { error: "Nie znaleziono ogłoszenia" },
        { status: 404 }
      );
    }

    // Sprawdzenie uprawnień
    if (ad.author.name !== session.user.name) {
      return NextResponse.json(
        { error: "Brak uprawnień do edycji tego ogłoszenia" },
        { status: 403 }
      );
    }

    // Aktualizacja z zachowaniem autora
    const updatedAd = await Advertisement.findByIdAndUpdate(
      params.id,
      {
        ...data,
        updatedAt: new Date(),
        author: ad.author, // Zachowujemy oryginalnego autora
      },
      { new: true }
    );

    return NextResponse.json(updatedAd);
  } catch (error) {
    console.error("Error updating advertisement:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas aktualizacji ogłoszenia" },
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
      return NextResponse.json(
        { error: "Wymagane zalogowanie" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Walidacja ID
    if (!params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Nieprawidłowy format ID" },
        { status: 400 }
      );
    }

    const ad = await Advertisement.findById(params.id);
    if (!ad) {
      return NextResponse.json(
        { error: "Nie znaleziono ogłoszenia" },
        { status: 404 }
      );
    }

    // Sprawdzenie uprawnień
    if (ad.author.name !== session.user.name) {
      return NextResponse.json(
        { error: "Brak uprawnień do usunięcia tego ogłoszenia" },
        { status: 403 }
      );
    }

    await Advertisement.findByIdAndDelete(params.id);
    return NextResponse.json({
      message: "Ogłoszenie zostało pomyślnie usunięte",
    });
  } catch (error) {
    console.error("Error deleting advertisement:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas usuwania ogłoszenia" },
      { status: 500 }
    );
  }
}
