import { FaSort } from "react-icons/fa";
import { SortByType, SortOrderType } from "../../../hooks/useDrawers";

interface SortingOptionsProps {
  sortBy: SortByType;
  sortOrder: SortOrderType;
  onSortChange: (newSortBy: SortByType) => void;
}

const SortingOptions: React.FC<SortingOptionsProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className="p-4 space-y-2">
      {[
        { id: "date", label: "Nowości" },
        { id: "beginnerFriendly", label: "Dla początkujących" },
        { id: "impro", label: "Impro" },
        { id: "title", label: "Tytuł" },
        { id: "artist", label: "Wykonawca" },
      ].map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onSortChange(id as SortByType)}
          className={`w-full text-left p-3 rounded-lg flex items-center justify-between ${
            sortBy === id ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <span>{label}</span>
          {sortBy === id && (
            <FaSort className={sortOrder === "desc" ? "rotate-180" : ""} />
          )}
        </button>
      ))}
    </div>
  );
};

export default SortingOptions;
