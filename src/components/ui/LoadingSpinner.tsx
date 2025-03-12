import React from "react";

interface LoadingSpinnerProps {
  /**
   * Additional classes for the container
   */
  className?: string;

  /**
   * Size of the spinner (extra small, small, medium, large, extra large)
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Color theme of the spinner
   */
  color?: "amber" | "gray" | "primary" | "blue" | "green" | "red";

  /**
   * Loading text to display (set to empty string to hide)
   */
  text?: string;

  /**
   * Whether to show the spinner in a full container
   */
  fullContainer?: boolean;

  /**
   * Style variant of the spinner
   */
  variant?: "circle" | "dots" | "pulse" | "bars";
}

/**
 * Modern loading spinner component with customizable size, color, and animation style
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className = "",
  size = "md",
  color = "primary",
  text = "Ładowanie...",
  fullContainer = false,
  variant = "circle",
}) => {
  // Size mappings
  const sizeMap = {
    xs: {
      outer: "w-6 h-6",
      inner: "w-6 h-6",
      border: "border-2",
      text: "text-xs",
      textOffset: "-bottom-6",
      dot: "w-1.5 h-1.5",
      bar: "w-1 h-5",
      gap: "gap-1",
    },
    sm: {
      outer: "w-8 h-8",
      inner: "w-8 h-8",
      border: "border-2",
      text: "text-xs",
      textOffset: "-bottom-6",
      dot: "w-2 h-2",
      bar: "w-1.5 h-6",
      gap: "gap-1.5",
    },
    md: {
      outer: "w-12 h-12",
      inner: "w-12 h-12",
      border: "border-3",
      text: "text-sm",
      textOffset: "-bottom-8",
      dot: "w-2.5 h-2.5",
      bar: "w-2 h-8",
      gap: "gap-2",
    },
    lg: {
      outer: "w-16 h-16",
      inner: "w-16 h-16",
      border: "border-4",
      text: "text-base",
      textOffset: "-bottom-10",
      dot: "w-3 h-3",
      bar: "w-2.5 h-10",
      gap: "gap-2.5",
    },
    xl: {
      outer: "w-24 h-24",
      inner: "w-24 h-24",
      border: "border-4",
      text: "text-lg",
      textOffset: "-bottom-12",
      dot: "w-4 h-4",
      bar: "w-3 h-14",
      gap: "gap-3",
    },
  };

  // Color mappings
  const colorMap = {
    amber: {
      outer: "border-amber-200",
      inner: "border-amber-500",
      text: "text-gray-500",
      fill: "bg-amber-500",
      shadow: "shadow-amber-200",
    },
    gray: {
      outer: "border-gray-200",
      inner: "border-gray-500",
      text: "text-gray-500",
      fill: "bg-gray-500",
      shadow: "shadow-gray-200",
    },
    primary: {
      outer: "border-[#ffd200]/30",
      inner: "border-[#ffd200]",
      text: "text-gray-600",
      fill: "bg-[#ffd200]",
      shadow: "shadow-[#ffd200]/50",
    },
    blue: {
      outer: "border-blue-200",
      inner: "border-blue-500",
      text: "text-gray-600",
      fill: "bg-blue-500",
      shadow: "shadow-blue-200",
    },
    green: {
      outer: "border-green-200",
      inner: "border-green-500",
      text: "text-gray-600",
      fill: "bg-green-500",
      shadow: "shadow-green-200",
    },
    red: {
      outer: "border-red-200",
      inner: "border-red-500",
      text: "text-gray-600",
      fill: "bg-red-500",
      shadow: "shadow-red-200",
    },
  };

  const selectedSize = sizeMap[size];
  const selectedColor = colorMap[color];

  // Circle spinner (improved version of the original)
  const circleSpinner = (
    <div className="relative">
      {/* Outer glow effect */}
      <div
        className={`${selectedSize.outer} rounded-full ${selectedSize.border} ${selectedColor.outer} opacity-30 ${selectedColor.shadow} blur-[1px]`}
      />

      {/* Inner spinner */}
      <div className={`absolute top-0 left-0 ${selectedSize.inner}`}>
        <div
          className={`${selectedSize.inner} rounded-full ${selectedSize.border} ${selectedColor.inner} border-t-transparent shadow-lg animate-spin`}
          style={{ animationDuration: "0.8s" }}
        />
      </div>

      {/* Loading text */}
      {text && (
        <span
          className={`absolute ${selectedSize.textOffset} left-1/2 -translate-x-1/2 ${selectedSize.text} ${selectedColor.text} whitespace-nowrap font-medium`}
        >
          {text}
        </span>
      )}
    </div>
  );

  // Dots spinner (bouncing dots)
  const dotsSpinner = (
    <div className="relative">
      <div className={`flex ${selectedSize.gap}`}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${selectedSize.dot} rounded-full ${selectedColor.fill} animate-bounce shadow-sm`}
            style={{
              animationDuration: "0.6s",
              animationDelay: `${i * 0.15}s`,
              animationFillMode: "both",
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      {text && (
        <span
          className={`absolute ${selectedSize.textOffset} left-1/2 -translate-x-1/2 ${selectedSize.text} ${selectedColor.text} whitespace-nowrap font-medium`}
        >
          {text}
        </span>
      )}
    </div>
  );

  // Pulse spinner (pulsing circle)
  const pulseSpinner = (
    <div className="relative">
      <div
        className={`${selectedSize.outer} rounded-full ${selectedColor.fill} opacity-70 animate-pulse shadow-md`}
        style={{ animationDuration: "1.5s" }}
      />

      {/* Loading text */}
      {text && (
        <span
          className={`absolute ${selectedSize.textOffset} left-1/2 -translate-x-1/2 ${selectedSize.text} ${selectedColor.text} whitespace-nowrap font-medium`}
        >
          {text}
        </span>
      )}
    </div>
  );

  // Bars spinner (equalizer style)
  const barsSpinner = (
    <div className="relative">
      <div className={`flex items-end ${selectedSize.gap}`}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`${selectedSize.bar} rounded-t-md ${selectedColor.fill} animate-pulse shadow-sm`}
            style={{
              animationDuration: `${0.8 + i * 0.2}s`,
              animationDelay: `${i * 0.1}s`,
              height: `${50 + Math.random() * 50}%`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      {text && (
        <span
          className={`absolute ${selectedSize.textOffset} left-1/2 -translate-x-1/2 ${selectedSize.text} ${selectedColor.text} whitespace-nowrap font-medium`}
        >
          {text}
        </span>
      )}
    </div>
  );

  // Choose which spinner to render based on variant
  let spinner;
  switch (variant) {
    case "dots":
      spinner = dotsSpinner;
      break;
    case "pulse":
      spinner = pulseSpinner;
      break;
    case "bars":
      spinner = barsSpinner;
      break;
    case "circle":
    default:
      spinner = circleSpinner;
      break;
  }

  // If fullContainer is true, wrap in a container div
  if (fullContainer) {
    return (
      <div
        className={`flex items-center justify-center w-full h-64 ${className}`}
        role="status"
        aria-label="Loading"
      >
        {spinner}
      </div>
    );
  }

  // Otherwise just return the spinner
  return (
    <div role="status" aria-label="Loading">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
