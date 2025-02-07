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
import { store } from "@/store/store";
import { motion } from "framer-motion";

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
  index: number;
}

const TrendIndicator = ({ song }: { song: PoplistaSong }) => {
  if (song.trend === "new") {
    return <div className="text-xs font-bold text-amber-500">NEW</div>;
  }
  return null;
};

// Modyfikujemy definicję funkcji likeButtonStyles aby obsługiwała undefined
const likeButtonStyles = (isLiked: boolean | undefined, disabled: boolean) => `
  flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
  transition-all duration-200
  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  ${
    isLiked
      ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
      : "bg-gray-50 hover:bg-gray-100 text-gray-600"
  }
  border
  ${isLiked ? "border-amber-200" : "border-gray-200 hover:border-gray-300"}
`;

export const PoplistaItem = ({ song, index }: PoplistaItemProps) => {
  const { data: session } = useSession();
  const { handleLike } = useLike();
  const dispatch = useDispatch();
  const poplistaSongs = useSelector((state: RootState) => state.poplista.songs);
  const playerSongs = useSelector((state: RootState) => state.songs.songs);

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
    console.group("🎵 PoplistaItem - handlePlay");

    const playerSongs = store.getState().songs.songs;
    const poplistaSongs = store.getState().poplista.songs;

    const poplistaIndex = poplistaSongs.findIndex(
      (s: any) => s._id === song._id
    );
    const playerIndex = playerSongs.findIndex((s: any) => s._id === song._id);

    console.log("Indeksy utworu:", {
      title: song.title,
      id: song._id,
      poplistaIndex,
      playerIndex,
      localIndex: index,
    });

    if (playerIndex === -1) {
      console.error("Utwór nie istnieje w liście odtwarzacza!");
      console.log("Szczegóły utworu:", song);
      console.log("Pierwsze 5 utworów w playerze:", playerSongs.slice(0, 5));
      return;
    }

    dispatch(setCurrentPlaylistId("poplista"));
    dispatch(setCurrentSongIndex(playerIndex));
    dispatch(togglePlayback(true));

    setTimeout(() => {
      const newState = store.getState();
      const actualSong = newState.songs.songs[newState.songs.currentSongIndex];

      console.log("Stan po odtworzeniu:", {
        playlistId: newState.playlists.currentPlaylistId,
        songIndex: newState.songs.currentSongIndex,
        expectedSong: {
          id: song._id,
          title: song.title,
        },
        actualSong: {
          id: actualSong?._id,
          title: actualSong?.title,
        },
        matched: actualSong?._id === song._id,
      });
    }, 100);

    console.groupEnd();
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
      <div
        className="relative bg-gradient-to-r from-amber-100 to-amber-200 
        rounded-2xl overflow-hidden mb-8 group"
      >
        {/* Tło z delikatnym gradientem */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10" />

        <div className="relative flex items-center gap-6 p-4 sm:p-6">
          {/* Numer #1 */}
          <div className="hidden sm:flex items-center justify-center w-16 h-16">
            <span className="text-4xl font-bold text-amber-600">#1</span>
          </div>

          {/* Miniaturka */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src={thumbnailUrl}
                alt={song.title}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-black/20 opacity-0 
                group-hover:opacity-100 transition-all duration-200"
              >
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <FaPlay className="text-white text-2xl" />
                </button>
              </div>
            </div>
            {song.trend === "new" && (
              <div
                className="absolute -top-2 -right-2 bg-amber-500 text-white 
                px-2 py-0.5 rounded-full text-xs font-bold shadow-md"
              >
                NEW
              </div>
            )}
          </div>

          {/* Informacje o utworze */}
          <div className="flex-grow min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
              {song.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 truncate">
              {song.artist}
            </p>
          </div>

          {/* Przyciski akcji */}
          <div className="flex items-center gap-4">
            <MusicTooltip
              content={!session ? "Zaloguj się, aby polubić" : ""}
              position="top"
            >
              <button
                onClick={handleLikeClick}
                disabled={!session}
                className={likeButtonStyles(isLiked, !session)}
              >
                <FaThumbsUp
                  className={`
                  transition-transform group-hover:scale-110 duration-200
                  ${isLiked ? "text-amber-500" : "text-gray-400"}
                `}
                />
                <span className="font-medium">{song.likesCount}</span>
              </button>
            </MusicTooltip>

            <button
              onClick={handlePlay}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full
                bg-amber-500 text-white hover:bg-amber-600 
                transition-colors duration-200"
            >
              <FaPlay />
              <span>Odtwórz</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standardowy wygląd dla pozostałych pozycji
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-gray-50 rounded-xl p-2 sm:p-4 border border-gray-100 hover:border-gray-200 transition group h-[72px] sm:h-[84px]"
    >
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
              className={likeButtonStyles(isLiked, !session)}
              disabled={!session}
            >
              <FaThumbsUp
                className={`
                text-sm transition-transform group-hover:scale-110 duration-200
                ${isLiked ? "text-amber-500" : "text-gray-400"}
              `}
              />
              <span>{song.likesCount}</span>
            </button>
          </MusicTooltip>
        </div>
      </div>
    </motion.div>
  );
};
