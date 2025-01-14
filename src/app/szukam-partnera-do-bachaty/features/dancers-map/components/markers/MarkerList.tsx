import { DancerMarker } from "@/types/user";
import { MarkerCluster } from "./MarkerCluster";

interface MarkerListProps {
  markers: DancerMarker[];
  maxDancers: number;
  onCitySelect: (city: string) => void;
}

export function MarkerList({
  markers,
  maxDancers,
  onCitySelect,
}: MarkerListProps) {
  return (
    <>
      {markers.map((marker) => (
        <MarkerCluster
          key={marker.id}
          marker={marker}
          maxDancers={maxDancers}
          onSelect={onCitySelect}
        />
      ))}
    </>
  );
}
