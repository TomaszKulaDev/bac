import { FaPlus, FaBookmark } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface ActionButtonsProps {
  currentSongId: string | undefined;
  onCreatePlaylist: () => void;
  onAddToPlaylist: (songId: string) => void;
  playlistCount: number;
  hasPlaylistsAndExpanded: boolean;
  isAuthenticated: boolean;
}

export default function ActionButtons({
  currentSongId,
  onCreatePlaylist,
  onAddToPlaylist,
  playlistCount,
  hasPlaylistsAndExpanded,
  isAuthenticated,
}: ActionButtonsProps) {
  if (!isAuthenticated) {
    return null;
  }

  const isAddToPlaylistDisabled =
    !isAuthenticated || !hasPlaylistsAndExpanded || !currentSongId;

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCreatePlaylist}
        className="p-2 rounded-full text-gray-500 hover:text-amber-500 
          hover:bg-gray-100 transition-all duration-200"
        disabled={!isAuthenticated}
      >
        <FaPlus size={18} />
      </motion.button>

      <AnimatePresence>
        {!isAddToPlaylistDisabled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => currentSongId && onAddToPlaylist(currentSongId)}
            className="p-2 rounded-full text-gray-500 hover:text-amber-500
              hover:bg-gray-100 transition-all duration-200"
            title="Dodaj do playlisty"
          >
            <FaBookmark size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
