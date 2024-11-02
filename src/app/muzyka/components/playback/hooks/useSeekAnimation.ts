import { useState, useCallback } from 'react';
import { SEEK_BAR_CONFIG } from './seekBarConfig';

export const useSeekAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const animate = useCallback((from: number, to: number, duration: number) => {
    setIsAnimating(true);
    const startTime = performance.now();
    
    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(tick);
  }, []);

  return { isAnimating, animate };
};