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

  // Desktop version
  const desktopView = (
    <div className="hidden sm:flex items-center gap-4">
      <button
        onClick={() => onChange(value ? null : [0, duration])}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
          ${
            value
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span className="font-medium">
          {value ? "Zapętlenie włączone" : "Zapętl sekcję"}
        </span>
      </button>

      {value && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white min-w-[45px]">
            {formatTime(value[0])}
          </span>
          <input
            type="range"
            min={0}
            max={duration}
            value={value[0]}
            onChange={(e) => handleRangeChange("start", Number(e.target.value))}
            className="w-24 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-3 
              [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-amber-500"
          />
          <span className="text-sm font-medium text-white">do</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={value[1]}
            onChange={(e) => handleRangeChange("end", Number(e.target.value))}
            className="w-24 h-1 bg-gray-300 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-3 
              [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-amber-500"
          />
          <span className="text-sm font-medium text-white min-w-[45px]">
            {formatTime(value[1])}
          </span>
        </div>
      )}
    </div>
  );

  // Mobile version
  const mobileView = (
    <div className="block sm:hidden w-full mt-3">
      <button
        onClick={() => onChange(value ? null : [0, duration])}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
          ${value ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700"}`}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span className="font-medium">
          {value ? "Zapętlenie włączone" : "Zapętl sekcję"}
        </span>
      </button>

      {value && (
        <div className="mt-2 bg-black/40 backdrop-blur-sm rounded-xl p-4 space-y-6">
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={duration}
              value={value[0]}
              onChange={(e) =>
                handleRangeChange("start", Number(e.target.value))
              }
              className="w-full h-1 bg-white/10 rounded-full appearance-none
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-amber-500
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-lg
                touch-pan-x"
            />
            <span className="text-sm font-medium text-white">
              {formatTime(value[0])}
            </span>
          </div>

          <div className="text-center text-sm font-medium text-white/80">
            do
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={duration}
              value={value[1]}
              onChange={(e) => handleRangeChange("end", Number(e.target.value))}
              className="w-full h-1 bg-white/30 rounded-full appearance-none
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-amber-500
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-lg
                touch-pan-x"
            />
            <span className="text-sm font-medium text-white">
              {formatTime(value[1])}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {desktopView}
      {mobileView}
    </>
  );
};
