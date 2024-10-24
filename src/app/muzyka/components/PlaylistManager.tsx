import React, { useState } from "react";
import { Playlist, Song } from "../types";
import Image from "next/image";
import { getYouTubeThumbnail } from "../utils/youtube";
import { FaPlay, FaChevronUp, FaChevronDown, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Upewnij się, że ścieżka jest poprawna

interface PlaylistManagerProps {
  playlists: Playlist[];
  songs: Song[];
  expandedPlaylist: string | null;
  setExpandedPlaylist: (playlistId: string | null) => void;
  onCreatePlaylist: (name: string, selectedSongs?: string[]) => void;
  onDeletePlaylist: (playlistId: string) => void;
  onRenamePlaylist: (playlistId: string, newName: string) => void;
  onRemoveSongFromPlaylist: (playlistId: string, songId: string) => void;
  isMobile: boolean;
  onPlayPlaylist: (playlistId: string) => void;
  currentPlaylistId: string | null;
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
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
  setIsModalOpen,
  isModalOpen,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const getSongDetails = (songId: string): Song | undefined => {
    return songs.find((song) => song._id === songId || song.id === songId);
  };

  const handleAddToPlaylist = (playlistId: string, songId: string) => {
    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby dodawać utwory do playlist.");
      return;
    }

    const playlist = playlists.find((p) => p.id === playlistId);
    if (playlist && !playlist.songs.includes(songId)) {
      onAddToPlaylist(playlistId, songId);
      showSuccessToast("Utwór dodany do playlisty.");
    } else {
      showInfoToast("Utwór już istnieje w tej playliście.");
    }
  };

  return (
    <div className="space-y-2 overflow-y-auto flex-grow">
      {playlists.length < 2 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition duration-300 mb-4"
        >
          + Utwórz nową<br />playlistę
        </button>
      )}
      {isModalOpen && (
        <CreatePlaylistModal
          onClose={() => setIsModalOpen(false)}
          onCreatePlaylist={onCreatePlaylist}
          showSuccessToast={showSuccessToast}
          showErrorToast={showErrorToast}
        />
      )}
      {playlists.map((playlist) => (
        <div key={playlist.id} className={`playlist ${playlist.id === currentPlaylistId ? 'active-playlist' : ''} bg-white p-4 rounded-lg shadow-md`}>
          <div className="flex flex-col items-start mb-2">
            <div className="flex items-center w-full justify-between mb-2">
              <div className="flex items-center group">
                <button
                  onClick={() => onPlayPlaylist(playlist.id)}
                  className={`text-gray-600 p-3 rounded-full transition-all duration-300 ease-in-out ${
                    currentPlaylistId === playlist.id
                      ? "bg-gray-100 shadow-inner transform translate-y-px"
                      : "bg-white hover:bg-gray-50 active:bg-gray-100 active:shadow-inner active:transform active:translate-y-px"
                  }`}
                  title="Odtwórz playlistę"
                >
                  <FaPlay className={`text-xl ${currentPlaylistId === playlist.id ? "text-purple-500" : ""}`} />
                </button>
                <span className="font-semibold text-lg ml-3">{playlist.name}</span>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-600">
                {playlist.songs.length} utworów
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setExpandedPlaylist(expandedPlaylist === playlist.id ? null : playlist.id)}
                  className="text-purple-500 hover:text-purple-700"
                  title={expandedPlaylist === playlist.id ? "Zwiń" : "Rozwiń"}
                >
                  {expandedPlaylist === playlist.id ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <button
                  onClick={() => {
                    const newName = prompt("Podaj nową nazwę playlisty:", playlist.name);
                    if (newName) onRenamePlaylist(playlist.id, newName);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                  title="Zmień nazwę"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Czy na pewno chcesz usunąć tę playlistę?')) {
                      onDeletePlaylist(playlist.id);
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                  title="Usuń"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
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
                      onClick={() => handleAddToPlaylist(playlist.id, song.id)}
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
                      <div className="flex items-center flex-grow">
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
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onRemoveSongFromPlaylist(playlist.id, songId)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          aria-label={`Usuń utwór ${songDetails?.title} z playlisty`}
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
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
