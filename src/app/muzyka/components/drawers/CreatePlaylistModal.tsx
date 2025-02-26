import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaMusic } from "react-icons/fa";
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
  const [isFocused, setIsFocused] = useState(false);

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
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative bg-white rounded-2xl w-[90%] max-w-md overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Nowa playlista
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                    <FaMusic size={24} className="text-gray-400" />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Dostępne miejsca
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {playlists.length}/{MAX_PLAYLISTS}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${(playlists.length / MAX_PLAYLISTS) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="playlistName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nazwa playlisty
                  </label>
                  <div
                    className={`relative transition-all duration-200 ${
                      isFocused ? "ring-2 ring-amber-500/80 rounded-xl" : ""
                    }`}
                  >
                    <input
                      id="playlistName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Np. Moje ulubione"
                      className={`w-full px-4 py-3 bg-white border rounded-xl
                      text-gray-900 placeholder-gray-400
                      transition-all outline-none
                      ${
                        playlists.length >= MAX_PLAYLISTS
                          ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                          : isFocused
                          ? "border-transparent"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      autoFocus
                      disabled={playlists.length >= MAX_PLAYLISTS}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full px-6 py-3.5 rounded-xl font-medium text-base
                    transition-all duration-200 ${
                      playlists.length >= MAX_PLAYLISTS
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-amber-500 text-white hover:bg-amber-600 shadow-md hover:shadow-lg"
                    }`}
                  disabled={playlists.length >= MAX_PLAYLISTS}
                >
                  {playlists.length >= MAX_PLAYLISTS
                    ? "Osiągnięto limit playlist"
                    : "Utwórz playlistę"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreatePlaylistModal;
