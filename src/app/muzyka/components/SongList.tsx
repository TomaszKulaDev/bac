// src/app/muzyka/components/SongList.tsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaBookmark, FaHeart } from "react-icons/fa";
import { Song, SortOption, SortOrder } from "../types";
import { motion } from "framer-motion";
import { getYouTubeThumbnail } from "../utils/youtube";
import { getSortValue } from "../utils/sortUtils";
import { useSortedAndFilteredSongs } from "../hooks/useSortedAndFilteredSongs";

interface SongListProps {
  songs: Song[];
  visibleSongs: number;
  isPlaying: boolean;
  onSongSelect: (songId: string) => void;
  onLoadMore: () => void;
  onCollapse: () => void;
  isPopularList: boolean;
  expandedPlaylist: string | null;
  setExpandedPlaylist: React.Dispatch<React.SetStateAction<string | null>>;
  onAddToPlaylist: (songId: string) => void;
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSortChange: (newSortBy: SortOption, newSortOrder: SortOrder) => void;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  currentSong: Song | null;
  isPlaylistExpanded: boolean;
  showSearch: boolean;
  hasPlaylists: boolean;
  isAuthenticated: boolean;
  isMobile: boolean; // dodaj ten prop
}

const SongList: React.FC<SongListProps> = ({
  songs = [],
  visibleSongs,
  isPlaying,
  onSongSelect,
  onLoadMore,
  onCollapse,
  isPopularList,
  expandedPlaylist,
  setExpandedPlaylist,
  onAddToPlaylist,
  sortBy,
  sortOrder,
  onSortChange,
  currentSong,
  isPlaylistExpanded,
  filterText,
  setFilterText,
  showSearch,
  hasPlaylists,
  isAuthenticated,
  isMobile, // dodaj ten prop
}) => {
  const [showNotification, setShowNotification] = useState(false);

  const sortedAndFilteredSongs = useSortedAndFilteredSongs(
    songs,
    sortBy,
    sortOrder,
    filterText
  );

  const handleSort = useCallback(
    (newSortBy: SortOption) => {
      const newSortOrder =
        sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
      onSortChange(newSortBy, newSortOrder);
    },
    [sortBy, sortOrder, onSortChange]
  );

  const onSongSelectMemoized = useCallback(
    (songId: string) => {
      onSongSelect(songId);
    },
    [onSongSelect]
  );

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(243, 244, 246, 1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <div className="overflow-y-auto flex-grow">
      {showSearch && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filtruj utwory..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      <motion.ul
        layout
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {sortedAndFilteredSongs.map((song) => (
          <motion.li
            key={song.id}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            className={`flex items-center justify-between p-4 ${
              song.id === currentSong?.id ? "bg-blue-100 shadow-md" : "bg-white"
            } rounded-xl shadow-sm transition-all duration-200`}
            onClick={() => onSongSelectMemoized(song.id)}
          >
            <div className="flex items-center flex-grow min-w-0 mr-4">
              <motion.div
                className="w-14 h-14 mr-6 relative flex-shrink-0 rounded-lg overflow-hidden shadow-md"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Image
                  src={getYouTubeThumbnail(song.youtubeId)}
                  alt={song.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                {song.id === currentSong?.id && isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
                  >
                    <FaPlay className="text-white text-xl" />
                  </motion.div>
                )}
              </motion.div>
              <div className="flex-grow min-w-0 mr-4 ml-2">
                <h3 className="font-semibold truncate text-sm mb-1">
                  {song.title.length > 20
                    ? song.title.slice(0, 31) + "..."
                    : song.title}
                </h3>
                <p className="text-xs text-gray-600 truncate mb-2">
                  {song.artist.length > 20
                    ? song.artist.slice(0, 31) + "..."
                    : song.artist}
                </p>
                {song.playlists && song.playlists.length > 0 && (
                  <div className="flex flex-wrap mt-1">
                    {song.playlists.slice(0, 3).map((playlist) => (
                      <span
                        key={playlist}
                        className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded mr-1 mb-1"
                      >
                        {playlist.length > 10
                          ? playlist.slice(0, 10) + "..."
                          : playlist}
                      </span>
                    ))}
                    {song.playlists.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{song.playlists.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <FaHeart className="text-xl" />
                </motion.button>
              )}

              {isPlaylistExpanded && expandedPlaylist && hasPlaylists && (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToPlaylist(song.id);
                  }}
                  className="p-2 rounded-full hover:bg-blue-50 text-gray-500 hover:text-blue-500 transition-colors duration-200"
                >
                  <FaBookmark className="text-xl" />
                </motion.button>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>
      {!isPopularList && visibleSongs < songs.length && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          onClick={onLoadMore}
          className="w-full py-2 mt-4 text-blue-600 hover:bg-gray-100 transition-colors duration-200 rounded-md"
        >
          Załaduj więcej
        </motion.button>
      )}
    </div>
  );
};

export default SongList;
