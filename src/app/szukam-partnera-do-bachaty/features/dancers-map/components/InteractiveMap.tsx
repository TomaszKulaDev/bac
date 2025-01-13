"use client";

import { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { DancerMarkers } from "./DancerMarkers";
import { MapControls } from "./MapControls";
import { MapLegend } from "./MapLegend";
import { useMapFilters } from "../hooks/useMapFilters";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

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

export function InteractiveMap() {
  const { filters, updateFilters, resetFilters } = useMapFilters();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

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

      <div className="relative flex-1 h-[700px] bg-white rounded-xl shadow-lg overflow-hidden">
        <MapContainer
          center={POLAND_CENTER}
          zoom={7}
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
      </div>
    </div>
  );
}
