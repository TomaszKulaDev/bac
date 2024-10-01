import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Song } from "../types";
import { useDispatch } from "react-redux";
import { setCurrentSongIndex } from "@/store/slices/features/songsSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Switch from "react-switch";
import { motion } from "framer-motion";
import { getYouTubeThumbnail } from '../utils/youtube';

interface BoxOfSongsProps {
  songs: Song[];
  currentSongIndex: number;
}

const BoxOfSongs: React.FC<BoxOfSongsProps> = ({
  songs = [],
  currentSongIndex,
}) => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const visibleSongsCount = 14;

  const handleSongSelect = useCallback(
    (index: number) => {
      dispatch(setCurrentSongIndex(index));
    },
    [dispatch]
  );

  const nextSlide = useCallback(() => {
    setOffset((prevOffset) => (prevOffset + 1) % songs.length);
  }, [songs.length]);

  const prevSlide = useCallback(() => {
    setOffset((prevOffset) => (prevOffset - 1 + songs.length) % songs.length);
  }, [songs.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay && !showAllSongs) {
      interval = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlay, showAllSongs]);

  const visibleSongs = useMemo(() => {
    if (showAllSongs) {
      return songs;
    }
    return Array.from(
      { length: visibleSongsCount },
      (_, i) => songs[(offset + i) % songs.length]
    ).filter(Boolean);
  }, [songs, offset, showAllSongs]);

  const toggleSongDisplay = useCallback(() => {
    setShowAllSongs((prev) => !prev);
    setOffset(0);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay((prev) => !prev);
  }, []);

  return (
    <div className="mb-8 p-4 border-2 border-blue-500 rounded-lg overflow-hidden relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {showAllSongs ? "Wszystkie piosenki" : "Wybrane piosenki"}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium text-gray-700">
              Auto:
            </span>
            <Switch
              onChange={toggleAutoPlay}
              checked={isAutoPlay}
              onColor="#1DB954"
              offColor="#282828"
              onHandleColor="#FFFFFF"
              offHandleColor="#FFFFFF"
              handleDiameter={24}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 8px rgba(29, 185, 84, 0.2)"
              height={20}
              width={48}
              className="react-switch"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSongDisplay}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-md hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out text-sm font-medium"
          >
            {showAllSongs ? "Pokaż wybrane" : "Pokaż wszystkie"}
          </motion.button>
        </div>
      </div>
      <div className="relative">
        {!showAllSongs && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full z-10 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out"
              aria-label="Poprzedni slajd"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full z-10 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out"
              aria-label="Następny slajd"
            >
              <FaChevronRight />
            </button>
          </>
        )}
        <div
          className={`overflow-hidden ${
            showAllSongs ? "h-96 overflow-y-auto" : ""
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {visibleSongs.map((song) => (
              <SongThumbnail
                key={song._id}
                song={song}
                isActive={songs.indexOf(song) === currentSongIndex}
                onClick={() => handleSongSelect(songs.indexOf(song))}
                showAllSongs={showAllSongs}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SongThumbnailProps {
  song: Song;
  isActive: boolean;
  onClick: () => void;
  showAllSongs: boolean;
}

const SongThumbnail: React.FC<SongThumbnailProps> = React.memo(
  ({ song, isActive, onClick, showAllSongs }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-28 h-28 flex items-center justify-center transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      <div
        className={`rounded-lg overflow-hidden ${
          isActive
            ? "w-24 h-24 z-10 active-thumbnail"
            : "w-28 h-28 border border-gray-700"
        } cursor-pointer group transition-all duration-300 ease-in-out`}
      >
        <div className="relative w-full h-full">
          <Image
            src={getYouTubeThumbnail(song.youtubeId)}
            alt={song.title}
            layout="fill"
            objectFit="cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black to-transparent 
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} 
          transition-opacity duration-300 flex flex-col justify-end p-2`}
          >
            <h3 className="text-xs font-semibold text-white truncate">
              {song.title}
            </h3>
            <p className="text-xs text-gray-300 truncate">{song.artist}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
);

SongThumbnail.displayName = "SongThumbnail";

const SongTooltip: React.FC<{ song: Song }> = ({ song }) => (
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white p-2 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <p>{song.title}</p>
    <p>{song.artist}</p>
  </div>
);

export default React.memo(BoxOfSongs);