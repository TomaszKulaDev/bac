import React from "react";
import { TimeMarker } from "../types";

interface TimelineMenuProps {
  markers: TimeMarker[];
  currentTime: number;
  onTimeSelect: (time: number) => void;
}

export const TimelineMenu: React.FC<TimelineMenuProps> = ({
  markers,
  currentTime,
  onTimeSelect,
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-64 bg-gray-900 text-white p-4 overflow-y-auto h-full">
      <h3 className="text-lg font-semibold mb-4">Momenty w lekcji</h3>
      <div className="space-y-2">
        {markers.map((marker) => (
          <button
            key={marker.id}
            onClick={() => onTimeSelect(marker.time)}
            className={`w-full text-left p-2 rounded transition-colors
              ${
                currentTime >= marker.time && currentTime < marker.time + 5
                  ? "bg-amber-500 text-black"
                  : "hover:bg-gray-800"
              }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">
                {formatTime(marker.time)}
              </span>
              <span className="flex-1">{marker.title}</span>
            </div>
            {marker.description && (
              <p className="text-sm text-gray-400 mt-1">{marker.description}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
