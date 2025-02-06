import Image from "next/image";
import { FaPlay, FaThumbsUp } from "react-icons/fa";
import { Song } from "@/app/muzyka/types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongIndex } from "@/store/slices/features/songsSlice";
import { setCurrentPlaylistId } from "@/store/slices/features/playlistSlice";
import { togglePlayback } from "@/store/slices/playerSlice";
import { useLike } from "@/app/muzyka/hooks/useLike";
import { RootState } from "@/store/store";
import { updateVotes } from "@/store/slices/features/poplistaSlice";
import { useSession } from "next-auth/react";
import { MusicTooltip } from "../ui/MusicTooltip";

interface PoplistaSong extends Song {
  position: number;
  previousPosition: number;
  votes: {
    up: number;
  };
  trend: "new" | null;
  positionChange: number;
}

interface PoplistaItemProps {
  song: PoplistaSong;
}

const TrendIndicator = ({ song }: { song: PoplistaSong }) => {
  if (song.trend === "new") {
    return <div className="text-xs font-bold text-amber-500">NEW</div>;
  }
  return null;
};

export const PoplistaItem = ({ song }: PoplistaItemProps) => {
  const { data: session } = useSession();
  const { handleLike } = useLike();
  const dispatch = useDispatch();

  // Dodajemy selektor do sprawdzania stanu lajków
  const isLiked = useSelector(
    (state: RootState) =>
      state.songs.songs.find((s) => s._id === song._id)?.isLiked
  );

  const positionChange = song.previousPosition - song.position;
  const isFirstPlace = song.position === 1;
  const thumbnailUrl = song.youtubeId
    ? `https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`
    : "/images/default-song-image.jpg"; // Dodaj domyślny obrazek

  const handlePlay = () => {
    dispatch(setCurrentPlaylistId("poplista"));
    dispatch(setCurrentSongIndex(song.position - 1));
    dispatch(togglePlayback(true));
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) return; // Blokujemy akcję jeśli użytkownik nie jest zalogowany
    try {
      const result = await handleLike(song._id);
      dispatch(
        updateVotes({
          songId: song._id,
          likesCount: result.likesCount,
        })
      );
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  if (isFirstPlace) {
    return (
      <div className="relative mb-4 sm:mb-8">
        <div className="bg-gradient-to-r from-amber-400 to-amber-300 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-6">
            {/* Miniaturka */}
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={thumbnailUrl}
                alt={song.title}
                fill
                className="object-cover"
              />
              <button
                onClick={handlePlay}
                className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center"
              >
                <FaPlay className="text-white text-3xl sm:text-4xl" />
              </button>
            </div>

            {/* Informacje o utworze */}
            <div className="flex-grow text-center sm:text-left">
              <div className="text-6xl sm:text-8xl font-bold text-white mb-2 sm:mb-4">
                1
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                {song.title}
              </h3>
              <p className="text-lg sm:text-xl text-white/90 mb-4 sm:mb-6">
                {song.artist}
              </p>

              {/* Głosowanie */}
              <div className="flex justify-center sm:justify-start">
                <MusicTooltip
                  content={!session ? "Zaloguj się, aby polubić" : ""}
                  position="left"
                >
                  <button
                    onClick={handleLikeClick}
                    className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 
                      ${!session ? "opacity-50 cursor-not-allowed" : ""}
                      ${
                        isLiked
                          ? "bg-white text-amber-600"
                          : "bg-white/90 text-amber-500 hover:bg-white"
                      } 
                      rounded-full transition text-base sm:text-lg`}
                  >
                    <FaThumbsUp />
                    <span>{song.likesCount}</span>
                  </button>
                </MusicTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standardowy wygląd dla pozostałych pozycji
  return (
    <div className="bg-gray-50 rounded-xl p-2 sm:p-4 border border-gray-100 hover:border-gray-200 transition group h-[72px] sm:h-[84px]">
      <div className="flex items-center gap-2 sm:gap-4 h-full">
        {/* Pozycja - mniejsza szerokość na mobile */}
        <div className="w-6 sm:w-12 text-center flex-shrink-0">
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            {song.position}
          </div>
          <TrendIndicator song={song} />
        </div>

        {/* Miniaturka - bez zmian w rozmiarze */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={song.title}
            fill
            className="object-cover"
          />
          <button
            onClick={handlePlay}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
          >
            <FaPlay className="text-white text-base sm:text-lg" />
          </button>
        </div>

        {/* Informacje o utworze - więcej miejsca na mobile */}
        <div className="flex-grow min-w-0 max-w-[calc(100%-160px)] sm:max-w-[calc(100%-220px)]">
          <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
            {song.title}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm truncate">
            {song.artist}
          </p>
        </div>

        {/* Głosowanie - z tooltipem dla niezalogowanych */}
        <div className="flex items-center flex-shrink-0 ml-auto">
          <MusicTooltip
            content={!session ? "Zaloguj się, aby polubić" : ""}
            position="left"
          >
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-4 sm:py-2 
                ${!session ? "opacity-50 cursor-not-allowed" : ""}
                ${
                  isLiked
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                } 
                rounded-full transition text-sm sm:text-base min-w-[60px] sm:min-w-[80px] justify-center`}
            >
              <FaThumbsUp className="text-xs sm:text-sm" />
              <span>{song.likesCount}</span>
            </button>
          </MusicTooltip>
        </div>
      </div>
    </div>
  );
};
