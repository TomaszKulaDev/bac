import React, { useState } from "react";

interface LoopSectionControlProps {
  value: [number, number] | null;
  onChange: (section: [number, number] | null) => void;
  duration: number;
  onAdjustingChange?: (isAdjusting: boolean) => void;
}

export const LoopSectionControl: React.FC<LoopSectionControlProps> = ({
  value,
  onChange,
  duration,
  onAdjustingChange,
}) => {
  const [isAdjusting, setIsAdjusting] = useState(false);

  const handleRangeChange = (type: "start" | "end", newValue: number) => {
    if (value) {
      onChange(type === "start" ? [newValue, value[1]] : [value[0], newValue]);
    }
  };

  const handleAdjustingStart = () => {
    onAdjustingChange?.(true);
  };

  const handleAdjustingEnd = () => {
    onAdjustingChange?.(false);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onChange(value ? null : [0, duration])}
        className={`video-control-button ${value ? "active" : ""}`}
        onMouseEnter={handleAdjustingStart}
        onMouseLeave={handleAdjustingEnd}
      >
        <svg viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>{value ? "Zapętlenie włączone" : "Zapętl sekcję"}</span>
      </button>

      {value && (
        <div
          className="loop-controls flex items-center gap-2"
          onMouseEnter={handleAdjustingStart}
          onMouseLeave={handleAdjustingEnd}
        >
          <span className="text-sm text-gray-600 min-w-[45px]">
            {formatTime(value[0])}
          </span>
          <input
            type="range"
            min={0}
            max={duration}
            value={value[0]}
            onChange={(e) => handleRangeChange("start", Number(e.target.value))}
            onMouseDown={handleAdjustingStart}
            onMouseUp={handleAdjustingEnd}
            className="video-range-input"
          />
          <span className="text-sm text-gray-500">do</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={value[1]}
            onChange={(e) => handleRangeChange("end", Number(e.target.value))}
            onMouseDown={handleAdjustingStart}
            onMouseUp={handleAdjustingEnd}
            className="video-range-input"
          />
          <span className="text-sm text-gray-600 min-w-[45px]">
            {formatTime(value[1])}
          </span>
        </div>
      )}
    </div>
  );
};
