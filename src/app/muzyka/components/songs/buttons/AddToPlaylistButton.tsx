import { memo } from "react";
import { motion } from "framer-motion";
import { FaBookmark } from "react-icons/fa";
import { MusicTooltip } from "../../ui/MusicTooltip";

interface AddToPlaylistButtonProps {
  onClick: (e: React.MouseEvent) => void;
  isAuthenticated: boolean;
  hasPlaylists: boolean;
}

export const AddToPlaylistButton = memo(
  ({ onClick, isAuthenticated, hasPlaylists }: AddToPlaylistButtonProps) => {
    if (!isAuthenticated || !hasPlaylists) return null;

    return (
      <MusicTooltip content="Dodaj do playlisty" position="top">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="p-2 rounded-full hover:bg-blue-50 text-gray-500 hover:text-blue-500
                 transition-all duration-200"
        >
          <FaBookmark className="text-xl" />
        </motion.button>
      </MusicTooltip>
    );
  }
);

AddToPlaylistButton.displayName = "AddToPlaylistButton";
