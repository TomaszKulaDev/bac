"use client";

import { useDancerMarkers } from "../../hooks/useDancerMarkers";
import { useMapFilters } from "../../hooks/useMapFilters";
import { useMemo } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { DancersGrid } from "./DancersGrid";
import { LoadMoreButton } from "./LoadMoreButton";

export function MapSidebar() {
  const { filters } = useMapFilters();
  const { markers, isLoading } = useDancerMarkers(filters);

  const allDancers = useMemo(
    () =>
      markers.flatMap((marker) =>
        Array(marker.stats.activeDancers).fill({
          city: marker.city,
          styles: marker.styles,
        })
      ),
    [markers]
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-[820px]">
      <DancersGrid dancers={allDancers} />
      <LoadMoreButton />
    </div>
  );
}
