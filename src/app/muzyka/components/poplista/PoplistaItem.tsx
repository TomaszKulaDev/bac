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
    try {
      const result = await handleLike(song._id);

      // Aktualizujemy stan w popliście
      dispatch(
        updateVotes({
          songId: song._id,
          likesCount: song.likesCount + (isLiked ? -1 : 1),
        })
      );
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  if (isFirstPlace) {
    return (
      <div className="relative mb-8">
        {/* Tło z gradientem */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-300 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Miniaturka */}
            <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg">
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
                <FaPlay className="text-white text-4xl" />
              </button>
            </div>

            {/* Informacje o utworze */}
            <div className="flex-grow text-center md:text-left">
              <div className="text-8xl font-bold text-white mb-4">1</div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {song.title}
              </h3>
              <p className="text-xl text-white/90 mb-6">{song.artist}</p>

              {/* Głosowanie */}
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={handleLikeClick}
                  className={`flex items-center gap-2 px-6 py-3 
                    ${
                      isLiked
                        ? "bg-white text-amber-600"
                        : "bg-white text-amber-600 hover:bg-gray-100"
                    } 
                    rounded-full transition text-lg`}
                >
                  <FaThumbsUp
                    className={isLiked ? "text-amber-600" : "text-amber-400"}
                  />
                  <span>{song.likesCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standardowy wygląd dla pozostałych pozycji
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition group">
      <div className="flex items-center gap-4">
        <div className="w-16 text-center relative">
          <div className="text-2xl font-bold text-gray-900">
            {song.position}
          </div>
          <TrendIndicator song={song} />
        </div>

        {/* Miniaturka */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
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
            <FaPlay className="text-white text-2xl" />
          </button>
        </div>

        {/* Informacje o utworze */}
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-900">{song.title}</h3>
          <p className="text-gray-500">{song.artist}</p>
        </div>

        {/* Głosowanie */}
        <div className="flex items-center">
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-2 px-4 py-2 
              ${
                isLiked
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
              } 
              rounded-full transition`}
          >
            <FaThumbsUp
              className={isLiked ? "text-emerald-600" : "text-emerald-400"}
            />
            <span>{song.likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
