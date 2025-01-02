Dokumentacja Projektu

src/
├── components/
│ └── CookieConsent/
│ ├── CookieConsent.tsx # Główny komponent banera cookie
│ └── CookieSettings.tsx # Modal z ustawieniami cookie
├── utils/
│ ├── cookies.ts # Funkcje pomocnicze do zarządzania cookies
│ └── analytics.ts # Integracja z Google Analytics
└── types/
└── gtag.d.ts # Definicje typów dla Google Analytics

1. System Zarządzania Cookies i Analityką

cookies.ts

```
- Zarządza zgodami na pliki cookie
- Obsługuje 3 typy zgód: necessary, analytics, marketing
- Używa biblioteki `cookies-next` do operacji na ciasteczkach
- Przechowuje zgody przez 365 dni

### Konfiguracja Google Analytics

typescript:src/types/gtag.d.ts
- Deklaracja typów dla Google Analytics
- Rozszerza interfejs `Window` o metodę `gtag`
- Obsługuje komendy: consent, config, event

### Komponenty Cookie Consent

typescript:src/components/CookieConsent/CookieConsent.tsx
src/components/CookieConsent/CookieSettings.tsx
- Wyświetla banner zgody na cookies
- Umożliwia szczegółowe zarządzanie zgodami
- Responsywny design z animacjami
- Integracja z Google Analytics
- Persystencja wyborów użytkownika

## 2. Konfiguracja Tailwind CSS

### Główna konfiguracja

typescript:tailwind.config.ts
- Niestandardowe gradienty i animacje
- Własne kolory i czcionki
- Konfiguracja ścieżek content
- Wtyczki: @tailwindcss/aspect-ratio

### Główne funkcje:
- Animacje: fade-in-up, slide-up, scale-up
- Gradienty: radialny i stożkowy
- Niestandardowe kolory tła
- Czcionka Inter
- Indeksy Z dla elementów

## 3. Struktura Aplikacji

### Layout Główny
typescript:src/app/layout.tsx
- Konfiguracja metadanych SEO
- Integracja z Next.js App Router
- Providery dla Redux i NextAuth
- Schema.org markup

### Komponenty Klienckie
```

typescript:src/components/ClientProviders.tsx
src/components/ClientLayout.tsx

- Konfiguracja SessionProvider
- Integracja Redux Store
- Zarządzanie skryptami Schema.org

## 4. Typy i Interfejsy

### Główne typy

typescript:src/types/

- `auth.ts`: Typy autoryzacji
- `next-auth.d.ts`: Rozszerzenia NextAuth
- `advertisement.ts`: Typy ogłoszeń
- `song.ts`: Typy dla muzyki
- `user.ts`: Typy użytkownika
- `playlist.ts`: Typy playlist

## 5. Konfiguracja Projektu

### Zależności

json:package.json
Główne zależności:

- Next.js 14.2.6
- React 18
- Redux Toolkit
- NextAuth
- Tailwind CSS
- Framer Motion
- TypeScript

## Jak skonfigurować

1. **Konfiguracja cookies:**
   typescript
   // Dodaj w .env
   NEXT_PUBLIC_GA_ID=twój-id-google-analytics

2. **Konfiguracja Google Analytics:**

typescript
// Dodaj w app.tsx lub layout.tsx
import { getCookieConsent } from '@/utils/cookies';

3. **Style Tailwind:**
