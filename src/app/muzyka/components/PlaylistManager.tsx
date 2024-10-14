import React from "react";
import { Playlist, Song } from "../types";
import Image from "next/image";
import { getYouTubeThumbnail } from "../utils/youtube";
import { FaPlay } from "react-icons/fa";

interface PlaylistManagerProps {
  playlists: Playlist[];
  songs: Song[];
  expandedPlaylist: string | null;
  setExpandedPlaylist: (playlistId: string | null) => void;
  onCreatePlaylist: (name: string, selectedSongs: string[]) => void;
  onDeletePlaylist: (playlistId: string) => void;
  onRenamePlaylist: (playlistId: string, newName: string) => void;
  onRemoveSongFromPlaylist: (playlistId: string, songId: string) => void;
  isMobile: boolean;
  onPlayPlaylist: (playlistId: string) => void;
  currentPlaylistId: string | null;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
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
  onPlayPlaylist,
  currentPlaylistId,
  onAddToPlaylist,
}) => {
  const getSongDetails = (songId: string): Song | undefined => {
    return songs.find((song) => song._id === songId || song.id === songId);
  };


  return (
    <div className="space-y-4 mt-6 mb-8">
      {!isMobile && playlists.length < 2 && (
        <button
          onClick={() => {
            const name = prompt("Podaj nazwę nowej playlisty:");
            if (name) {
              const playlistExists = playlists.some(
                (playlist) => playlist.name.toLowerCase() === name.toLowerCase()
              );
              if (playlistExists) {
                alert(
                  "Playlista o takiej nazwie już istnieje. Wybierz inną nazwę."
                );
              } else {
                onCreatePlaylist(name, []);
              }
            }
          }}
          className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 mb-4"
        >
          + Utwórz nową playlistę
        </button>
      )}
      {playlists.map((playlist) => (
        <div key={playlist.id} className={`playlist ${playlist.id === currentPlaylistId ? 'active-playlist' : ''} bg-white p-4 rounded-lg shadow-md`}>
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
              <button
                onClick={() => onPlayPlaylist(playlist.id)}
                className="text-green-500 hover:text-green-700 transition-colors duration-200"
                title="Odtwórz playlistę"
              >
                <FaPlay className="text-xl" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {playlist.songs.length} utworów
          </p>
          {expandedPlaylist === playlist.id && (
            <ul className="mt-2 space-y-2">
              {playlist.songs.length === 0 ? (
                songs.map((song) => (
                  <li key={song.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center">
                      <Image
                        src={getYouTubeThumbnail(song.youtubeId)}
                        alt={song.title}
                        width={60}
                        height={60}
                        className="object-cover rounded mr-4"
                      />
                      <div>
                        <p className="font-semibold">{song.title}</p>
                        <p className="text-sm text-gray-600">{song.artist}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onAddToPlaylist(playlist.id, song.id)}
                      className="text-green-500 hover:text-green-700 text-xs"
                    >
                      Dodaj
                    </button>
                  </li>
                ))
              ) : (
                // Istniejący kod dla niepustej playlisty
                playlist.songs.map((songId: string) => {
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
                })
              )}
            </ul>
          )}
        </div>
      ))}
      {!isMobile && playlists.length >= 2 && (
        <p className="text-sm text-gray-600 mb-4">
          Osiągnięto limit 2 playlist. Usuń jedną z istniejących, aby utworzyć
          nową albo wykup premium.
        </p>
      )}
    </div>
  );
};


export default PlaylistManager;
