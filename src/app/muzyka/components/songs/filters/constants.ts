import { FilterOption, FilterState } from './types';

export const TEMPO_OPTIONS: FilterOption[] = [
  { id: 'slow', label: 'Wolne (do 128 BPM)', icon: '🐌' },
  { id: 'medium', label: 'Średnie (128-135 BPM)', icon: '🚶' },
  { id: 'fast', label: 'Szybkie (135+ BPM)', icon: '🏃' },
];

export const STYLE_OPTIONS: FilterOption[] = [
  { id: 'bachata', label: 'Bachata', icon: '💃' },
  { id: 'sensual', label: 'Sensual', icon: '🌙' },
  { id: 'dominicana', label: 'Dominicana', icon: '🌴' },
  { id: 'moderna', label: 'Moderna', icon: '🎵' },
];

export const INITIAL_FILTER_STATE: FilterState = {
  levels: new Set(),
  styles: new Set(),
  tempo: new Set(),
  searchQuery: '',
}; 