export type TempoType = 'slow' | 'medium' | 'fast';
export type StyleType = 'bachata' | 'sensual' | 'dominicana' | 'moderna';

export interface FilterState {
  levels: Set<string>;
  styles: Set<StyleType>;
  tempo: Set<TempoType>;
  searchQuery: string;
}

export interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

export interface FilterOption {
  id: string;
  label: string;
  icon?: string;
  color?: string;
} 