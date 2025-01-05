# Moduł Szybkich Ogłoszeń Tanecznych

## 🎯 Opis

Moduł służy do zarządzania ogłoszeniami tanecznymi, umożliwiając użytkownikom dodawanie, edycję i przeglądanie ogłoszeń związanych z tańcem. Ogłoszenia są automatycznie grupowane według miast i wyświetlane w formie przejrzystej siatki.

## 🚀 Funkcjonalności

- Wyświetlanie ogłoszeń w układzie 5-kolumnowym
- Filtrowanie według typu ogłoszenia (Praktis, Social, Kurs, Inne)
- Grupowanie według miast
- Zarządzanie własnymi ogłoszeniami (edycja, usuwanie)
- Panel administratora z możliwością moderacji wszystkich ogłoszeń

## 🛠 Technologie

- Next.js 14.2.6 (App Router)
- MongoDB
- TypeScript
- TailwindCSS
- NextAuth.js

## 📁 Struktura projektu

```
src/
├── app/
│   ├── api/
│   │   └── advertisements/
│   │       ├── route.ts              # Główne endpointy API
│   │       ├── [id]/
│   │       │   └── route.ts          # Endpointy dla pojedynczego ogłoszenia
│   │       └── info.MD              # Dokumentacja API
│   └── szukam-partnera-do-tanca/
│       └── components/
│           └── QuickAds.tsx         # Główny komponent ogłoszeń
├── models/
│   └── Advertisement.ts             # Model danych ogłoszenia
└── types/
    └── advertisement.ts             # Typy TypeScript
```

## 💾 Model danych

```typescript
interface Advertisement {
  _id: string;
  title: string;
  description: string;
  type: "Praktis" | "Social" | "Kurs" | "Inne";
  date: string;
  time: string;
  location: {
    city: string;
    place: string;
  };
  author: {
    name: string;
    email: string;
    image?: string;
    level: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔑 API Endpoints

### GET /api/advertisements

Pobiera wszystkie ogłoszenia.

### POST /api/advertisements

Dodaje nowe ogłoszenie.

```typescript
body: {
  title: string;
  description: string;
  type: AdvertisementType;
  date: string;
  time: string;
  location: {
    city: string;
    place: string;
  }
  author: {
    level: string;
  }
}
```

### GET /api/advertisements/[id]

Pobiera szczegóły pojedynczego ogłoszenia.

### PUT /api/advertisements/[id]

Aktualizuje istniejące ogłoszenie.

### DELETE /api/advertisements/[id]

Usuwa ogłoszenie (dostępne dla autora lub administratora).

## 🔐 Uprawnienia

- **Użytkownik niezalogowany**: tylko przeglądanie
- **Użytkownik zalogowany**: dodawanie, edycja i usuwanie własnych ogłoszeń
- **Administrator**: pełne uprawnienia do wszystkich ogłoszeń

## 🎨 Komponenty UI

### QuickAds

Główny komponent wyświetlający ogłoszenia:

- Responsywny układ 5-kolumnowy
- Grupowanie według miast
- Sortowanie według daty
- Przyciski akcji dla właścicieli ogłoszeń

### AdvertisementForm

Komponent formularza do:

- Dodawania nowych ogłoszeń
- Edycji istniejących ogłoszeń

## 📱 Responsywność

- Mobile: 1 kolumna
- SM: 2 kolumny
- MD: 3 kolumny
- LG: 4 kolumny
- XL: 5 kolumn

## 🔄 Zarządzanie stanem

- Wykorzystanie `useState` do lokalnego stanu
- `useSession` do zarządzania sesją użytkownika
- `useCallback` do optymalizacji wydajności

## 🚧 Walidacja

- Walidacja długości opisu (max 255 znaków)
- Sprawdzanie uprawnień użytkownika
- Walidacja formatu ID MongoDB

## 🔍 Debugowanie

Dodano szczegółowe logowanie w:

- API endpoints
- Komponencie QuickAds
- Operacjach na bazie danych

## 🔜 Planowane rozszerzenia

1. Dodanie wyszukiwarki ogłoszeń
2. Filtrowanie według daty
3. System powiadomień o nowych ogłoszeniach
4. Rozbudowa panelu administratora

## 📝 Uwagi

- Pamiętaj o uruchomieniu MongoDB
- Wymagane uwierzytelnienie dla operacji modyfikujących
- Email autora jest wymagany do identyfikacji właściciela
