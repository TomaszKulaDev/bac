import React from "react";
import { Playlist } from "../../types";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaChevronUp,
  FaChevronDown,
  FaEdit,
  FaTrash,
  FaMusic,
  FaPlay,
} from "react-icons/fa";
import DraggableSongItem from "../DraggableSongItem";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CreatePlaylistModal } from "../drawers";
import { DragEndEvent } from "@dnd-kit/core";

export interface PlaylistManagerContentProps {
  playlists: Playlist[];
  isAuthenticated: boolean;
  setCurrentPlaylistId: (id: string | null) => void;
  onRefresh?: () => Promise<void>;
  expandedPlaylist: string | null;
  setExpandedPlaylist: (id: string | null) => void;
  onDeletePlaylist: (id: string) => Promise<void>;
  onRenamePlaylist: (id: string, newName: string) => Promise<void>;
  onRemoveSongFromPlaylist: (
    playlistId: string,
    songId: string
  ) => Promise<void>;
  onCreatePlaylist: (name: string) => Promise<void>;
  isMobile: boolean;
  onPlayPlaylist: (id: string) => void;
  currentPlaylistId: string | null;
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  sensors: any[]; // Możesz zastąpić 'any' bardziej konkretnym typem z dnd-kit
  onDragEnd: (event: DragEndEvent, currentPlaylist: Playlist) => void;
  getSongDetails: (songId: string) => Promise<any>; // Możesz zastąpić 'any' konkretnym typem piosenki
}

const PlaylistManagerContent: React.FC<PlaylistManagerContentProps> = ({
  playlists,
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
  getSongDetails,
  isAuthenticated,
  setCurrentPlaylistId,
  onRefresh,
}) => {
  const maxPlaylistsReached = playlists.length >= 2;
  const buttonText = !isAuthenticated
    ? "Zaloguj się, aby utworzyć swoją playlistę"
    : maxPlaylistsReached
    ? "Osiągnięto limit playlist (max. 2)"
    : "+ Utwórz nową playlistę";

  const handleDeletePlaylist = async (playlistId: string) => {
    try {
      await onDeletePlaylist(playlistId);
      showSuccessToast("Playlista została usunięta");
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      showErrorToast("Nie udało się usunąć playlisty");
    }
  };

  return (
    <div className="space-y-4 overflow-y-auto flex-grow p-4">
      <button
        onClick={() => {
          if (!isAuthenticated) {
            showErrorToast("Musisz być zalogowany, aby utworzyć playlistę");
            return;
          }
          if (maxPlaylistsReached) {
            showErrorToast("Możesz utworzyć maksymalnie 2 playlisty");
            return;
          }
          setIsModalOpen(true);
        }}
        className={`w-full py-3 px-4 rounded-lg transition-colors duration-200 
          flex items-center justify-center gap-2 font-medium
          ${
            maxPlaylistsReached
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-navy-700 hover:bg-navy-800"
          } 
          text-white`}
        disabled={maxPlaylistsReached}
      >
        <FaPlus
          className={`text-lg ${
            (!isAuthenticated || maxPlaylistsReached) && "hidden"
          }`}
        />
        {buttonText}
      </button>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreatePlaylist={onCreatePlaylist}
        isAuthenticated={isAuthenticated}
        showErrorToast={showErrorToast}
        playlists={playlists}
      />

      {playlists.map((playlist) => (
        <div key={playlist.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onPlayPlaylist(playlist.id)}
              className="flex items-center gap-2 text-lg font-medium"
            >
              <FaMusic className="text-gray-400" />
              {playlist.name}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDeletePlaylist(playlist.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Usuń playlistę"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistManagerContent;
