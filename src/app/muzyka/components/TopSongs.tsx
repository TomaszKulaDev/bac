import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

  const topSongs = useSelector((state: RootState) =>
    [...state.songs.songs]
      .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
      .slice(0, 5)
  );

  const [dominantColor, setDominantColor] = useState("rgb(15, 28, 46)"); // domyślny kolor

  const currentSongDetails = useSelector((state: RootState) =>
    state.songs.songs.find((s) => s._id === currentSongId)
  );

  useEffect(() => {
    if (currentSongId && currentSongDetails) {
      const thumbnail = getYouTubeThumbnail(currentSongDetails.youtubeId);
      getPredominantColor(thumbnail).then((color) => {
        setDominantColor(color);
      });
    }
  }, [currentSongId, currentSongDetails]);

  function showErrorToast(arg0: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <section className="w-full bg-navy-900/95 pb-4 sm:pb-6 md:pb-8">
      {/* Górny banner w kontenerze */}
      <div className="px-3 sm:px-4 max-w-screen-xl mx-auto mb-6 sm:mb-8">
        <AdBanner />
      </div>

      {/* Grid na całą szerokość */}
      <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr_200px]">
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

        {/* Środkowa zawartość w kontenerze */}
        <div className="px-3 sm:px-4">
          <div className="max-w-[600px] mx-auto">
            <header className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <FaCrown className="text-xl sm:text-2xl text-amber-400 flex-shrink-0" />
              <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                Top 5 Najpopularniejszych
              </h1>
            </header>

            <ol className="space-y-2 sm:space-y-3">
              {topSongs.map((song, index) => (
                <li key={song._id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl
                      ${
                        index === 0
                          ? "bg-gradient-to-r from-amber-500/20 to-transparent mb-4 sm:mb-6"
                          : "bg-black/20 hover:bg-white/10 backdrop-blur-sm"
                      }
                    `}
                  >
                    {/* Numeracja */}
                    <div
                      className={`
                      flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 
                      flex items-center justify-center rounded-full
                      ${
                        index === 0
                          ? "bg-amber-500 text-black font-bold"
                          : "text-white/60"
                      }
                    `}
                    >
                      {index + 1}
                    </div>

                    {/* Miniatura */}
                    <div
                      className={`
                      relative overflow-hidden rounded-lg flex-shrink-0
                      ${index === 0 ? "w-14 h-14 sm:w-16 sm:h-16" : "w-12 h-12"}
                    `}
                    >
                      <Image
                        src={getYouTubeThumbnail(song.youtubeId)}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 56px, 64px"
                        loading={index < 2 ? "eager" : "lazy"}
                        priority={index === 0}
                      />
                    </div>

                    {/* Informacje o utworze */}
                    <div className="flex-grow min-w-0 mr-2">
                      <h3
                        className={`
                        font-medium truncate
                        ${
                          index === 0
                            ? "text-base sm:text-lg text-amber-500"
                            : "text-sm sm:text-base text-white"
                        }
                      `}
                      >
                        {song.title}
                      </h3>
                      <p
                        className={`
                        truncate mt-0.5
                        ${
                          index === 0
                            ? "text-sm text-amber-500/70"
                            : "text-xs sm:text-sm text-white/70"
                        }
                      `}
                      >
                        {song.artist}
                      </p>

                      {/* Dodatkowe informacje dla #1 */}
                      {index === 0 && (
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-amber-500/60 text-xs sm:text-sm">
                            Najpopularniejszy utwór tygodnia
                          </span>
                          <span className="text-amber-500/60 text-xs sm:text-sm">
                            {song.likesCount} polubień
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Przycisk odtwarzania */}
                    {onSongSelect && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onSongSelect(song._id)}
                        className={`
                          p-2 rounded-full flex-shrink-0 ml-auto
                          ${
                            index === 0
                              ? "text-amber-500 hover:bg-amber-500/20"
                              : "text-indigo-200 hover:text-white hover:bg-white/10"
                          }
                        `}
                        aria-label={
                          currentSongId === song._id && isPlaying
                            ? "Zatrzymaj"
                            : "Odtwórz"
                        }
                      >
                        {currentSongId === song._id && isPlaying ? (
                          <FaPause
                            className={`${index === 0 ? "w-5 h-5" : "w-4 h-4"}`}
                          />
                        ) : (
                          <FaPlay
                            className={`${index === 0 ? "w-5 h-5" : "w-4 h-4"}`}
                          />
                        )}
                      </motion.button>
                    )}
                  </motion.div>
                </li>
              ))}
            </ol>
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

      {/* Dolny banner w kontenerze */}
      <div className="px-3 sm:px-4 max-w-screen-xl mx-auto mt-6 sm:mt-8">
        <AdBanner />
      </div>
    </section>
  );
};
