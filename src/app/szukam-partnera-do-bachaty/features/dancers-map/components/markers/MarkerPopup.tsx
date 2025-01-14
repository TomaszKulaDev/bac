import { motion } from "framer-motion";
import { DancerMarker } from "../../types";

interface MarkerPopupProps {
  marker: DancerMarker;
  maxDancers: number;
}

export function MarkerPopup({ marker, maxDancers }: MarkerPopupProps) {
  const percentage = (marker.stats.activeDancers / maxDancers) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 min-w-[280px]"
    >
      <h3 className="font-bold text-lg mb-2">{marker.city}</h3>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
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
