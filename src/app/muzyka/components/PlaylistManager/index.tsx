import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PlaylistManagerProps } from "../../types";
import PlaylistManagerContent from "./PlaylistManagerContent";
import { usePlaylistData } from "../../hooks/usePlaylistData";
import { Playlist as AppPlaylist } from "../../types";
import { Playlist as StorePlaylist } from "@/store/slices/types";
import { Song } from "../../types";
import { DragEndEvent } from "@dnd-kit/core";

const PlaylistManager: React.FC<PlaylistManagerProps> = ({
  setCurrentPlaylistId,
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
  setIsModalOpen,
  isModalOpen,
  showSuccessToast,
  showErrorToast,
  sensors,
  onDragEnd,
  ...props
}) => {
  const {
    playlists: storePlaylists,
    isLoading,
    error,
    isAuthenticated,
    refreshPlaylists,
  } = usePlaylistData();

  // Konwertuj playlists do formatu wymaganego przez komponent
  const playlists: AppPlaylist[] = storePlaylists.map((playlist) => ({
    _id: playlist._id,
    id: playlist.id || playlist._id,
    name: playlist.name,
    songs: playlist.songs,
    createdAt: new Date(playlist.createdAt),
    userId: playlist.userId,
  }));

  const getSongDetails = (songId: string): Song | undefined => {
    return songs.find((song) => song.id === songId);
  };

  if (isLoading) {
    return <div>Ładowanie playlist...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        {error}
        <button
          onClick={refreshPlaylists}
          className="ml-2 text-blue-500 hover:underline"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  const contentProps = {
    ...props,
    playlists,
    isAuthenticated,
    setCurrentPlaylistId,
    onRefresh: refreshPlaylists,
    songs,
    expandedPlaylist,
    setExpandedPlaylist,
    onDeletePlaylist: async (id: string) => {
      await onDeletePlaylist(id);
    },
    onRenamePlaylist: async (id: string, newName: string) => {
      await onRenamePlaylist(id, newName);
    },
    onRemoveSongFromPlaylist: async (playlistId: string, songId: string) => {
      await onRemoveSongFromPlaylist(playlistId, songId);
    },
    onCreatePlaylist: async (name: string) => {
      await onCreatePlaylist(name);
    },
    isMobile,
    onPlayPlaylist,
    currentPlaylistId,
    setIsModalOpen,
    isModalOpen,
    showSuccessToast,
    showErrorToast,
    sensors,
    onDragEnd: async (event: DragEndEvent, currentPlaylist: AppPlaylist) => {
      onDragEnd(event, currentPlaylist);
    },
    getSongDetails: async (songId: string) => getSongDetails(songId),
  };

  return <PlaylistManagerContent {...contentProps} />;
};

export default PlaylistManager;
