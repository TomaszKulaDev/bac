import { motion } from "framer-motion";
import { DancerMarker } from "@/types/user";
import Image from "next/image";

interface MarkerPopupProps {
  marker: DancerMarker;
  maxDancers: number;
}

export function MarkerPopup({ marker }: MarkerPopupProps) {
  // Funkcja do formatowania imienia
  const formatName = (name: string) => {
    if (!name || name.length < 3) return name;
    const firstName = name.split(" ")[0];
    return `${firstName} ${name.split(" ")[1]?.[0] || ""}`.trim();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-3 min-w-[200px]"
    >
      <div className="text-center mb-2">
        <h3 className="text-sm font-medium">{marker.city}</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {marker.dancers.slice(0, 9).map((dancer, index) => (
          <div key={dancer.id} className="relative group">
            <Image
              src={dancer.image || "/images/default-avatar.png"}
              alt={dancer.name}
              width={40}
              height={40}
              className="rounded-full object-cover border border-white"
            />
            <div
              className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full 
                          flex items-center justify-center text-[10px] font-medium"
            >
              {index + 1}
            </div>
            {/* Tooltip z imieniem */}
            <div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                          opacity-0 group-hover:opacity-100 transition-opacity
                          bg-gray-800 text-white text-xs py-1 px-2 rounded-md
                          whitespace-nowrap pointer-events-none z-10"
            >
              {formatName(dancer.name)}
            </div>
          </div>
        ))}
        {marker.dancers.length > 9 && (
          <div
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center 
                         justify-center text-xs text-gray-500"
          >
            +{marker.dancers.length - 9}
          </div>
        )}
      </div>

      <button
        onClick={() =>
          window.open(`/szukam-partnera/${marker.city.toLowerCase()}`, "_blank")
        }
        className="w-full py-1.5 text-xs text-amber-600 hover:text-amber-700 
                 transition-colors"
      >
        Zobacz wszystkich →
      </button>
    </motion.div>
  );
}
