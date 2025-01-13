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
    await connectToDatabase();

    // Dodajemy logowanie
    console.log("Szukam ogłoszenia z ID:", params.id);

    // Najpierw próbujemy znaleźć wszystkie ogłoszenia
    const allAds = await Advertisement.find();

    // Szukamy ogłoszenia, którego ID zaczyna się od podanego fragmentu
    const ad = allAds.find((ad) => ad._id.toString().startsWith(params.id));

    if (!ad) {
      console.log("Nie znaleziono ogłoszenia dla ID:", params.id);
      return NextResponse.json(
        { error: "Nie znaleziono ogłoszenia" },
        { status: 404 }
      );
    }

    // Konwertujemy dokument na zwykły obiekt
    const plainAd = {
      ...ad.toObject(),
      _id: ad._id.toString(),
    };

    return NextResponse.json(plainAd);
  } catch (error) {
    console.error("Error:", error);
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
    if (!session?.user?.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDatabase();

    const advertisement = await Advertisement.findById(params.id);
    if (!advertisement) {
      return new Response("Advertisement not found", { status: 404 });
    }

    // Sprawdzamy czy użytkownik jest adminem lub autorem ogłoszenia
    const isAdmin = session.user.role === "admin";
    const isAuthor = advertisement.author.email === session.user.email;

    if (!isAdmin && !isAuthor) {
      return new Response("Forbidden", { status: 403 });
    }

    await Advertisement.findByIdAndDelete(params.id);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
