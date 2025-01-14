import { motion } from "framer-motion";
import { DancerMarker } from "../../types";

interface MarkerPopupProps {
  marker: DancerMarker;
  rank: number;
  maxDancers: number;
}

export function MarkerPopup({ marker, rank, maxDancers }: MarkerPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 min-w-[280px]"
    >
      <h3 className="font-bold text-lg mb-2 flex items-center justify-between">
        {marker.city}
        <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
          Top {rank}
        </span>
      </h3>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(marker.stats.activeDancers / maxDancers) * 100}%`,
              }}
            />
          </div>
          <span className="text-sm font-medium text-amber-600">
            {marker.stats.activeDancers}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {marker.styles.map((style) => (
            <div
              key={style.name}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-600">{style.name}</span>
              <span className="text-sm font-medium">{style.count}</span>
            </div>
          ))}
        </div>

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
          Zobacz tancerzy
        </button>
      </div>
    </motion.div>
  );
}
