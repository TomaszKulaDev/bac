import { divIcon } from "leaflet";

interface MarkerIconProps {
  count: number;
}

export function createMarkerIcon({ count }: MarkerIconProps) {
  const size = count > 50 ? "w-10 h-10" : count > 20 ? "w-8 h-8" : "w-6 h-6";
  const pulseClass = count > 50 ? "animate-pulse" : "";

  return divIcon({
    html: `
      <div class="bg-amber-500 text-white rounded-full ${size} ${pulseClass} 
                 flex items-center justify-center font-medium shadow-lg border-2 
                 border-white transform transition-all duration-200
                 hover:scale-110 hover:bg-amber-600 cursor-pointer">
        ${count}
      </div>
    `,
    className: "custom-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}
