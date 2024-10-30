import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import PlaylistItem from "./PlaylistItem";
import CreatePlaylistButton from "./CreatePlaylistButton";
import CreatePlaylistModal from "../../CreatePlaylistModal";
import { PlaylistManagerProps } from "../../../types";
import { AnimatePresence, motion } from "framer-motion";

const PlaylistManager: React.FC<PlaylistManagerProps> = ({
  playlists,
  songs,
  expandedPlaylist,
  setExpandedPlaylist,
  onDeletePlaylist,
  onRenamePlaylist,
  onRemoveSongFromPlaylist,
  onCreatePlaylist,
  isMobile,
  onPlayPlaylist,
  currentPlaylistId,
  onAddToPlaylist,
  setIsModalOpen,
  isModalOpen,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="space-y-4 overflow-y-auto flex-grow p-4">
      {playlists.length < 2 && (
        <CreatePlaylistButton onClick={() => setIsModalOpen(true)} />
      )}

      <AnimatePresence>
        {isModalOpen && (
          <CreatePlaylistModal
            onClose={() => setIsModalOpen(false)}
            onCreatePlaylist={onCreatePlaylist}
            showSuccessToast={showSuccessToast}
            showErrorToast={showErrorToast}
          />
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {playlists.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            songs={songs}
            isExpanded={expandedPlaylist === playlist.id}
            onExpand={() =>
              setExpandedPlaylist(
                expandedPlaylist === playlist.id ? null : playlist.id
              )
            }
            onDelete={onDeletePlaylist}
            onRename={onRenamePlaylist}
            onRemoveSong={onRemoveSongFromPlaylist}
            onPlay={onPlayPlaylist}
            isCurrentPlaylist={currentPlaylistId === playlist.id}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>

      {!isMobile && playlists.length >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-yellow-50 p-4 rounded-lg text-yellow-800 text-sm"
        >
          Osiągnięto limit 2 playlist. Usuń jedną z istniejących, aby utworzyć
          nową albo wykup premium.
        </motion.div>
      )}
    </div>
  );
};

export default PlaylistManager;
