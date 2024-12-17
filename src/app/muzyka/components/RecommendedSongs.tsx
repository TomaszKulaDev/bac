import React from "react";
import Image from "next/image";
import { Song } from "../types";
import {
  FaPlay,
  FaPause,
  FaBookmark,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { getYouTubeThumbnail } from "../utils/youtube";
import { useVideoDuration } from "../hooks/useVideoDuration";
import { useLike } from "@/app/muzyka/hooks/useLike";
import { motion } from "framer-motion";
import { Metadata } from "next";
import { useEffect, useMemo } from "react";

interface RecommendedSongsProps {
  songs: Song[];
  currentSongId: string | null;
  isPlaying: boolean;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  expandedPlaylist: string | null;
  onToggleFavorite: (songId: string) => Promise<void>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const LoadingSkeleton = () => (
  <div className="animate-pulse h-4 w-12 bg-blue-200/20 rounded" />
);

export const metadata: Metadata = {
  title: "Rekomendowane utwory bachaty | Baciata.pl",
  description:
    "Odkryj najnowsze utwory bachaty. Słuchaj najlepszych hitów, dodawaj do playlist i dziel się ulubionymi utworami bachatowymi.",
  keywords:
    "bachata, muzyka bachata, rekomendacje bachaty, playlisty bachaty, utwory bachata, bachateros",
  openGraph: {
    title: "Rekomendowane utwory bachaty",
    description:
      "Odkryj najnowsze i najpopularniejsze utwory bachaty. Słuchaj i tańcz do najlepszych hitów.",
    type: "music.playlist",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rekomendowane utwory bachaty",
      },
    ],
  },
};

