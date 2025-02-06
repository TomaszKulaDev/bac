import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPoplistaSongs } from "@/store/slices/features/poplistaSlice";
import { PoplistaItem } from "./PoplistaItem";
import { PoplistaItemSkeleton } from "./PoplistaItemSkeleton";
import { FaChevronDown } from "react-icons/fa";
import { filterAndSortSongs } from "@/app/muzyka/utils/poplistaSort";
import { PoplistaSong } from "@/app/muzyka/types";

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

  // Filtrujemy, ale nie sortujemy - pozycje są już prawidłowe
  const filteredSongs = filterAndSortSongs(songs, filter);
  const displayedSongs = filteredSongs.slice(0, displayLimit);

  // Sprawdzamy, czy są jeszcze utwory do załadowania
  const hasMore = filteredSongs.length > displayLimit;

  const loadMore = () => {
    setDisplayLimit((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, filteredSongs.length)
    );
  };

  return (
    <div>
      {/* Panel debugowania */}
      {process.env.NODE_ENV === "development" && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <p>Aktualny filtr: {filter}</p>
          <p>Całkowita liczba utworów: {filteredSongs.length}</p>
          <p>Wyświetlane utwory: {displayedSongs.length}</p>
          <p>Limit wyświetlania: {displayLimit}</p>
          <p>
            Przykładowe głosy pierwszego utworu:{" "}
            {displayedSongs[0]
              ? `UP: ${displayedSongs[0].votes.up}, DOWN: ${
                  displayedSongs[0].votes.down
                }, Score: ${
                  displayedSongs[0].votes.up - displayedSongs[0].votes.down
                }`
              : "Brak utworów"}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {displayedSongs.map((song) => (
          <PoplistaItem key={song.id} song={song} />
        ))}

        {displayedSongs.length === 0 && (
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
            <span>
              Pokaż więcej ({filteredSongs.length - displayLimit} pozostało)
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
