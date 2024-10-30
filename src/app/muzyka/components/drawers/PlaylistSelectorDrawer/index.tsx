import BaseDrawer from "../base/BaseDrawer";
import PlaylistList from "./PlaylistList";
import { PlaylistSelectorDrawerProps } from "../../../types";
import { useCallback } from "react";

const PlaylistSelectorDrawer: React.FC<PlaylistSelectorDrawerProps> = ({
  isOpen,
  onClose,
  playlists,
  currentPlaylistId,
  onPlayPlaylist,
  isAuthenticated,
  showErrorToast,
}) => {
  const handlePlaylistSelect = useCallback(
    (playlistId: string) => {
      if (!isAuthenticated) {
        showErrorToast("Musisz być zalogowany, aby odtwarzać playlisty");
        return;
      }
      onPlayPlaylist(playlistId);
      onClose();
    },
    [isAuthenticated, showErrorToast, onPlayPlaylist, onClose]
  );

  return (
    <BaseDrawer isOpen={isOpen} onClose={onClose} title="Twoje Playlisty">
      <PlaylistList
        playlists={playlists}
        currentPlaylistId={currentPlaylistId}
        onPlaylistSelect={handlePlaylistSelect}
      />
    </BaseDrawer>
  );
};

export default PlaylistSelectorDrawer;
