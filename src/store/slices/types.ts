// src/store/slices/types.ts

// Interfejs RootState reprezentuje główny stan aplikacji Redux
export interface RootState {
  // Stan uwierzytelniania
  auth: {
    // Flaga wskazująca, czy użytkownik jest uwierzytelniony
    isAuthenticated: boolean;
    // Obiekt reprezentujący dane użytkownika
    user: any; // Typ 'any' może być zastąpiony bardziej szczegółowym typem, jeśli jest dostępny
  };
}

// Interfejs dla stanu piosenek
export interface SongsState {
  songs: Song[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  currentSongIndex: number;
}

// Interfejs dla stanu playlist
export interface PlaylistState {
  playlists: Playlist[];
  currentPlaylistId: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

// Interfejs dla akcji związanych z playlistami
export interface PlaylistAction {
  songIds: string[];
  playlistId: string;
  playlistName: string;
  remove?: boolean;
}

// Interfejs dla akcji aktualizacji kolejności utworów
export interface UpdatePlaylistOrderAction {
  playlistId: string;
  newOrder: string[];
}

// Interfejs dla podstawowych danych playlisty
export interface Playlist {
  id: string;
  name: string;
  songs: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// Interfejs dla podstawowych danych piosenki
export interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  playlists: string[];
  impro?: boolean;
  beginnerFriendly?: boolean;
}
