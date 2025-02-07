import { FaChartBar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/store/slices/features/poplistaSlice";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";

export const PoplistaFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(
    (state: RootState) => state.poplista.filter
  );
  const songs = useSelector((state: RootState) => state.poplista.songs);
  const newSongs = songs.filter((s) => s.trend === "new" && s.isVisible);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-3 mb-6"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => dispatch(setFilter("all"))}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-full 
          font-medium transition-all duration-200
          ${
            currentFilter === "all"
              ? "bg-gray-900 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }
        `}
      >
        <FaChartBar className="text-lg" />
        <span>Wszystkie</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => dispatch(setFilter("new"))}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-full
          font-medium transition-all duration-200
          ${
            currentFilter === "new"
              ? "bg-amber-500 text-white shadow-lg"
              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
          }
          ${newSongs.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
        `}
        disabled={newSongs.length === 0}
      >
        <FaStar className="text-lg" />
        <span>Nowe ({newSongs.length})</span>
      </motion.button>
    </motion.div>
  );
};
