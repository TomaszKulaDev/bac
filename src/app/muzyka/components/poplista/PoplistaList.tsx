import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPoplistaSongs } from "@/store/slices/features/poplistaSlice";
import { PoplistaItem } from "./PoplistaItem";
import { PoplistaItemSkeleton } from "./PoplistaItemSkeleton";
import { Song } from "@/app/muzyka/types";
import { FaChevronDown } from "react-icons/fa";

interface PoplistaSong extends Song {
  position: number;
  previousPosition: number;
  votes: {
    up: number;
    down: number;
  };
}

const ITEMS_PER_PAGE = 50;

export const PoplistaList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, status, filter } = useSelector(
    (state: RootState) => state.poplista
  );
  const [displayLimit, setDisplayLimit] = useState(20);

  useEffect(() => {
    dispatch(fetchPoplistaSongs());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <PoplistaItemSkeleton key={n} />
        ))}
      </div>
    );
  }

  const filteredSongs = songs
    .filter((song: PoplistaSong) => {
      switch (filter) {
        case "new":
          return song.position < song.previousPosition;
        case "rising":
          return song.position < song.previousPosition;
        case "falling":
          return song.position > song.previousPosition;
        default:
          return true;
      }
    })
    .sort(
      (a: PoplistaSong, b: PoplistaSong) =>
        b.votes.up - b.votes.down - (a.votes.up - a.votes.down)
    )
    .map((song: PoplistaSong, index: number) => ({
      ...song,
      position: index + 1,
      previousPosition: song.previousPosition || index + 1,
    }))
    .slice(0, displayLimit);

  const hasMore = songs.length > displayLimit;

  const loadMore = () => {
    setDisplayLimit((prev) => Math.min(prev + ITEMS_PER_PAGE, songs.length));
  };

  return (
    <div className="space-y-4">
      {filteredSongs.map((song: PoplistaSong) => (
        <PoplistaItem key={song.id} song={song} />
      ))}

      {filteredSongs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Brak utworów spełniających kryteria filtrowania
        </div>
      )}

      {hasMore && (
        <button
          onClick={loadMore}
          className="w-full py-4 px-6 bg-gray-50 hover:bg-gray-100 
                     rounded-xl border border-gray-200 text-gray-700
                     flex items-center justify-center gap-2 transition-all
                     group hover:border-gray-300"
        >
          <FaChevronDown className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          <span>Pokaż więcej ({songs.length - displayLimit} pozostało)</span>
        </button>
      )}
    </div>
  );
};
