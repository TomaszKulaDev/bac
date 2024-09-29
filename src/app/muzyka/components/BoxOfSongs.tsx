import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Song } from "../types";
import { useDispatch } from "react-redux";
import { setCurrentSongIndex } from "@/store/slices/features/songsSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  const handleSongSelect = (index: number) => {
    dispatch(setCurrentSongIndex(index));
  };

  const nextSlide = useCallback(() => {
    setOffset((prevOffset) => (prevOffset + 1) % songs.length);
  }, [songs.length]);

  const prevSlide = useCallback(() => {
    setOffset((prevOffset) => (prevOffset - 1 + songs.length) % songs.length);
  }, [songs.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const visibleSongs = useMemo(() => {
    if (showAllSongs) {
      return songs;
    }
    const totalSongs = songs.length;
    return Array.from(
      { length: 14 },
      (_, i) => songs[(offset + i) % totalSongs]
    ).filter((song) => song !== undefined);
  }, [songs, offset, showAllSongs]);

  const toggleSongDisplay = () => {
    setShowAllSongs(!showAllSongs);
    setOffset(0); // Resetuj offset przy przełączaniu
  };

  console.log("Current Song Index:", currentSongIndex);

  return (
    <div className="mb-8 p-4 border-2 border-blue-500 rounded-lg overflow-hidden relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {showAllSongs ? "Wszystkie piosenki" : "Wybrane piosenki"}
        </h2>
        <button
          onClick={toggleSongDisplay}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {showAllSongs ? "Pokaż wybrane" : "Pokaż wszystkie"}
        </button>
      </div>
      <div className="relative">
        {!showAllSongs && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full z-10"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full z-10"
            >
              <FaChevronRight />
            </button>
          </>
        )}
        <div className={`overflow-hidden ${showAllSongs ? 'h-96' : ''}`}>
          <div
            className={`flex gap-2 transition-transform duration-1000 ease-in-out ${
              showAllSongs ? 'flex-wrap justify-center' : ''
            }`}
            style={showAllSongs ? {} : { transform: `translateX(-${offset * 120}px)` }}
          >
            {visibleSongs.map((song, index) => (
              <div
                key={song._id}
                className={`w-28 h-28 flex-shrink-0 relative rounded-lg overflow-hidden ${
                  songs.indexOf(song) === currentSongIndex
                    ? "border-4 border-yellow-400 shadow-lg scale-110 z-10"
                    : "border-2 border-purple-300"
                } cursor-pointer transition-transform hover:scale-105 ${
                  showAllSongs ? 'm-2' : ''
                }`}
                onClick={() => handleSongSelect(songs.indexOf(song))}
              >
                <Image
                  src={`https://img.youtube.com/vi/${song.youtubeId}/0.jpg`}
                  alt={song.title}
                  layout="fill"
                  objectFit="cover"
                />
                <SongTooltip song={song} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SongTooltip: React.FC<{ song: Song }> = ({ song }) => (
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white p-2 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <p>{song.title}</p>
    <p>{song.artist}</p>
  </div>
);

export default BoxOfSongs;
