import React from "react";
import { PlaylistManagerContentProps } from "../../types";
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
import CreatePlaylistModal from "../CreatePlaylistModal";

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
}) => {
  const maxPlaylistsReached = playlists.length >= 2;
  const buttonText = !isAuthenticated
    ? "Zaloguj się, aby utworzyć swoją playlistę"
    : maxPlaylistsReached
    ? "Osiągnięto limit playlist (max. 2)"
    : "+ Utwórz nową playlistę";

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
      {/* Kopiujemy JSX z oryginalnego PlaylistManager.tsx (linie 119-267) */}
    </div>
  );
};

export default PlaylistManagerContent;
