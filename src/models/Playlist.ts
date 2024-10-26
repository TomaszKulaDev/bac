// Importujemy moduł mongoose do obsługi bazy danych MongoDB
import mongoose from 'mongoose';

// Definiujemy schemat playlisty
const playlistSchema = new mongoose.Schema({
  // Pole 'name' przechowuje nazwę playlisty
  name: {
    type: String,     // Typ pola to String
    required: true,   // Pole jest wymagane
    trim: true        // Usuwamy białe znaki z początku i końca
  },
  // Pole 'songs' to tablica zawierająca referencje do piosenek
  songs: [{
    type: mongoose.Schema.Types.ObjectId,  // Typ to ObjectId (referencja)
    ref: 'Song'                            // Odnosi się do modelu 'Song'
  }],
  // Pole 'createdAt' przechowuje datę utworzenia playlisty
  createdAt: {
    type: Date,           // Typ pola to Date
    default: Date.now     // Domyślna wartość to aktualna data
  }
});

// Eksportujemy model Playlist
// Jeśli model już istnieje, używamy go, w przeciwnym razie tworzymy nowy
export const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);
