import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaPlay, FaChevronUp, FaChevronDown, FaEdit, FaTrash, FaPlus, FaMusic } from "react-icons/fa";
import { Playlist, Song } from "../types";
import { getYouTubeThumbnail } from "../utils/youtube";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const getSongDetails = (songId: string): Song | undefined => 
    songs.find((song) => song._id === songId || song.id === songId);

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
    <div className="space-y-4 overflow-y-auto flex-grow p-4">
      {playlists.length < 2 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white px-6 py-3 rounded-lg 
            font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FaPlus className="text-lg" />
          <span>Utwórz nową playlistę</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <CreatePlaylistModal
            onClose={() => setIsModalOpen(false)}
            onCreatePlaylist={onCreatePlaylist}
            showSuccessToast={showSuccessToast}
            showErrorToast={showErrorToast}
          />
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {playlists.map((playlist) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300
              ${playlist.id === currentPlaylistId ? 'ring-2 ring-[#2a4a7f] ring-opacity-50' : ''}
            `}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onPlayPlaylist(playlist.id)}
                    className={`
                      p-3 rounded-full bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white
                      shadow-md hover:shadow-lg transition-all duration-300
                    `}
                  >
                    <FaPlay className="text-lg" />
                  </motion.button>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{playlist.name}</h3>
                    <p className="text-sm text-gray-500">{playlist.songs.length} utworów</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setExpandedPlaylist(expandedPlaylist === playlist.id ? null : playlist.id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {expandedPlaylist === playlist.id ? <FaChevronUp /> : <FaChevronDown />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const newName = prompt("Podaj nową nazwę playlisty:", playlist.name);
                      if (newName) onRenamePlaylist(playlist.id, newName);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-blue-500"
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (window.confirm('Czy na pewno chcesz usunąć tę playlistę?')) {
                        onDeletePlaylist(playlist.id);
                      }
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-red-500"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {expandedPlaylist === playlist.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 mt-4">
                      {playlist.songs.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <FaMusic className="mx-auto text-4xl mb-2 opacity-50" />
                          <p>Playlist jest pusta. Dodaj swoje ulubione utwory!</p>
                        </div>
                      ) : (
                        playlist.songs.map((songId) => {
                          const songDetails = getSongDetails(songId);
                          return songDetails ? (
                            <motion.div
                              key={songId}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center space-x-4">
                                <Image
                                  src={getYouTubeThumbnail(songDetails.youtubeId)}
                                  alt={songDetails.title}
                                  width={48}
                                  height={48}
                                  className="rounded-md object-cover"
                                />
                                <div>
                                  <p className="font-medium text-gray-800">{songDetails.title}</p>
                                  <p className="text-sm text-gray-500">{songDetails.artist}</p>
                                </div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onRemoveSongFromPlaylist(playlist.id, songId)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <FaTrash />
                              </motion.button>
                            </motion.div>
                          ) : (
                            <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                              Utwór niedostępny
                            </div>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {!isMobile && playlists.length >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-yellow-50 p-4 rounded-lg text-yellow-800 text-sm"
        >
          Osiągnięto limit 2 playlist. Usuń jedną z istniejących, aby utworzyć nową albo wykup premium.
        </motion.div>
      )}
    </div>
  );
};

export default PlaylistManager;
