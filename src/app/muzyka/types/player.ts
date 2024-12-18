/**
 * Interfejs definiujący podstawowe kontrolki odtwarzacza muzycznego.
 * Został stworzony w celu zapewnienia spójnego interfejsu kontroli 
 * odtwarzania między różnymi komponentami aplikacji.
 * 
 * @interface PlayerControls
 * @property {() => void} onTogglePlay - Przełącza stan odtwarzania (play/pause)
 * @property {() => void} onPrevious - Przechodzi do poprzedniego utworu
 * @property {() => void} onNext - Przechodzi do następnego utworu
 */
export interface PlayerControls {
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
} 

interface MusicPlayerProps {
  // ... istniejące propsy
  isAuthenticated: boolean;
} 