import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Song } from "@/models/Song";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("DELETE /api/songs/[id]: Start");
  try {
    const db = await connectToDatabase();
    console.log("DELETE /api/songs/[id]: Connected to database");
    if (!db) {
      throw new Error("Nie udało się połączyć z bazą danych");
    }

    const { id } = params;
    const result = await Song.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { error: "Nie znaleziono piosenki o podanym ID" },
        { status: 404 }
      );
    }

    console.log("DELETE /api/songs/[id]: Song deleted", id);
    return NextResponse.json({ message: "Piosenka została usunięta" });
  } catch (error) {
    console.error("Błąd podczas usuwania piosenki:", error);
    return NextResponse.json(
      {
        error: "Wystąpił błąd podczas usuwania piosenki",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
