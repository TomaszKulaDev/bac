import { FaChartLine, FaChartBar, FaStar } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

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
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <FilterButton active>
        <FaChartBar className="text-lg" />
        <span>Wszystkie</span>
      </FilterButton>

      <FilterButton>
        <FaStar className="text-lg" />
        <span>Nowości</span>
      </FilterButton>

      <FilterButton>
        <HiTrendingUp className="text-xl text-emerald-600" />
        <span>Wzrosty</span>
      </FilterButton>

      <FilterButton>
        <HiTrendingDown className="text-xl text-rose-600" />
        <span>Spadki</span>
      </FilterButton>
    </div>
  );
};
