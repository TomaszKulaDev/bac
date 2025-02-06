import { FaChartLine, FaChartBar, FaStar } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/store/slices/features/poplistaSlice";
import { RootState } from "@/store/store";

export const PoplistaFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(
    (state: RootState) => state.poplista.filter
  );
  const songs = useSelector((state: RootState) => state.poplista.songs);

  // Obliczamy liczby dla każdej kategorii
  const newSongs = songs.filter((s) => s.trend === "new" && s.isVisible);
  const risingSongs = songs.filter(
    (s) => s.trend === "up" && s.positionChange > 0
  );
  const fallingSongs = songs.filter(
    (s) => s.trend === "down" && s.positionChange > 0
  );

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

      <button
        onClick={() => dispatch(setFilter("rising"))}
        className={`flex items-center gap-2 px-4 py-2 rounded-full 
          ${currentFilter === "rising" ? "bg-emerald-200" : "bg-emerald-100"} 
          hover:bg-emerald-200 transition-colors
          ${risingSongs.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={risingSongs.length === 0}
      >
        <HiTrendingUp className="text-emerald-600" />
        <span>Wzrosty ({risingSongs.length})</span>
      </button>

      <button
        onClick={() => dispatch(setFilter("falling"))}
        className={`flex items-center gap-2 px-4 py-2 rounded-full 
          ${currentFilter === "falling" ? "bg-rose-200" : "bg-rose-100"} 
          hover:bg-rose-200 transition-colors
          ${fallingSongs.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={fallingSongs.length === 0}
      >
        <HiTrendingDown className="text-rose-600" />
        <span>Spadki ({fallingSongs.length})</span>
      </button>
    </div>
  );
};
