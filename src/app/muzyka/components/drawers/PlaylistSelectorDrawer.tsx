import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlay, FaMusic, FaPlus } from "react-icons/fa";
import { BaseDrawerProps } from "./types";
import { Playlist } from "@/app/muzyka/types";

interface PlaylistSelectorDrawerProps extends BaseDrawerProps {
  playlists: Playlist[];
  currentPlaylistId: string | null;
  onPlayPlaylist: (playlistId: string) => void;
  onCreatePlaylist?: () => void;
}

const PlaylistSelectorDrawer: React.FC<PlaylistSelectorDrawerProps> = ({
  isOpen,
  onClose,
  playlists,
  currentPlaylistId,
  onPlayPlaylist,
  isAuthenticated,
  showErrorToast,
  onCreatePlaylist,
}) => {
  const handlePlaylistSelect = useCallback(
    (playlistId: string) => {
      if (!isAuthenticated) {
        showErrorToast("Musisz być zalogowany, aby odtwarzać playlisty");
        return;
      }
      onPlayPlaylist(playlistId);
      onClose();
    },
    [isAuthenticated, showErrorToast, onPlayPlaylist, onClose]
  );

  const handleSelect = (playlist: Playlist) => {
    if (!playlist.id) {
      console.error("Playlist ID is missing");
      return;
    }
    handlePlaylistSelect(playlist.id);
  };

  const handleCreateClick = () => {
    onClose();
    onCreatePlaylist?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-50 rounded-t-[32px] max-h-[85vh] overflow-hidden"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 pt-4 pb-5">
              <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Twoje Playlisty
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(85vh-100px)]">
              <div className="px-6 pb-6 space-y-2">
                {playlists.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-50 flex items-center justify-center">
                      <FaMusic size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg mb-8">
                      Nie masz jeszcze żadnych playlist
                    </p>
                    {onCreatePlaylist && (
                      <button
                        onClick={handleCreateClick}
                        className="inline-flex items-center px-5 py-3 rounded-xl 
                        bg-amber-500 text-white font-medium shadow-md
                        hover:bg-amber-600 hover:shadow-lg
                        transition-all duration-200 gap-2"
                      >
                        <FaPlus size={16} />
                        <span>Utwórz nową playlistę</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    {playlists.map((playlist) => (
                      <motion.button
                        key={playlist.id}
                        onClick={() => handleSelect(playlist)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full p-4 rounded-2xl flex items-center justify-between
                          transition-all duration-200 ${
                            currentPlaylistId === playlist.id
                              ? "bg-gray-50 border border-gray-200"
                              : "hover:bg-gray-50 border border-transparent"
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center
                            ${
                              currentPlaylistId === playlist.id
                                ? "bg-white border border-gray-200"
                                : "bg-gray-100"
                            }`}
                          >
                            <FaMusic
                              size={18}
                              className={
                                currentPlaylistId === playlist.id
                                  ? "text-amber-500"
                                  : "text-gray-400"
                              }
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-900 mb-1">
                              {playlist.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              {playlist.songs.length}{" "}
                              {playlist.songs.length === 1
                                ? "utwór"
                                : "utworów"}
                            </span>
                          </div>
                        </div>
                        {currentPlaylistId === playlist.id && (
                          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                            <FaPlay size={16} className="text-amber-500 ml-1" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                    {onCreatePlaylist && playlists.length < 2 && (
                      <motion.button
                        onClick={handleCreateClick}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full mt-2 p-4 rounded-2xl border border-gray-200
                        text-gray-700 hover:bg-gray-50
                        transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <FaPlus size={16} />
                        <span className="font-medium">
                          Utwórz nową playlistę
                        </span>
                      </motion.button>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlaylistSelectorDrawer;
