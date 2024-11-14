import React from "react";
import Image from "next/image";
import { Song } from "../types";
import { FaPlay, FaPause, FaBookmark, FaHeart, FaRegHeart } from "react-icons/fa";
import { getYouTubeThumbnail } from "../utils/youtube";
import { useVideoDuration } from "../hooks/useVideoDuration";
import { useLike } from "@/app/muzyka/hooks/useLike";

interface RecommendedSongsProps {
  songs: Song[];
  currentSongId: string | null;
  isPlaying: boolean;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  expandedPlaylist: string | null;
  onToggleFavorite: (songId: string) => Promise<void>;
}

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
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
  };

  const recommendedSongs = getRecommendedSongs(songs);
  const { handleLike } = useLike();
  
  const duration1 = useVideoDuration(recommendedSongs[0]?.youtubeId || '');
  const duration2 = useVideoDuration(recommendedSongs[1]?.youtubeId || '');
  const duration3 = useVideoDuration(recommendedSongs[2]?.youtubeId || '');
  const duration4 = useVideoDuration(recommendedSongs[3]?.youtubeId || '');
  const duration5 = useVideoDuration(recommendedSongs[4]?.youtubeId || '');
  const duration6 = useVideoDuration(recommendedSongs[5]?.youtubeId || '');
  const duration7 = useVideoDuration(recommendedSongs[6]?.youtubeId || '');
  const duration8 = useVideoDuration(recommendedSongs[7]?.youtubeId || '');
  const duration9 = useVideoDuration(recommendedSongs[8]?.youtubeId || '');
  const duration10 = useVideoDuration(recommendedSongs[9]?.youtubeId || '');

  const durations: Record<string, string> = {
    [recommendedSongs[0]?.id || '']: duration1,
    [recommendedSongs[1]?.id || '']: duration2,
    [recommendedSongs[2]?.id || '']: duration3,
    [recommendedSongs[3]?.id || '']: duration4,
    [recommendedSongs[4]?.id || '']: duration5,
    [recommendedSongs[5]?.id || '']: duration6,
    [recommendedSongs[6]?.id || '']: duration7,
    [recommendedSongs[7]?.id || '']: duration8,
    [recommendedSongs[8]?.id || '']: duration9,
    [recommendedSongs[9]?.id || '']: duration10,
  };

  const leftColumnSongs = recommendedSongs.slice(0, 5);
  const rightColumnSongs = recommendedSongs.slice(5, 10);

  return (
    <div className="w-full bg-gradient-to-b from-[#0a1e3b] to-[#2a4a7f] text-white p-6 rounded-t-3xl">
      <h2 className="text-2xl font-bold mb-6">
        Nasze Muzyczne Polecenia {new Date().getFullYear()}!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[leftColumnSongs, rightColumnSongs].map((columnSongs, columnIndex) => (
          <div key={columnIndex} className="space-y-2">
            {columnSongs.map((song, index) => {
              const isCurrentSong = song.id === currentSongId;
              const displayIndex = columnIndex * 5 + index + 1;

              return (
                <div
                  key={song.id}
                  onClick={() => onSongSelect(song.id)}
                  className={`
                    flex items-center p-3 rounded-lg
                    hover:bg-blue-800/20 transition-colors cursor-pointer
                    ${isCurrentSong ? "bg-blue-800/30" : ""}
                  `}
                >
                  <span className="text-blue-200/70 w-8 text-sm">
                    {displayIndex.toString().padStart(2, '0')}
                  </span>

                  <div className="relative group w-12 h-12 flex-shrink-0">
                    <Image
                      src={getYouTubeThumbnail(song.youtubeId)}
                      alt={`${song.title} - ${song.artist}`}
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
                      className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
                    >
                      {isCurrentSong && isPlaying ? (
                        <FaPause className="w-5 h-5" />
                      ) : (
                        <FaPlay className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="min-w-0 ml-3 flex-grow">
                    <div className="font-medium truncate">{song.title}</div>
                    <div className="text-sm text-blue-200/70 truncate">
                      {song.artist}
                    </div>
                  </div>

                  <div className="text-blue-200/70 text-sm mx-4">
                    {durations[song.id] || "--:--"}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToPlaylist(song.id);
                      }}
                      className="p-2 text-blue-200 hover:text-white transition-colors rounded-full hover:bg-blue-800/30"
                      title="Dodaj do playlisty"
                    >
                      <FaBookmark className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(song._id);
                      }}
                      className={`p-2 transition-colors rounded-full hover:bg-blue-800/30 flex items-center gap-1
                        ${song.isLiked ? "text-red-500" : "text-blue-200 hover:text-white"}
                      `}
                      title={song.isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                    >
                      {song.isLiked ? (
                        <FaHeart className="w-4 h-4" />
                      ) : (
                        <FaRegHeart className="w-4 h-4" />
                      )}
                      <span className="text-sm">{song.likesCount || 0}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

/*
 * Ten komponent współpracuje z:
 * - src/app/muzyka/hooks/useVideoDuration.ts (pobieranie czasu trwania utworów)
 * - src/app/muzyka/utils/time.ts (formatowanie wyświetlanego czasu)
 *
 * Wykorzystuje hooki i utilities do pobrania i wyświetlenia czasu trwania utworów w tabeli
 */

export default RecommendedSongs;
