import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  FaPlay,
  FaBookmark,
  FaHeart,
} from "react-icons/fa";
import { Song, SortOption, SortOrder } from "../types";
import { motion } from "framer-motion";
import { getYouTubeThumbnail } from "../utils/youtube";
import { getSortValue } from '../utils/sortUtils';
import { useSortedAndFilteredSongs } from '../hooks/useSortedAndFilteredSongs';

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
  onSortChange: (
    newSortBy: SortOption,
    newSortOrder: SortOrder
  ) => void;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  currentSong: Song | null;
  isPlaylistExpanded: boolean;
  showSearch: boolean;
  hasPlaylists: boolean;
  isAuthenticated: boolean;
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
}) => {
  const [showNotification, setShowNotification] = useState(false);

  const sortedAndFilteredSongs = useSortedAndFilteredSongs(songs, sortBy, sortOrder, filterText);

  const handleSort = useCallback(
    (newSortBy: SortOption) => {
      const newSortOrder = sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
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

      <motion.ul layout className="space-y-2">
        {sortedAndFilteredSongs.map((song) => (
          <motion.li
            key={song.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center justify-between p-3 ${
              song.id === currentSong?.id
                ? "bg-purple-100"
                : "hover:bg-gray-100"
            } transition-colors duration-200 rounded-md cursor-pointer`}
            onClick={() => onSongSelectMemoized(song.id)}
          >
            <div className="flex items-center flex-grow min-w-0 mr-2">
              <div className="w-12 h-12 mr-3 relative flex-shrink-0">
                <Image
                  src={getYouTubeThumbnail(song.youtubeId)}
                  alt={song.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
                {song.id === currentSong?.id && isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                    <FaPlay className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-grow min-w-0 mr-2">
                <h3 className="font-semibold truncate text-sm">
                  {song.title.length > 20
                    ? song.title.slice(0, 31) + "..."
                    : song.title}
                </h3>
                <p className="text-xs text-gray-600 truncate">
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
            <div className="flex items-center space-x-2">
              {isAuthenticated && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Logika dla serduszka
                  }}
                  className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <FaHeart className="text-xl" />
                </button>
              )}
              
              {(isPlaylistExpanded && expandedPlaylist && hasPlaylists) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToPlaylist(song.id);
                  }}
                  className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                  title="Dodaj do playlisty"
                >
                  <FaBookmark className="text-xl" />
                </button>
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
