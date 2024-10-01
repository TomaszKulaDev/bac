import React, { useMemo, useState } from "react";
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
} from "react-icons/fa";
import { Song } from "../types";
import { motion } from "framer-motion";
import { getYouTubeThumbnail } from "../utils/youtube";

interface SongListProps {
  songs: Song[];
  visibleSongs: number;
  currentSongIndex: number;
  isPlaying: boolean;
  onSongSelect: (index: number) => void;
  onLoadMore: () => void;
  onCollapse: () => void;
  isPopularList: boolean;
  onAddToPlaylist: (songId: string) => void;
}

const SongList: React.FC<SongListProps> = ({
  songs = [],
  visibleSongs,
  currentSongIndex,
  isPlaying,
  onSongSelect,
  onLoadMore,
  onCollapse,
  isPopularList,
  onAddToPlaylist,
}) => {
  const [sortBy, setSortBy] = useState<"title" | "artist" | "date">("date");
  const [filterText, setFilterText] = useState("");

  const sortedAndFilteredSongs = useMemo(() => {
    let result = [...songs];

    // Filtrowanie
    if (filterText) {
      result = result.filter(
        (song) =>
          song.title.toLowerCase().includes(filterText.toLowerCase()) ||
          song.artist.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Sortowanie
    result.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "artist":
          return a.artist.localeCompare(b.artist);
        case "date":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return result;
  }, [songs, sortBy, filterText]);

  console.log("Piosenki w SongList:", sortedAndFilteredSongs);
  sortedAndFilteredSongs.forEach((song, index) => {
    console.log(
      `Piosenka ${index + 1}: ID: ${song.id || song._id}, Data utworzenia: ${song.createdAt}`
    );
  });

  console.log("Pełna struktura piosenek:", JSON.stringify(sortedAndFilteredSongs, null, 2));

  return (
    <div
      className={`song-list ${isPopularList ? "popular-list" : "full-list"}`}
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtruj utwory..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="p-2 border rounded w-full mb-2 text-gray-800 placeholder-gray-500"
        />
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "title" | "artist" | "date")
          }
          className="p-2 border rounded w-full text-gray-800"
        >
          <option value="date">Sortuj po dacie</option>
          <option value="title">Sortuj po tytule</option>
          <option value="artist">Sortuj po artyście</option>
        </select>
      </div>
      {sortedAndFilteredSongs.slice(0, visibleSongs).map((song, index) => (
        <li
          key={song._id || song.id}
          className={`flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer ${
            index === currentSongIndex
              ? "bg-purple-100 border-l-4 border-purple-500"
              : ""
          }`}
          onClick={() => onSongSelect(index)}
        >
          <div className="flex items-center flex-grow">
            <div className="w-10 h-10 mr-3 relative flex-shrink-0">
              <Image
                src={getYouTubeThumbnail(song.youtubeId)}
                alt={song.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="rounded"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h3
                className={`font-semibold truncate text-sm ${
                  index === currentSongIndex
                    ? "text-purple-700"
                    : "text-gray-800"
                }`}
              >
                {song.title}
              </h3>
              <p className="text-xs text-gray-600 truncate">{song.artist}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToPlaylist(song._id);
            }}
            className="ml-2 text-gray-500 hover:text-purple-500 transition duration-300"
            title="Dodaj do playlisty"
          >
            <FaBookmark />
          </button>
        </li>
      ))}
      {!isPopularList && visibleSongs < songs.length && (
        <button
          onClick={onLoadMore}
          className="w-full py-2 text-blue-600 hover:bg-gray-100"
        >
          Załaduj więcej
        </button>
      )}
    </div>
  );
};

export default SongList;
