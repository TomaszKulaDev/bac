import React from "react";
import Image from "next/image";
import {
  FaArrowDown,
  FaMinus,
  FaPlay,
  FaMusic,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Song } from "../types";

interface SongListProps {
  songs: Song[];
  visibleSongs: number;
  currentSongIndex: number;
  isPlaying: boolean;
  onSongSelect: (index: number) => void;
  onLoadMore: () => void;
  onCollapse: () => void;
}

const SongList: React.FC<SongListProps> = ({
  songs = [],
  visibleSongs,
  currentSongIndex,
  isPlaying,
  onSongSelect,
  onLoadMore,
  onCollapse,
}) => {
  console.log("Renderowanie SongList - wszystkie piosenki:", songs);
  console.log("Liczba widocznych piosenek:", visibleSongs);
  const getYouTubeThumbnail = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
  };

  return (
    <div className="song-list md:order-1 md:w-2/5 border-r border-gray-200 overflow-y-auto">
      {songs.slice(0, visibleSongs).map((song, index) => {
        console.log(
          `Renderowanie piosenki - Index: ${index}, Tytuł: ${song.title}, Głosy: ${song.votes}`
        );
        return (
          <React.Fragment key={song._id}>
            <div
              className={`song-item p-4 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out ${
                currentSongIndex === index ? "bg-gray-200" : ""
              } flex items-center`}
              onClick={() => onSongSelect(index)}
            >
              <div className="flex items-center flex-grow min-w-0">
                <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-full">
                  <span className="text-gray-600 font-semibold">
                    {index + 1}
                  </span>
                </div>
                <div className="w-12 h-12 mr-4 relative flex-shrink-0">
                  <Image
                    src={getYouTubeThumbnail(song.youtubeId)}
                    alt={song.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="rounded"
                  />
                </div>
                <div className="min-w-0 flex-grow">
                  <h3 className="font-semibold truncate">{song.title}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {song.artist}
                  </p>
                </div>
              </div>
              <div className="ml-auto flex-shrink-0">
                {currentSongIndex === index && isPlaying ? (
                  <FaMusic className="text-blue-500 text-xl transition-colors duration-300" />
                ) : (
                  <FaPlay className="text-gray-500 text-xl hover:text-blue-500 transition-colors duration-300" />
                )}
              </div>
            </div>
            {(index + 1) % 10 === 0 &&
              index + 1 < visibleSongs &&
              index + 1 !== songs.length && (
                <button
                  className="w-full p-2 bg-gray-100 text-blue-500 hover:bg-gray-200 transition duration-300 flex items-center justify-center text-sm"
                  onClick={onCollapse}
                >
                  <FaChevronUp className="mr-2" />
                  Zwiń listę
                </button>
              )}
          </React.Fragment>
        );
      })}
      {songs.length > visibleSongs && (
        <button
          className="w-full p-4 bg-gray-100 text-blue-500 hover:bg-gray-200 transition duration-300 flex items-center justify-center"
          onClick={onLoadMore}
        >
          <FaChevronDown className="mr-2" />
          Zobacz więcej
        </button>
      )}
    </div>
  );
};

export default SongList;
