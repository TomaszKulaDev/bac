"use client";

import { useMemo } from "react";
import { Marker, Circle, Popup } from "react-leaflet";
import { divIcon, Icon } from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { DancerMarker } from "../types";
import { useDancerMarkers } from "../hooks/useDancerMarkers";
import { useMapFilters } from "../hooks/useMapFilters";

interface DancerMarkersProps {
  selectedCity: string | null;
  onCitySelect: (city: string) => void;
}

export function DancerMarkers({
  selectedCity,
  onCitySelect,
}: DancerMarkersProps) {
  const { filters } = useMapFilters();
  const { markers, isLoading } = useDancerMarkers(filters);

  const customIcon = (count: number) => {
    const size = count > 50 ? "w-10 h-10" : count > 20 ? "w-8 h-8" : "w-6 h-6";
    return divIcon({
      html: `
        <div class="bg-purple-600 text-white rounded-full ${size} flex items-center justify-center
                   font-medium shadow-lg border-2 border-white transform transition-all duration-200
                   hover:scale-110 hover:bg-purple-700 cursor-pointer">
          ${count}
        </div>
      `,
      className: "custom-marker",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  if (isLoading) return null;

  return (
    <>
      {markers.map((marker: DancerMarker) => (
        <Marker
          key={marker.id}
          position={[marker.coordinates.lat, marker.coordinates.lng]}
          icon={customIcon(marker.stats.activeDancers)}
          eventHandlers={{
            click: () => onCitySelect(marker.city),
          }}
        >
          <Popup>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-3"
            >
              <h3 className="font-bold text-lg mb-2">{marker.city}</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Aktywni tancerze:{" "}
                  <span className="font-semibold text-purple-600">
                    {marker.stats.activeDancers}
                  </span>
                </p>
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-2">Style tańca:</p>
                  <div className="flex flex-wrap gap-2">
                    {marker.styles.map((style) => (
                      <span
                        key={style.name}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                 bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                      >
                        {style.name} ({style.count})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
