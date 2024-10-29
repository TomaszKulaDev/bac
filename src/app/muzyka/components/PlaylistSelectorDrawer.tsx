import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlay, FaMusic } from "react-icons/fa";
import { Playlist } from "../types";

interface PlaylistSelectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  playlists: Playlist[];
  currentPlaylistId: string | null;
  onPlayPlaylist: (id: string) => void;
  isAuthenticated: boolean;
  showErrorToast: (message: string) => void;
}

const PlaylistSelectorDrawer: React.FC<PlaylistSelectorDrawerProps> = ({
  isOpen,
  onClose,
  playlists,
  currentPlaylistId,
  onPlayPlaylist,
  isAuthenticated,
  showErrorToast,
}) => {
  const handlePlaylistSelect = useCallback((playlistId: string) => {
    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby odtwarzać playlisty");
      return;
    }
    onPlayPlaylist(playlistId);
    onClose();
  }, [isAuthenticated, showErrorToast, onPlayPlaylist, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 rounded-t-3xl max-h-[60vh]"
          >
            <div className="sticky top-0 bg-white p-4 border-b rounded-t-3xl">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Twoje Playlisty
              </h2>
            </div>
            <div className="p-4 space-y-2 overflow-y-auto">
              {playlists.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <FaMusic size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Nie masz jeszcze żadnych playlist</p>
                </div>
              ) : (
                playlists.map((playlist) => (
                  <motion.button
                    key={playlist.id}
                    onClick={() => handlePlaylistSelect(playlist.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-lg flex items-center justify-between
                      ${
                        currentPlaylistId === playlist.id
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <FaMusic
                        className={
                          currentPlaylistId === playlist.id
                            ? "text-purple-700"
                            : "text-gray-400"
                        }
                      />
                      <span className="font-medium">{playlist.name}</span>
                      <span className="text-sm text-gray-500">
                        ({playlist.songs.length} utworów)
                      </span>
                    </div>
                    {currentPlaylistId === playlist.id && (
                      <FaPlay className="text-purple-700" />
                    )}
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlaylistSelectorDrawer;
