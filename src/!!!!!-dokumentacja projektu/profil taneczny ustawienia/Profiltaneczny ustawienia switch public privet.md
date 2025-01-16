# Zarządzanie Widocznością Profilu

## 🎯 Wprowadzone funkcjonalności

### 1. Model danych

- Dodano pole `isPublicProfile` do modelu użytkownika
- Domyślna wartość: `true`
- Zdefiniowano typy TypeScript dla nowego pola

### 2. API Endpoints

Zaktualizowano następujące endpointy:

#### `/api/users/me`

- Dodano zwracanie statusu widoczności profilu
- Dodano logowanie dla debugowania

#### `/api/users/update-profile`

- Obsługa aktualizacji statusu widoczności
- Walidacja danych wejściowych
- Szczegółowe logowanie operacji

#### `/api/profiles`

- Filtrowanie profili na podstawie `isPublicProfile`
- Zwracanie tylko publicznych profili
- Optymalizacja zapytań do bazy danych

### 3. Komponenty interfejsu

#### Przełącznik widoczności profilu

```typescript
<input
  type="checkbox"
  className="sr-only peer"
  checked={profile?.isPublicProfile ?? false}
  onChange={(e) => handleFieldUpdate("isPublicProfile", e.target.checked)}
/>
```

#### Lista profili (LatestProfiles)

- Filtrowanie profili na podstawie statusu publicznego
- Zachowanie istniejących filtrów (lokalizacja, poziom, styl)
- Optymalizacja renderowania

### 4. Logowanie i debugowanie

Dodano szczegółowe logi w kluczowych miejscach:

- Pobieranie profilu użytkownika
- Aktualizacja statusu
- Filtrowanie profili
- Odpowiedzi API

## 🔧 Struktura projektu

```
src/
├── app/
│   ├── api/
│   │   ├── profiles/
│   │   └── users/
│   └── profile/
│       └── edit/
├── models/
│   └── User.ts
├── types/
│   └── user.ts
└── hooks/
    └── useUserProfile.ts
```

## 📝 Zmiany w typach

```typescript
interface UserProfile {
  // ... istniejące pola
  isPublicProfile: boolean;
}

interface IUser extends Document {
  // ... istniejące pola
  isPublicProfile: boolean;
}
```

## 🔄 Przepływ danych

1. Użytkownik przełącza widoczność profilu
2. Komponent wysyła aktualizację do API
3. API aktualizuje bazę danych
4. Stan jest odświeżany w interfejsie
5. Lista profili automatycznie filtruje wyniki

## 🚀 Jak używać

### Zmiana widoczności profilu

1. Przejdź do edycji profilu
2. Użyj przełącznika "Profil publiczny"
3. Zmiana jest automatycznie zapisywana

### Sprawdzanie widoczności

1. Wyloguj się
2. Spróbuj wyświetlić profil przez URL
3. Prywatne profile nie będą dostępne

## 🔍 Debugowanie

Logi można znaleźć w:

- Konsoli przeglądarki (operacje frontend)
- Logach serwera (operacje API)
- MongoDB Compass (stan bazy danych)

## 🔜 Planowane rozszerzenia

- [ ] Powiadomienia o zmianie statusu
- [ ] Wskaźnik widoczności w nawigacji
- [ ] Podgląd profilu jako inny użytkownik
- [ ] Statystyki wyświetleń profilu
