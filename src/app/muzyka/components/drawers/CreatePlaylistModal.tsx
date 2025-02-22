import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Playlist } from "@/app/muzyka/types";
import { CreatePlaylistModalProps } from "./types";

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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              bg-white shadow-xl z-50 rounded-xl w-[90%] max-w-md p-6"
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
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nazwa playlisty"
                className="w-full p-2 border rounded"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white 
                  px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl 
                  transition-all duration-300"
              >
                Utwórz playlistę
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreatePlaylistModal;
