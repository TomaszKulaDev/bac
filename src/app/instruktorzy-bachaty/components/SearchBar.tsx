import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  lightMode?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder,
  lightMode = false,
}: SearchBarProps) {
  return (
    <div className={`relative ${lightMode ? "text-gray-900" : "text-white"}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 pl-12 rounded-xl text-sm
          ${
            lightMode
              ? "bg-white border border-gray-200 focus:border-amber-500"
              : "bg-white/10 backdrop-blur-sm focus:bg-white/20"
          } 
          outline-none transition-colors`}
      />
      <FaSearch
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4
        ${lightMode ? "text-gray-400" : "text-white/60"}`}
      />
    </div>
  );
}
