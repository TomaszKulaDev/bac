import { motion } from "framer-motion";
import { FaMusic, FaTrash } from "react-icons/fa";
import { Playlist, Song } from "../../../../types";

interface PlaylistSongsProps {
  isExpanded: boolean;
  playlist: Playlist;
  songs: Song[];
  onRemoveSong: (playlistId: string, songId: string) => void;
}

const PlaylistSongs: React.FC<PlaylistSongsProps> = ({
  isExpanded,
  playlist,
  songs,
  onRemoveSong,
}) => {
  if (!isExpanded) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="mt-4 space-y-2"
    >
      {playlist.songs.map((songId) => {
        const song = songs.find((s) => s.id === songId || s._id === songId);
        if (!song) return null;
        
        return (
          <div key={songId} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
            <button
              onClick={() => onRemoveSong(playlist.id, songId)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full"
            >
              <FaTrash />
            </button>
          </div>
        );
      })}
    </motion.div>
  );
};

export default PlaylistSongs; 