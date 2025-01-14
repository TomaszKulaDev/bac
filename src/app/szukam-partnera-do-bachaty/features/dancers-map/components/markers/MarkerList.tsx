import { DancerMarker } from "../../types";
import { MarkerCluster } from "./MarkerCluster";

interface MarkerListProps {
  markers: DancerMarker[];
  maxDancers: number;
  getMarkerRank: (marker: DancerMarker) => number;
  onCitySelect: (city: string) => void;
}

export function MarkerList({
  markers,
  maxDancers,
  getMarkerRank,
  onCitySelect,
}: MarkerListProps) {
  return (
    <>
      {markers.map((marker) => (
        <MarkerCluster
          key={marker.id}
          marker={marker}
          rank={getMarkerRank(marker)}
          maxDancers={maxDancers}
          onSelect={onCitySelect}
        />
      ))}
    </>
  );
}