const RecommendedSongs: React.FC<RecommendedSongsProps> = ({
  songs,
  currentSongId,
  isPlaying,
  onSongSelect,
  onAddToPlaylist,
  expandedPlaylist,
  onToggleFavorite,
}) => {
  const getRecommendedSongs = (songs: Song[]) => {
    return [...songs]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 15);
  };

  const recommendedSongs = getRecommendedSongs(songs);
  const { handleLike } = useLike();

  const duration1 = useVideoDuration(recommendedSongs[0]?.youtubeId || "");
  const duration2 = useVideoDuration(recommendedSongs[1]?.youtubeId || "");
  const duration3 = useVideoDuration(recommendedSongs[2]?.youtubeId || "");
  const duration4 = useVideoDuration(recommendedSongs[3]?.youtubeId || "");
  const duration5 = useVideoDuration(recommendedSongs[4]?.youtubeId || "");
  const duration6 = useVideoDuration(recommendedSongs[5]?.youtubeId || "");
  const duration7 = useVideoDuration(recommendedSongs[6]?.youtubeId || "");
  const duration8 = useVideoDuration(recommendedSongs[7]?.youtubeId || "");
  const duration9 = useVideoDuration(recommendedSongs[8]?.youtubeId || "");
  const duration10 = useVideoDuration(recommendedSongs[9]?.youtubeId || "");
  const duration11 = useVideoDuration(recommendedSongs[10]?.youtubeId || "");
  const duration12 = useVideoDuration(recommendedSongs[11]?.youtubeId || "");
  const duration13 = useVideoDuration(recommendedSongs[12]?.youtubeId || "");
  const duration14 = useVideoDuration(recommendedSongs[13]?.youtubeId || "");
  const duration15 = useVideoDuration(recommendedSongs[14]?.youtubeId || "");

  const durations = useMemo(
    () => ({
      [recommendedSongs[0]?.id || ""]: duration1,
      [recommendedSongs[1]?.id || ""]: duration2,
      [recommendedSongs[2]?.id || ""]: duration3,
      [recommendedSongs[3]?.id || ""]: duration4,
      [recommendedSongs[4]?.id || ""]: duration5,
      [recommendedSongs[5]?.id || ""]: duration6,
      [recommendedSongs[6]?.id || ""]: duration7,
      [recommendedSongs[7]?.id || ""]: duration8,
      [recommendedSongs[8]?.id || ""]: duration9,
      [recommendedSongs[9]?.id || ""]: duration10,
      [recommendedSongs[10]?.id || ""]: duration11,
      [recommendedSongs[11]?.id || ""]: duration12,
      [recommendedSongs[12]?.id || ""]: duration13,
      [recommendedSongs[13]?.id || ""]: duration14,
      [recommendedSongs[14]?.id || ""]: duration15,
    }),
    [
      recommendedSongs,
      duration1,
      duration2,
      duration3,
      duration4,
      duration5,
      duration6,
      duration7,
      duration8,
      duration9,
      duration10,
      duration11,
      duration12,
      duration13,
      duration14,
      duration15,
    ]
  );

  const schemaMarkup = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "MusicPlaylist",
      name: `Rekomendowane utwory ${new Date().getFullYear()}`,
      numTracks: recommendedSongs.length,
      track: recommendedSongs.map((song, index) => ({
        "@type": "MusicRecording",
        position: index + 1,
        name: song.title,
        byArtist: {
          "@type": "MusicGroup",
          name: song.artist,
        },
        duration: durations[song.id] || "",
        interactionStatistic: {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/LikeAction",
          userInteractionCount: song.likesCount || 0,
        },
      })),
    }),
    [recommendedSongs, durations]
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [schemaMarkup]);

  return (
    <motion.div
      role="region"
      aria-label="Lista rekomendowanych utworów"
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="w-full bg-[rgb(18,18,18)] text-white p-3 md:p-6 rounded-t-3xl"
    >
      <header>
        <h1
          className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white"
          id="recommended-songs-title"
        >
          Nasze Muzyczne Polecenia w {new Date().getFullYear()}!
        </h1>
      </header>

      <section className="sr-only">
        <h2>O tej playliście</h2>
        <p>
          Odkryj najnowsze rekomendowane utwory muzyczne. Nasza starannie
          wyselekcjonowana playlista zawiera {recommendedSongs.length} utworów
          od różnych artystów. Możesz słuchać, dodawać do własnych playlist i
          oznaczać ulubione utwory.
        </p>
      </section>

      <div
        role="list"
        aria-labelledby="recommended-songs-title"
        className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6"
      >
        {[
          recommendedSongs.slice(0, 5),
          recommendedSongs.slice(5, 10),
          recommendedSongs.slice(10, 15),
        ].map((columnSongs, columnIndex) => (
          <div key={columnIndex} className="space-y-2 md:space-y-2" role="list">
            {columnSongs.map((song, index) => {
              const isCurrentSong = song.id === currentSongId;
              const displayIndex = columnIndex * 5 + index + 1;

              return (
                <motion.div
                  role="listitem"
                  aria-label={`Utwór ${song.title} wykonawcy ${song.artist}`}
                  aria-current={isCurrentSong ? "true" : undefined}
                  tabIndex={0}
                  key={song.id}
                  onClick={() => onSongSelect(song.id)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onSongSelect(song.id);
                    }
                  }}
                  className={`
                    flex items-center p-2 md:p-3 rounded-lg
                    bg-[rgb(24,24,24)] hover:bg-[rgb(40,40,40)] 
                    transition-colors duration-200 cursor-pointer
                    ${isCurrentSong ? "bg-[rgb(40,40,40)]" : ""}
                  `}
                >
                  <span
                    className="flex-shrink-0 w-[28px] md:w-[32px] text-xs md:text-sm text-[rgb(167,167,167)]"
                    aria-label={`Numer utworu ${displayIndex}`}
                  >
                    {displayIndex.toString().padStart(2, "0")}
                  </span>

                  <div
                    className="relative group w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
                    role="img"
                  >
                    <Image
                      src={getYouTubeThumbnail(song.youtubeId)}
                      alt={`Okładka ${song.title}`}
                      width={48}
                      height={48}
                      className="object-cover rounded-md"
                      loading="lazy"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSongSelect(song.id);
                      }}
                      aria-label={`${
                        isCurrentSong && isPlaying ? "Zatrzymaj" : "Odtwórz"
                      } utwór ${song.title}`}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
                    >
                      {isCurrentSong && isPlaying ? (
                        <FaPause
                          className="w-5 h-5 text-white"
                          aria-hidden="true"
                        />
                      ) : (
                        <FaPlay
                          className="w-5 h-5 text-white"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>

                  <div className="min-w-0 ml-2 md:ml-3 flex-grow max-w-[45%]">
                    <div
                      className="font-medium text-sm md:text-base truncate text-white"
                      title={song.title}
                    >
                      {song.title}
                    </div>
                    <div
                      className="text-xs md:text-sm text-[rgb(167,167,167)] truncate"
                      title={song.artist}
                    >
                      {song.artist}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 md:gap-2 flex-shrink-0 ml-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToPlaylist(song.id);
                      }}
                      aria-label="Dodaj do playlisty"
                      className="p-1.5 md:p-2 text-[rgb(167,167,167)] hover:text-white 
                        transition-colors rounded-full hover:bg-[rgb(40,40,40)]"
                    >
                      <FaBookmark className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(song._id);
                      }}
                      className={`p-1.5 md:p-2 flex items-center gap-1 transition-colors rounded-full 
                        hover:bg-[rgb(40,40,40)]
                        ${
                          song.isLiked
                            ? "text-[rgb(30,215,96)]"
                            : "text-[rgb(167,167,167)] hover:text-white"
                        }
                      `}
                    >
                      {song.isLiked ? (
                        <FaHeart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      ) : (
                        <FaRegHeart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      )}
                      <span className="text-xs md:text-sm min-w-[16px] text-[rgb(167,167,167)]">
                        {song.likesCount || 0}
                      </span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Rekomendowane utwory muzyczne ${new Date().getFullYear()}`,
    description:
      "Odkryj najnowsze rekomendowane utwory muzyczne. Słuchaj, dodawaj do playlist i dziel się ulubioną muzyką.",
    alternates: {
      canonical: `/muzyka/rekomendowane`,
    },
  };
}

export default RecommendedSongs;
