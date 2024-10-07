import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaPlay,
  FaMusic,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaListUl,
  FaBookmark,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { Song } from "../types";
import { motion } from "framer-motion";
import { getYouTubeThumbnail } from "../utils/youtube";
import { sortSongs } from "../utils/sortUtils";

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
  onAddToPlaylist: (songId: string | string[]) => void;
  sortBy: "date" | "title" | "artist";
  sortOrder: "asc" | "desc";
  onSortChange: (
    newSortBy: "date" | "title" | "artist",
    newSortOrder: "asc" | "desc"
  ) => void;
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  currentSong: Song | null;
  isPlaylistExpanded: boolean;
}

const SongList: React.FC<SongListProps> = ({
  songs = [],
  visibleSongs,
  isPlaying,
  onSongSelect,
  onLoadMore,
  onCollapse,
  isPopularList,
  onAddToPlaylist,
  sortBy,
  sortOrder,
  onSortChange,
  currentSong,
  isPlaylistExpanded,
  filterText,
  setFilterText,
}) => {
  const sortedAndFilteredSongs = useMemo(() => {
    let result = [...songs];
    if (filterText) {
      result = result.filter(
        (song) =>
          song.title.toLowerCase().includes(filterText.toLowerCase()) ||
          song.artist.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    return sortSongs(result, sortBy, sortOrder);
  }, [songs, sortBy, sortOrder, filterText]);

  const handleSort = (newSortBy: "date" | "title" | "artist") => {
    if (sortBy === newSortBy) {
      onSortChange(newSortBy, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(newSortBy, newSortBy === "date" ? "desc" : "asc");
    }
  };

  return (
    <div
      className={`song-list ${isPopularList ? "popular-list" : "full-list"}`}
    >
      <div className="mb-4">
        <div className="flex space-x-2 mb-4">
          {["date", "title", "artist"].map((sortOption) => (
            <button
              key={sortOption}
              onClick={() =>
                handleSort(sortOption as "date" | "title" | "artist")
              }
              className={`px-3 py-1 rounded-full transition-colors duration-200 ${
                sortBy === sortOption
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {sortOption === "date"
                ? "Ostatnio dodane"
                : sortOption === "title"
                ? "Tytuł"
                : "Artysta"}
              {sortBy === sortOption && (
                <span className="ml-1">
                  {sortOrder === "asc" ? (
                    <FaSortAmountUp />
                  ) : (
                    <FaSortAmountDown />
                  )}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
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
            onClick={() => onSongSelect(song.id)}
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
                <h3 className="font-semibold truncate text-sm">{song.title}</h3>
                <p className="text-xs text-gray-600 truncate">{song.artist}</p>
                {song.playlists && song.playlists.length > 0 && (
                  <div className="flex flex-wrap mt-1">
                    {song.playlists.slice(0, 3).map((playlist) => (
                      <span
                        key={playlist}
                        className="bg-green-500 text-white text-xs px-1 py-0.5 rounded mr-1 mb-1"
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToPlaylist(song.id);
              }}
              disabled={!isPlaylistExpanded}
              className={`text-green-500 hover:text-green-700 transition-colors duration-200 ${
                !isPlaylistExpanded ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title={
                isPlaylistExpanded
                  ? "Dodaj do playlisty"
                  : "Rozwiń playlistę, aby dodać utwór"
              }
            >
              <FaPlus className="text-xl" />
            </button>
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
