import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlus } from "react-icons/fa";
import { Playlist } from '@/app/muzyka/types';
import { BaseDrawerProps } from './types';

interface CreatePlaylistDrawerProps extends BaseDrawerProps {
  onCreatePlaylist: () => void;
  playlists: Playlist[];
}

const CreatePlaylistDrawer: React.FC<CreatePlaylistDrawerProps> = ({
  isOpen,
  onClose,
  onCreatePlaylist,
  isAuthenticated,
  showErrorToast,
  playlists,
}) => {
  const handleCreatePlaylist = () => {
    if (!isAuthenticated) {
      showErrorToast("Musisz być zalogowany, aby tworzyć playlisty");
      return;
    }
    onCreatePlaylist();
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
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 rounded-t-3xl"
          >
            <div className="p-6 space-y-4">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-xl font-semibold text-center">Nowa playlista</h2>
              <button
                onClick={handleCreatePlaylist}
                className="w-full bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white px-6 py-3 rounded-lg 
                font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaPlus className="text-lg" />
                <span>Utwórz nową playlistę</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreatePlaylistDrawer;