import React, { useState, useEffect, useCallback } from "react";
import { FaSort, FaSearch } from "react-icons/fa";
import { useDebounce } from '../hooks/useDebounce';
import { SortOption, SortOrder } from '../types';

const sortOptionLabels: Record<SortOption, string> = {
  date: "Ostatnio dodane",
  title: "Tytuł",
  artist: "Artysta",
  impro: "Impro",
  beginnerFriendly: "Dla początkujących"
};

interface SortControlProps {
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSortChange: (
    newSortBy: SortOption,
    newSortOrder: SortOrder
  ) => void;
  filterText: string;
  setFilterText: (text: string) => void;
}

const SortControl: React.FC<SortControlProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
  filterText,
  setFilterText,
}) => {
  const [lastClickedOption, setLastClickedOption] = useState<string | null>(
    null
  );
  const [inputValue, setInputValue] = useState(filterText);
  const debouncedFilterText = useDebounce(inputValue, 300);

  useEffect(() => {
    setFilterText(debouncedFilterText);
  }, [debouncedFilterText, setFilterText]);

  const handleSort = useCallback(
    (newSortBy: SortOption) => {
      const newSortOrder = sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
      onSortChange(newSortBy, newSortOrder);
    },
    [sortBy, sortOrder, onSortChange]
  );

  return (
    <div className="flex flex-col items-center w-full p-3 bg-gray-100 rounded-lg">
      <div className="w-full max-w-md mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Szukaj..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 outline-none transition-all duration-200"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        </div>
      </div>
      <div className="flex space-x-2 flex-wrap justify-center">
        {(Object.keys(sortOptionLabels) as SortOption[]).map((option) => (
          <button
            key={option}
            onClick={() => handleSort(option)}
            className={`px-6 py-3 rounded-md text-sm transition-all duration-300 ease-in-out flex items-center mb-2 ${
              sortBy === option
                ? "bg-gray-700 text-white"
                : "bg-gray-600 text-white hover:bg-gray-500"
            }`}
          >
            {sortOptionLabels[option]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortControl;
