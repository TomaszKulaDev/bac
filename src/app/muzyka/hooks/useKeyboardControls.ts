import { useEffect } from 'react';
import type { PlayerControls } from '../types/player';

export const useKeyboardControls = (controls: PlayerControls) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          controls.onTogglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          controls.onPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          controls.onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [controls]);
}; 