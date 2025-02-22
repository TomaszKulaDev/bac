import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Playlist } from "@/app/muzyka/types";
import { CreatePlaylistModalProps } from "./types";

const MAX_PLAYLISTS = 2;

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  onClose,
  onCreatePlaylist,
  isAuthenticated,
  showErrorToast,
  playlists,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby utworzyć playlistę");
      return;
    }

    if (playlists.length >= MAX_PLAYLISTS) {
      showErrorToast(`Możesz utworzyć maksymalnie ${MAX_PLAYLISTS} playlisty`);
      return;
    }

    if (!name.trim()) {
      showErrorToast("Nazwa playlisty nie może być pusta");
      return;
    }

    onCreatePlaylist(name);
    setName("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-xl w-[90%] max-w-md p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Nowa playlista</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="text-sm text-gray-600">
                Utworzono {playlists.length} z {MAX_PLAYLISTS} możliwych
                playlist
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nazwa playlisty"
                className="w-full p-2 border rounded"
                autoFocus
                disabled={playlists.length >= MAX_PLAYLISTS}
              />
              <button
                type="submit"
                className={`w-full px-6 py-3 rounded-lg font-medium shadow-lg 
                  transition-all duration-300 ${
                    playlists.length >= MAX_PLAYLISTS
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white hover:shadow-xl"
                  }`}
                disabled={playlists.length >= MAX_PLAYLISTS}
              >
                {playlists.length >= MAX_PLAYLISTS
                  ? "Osiągnięto limit playlist"
                  : "Utwórz playlistę"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreatePlaylistModal;
