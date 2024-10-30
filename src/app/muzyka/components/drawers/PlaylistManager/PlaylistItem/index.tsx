import { motion } from "framer-motion";
import {
  FaPlay,
  FaChevronUp,
  FaChevronDown,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import PlaylistSongs from "./PlaylistSongs";
import { Playlist, Song } from "../../../../types";
import PlaylistHeader from "../../../PlaylistHeader";

interface PlaylistItemProps {
  playlist: Playlist;
  songs: Song[];
  isExpanded: boolean;
  onExpand: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onRemoveSong: (playlistId: string, songId: string) => void;
  onPlay: (id: string) => void;
  isCurrentPlaylist: boolean;
  isAuthenticated: boolean;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  playlist,
  songs,
  isExpanded,
  onExpand,
  onDelete,
  onRename,
  onRemoveSong,
  onPlay,
  isCurrentPlaylist,
  isAuthenticated,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300
        ${isCurrentPlaylist ? "ring-2 ring-[#2a4a7f] ring-opacity-50" : ""}
      `}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <PlaylistHeader playlist={playlist} onPlay={onPlay} />
          <PlaylistControls
            isExpanded={isExpanded}
            onExpand={onExpand}
            onRename={() => {
              const newName = prompt(
                "Podaj nową nazwę playlisty:",
                playlist.name
              );
              if (newName) onRename(playlist.id, newName);
            }}
            onDelete={() => {
              if (window.confirm("Czy na pewno chcesz usunąć tę playlistę?")) {
                onDelete(playlist.id);
              }
            }}
          />
        </div>

        <PlaylistSongs
          isExpanded={isExpanded}
          playlist={playlist}
          songs={songs}
          onRemoveSong={onRemoveSong}
        />
      </div>
    </motion.div>
  );
};

export default PlaylistItem;
