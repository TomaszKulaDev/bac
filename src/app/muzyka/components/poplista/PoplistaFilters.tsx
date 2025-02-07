import { FaChartBar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/store/slices/features/poplistaSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";

export const PoplistaFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(
    (state: RootState) => state.poplista.filter
  );
  const songs = useSelector((state: RootState) => state.poplista.songs);

  // Obliczamy tylko nowe utwory
  const newSongs = songs.filter((s) => s.trend === "new" && s.isVisible);

  useEffect(() => {
    console.group("🔍 PoplistaFilters - Filter Change");
    console.log("Stan filtrów:", {
      currentFilter,
      totalSongs: songs.length,
      newSongsCount: newSongs.length,
      visibleSongs: songs.filter((s) => s.isVisible).length,
    });
    console.groupEnd();
  }, [currentFilter, songs, newSongs]);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => dispatch(setFilter("all"))}
        className={`flex items-center gap-2 px-4 py-2 rounded-full 
          ${currentFilter === "all" ? "bg-gray-200" : "bg-gray-100"} 
          hover:bg-gray-200 transition-colors`}
      >
        <FaChartBar />
        <span>Wszystkie</span>
      </button>

      <button
        onClick={() => dispatch(setFilter("new"))}
        className={`flex items-center gap-2 px-4 py-2 rounded-full 
          ${currentFilter === "new" ? "bg-amber-200" : "bg-amber-100"} 
          hover:bg-amber-200 transition-colors
          ${newSongs.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={newSongs.length === 0}
      >
        <FaStar className="text-amber-600" />
        <span>Nowe ({newSongs.length})</span>
      </button>
    </div>
  );
};
