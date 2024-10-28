# Dokumentacja Techniczna Baciatify

## Przegląd Projektu

Baciatify to aplikacja do odtwarzania muzyki bachata, zbudowana przy użyciu Next.js 14.2.6 z App Routerem.

### Technologie

- Next.js 14.2.6 (App Router)
- TypeScript
- Redux Toolkit
- TailwindCSS
- MongoDB
- NextAuth.js

### Główne Funkcjonalności

1. Odtwarzacz muzyki z integracją YouTube
2. System playlist
3. Sortowanie i filtrowanie utworów
4. Panel administracyjny
5. System autoryzacji

### Struktura Projektu

Główne komponenty aplikacji znajdują się w następujących lokalizacjach:

- Odtwarzacz muzyki: `/src/app/muzyka/components/MusicPlayer.tsx`
- Panel admina: `/src/app/admin/`
- API: `/src/app/api/`
- Hooki: `/src/app/muzyka/hooks/`
- Typy: `/src/app/muzyka/types/`

### Dokumentacja

- [Architektura](/docs/architecture/overview.md)
- [Funkcjonalności](/docs/features/)
- [API](/docs/api/endpoints.md)
- [Rozwój](/docs/development/getting-started.md)
