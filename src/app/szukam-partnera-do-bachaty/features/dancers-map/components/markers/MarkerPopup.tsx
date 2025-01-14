import { motion } from "framer-motion";
import { DancerMarker } from "@/types/user";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";

interface MarkerPopupProps {
  marker: DancerMarker;
  maxDancers: number;
}

export function MarkerPopup({ marker }: MarkerPopupProps) {
  const formatName = (name: string) => {
    if (!name || name.length < 3) return name;
    const firstName = name.split(" ")[0];
    return `${firstName} ${name.split(" ")[1]?.[0] || ""}`.trim();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 min-w-[280px]"
    >
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-gray-800">{marker.city}</h3>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {marker.dancers.slice(0, 6).map((dancer) => (
          <div key={dancer.id} className="group relative">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 to-amber-300 
                            hover:from-amber-600 hover:to-amber-400 transition-all duration-300 
                            cursor-pointer transform hover:scale-105"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src={dancer.image || "/images/default-avatar.png"}
                    alt={dancer.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <button
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md 
                         flex items-center justify-center group-hover:scale-110 
                         transition-transform duration-200 hover:bg-rose-50"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <HeartIcon className="w-4 h-4 text-rose-500 hover:fill-rose-500 transition-colors" />
              </button>
            </div>

            <div className="mt-2 text-center">
              <p className="text-xs font-medium text-gray-800">
                {formatName(dancer.name)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {marker.dancers.length > 6 && (
        <div className="text-center text-sm text-gray-500 mb-4">
          +{marker.dancers.length - 6} więcej tancerzy
        </div>
      )}

      <button
        onClick={() =>
          window.open(`/szukam-partnera/${marker.city.toLowerCase()}`, "_blank")
        }
        className="w-full py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 
                 transition-colors duration-200 text-sm font-medium"
      >
        Zobacz wszystkich →
      </button>
    </motion.div>
  );
}
