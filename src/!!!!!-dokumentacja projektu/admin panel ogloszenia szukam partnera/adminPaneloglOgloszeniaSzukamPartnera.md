# Dokumentacja Systemu Ogłoszeń

## Struktura Plików

### Panel Administracyjny

1. `src/app/admin/announcements/page.tsx`

   - Główny komponent strony zarządzania ogłoszeniami
   - Wyświetla listę ogłoszeń
   - Umożliwia usuwanie ogłoszeń
   - Pokazuje status i czas pozostały do wydarzenia

2. `src/app/admin/AdminLayout.tsx`
   - Layout panelu administracyjnego
   - Zawiera nawigację z zakładką "Ogłoszenia"

### API Endpoints

1. `src/app/api/advertisements/route.ts`

   - GET: pobieranie listy ogłoszeń
   - POST: dodawanie nowych ogłoszeń

2. `src/app/api/advertisements/[id]/route.ts`
   - DELETE: usuwanie ogłoszeń
   - PATCH: aktualizacja ogłoszeń

### Model Danych

1. `src/models/Advertisement.ts`

```typescript
interface Advertisement {
  _id: string;
  title: string;
  description: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
  date: string;
  danceLevel?: string;
}
```

### Middleware

1. `src/middleware/adminAuthMiddleware.ts`
   - Sprawdzanie uprawnień administratora
   - Zabezpieczenie endpointów administracyjnych

## Funkcjonalności

### Dla Administratora

1. Przeglądanie ogłoszeń

   - Lista wszystkich ogłoszeń
   - Informacje o autorze
   - Data utworzenia i data wydarzenia
   - Status aktualności ogłoszenia

2. Zarządzanie ogłoszeniami
   - Usuwanie ogłoszeń
   - Monitorowanie przeterminowanych ogłoszeń
   - Wizualne oznaczenie przeterminowanych ogłoszeń

### Dla Użytkownika

1. Dodawanie ogłoszeń

   - Formularz z tytułem i opisem
   - Wybór daty wydarzenia
   - Wybór poziomu tańca

2. Przeglądanie własnych ogłoszeń
   - Lista aktywnych ogłoszeń
   - Możliwość edycji i usuwania

## Zabezpieczenia

1. Autoryzacja

   - Sprawdzanie roli administratora
   - Zabezpieczenie endpointów API
   - Walidacja danych wejściowych

2. Walidacja danych
   - Sprawdzanie poprawności dat
   - Weryfikacja wymaganych pól
   - Sanityzacja danych wejściowych
