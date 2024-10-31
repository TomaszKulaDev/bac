import { motion } from "framer-motion";
import { FaBookmark } from "react-icons/fa";
import { memo } from "react";

interface AddToPlaylistButtonProps {
  onClick: (e: React.MouseEvent) => void;
  songTitle: string;
}

export const AddToPlaylistButton = memo(({ onClick, songTitle }: AddToPlaylistButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
    aria-label={`Dodaj ${songTitle} do playlisty`}
  >
    <FaBookmark className="text-lg" />
  </motion.button>
));

AddToPlaylistButton.displayName = 'AddToPlaylistButton';
