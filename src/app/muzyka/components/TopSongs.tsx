import { FaCrown, FaHeart, FaPlay, FaPause } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLike } from "../hooks/useLike";
import { RootState } from "@/store/store";
import type { Song } from "@/types/song";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getYouTubeThumbnail } from "../utils/youtube";
import { useState, useEffect } from "react";
import { getPredominantColor } from "../utils/colors";

interface TopSongsProps {
  onSongSelect?: (songId: string) => void;
  currentSongId?: string;
  isPlaying?: boolean;
}

const AdBanner = () => (
  <div className="w-full bg-navy-800/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
    <div className="flex items-center justify-center h-[100px] sm:h-[120px] border-2 border-dashed border-white/10 rounded-lg">
      <span className="text-white/50 text-sm sm:text-base text-center">
        Przestrzeń reklamowa
      </span>
    </div>
  </div>
);

export const TopSongs: React.FC<TopSongsProps> = ({
  onSongSelect,
  currentSongId,
  isPlaying,
}) => {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  const { handleLike } = useLike();

  // Pobieramy 20 najpopularniejszych utworów
  const topSongs = useSelector((state: RootState) =>
    [...state.songs.songs]
      .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
      .slice(0, 20)
  );

  // Komponent pojedynczego utworu
  const SongItem = ({ song, index }: { song: Song; index: number }) => (
    <li>
      <div
        className={`
        flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-200
        ${
          index === 0
            ? "bg-gradient-to-r from-amber-500/20 to-transparent"
            : "bg-black/20 hover:bg-white/5"
        }
        ${index < 3 ? "scale-105" : ""}
        backdrop-blur-sm
      `}
      >
        {/* Numeracja z kolorami dla TOP 3 */}
        <div
          className={`
          flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9
          flex items-center justify-center rounded-full
          ${
            index === 0
              ? "bg-amber-500 text-black font-bold"
              : index === 1
              ? "bg-gray-300 text-black font-bold"
              : index === 2
              ? "bg-amber-700 text-white font-bold"
              : "bg-navy-800/50 text-white/60"
          }
        `}
        >
          {index + 1}
        </div>

        {/* Miniatura */}
        <div className="relative overflow-hidden rounded-lg w-12 h-12 flex-shrink-0">
          <Image
            src={getYouTubeThumbnail(song.youtubeId)}
            alt=""
            fill
            className="object-cover"
            sizes="48px"
            loading={index < 4 ? "eager" : "lazy"}
          />
        </div>

        {/* Informacje o utworze */}
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-white truncate">{song.title}</h3>
          <p className="text-sm text-white/70 truncate">{song.artist}</p>
        </div>

        {/* Przycisk odtwarzania */}
        {onSongSelect && (
          <button
            onClick={() => onSongSelect(song._id)}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
            aria-label={
              currentSongId === song._id && isPlaying ? "Zatrzymaj" : "Odtwórz"
            }
          >
            {currentSongId === song._id && isPlaying ? (
              <FaPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </li>
  );

  return (
    <section className="w-full bg-navy-900/95 pb-4 sm:pb-6 md:pb-8">
      {/* Górny banner w kontenerze */}
      <div className="px-3 sm:px-4 max-w-screen-2xl mx-auto mb-6 sm:mb-8">
        <AdBanner />
      </div>

      {/* Grid główny - zwiększamy szerokość */}
      <div className="grid grid-cols-1 xl:grid-cols-[250px_1fr_250px]">
        {/* Lewy banner */}
        <div className="hidden xl:block">
          <div className="w-full h-full bg-navy-800/50 p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-white/10">
              <span className="text-white/50 text-sm sm:text-base text-center">
                Przestrzeń reklamowa
              </span>
            </div>
          </div>
        </div>

        {/* Środkowa zawartość - bez ograniczenia szerokości */}
        <div className="px-3 sm:px-4">
          <div className="w-full">
            {" "}
            {/* Usunięto max-width */}
            <header className="flex items-center gap-2 sm:gap-3 mb-8">
              <FaCrown className="text-xl sm:text-2xl text-amber-400 flex-shrink-0" />
              <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                Top 20 Najpopularniejszych
              </h1>
            </header>
            {/* Układamy utwory w rzędach z pełną szerokością */}
            <div className="flex flex-col gap-6">
              {/* Pierwszy rząd - TOP 5 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {topSongs.slice(0, 5).map((song, index) => (
                  <div key={song._id} className="list-none">
                    <SongItem song={song} index={index} />
                  </div>
                ))}
              </div>

              {/* Drugi rząd - miejsca 6-10 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {topSongs.slice(5, 10).map((song, index) => (
                  <div key={song._id} className="list-none">
                    <SongItem song={song} index={index + 5} />
                  </div>
                ))}
              </div>

              {/* Trzeci rząd - miejsca 11-15 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {topSongs.slice(10, 15).map((song, index) => (
                  <div key={song._id} className="list-none">
                    <SongItem song={song} index={index + 10} />
                  </div>
                ))}
              </div>

              {/* Czwarty rząd - miejsca 16-20 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {topSongs.slice(15, 20).map((song, index) => (
                  <div key={song._id} className="list-none">
                    <SongItem song={song} index={index + 15} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Prawy banner */}
        <div className="hidden xl:block">
          <div className="w-full h-full bg-navy-800/50 p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-white/10">
              <span className="text-white/50 text-sm sm:text-base text-center">
                Przestrzeń reklamowa
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dolny banner */}
      <div className="px-3 sm:px-4 max-w-screen-2xl mx-auto mt-6 sm:mt-8">
        <AdBanner />
      </div>
    </section>
  );
};
