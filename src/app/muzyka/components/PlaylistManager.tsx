import React from "react";
import { Playlist, Song } from "../types";
import Image from "next/image";
import { getYouTubeThumbnail } from "../utils/youtube";

interface PlaylistManagerProps {
  playlists: Playlist[];
  songs: Song[];
  expandedPlaylist: string | null;
  setExpandedPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
  onDeletePlaylist: (playlistId: string) => void;
  onRenamePlaylist: (playlistId: string, newName: string) => void;
  onRemoveSongFromPlaylist: (playlistId: string, songId: string) => void;
  onCreatePlaylist: (name: string, selectedSongs: string[]) => void;
  isMobile: boolean;
}

const PlaylistManager: React.FC<PlaylistManagerProps> = ({
  playlists,
  songs,
  expandedPlaylist,
  setExpandedPlaylist,
  onDeletePlaylist,
  onRenamePlaylist,
  onRemoveSongFromPlaylist,
  onCreatePlaylist,
  isMobile,
}) => {
  const getSongDetails = (songId: string): Song | undefined => {
    return songs.find((song) => song._id === songId || song.id === songId);
  };

  return (
    <div className="space-y-4 mt-6 mb-8">
      {!isMobile && (
        <button
          onClick={() => {
            const name = prompt("Podaj nazwę nowej playlisty:");
            if (name) onCreatePlaylist(name, []);
          }}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md hover:from-purple-600 hover:to-pink-600 transition duration-300 mb-4"
        >
          + Utwórz nową playlistę
        </button>
      )}
      {playlists.map((playlist) => (
        <div key={playlist.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-lg">{playlist.name}</span>
            <div className="space-x-2">
              <button
                onClick={() =>
                  setExpandedPlaylist(
                    expandedPlaylist === playlist.id ? null : playlist.id
                  )
                }
                className="text-purple-500 hover:text-purple-700"
              >
                {expandedPlaylist === playlist.id ? "Zwiń" : "Rozwiń"}
              </button>
              <button
                onClick={() => {
                  const newName = prompt(
                    "Podaj nową nazwę playlisty:",
                    playlist.name
                  );
                  if (newName) onRenamePlaylist(playlist.id, newName);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                Zmień nazwę
              </button>
              <button
                onClick={() => onDeletePlaylist(playlist.id)}
                className="text-red-500 hover:text-red-700"
              >
                Usuń
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {playlist.songs.length} utworów
          </p>
          {expandedPlaylist === playlist.id && (
            <ul className="mt-2 space-y-2">
              {playlist.songs.map((songId: string) => {
                const songDetails = getSongDetails(songId);
                return songDetails ? (
                  <li
                    key={songId}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                  >
                    <div className="flex items-center">
                      <Image
                        src={getYouTubeThumbnail(songDetails.youtubeId)}
                        alt={songDetails.title}
                        width={60}
                        height={60}
                        className="object-cover rounded mr-4"
                      />
                      <div>
                        <p className="font-semibold">{songDetails.title}</p>
                        <p className="text-sm text-gray-600">
                          {songDetails.artist}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const playlistName = playlist.name;
                        onRemoveSongFromPlaylist(playlist.id, songId);
                      }}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Usuń
                    </button>
                  </li>
                ) : (
                  <li
                    key={songId}
                    className="text-sm text-red-500 bg-gray-50 p-2 rounded-md"
                  >
                    Utwór niedostępny
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlaylistManager;
