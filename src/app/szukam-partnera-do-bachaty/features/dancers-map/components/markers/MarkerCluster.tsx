import { Marker, Popup } from "react-leaflet";
import { DancerMarker } from "../../types";
import { createMarkerIcon } from "./MarkerIcon";
import { MarkerPopup } from "./MarkerPopup";

interface MarkerClusterProps {
  marker: DancerMarker;
  rank: number;
  maxDancers: number;
  onSelect: (city: string) => void;
}

export function MarkerCluster({
  marker,
  rank,
  maxDancers,
  onSelect,
}: MarkerClusterProps) {
  return (
    <Marker
      key={marker.id}
      position={[marker.coordinates.lat, marker.coordinates.lng]}
      icon={createMarkerIcon({ count: marker.stats.activeDancers })}
      eventHandlers={{
        click: () => onSelect(marker.city),
      }}
    >
      <Popup>
        <MarkerPopup marker={marker} rank={rank} maxDancers={maxDancers} />
      </Popup>
    </Marker>
  );
}
