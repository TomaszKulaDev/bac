import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Song } from "@/models/Song";
import { Like } from "@/models/Like";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Nie udało się połączyć z bazą danych");
    }

    const { id } = params;
    console.log("DELETE /api/songs/[id]: Attempting to delete song with ID:", id);

    await Like.deleteMany({ songId: id });
    const result = await Song.findByIdAndDelete(id);
    console.log("Delete operation result:", result);

    if (!result) {
      return NextResponse.json({ error: "Piosenka nie została znaleziona" }, { status: 404 });
    }

    console.log("DELETE /api/songs/[id]: Song deleted", id);
    return NextResponse.json({ message: "Piosenka została usunięta" });
  } catch (error) {
    console.error("Błąd podczas usuwania piosenki:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas usuwania piosenki" },
      { status: 500 }
    );
  }
}
