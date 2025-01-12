import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Szukaj...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm 
                 border border-white/10 text-white placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>
  );
}
