// Importowanie niezbędnych modułów i funkcji
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Song } from "@/models/Song";
import { Playlist } from "@/models/Playlist";

// Eksportowanie asynchronicznej funkcji DELETE obsługującej żądanie HTTP DELETE
export async function DELETE(request: Request) {
  try {
    // Próba połączenia z bazą danych
    const db = await connectToDatabase();
    // Sprawdzenie, czy połączenie z bazą danych się powiodło
    if (!db) {
      throw new Error("Nie udało się połączyć z bazą danych");
    }

    // Tworzenie kopii zapasowej wszystkich piosenek przed ich usunięciem
    const songsBackup = await Song.find({}).lean();

    // Logowanie informacji o utworzonym backupie
    console.log("Backup utworzony:", songsBackup.length, "piosenek");

    // Usuwanie wszystkich piosenek z bazy danych
    const result = await Song.deleteMany({});

    // Aktualizacja wszystkich playlist - usuwanie referencji do usuniętych piosenek
    await Playlist.updateMany({}, { $set: { songs: [] } });

    // Logowanie informacji o liczbie usuniętych utworów
    console.log("Usunięto wszystkie utwory:", result.deletedCount);

    // Zwracanie odpowiedzi JSON z informacją o sukcesie i liczbie usuniętych utworów
    return NextResponse.json({
      message: `Usunięto ${result.deletedCount} utworów`,
      success: true,
    });
  } catch (error) {
    // Obsługa błędów - logowanie błędu i zwracanie odpowiedzi z kodem błędu 500
    console.error("Błąd podczas usuwania wszystkich utworów:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas usuwania utworów" },
      { status: 500 }
    );
  }
}
