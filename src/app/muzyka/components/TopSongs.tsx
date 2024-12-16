import {
  FaCrown,
  FaHeart,
  FaPlay,
  FaPause,
  FaRegHeart,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
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
  <div className="w-full bg-[rgb(24,24,24)] rounded-xl p-4 sm:p-6">
    <div className="flex items-center justify-center h-[100px] sm:h-[120px] border-2 border-dashed border-[rgb(40,40,40)] rounded-lg">
      <span className="text-[rgb(167,167,167)] text-sm sm:text-base text-center">
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
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  const { handleLike } = useLike();

  // Pobieramy wszystkie utwory
  const topSongs = useSelector((state: RootState) =>
    [...state.songs.songs].sort(
      (a, b) => (b.likesCount || 0) - (a.likesCount || 0)
    )
  );

  // Komponent pojedynczego utworu
  const SongItem = ({ song, index }: { song: Song; index: number }) => (
    <li className="list-none">
      <div
        className={`
        flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-xl transition-all duration-200
        ${
          currentSongId === song._id
            ? "bg-gradient-to-r from-[rgb(30,215,96)]/20 to-[rgb(24,24,24)]"
            : "bg-[rgb(24,24,24)] hover:bg-[rgb(40,40,40)]"
        }
        ${index < 3 ? "scale-[1.02]" : ""}
      `}
      >
        {/* Numeracja z kolorami dla TOP 3 */}
        <div
          className={`
          flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7
          flex items-center justify-center rounded-full text-sm
          ${
            index === 0
              ? "bg-[rgb(167,167,167)] text-black font-bold"
              : index === 1
              ? "bg-[rgb(167,167,167)] text-black font-bold"
              : index === 2
              ? "bg-[rgb(40,40,40)] text-white font-bold"
              : "bg-[rgb(24,24,24)] text-[rgb(167,167,167)]"
          }
        `}
        >
          {index + 1}
        </div>

        {/* Miniatura */}
        <div className="relative overflow-hidden rounded-lg w-8 h-8 flex-shrink-0">
          <Image
            src={getYouTubeThumbnail(song.youtubeId)}
            alt=""
            fill
            className="object-cover"
            sizes="32px"
            loading={index < 4 ? "eager" : "lazy"}
          />
        </div>

        {/* Informacje o utworze */}
        <div className="flex-grow min-w-0 mr-2">
          <h3 className="font-medium text-sm text-white truncate leading-tight">
            {song.title}
          </h3>
          <p className="text-xs text-[rgb(167,167,167)] truncate leading-tight">
            {song.artist}
          </p>
        </div>

        {/* Przycisk odtwarzania */}
        {onSongSelect && (
          <button
            onClick={() => onSongSelect(song._id)}
            className="p-1 text-[rgb(167,167,167)] hover:text-white 
              hover:bg-[rgb(40,40,40)] rounded-full transition-all duration-200"
            aria-label={
              currentSongId === song._id && isPlaying ? "Zatrzymaj" : "Odtwórz"
            }
          >
            {currentSongId === song._id && isPlaying ? (
              <FaPause className="w-3 h-3" />
            ) : (
              <FaPlay className="w-3 h-3" />
            )}
          </button>
        )}

        {/* Przycisk polubienia */}
        {isAuthenticated && (
          <button
            onClick={() => handleLike(song._id)}
            className={`p-1 hover:bg-[rgb(40,40,40)] rounded-full transition-all duration-200
              ${
                song.isLiked
                  ? "text-[rgb(30,215,96)]"
                  : "text-[rgb(167,167,167)] hover:text-white"
              }`}
            aria-label={
              song.isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"
            }
          >
            {song.isLiked ? (
              <FaHeart className="w-3 h-3" />
            ) : (
              <FaRegHeart className="w-3 h-3" />
            )}
          </button>
        )}
      </div>
    </li>
  );

  return (
    <section className="w-full bg-[rgb(18,18,18)] pb-4 sm:pb-6 md:pb-8">
      {/* Górny banner w kontenerze */}
      <div className="px-3 sm:px-4 max-w-screen-2xl mx-auto mb-6 sm:mb-8">
        <AdBanner />
      </div>

      {/* Grid główny - zwiększamy szerokość */}
      <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_300px]">
        {/* Lewy banner */}
        <div className="hidden xl:block">
          <div className="w-full h-full bg-[rgb(24,24,24)] p-4 sm:p-6">
            <div className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-[rgb(40,40,40)]">
              <span className="text-[rgb(167,167,167)] text-sm sm:text-base text-center">
                Przestrzeń reklamowa
              </span>
              <span className="text-[rgb(167,167,167)] text-xs mt-2">
                300 x 600 px
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
                Top 40 Najpopularniejszych
              </h1>
            </header>
            {/* Układamy utwory w rzędach z pełną szerokością */}
            <div className="flex flex-col gap-6">
              {/* Wszystkie utwory w jednej pętli */}
              {[...Array(Math.ceil(topSongs.length / 5))].map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full
                    ${rowIndex >= 8 && !isExpanded ? 'hidden' : ''}`}
                >
                  {topSongs
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((song, index) => (
                      <div key={song._id} className="w-full">
                        <SongItem 
                          song={song} 
                          index={index + rowIndex * 5}
                        />
                      </div>
                    ))}
                </div>
              ))}

              {/* Przycisk rozwijania/zwijania */}
              {topSongs.length > 40 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(24,24,24)] 
                      hover:bg-[rgb(40,40,40)] transition-colors duration-200 text-white"
                  >
                    <span>{isExpanded ? "Pokaż mniej" : "Pokaż więcej"}</span>
                    {isExpanded ? (
                      <FaChevronUp className="w-4 h-4" />
                    ) : (
                      <FaChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Prawy banner */}
        <div className="hidden xl:block">
          <div className="w-full h-full bg-navy-800/50 p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-white/10">
              <span className="text-white/50 text-sm sm:text-base text-center">
                Przestrzeń reklamowa
              </span>
              <span className="text-white/50 text-xs mt-2">
                300 x 600 px
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
