"use client";

import { MarkerList } from "./markers";
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

  if (isLoading) return null;

  return (
    <MarkerList
      markers={markers}
      maxDancers={maxDancers}
      getMarkerRank={getMarkerRank}
      onCitySelect={onCitySelect}
    />
  );
}
