import { FaChartLine, FaChartBar, FaStar } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/store/slices/features/poplistaSlice";
import { RootState } from "@/store/store";

type FilterType = "all" | "new" | "rising" | "falling";

interface FilterButtonProps {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const FilterButton = ({ active, children, onClick }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-5 py-2.5 rounded-full transition-all
      ${
        active
          ? "bg-amber-500 text-white shadow-md hover:bg-amber-600"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }
    `}
  >
    {children}
  </button>
);

export const PoplistaFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector<RootState, FilterType>(
    (state) => state.poplista.filter
  );

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <FilterButton
        active={currentFilter === "all"}
        onClick={() => dispatch(setFilter("all"))}
      >
        <FaChartBar className="text-lg" />
        <span>Wszystkie</span>
      </FilterButton>

      <FilterButton
        active={currentFilter === "new"}
        onClick={() => dispatch(setFilter("new"))}
      >
        <FaStar className="text-lg" />
        <span>Nowości</span>
      </FilterButton>

      <FilterButton
        active={currentFilter === "rising"}
        onClick={() => dispatch(setFilter("rising"))}
      >
        <HiTrendingUp className="text-xl text-emerald-600" />
        <span>Wzrosty</span>
      </FilterButton>

      <FilterButton
        active={currentFilter === "falling"}
        onClick={() => dispatch(setFilter("falling"))}
      >
        <HiTrendingDown className="text-xl text-rose-600" />
        <span>Spadki</span>
      </FilterButton>
    </div>
  );
};
