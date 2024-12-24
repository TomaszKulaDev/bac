import { useState, useEffect } from "react";

interface UseChartAnimationProps {
  targetValue: number;
  duration?: number;
  delay?: number;
}

export const useChartAnimation = ({
  targetValue,
  duration = 1000,
  delay = 0,
}: UseChartAnimationProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Funkcja easing dla płynniejszej animacji
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = targetValue * easeOutQuart;

      setAnimatedValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    const startAnimation = () => {
      setIsAnimating(true);
      animationFrame = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetValue, duration, delay]);

  return {
    animatedValue,
    isAnimating,
  };
};
