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

  // Oblicz liczby dla każdej kategorii
  const risingCount = songs.filter((s) => s.trend === "up").length;
  const fallingCount = songs.filter((s) => s.trend === "down").length;
  const newCount = songs.filter((s) => s.trend === "new").length;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => dispatch(setFilter("all"))}
        className={`flex items-center gap-2 px-4 py-2 rounded-full 
          ${currentFilter === "all" ? "bg-gray-200" : "bg-gray-100"}`}
      >
        <FaChartBar />
        <span>Wszystkie</span>
      </button>

      <button
        onClick={() => dispatch(setFilter("rising"))}
        className={`flex items-center gap-2 px-4 py-2 rounded-full 
          ${currentFilter === "rising" ? "bg-emerald-200" : "bg-emerald-100"}`}
      >
        <HiTrendingUp className="text-emerald-600" />
        <span>Wzrosty ({risingCount})</span>
      </button>

      <button
        onClick={() => dispatch(setFilter("falling"))}
        className={`flex items-center gap-2 px-4 py-2 rounded-full 
          ${currentFilter === "falling" ? "bg-rose-200" : "bg-rose-100"}`}
      >
        <HiTrendingDown className="text-rose-600" />
        <span>Spadki ({fallingCount})</span>
      </button>

      <button
        onClick={() => dispatch(setFilter("new"))}
        className={`flex items-center gap-2 px-4 py-2 rounded-full 
          ${currentFilter === "new" ? "bg-amber-200" : "bg-amber-100"}`}
      >
        <FaStar className="text-amber-600" />
        <span>Nowe ({newCount})</span>
      </button>
    </div>
  );
};
