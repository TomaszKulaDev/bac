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
  const { markers, isLoading, maxDancers, getMarkerRank } =
    useDancerMarkers(filters);

  const getMarkerStyle = (count: number) => ({
    radius: count < 10 ? 8 : count < 50 ? 12 : 16,
    fillColor: "#F59E0B", // amber-500
    color: "#D97706", // amber-600
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6,
  });

  const customIcon = (count: number) => {
    const size = count > 50 ? "w-10 h-10" : count > 20 ? "w-8 h-8" : "w-6 h-6";
    const pulseClass = count > 50 ? "animate-pulse" : "";
    return divIcon({
      html: `
        <div class="bg-amber-500 text-white rounded-full ${size} ${pulseClass} flex items-center justify-center
                   font-medium shadow-lg border-2 border-white transform transition-all duration-200
                   hover:scale-110 hover:bg-amber-600 cursor-pointer">
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
              className="p-4 min-w-[280px]"
            >
              <h3 className="font-bold text-lg mb-2 flex items-center justify-between">
                {marker.city}
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                  Top {getMarkerRank(marker)}
                </span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (marker.stats.activeDancers / maxDancers) * 100
                        }%`,
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
                      <span className="text-sm text-gray-600">
                        {style.name}
                      </span>
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
                  className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 
                           hover:bg-amber-600 rounded-lg transition-colors duration-200"
                >
                  Zobacz tancerzy
                </button>
              </div>
            </motion.div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
