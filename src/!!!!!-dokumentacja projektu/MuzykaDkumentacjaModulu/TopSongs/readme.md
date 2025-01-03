# Dokumentacja Komponentu TopSongs

## 1. Opis Ogólny
TopSongs to komponent wyświetlający 5 najpopularniejszych utworów oraz szczegóły aktualnie odtwarzanego utworu. Wykorzystuje dynamiczne kolory i efekty wizualne bazujące na miniaturach YouTube.

## 2. Struktura Plików
src/
├── app/
│ └── muzyka/
│ ├── components/
│ │ └── TopSongs.tsx
│ ├── hooks/
│ │ ├── useLike.ts
│ │ └── useColorExtraction.ts
│ ├── types/
│ │ └── song.ts
│ ├── utils/
│ │ ├── youtube.ts
│ │ └── colors.ts
│ └── styles/
│ ├── animations.ts
│ └── youtube-player.css


## 3. Główne Funkcjonalności

### 3.1 Wyświetlanie Top 5
- Sortowanie po liczbie polubień
- Specjalne wyróżnienie pierwszej pozycji (złota kolorystyka)
- Animowane wejścia elementów
- Responsywny układ
- Dynamiczne statystyki popularności

### 3.2 Dynamiczne Kolory
- Ekstrakcja dominującego koloru z miniatur YouTube
- Płynne przejścia między kolorami (transition: 700ms)
- Ambient light effect z blur i gradient
- Gradient overlay z zmienną przezroczystością

### 3.3 Interakcje
- Odtwarzanie/pauzowanie utworów
- System lajków (integracja z Redux)
- Animacje hover i kliknięć (Framer Motion)
- Obsługa błędów i stanu ładowania

## 4. Komponenty i Hooki

### 4.1 Wykorzystane Komponenty
- Image (Next.js) - optymalizacja obrazów
- motion.div (Framer Motion) - animacje
- FaPlay/FaPause/FaCrown (React Icons) - ikony
- ErrorBoundary - obsługa błędów renderowania

### 4.2 Custom Hooki
- useLike (zarządzanie polubieniami)
- useColorExtraction (ekstrakcja kolorów)
- useSession (Next-Auth)
- useSelector (Redux)
- useYouTubeThumbnail (zarządzanie miniaturami)

## 5. Interfejsy i Typy

typescript
interface TopSongsProps {
onSongSelect: (id: string) => void;
currentSongId?: string;
isPlaying: boolean;
}
interface Song {
id: string;
title: string;
artist: string;
youtubeId: string;
likesCount: number;
isLiked?: boolean;
}


## 6. Integracje

### 6.1 Redux Store
- Przechowywanie stanu utworów
- Sortowanie i filtrowanie
- Aktualizacja polubień
- Synchronizacja między komponentami

### 6.2 Next-Auth
- Autoryzacja użytkowników
- Zabezpieczenie akcji lajkowania
- Personalizacja widoku

### 6.3 YouTube API
- Pobieranie miniatur
- Ekstrakcja kolorów dominujących
- Obsługa błędów API
- Cachowanie odpowiedzi

## 7. Optymalizacje
- Lazy loading obrazów
- Memoizacja sortowania (useMemo)
- Optymalizacja re-renderów (useCallback)
- Cachowanie kolorów dominujących
- Preload miniatur dla top 5

## 8. Obsługa Błędów
- Fallback dla błędów ładowania obrazów
- Domyślne kolory przy błędach ekstrakcji
- Toast notifications dla błędów API
- Graceful degradation UI
- Retry mechanizm dla API

## 9. Przykłady Użycia

typescript
import { TopSongs } from '@/app/muzyka/components/TopSongs';
export default function MusicPage() {
return (
<TopSongs
onSongSelect={handleSongSelect}
currentSongId={currentSong?.id}
isPlaying={isPlaying}
/>
);
}


## 10. Zależności
- next: 14.2.6
- react: ^18
- framer-motion: ^11
- @reduxjs/toolkit: ^2
- next-auth: ^4
- tailwindcss: ^3
- color-thief-node: ^1.0.4

## 11. Znane Problemy i TODO
- [ ] Optymalizacja wydajności dla dużej liczby utworów
- [ ] Dodanie testów jednostkowych i E2E
- [ ] Implementacja cache'owania kolorów
- [ ] Rozszerzenie animacji przejść
- [ ] Dodanie wsparcia dla różnych formatów miniatur
- [ ] Implementacja fallback dla błędów YouTube API
- [ ] Optymalizacja ekstrakcji kolorów

## 12. Powiązane Komponenty
- MusicPlayer.tsx - główny odtwarzacz
- PlaylistHeader.tsx - nagłówek playlisty
- SongControls.tsx - kontrolki utworu
- RecommendedSongs.tsx - rekomendowane utwory

Dokumentacja bazuje na następujących plikach:
- TopSongs.tsx (linie 29-202)
- youtube-player.css
- Dokumentacja lajków (linie 398-416)
- PlaylistHeader dokumentacja