import React from "react";
import Image from "next/image";
import { Song } from "../types";
import { FaPlay, FaPause, FaBookmark, FaHeart } from "react-icons/fa";
import { getYouTubeThumbnail } from "../utils/youtube";
import { useVideoDuration } from "../hooks/useVideoDuration";

interface RecommendedSongsProps {
  songs: Song[];
  currentSongId?: string;
  isPlaying: boolean;
  onSongSelect: (songId: string) => void;
  onAddToPlaylist: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
  favorites: Set<string>;
  expandedPlaylist?: string | null;
}

const getRecommendedSongs = (songs: Song[]) => {
  return [...songs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);
};

const RecommendedSongs: React.FC<RecommendedSongsProps> = ({
  songs,
  currentSongId,
  isPlaying,
  onSongSelect,
  onAddToPlaylist,
  onToggleFavorite,
  favorites,
}) => {
  const recommendedSongs = getRecommendedSongs(songs);

  const duration1 = useVideoDuration(recommendedSongs[0]?.youtubeId);
  const duration2 = useVideoDuration(recommendedSongs[1]?.youtubeId);
  const duration3 = useVideoDuration(recommendedSongs[2]?.youtubeId);
  const duration4 = useVideoDuration(recommendedSongs[3]?.youtubeId);
  const duration5 = useVideoDuration(recommendedSongs[4]?.youtubeId);

  const durations: Record<string, string> = {
    [recommendedSongs[0]?.id]: duration1,
    [recommendedSongs[1]?.id]: duration2,
    [recommendedSongs[2]?.id]: duration3,
    [recommendedSongs[3]?.id]: duration4,
    [recommendedSongs[4]?.id]: duration5,
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#0a1e3b] to-[#2a4a7f] text-white p-6 rounded-t-3xl">
      <h2 className="text-2xl font-bold mb-6">
        Nasze Muzyczne Polecenia {new Date().getFullYear()}!
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] table-auto">
          <thead className="text-blue-200/70 text-sm uppercase border-b border-blue-700/30">
            <tr>
              <th className="px-4 py-2 text-left">TYTUŁ</th>
              <th className="px-4 py-2 text-left">ARTYSTA</th>
              <th className="px-4 py-2 text-left">ALBUM</th>
              <th className="px-4 py-2 text-right">CZAS</th>
              <th className="w-24"></th>
            </tr>
          </thead>
          <tbody>
            {recommendedSongs.map((song) => {
              const isCurrentSong = song.id === currentSongId;
              const isFavorite = favorites.has(song.id);

              return (
                <tr
                  key={song.id}
                  onClick={() => onSongSelect(song.id)}
                  role="button"
                  aria-label={`Odtwórz ${song.title} - ${song.artist}`}
                  className={`
                    hover:bg-blue-800/20 transition-colors cursor-pointer
                    ${isCurrentSong ? "bg-blue-800/30" : ""}
                  `}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative group w-10 h-10 flex-shrink-0">
                        <Image
                          src={getYouTubeThumbnail(song.youtubeId)}
                          alt={`Okładka albumu ${song.title}`}
                          width={40}
                          height={40}
                          className="object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/default-album-cover.jpg";
                          }}
                        />
                        <button
                          onClick={() => onSongSelect(song.id)}
                          className="absolute inset-0 flex items-center justify-center bg-[#0a1e3b]/60 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {isCurrentSong && isPlaying ? (
                            <FaPause className="w-4 h-4" />
                          ) : (
                            <FaPlay className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{song.title}</div>
                        <div className="text-sm text-blue-200/70 truncate">
                          {song.artist}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 truncate text-blue-100">
                    {song.artist}
                  </td>
                  <td className="px-4 py-3 truncate text-blue-100">
                    {song.title}
                  </td>
                  <td className="px-4 py-3 text-right text-blue-100">
                    {durations[song.id] || "--:--"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onAddToPlaylist(song.id)}
                        className="p-2 text-blue-200 hover:text-white transition-colors"
                        title="Dodaj do playlisty"
                      >
                        <FaBookmark className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleFavorite(song.id)}
                        className={`p-2 transition-colors ${
                          isFavorite
                            ? "text-red-500"
                            : "text-blue-200 hover:text-white"
                        }`}
                        title="Dodaj do ulubionych"
                      >
                        <FaHeart className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
