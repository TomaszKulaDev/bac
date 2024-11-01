import { UniqueIdentifier } from "@dnd-kit/core";

// Wszystkie podstawowe interfejsy
export interface Song {
  _id: string;
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  impro: boolean;
  beginnerFriendly: boolean;
  createdAt: Date;
  __v?: number;
  playlists: string[];
  thumbnail?: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: string[];
}

export interface DraggableSong {
  id: UniqueIdentifier;
  playlistId: string;
  songDetails: Song;
}

// Pozostałe interfejsy...