import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative mb-4 md:hidden">
      <FaSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 
                   text-amber-500 text-lg 
                   pointer-events-none 
                   transition-colors duration-200"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filtruj utwory..."
        className="w-full pl-10 pr-4 py-3 
                 bg-white text-gray-900
                 rounded-full border border-gray-200
                 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20
                 hover:border-amber-500/50
                 outline-none transition-all duration-200
                 placeholder-gray-400
                 text-sm shadow-sm"
        aria-label="Filtruj utwory"
      />
    </div>
  );
};

export default React.memo(SearchInput);
