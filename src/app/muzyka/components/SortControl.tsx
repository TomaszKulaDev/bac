import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../hooks/useDebounce";

interface SortControlProps {
  filterText: string;
  setFilterText: (text: string) => void;
}

const SortControl: React.FC<SortControlProps> = ({
  filterText,
  setFilterText,
}) => {
  const [inputValue, setInputValue] = useState(filterText);
  const debouncedFilterText = useDebounce(inputValue, 300);

  useEffect(() => {
    setFilterText(debouncedFilterText);
  }, [debouncedFilterText, setFilterText]);

  return (
    <div className="flex items-center justify-center w-full py-4 px-6">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          placeholder="Wyszukaj utwór lub artystę..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full pl-12 pr-4 py-3 
                   bg-gray-50 text-gray-900
                   rounded-full border border-gray-200
                   focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20
                   hover:border-amber-500/50
                   outline-none transition-all duration-200
                   placeholder-gray-400
                   text-sm shadow-sm"
        />
        <FaSearch
          className="absolute left-4 top-1/2 transform -translate-y-1/2 
                     text-amber-500 text-lg
                     pointer-events-none
                     transition-colors duration-200"
        />
      </div>
    </div>
  );
};

export default SortControl;
