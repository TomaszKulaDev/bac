import { motion } from "framer-motion";
import { DancerMarker } from "@/types/user";
import Image from "next/image";

interface MarkerPopupProps {
  marker: DancerMarker;
  maxDancers: number;
}

export function MarkerPopup({ marker, maxDancers }: MarkerPopupProps) {
  const percentage = (marker.stats.activeDancers / maxDancers) * 100;

  // Funkcja do formatowania imienia
  const formatName = (name: string) => {
    if (!name || name.length < 3) return name;
    const firstName = name.split(" ")[0];
    return `${firstName} ${name.split(" ")[1]?.[0] || ""}`.trim();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 min-w-[280px]"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{marker.city}</h3>
        <span className="text-sm font-medium text-amber-600">
          {marker.stats.activeDancers} tancerzy
        </span>
      </div>

      <div className="space-y-4">
        {/* Pasek postępu */}
        <div className="flex items-center gap-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Lista tancerzy */}
        <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-2">
          {marker.dancers.map((dancer) => (
            <div
              key={dancer.id}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={dancer.image || "/images/default-avatar.png"}
                  alt={dancer.name}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 truncate">
                {formatName(dancer.name)}
              </span>
            </div>
          ))}
        </div>

        {/* Przycisk "Zobacz wszystkich" */}
        <button
          onClick={() =>
            window.open(
              `/szukam-partnera/${marker.city.toLowerCase()}`,
              "_blank"
            )
          }
          className="w-full mt-2 px-4 py-2 text-sm font-medium text-white 
                   bg-amber-500 hover:bg-amber-600 rounded-lg 
                   transition-colors duration-200"
        >
          Zobacz wszystkich
        </button>
      </div>
    </motion.div>
  );
}
