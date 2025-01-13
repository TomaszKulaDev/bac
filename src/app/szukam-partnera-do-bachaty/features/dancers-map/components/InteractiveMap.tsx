"use client";

import { useState, useMemo } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { DancerMarkers } from "./DancerMarkers";
import { MapControls } from "./MapControls";
import { MapLegend } from "./MapLegend";
import { useMapFilters } from "../hooks/useMapFilters";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import { LoadingSpinner } from "./LoadingSpinner";
import { DancerMarker } from "../types";

const POLAND_CENTER: LatLngTuple = [52.0685, 19.0409];
const POLAND_BOUNDS = {
  northEast: [54.8357, 24.1457] as LatLngTuple,
  southWest: [49.002, 14.1224] as LatLngTuple,
};

const MAP_CONFIG = {
  minZoom: 6,
  maxZoom: 13,
  bounds: [POLAND_BOUNDS.southWest, POLAND_BOUNDS.northEast] as [
    LatLngTuple,
    LatLngTuple
  ],
};

function MapStats({ markers }: { markers: DancerMarker[] }) {
  const stats = useMemo(
    () => ({
      totalDancers: markers.reduce((sum, m) => sum + m.stats.activeDancers, 0),
      totalCities: markers.length,
      mostPopularCity: markers.reduce((prev, curr) =>
        prev.stats.activeDancers > curr.stats.activeDancers ? prev : curr
      ).city,
    }),
    [markers]
  );

  return (
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-[1000]">
      <div className="flex gap-4 text-sm">
        <div>
          <span className="text-gray-600">Tancerzy:</span>
          <span className="font-semibold ml-1">{stats.totalDancers}</span>
        </div>
        <div>
          <span className="text-gray-600">Miast:</span>
          <span className="font-semibold ml-1">{stats.totalCities}</span>
        </div>
        <div>
          <span className="text-gray-600">Najpopularniejsze:</span>
          <span className="font-semibold ml-1">{stats.mostPopularCity}</span>
        </div>
      </div>
    </div>
  );
}

export function InteractiveMap() {
  const { filters, updateFilters, resetFilters } = useMapFilters();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex gap-4">
      <div className="w-64 shrink-0 space-y-4">
        <MapControls
          filters={filters}
          onChange={updateFilters}
          onReset={resetFilters}
        />
        <MapLegend />
      </div>

      <div className="relative flex-1 h-[820px] bg-white rounded-xl shadow-lg overflow-hidden">
        <MapContainer
          center={POLAND_CENTER}
          zoom={6.5}
          className="w-full h-full"
          minZoom={MAP_CONFIG.minZoom}
          maxZoom={MAP_CONFIG.maxZoom}
          zoomControl={false}
          maxBounds={MAP_CONFIG.bounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url={`https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${process.env.NEXT_PUBLIC_THUNDERFOREST_API_KEY}`}
            attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <ZoomControl position="bottomright" />
          <DancerMarkers
            selectedCity={selectedCity}
            onCitySelect={setSelectedCity}
          />
        </MapContainer>
        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
}
