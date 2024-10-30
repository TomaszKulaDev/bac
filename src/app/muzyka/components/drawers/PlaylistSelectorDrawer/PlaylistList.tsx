import { motion } from "framer-motion";
import { FaMusic, FaPlay } from "react-icons/fa";
import { Playlist } from "../../../types";

interface PlaylistListProps {
  playlists: Playlist[];
  currentPlaylistId: string | null;
  onPlaylistSelect: (playlistId: string) => void;
}

const PlaylistList: React.FC<PlaylistListProps> = ({
  playlists,
  currentPlaylistId,
  onPlaylistSelect,
}) => {
  if (playlists.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <FaMusic size={48} className="mx-auto mb-4 opacity-50" />
        <p>Nie masz jeszcze żadnych playlist</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      {playlists.map((playlist) => (
        <motion.button
          key={playlist.id}
          onClick={() => onPlaylistSelect(playlist.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full text-left p-4 rounded-lg flex items-center justify-between
            ${
              currentPlaylistId === playlist.id
                ? "bg-purple-50 text-purple-700 border border-purple-200"
                : "hover:bg-gray-50 border border-transparent"
            }`}
        >
          <div className="flex items-center space-x-3">
            <FaMusic
              className={
                currentPlaylistId === playlist.id
                  ? "text-purple-700"
                  : "text-gray-400"
              }
            />
            <span className="font-medium">{playlist.name}</span>
            <span className="text-sm text-gray-500">
              ({playlist.songs.length} utworów)
            </span>
          </div>
          {currentPlaylistId === playlist.id && (
            <FaPlay className="text-purple-700" />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default PlaylistList;
