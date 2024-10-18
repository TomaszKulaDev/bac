import React from "react";
import { FaSort, FaSearch } from "react-icons/fa";

interface SortControlProps {
  sortBy: "date" | "title" | "artist";
  sortOrder: "asc" | "desc";
  onSortChange: (
    newSortBy: "date" | "title" | "artist",
    newSortOrder: "asc" | "desc"
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
  return (
    <div className="flex items-center justify-between w-full p-3">
      <div className="flex space-x-2">
        {["date", "title", "artist"].map((option) => (
          <button
            key={option}
            onClick={() =>
              onSortChange(
                option as "date" | "title" | "artist",
                sortOrder === "asc" ? "desc" : "asc"
              )
            }
            className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 flex items-center ${
              sortBy === option
                ? "bg-purple-500 text-white"
                : "bg-white hover:bg-gray-200 text-gray-700"
            }`}
          >
            {option === "date"
              ? "Ostatnio dodane"
              : option === "title"
              ? "Tytuł"
              : "Artysta"}
            {sortBy === option && <FaSort className="ml-1" />}
          </button>
        ))}
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Szukaj..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="pl-8 pr-2 py-1 text-sm rounded-full border border-gray-300 focus:border-purple-500 outline-none"
        />
        <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
      </div>
    </div>
  );
};

export default SortControl;
