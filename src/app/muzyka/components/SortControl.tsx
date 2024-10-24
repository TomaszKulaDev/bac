import React, { useState } from "react";
import { FaSort, FaSearch } from "react-icons/fa";

interface SortControlProps {
  sortBy: "date" | "title" | "artist" | "impro" | "beginnerFriendly";
  sortOrder: "asc" | "desc";
  onSortChange: (
    newSortBy: "date" | "title" | "artist" | "impro" | "beginnerFriendly",
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
  const [lastClickedOption, setLastClickedOption] = useState<string | null>(
    null
  );

  return (
    <div className="flex flex-col items-center w-full p-3 bg-gray-100 rounded-lg">
      <div className="w-full max-w-md mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Szukaj..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 outline-none transition-all duration-200"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        </div>
      </div>
      <div className="flex space-x-2 flex-wrap justify-center">
        {["date", "title", "artist", "impro", "beginnerFriendly"].map(
          (option) => (
            <button
              key={option}
              onClick={() => {
                onSortChange(
                  option as
                    | "date"
                    | "title"
                    | "artist"
                    | "impro"
                    | "beginnerFriendly",
                  "desc"
                );
              }}
              className={`px-6 py-3 rounded-md text-sm transition-all duration-300 ease-in-out flex items-center mb-2 ${
                sortBy === option
                  ? "bg-gray-700 text-white"
                  : "bg-gray-600 text-white hover:bg-gray-500"
              }`}
            >
              {option === "date"
                ? "Ostatnio dodane"
                : option === "title"
                ? "Tytuł"
                : option === "artist"
                ? "Artysta"
                : option === "impro"
                ? "Impro"
                : option === "beginnerFriendly"
                ? "Dla początkujących"
                : option}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SortControl;
