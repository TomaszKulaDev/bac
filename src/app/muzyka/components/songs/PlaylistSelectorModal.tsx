import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlus, FaMusic } from "react-icons/fa";
import { Playlist } from "../../types";

interface PlaylistSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlists: Playlist[];
  onSelectPlaylist: (playlistId: string) => void;
  songName: string;
}

export const PlaylistSelectorModal: React.FC<PlaylistSelectorModalProps> = ({
  isOpen,
  onClose,
  playlists,
  onSelectPlaylist,
  songName,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[90%] max-w-md bg-white rounded-xl shadow-xl z-50 
                     overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Wybierz playlistę
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Dodaj &quot;{songName}&quot; do playlisty
              </p>
            </div>

            {/* Playlists */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {playlists.length === 0 ? (
                <div className="text-center py-8">
                  <FaMusic className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    Nie masz jeszcze żadnych playlist
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Utwórz playlistę, aby dodać do niej utwory
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {playlists.map((playlist) => (
                    <motion.button
                      key={playlist.id}
                      onClick={() => onSelectPlaylist(playlist.id)}
                      className="w-full p-3 flex items-center justify-between
                               bg-white hover:bg-gray-50 
                               border border-gray-200 hover:border-gray-300
                               rounded-lg transition-colors group"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 bg-gray-100 rounded-lg 
                                    flex items-center justify-center"
                        >
                          <FaMusic className="text-gray-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">
                            {playlist.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {playlist.songs.length} utworów
                          </p>
                        </div>
                      </div>
                      <FaPlus
                        className="text-gray-400 group-hover:text-gray-600 
                                     transition-colors"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
