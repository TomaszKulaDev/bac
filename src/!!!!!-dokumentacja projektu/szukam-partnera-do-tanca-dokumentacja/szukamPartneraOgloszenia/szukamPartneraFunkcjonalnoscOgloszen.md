# Dokumentacja Systemu Ogłoszeń

## 1. Struktura Plików i Komponenty

### 1.1 Komponenty Główne

#### AddAdvertisementButton.tsx

```typescript
// src/app/szukam-partnera-do-bachaty/components/AddAdvertisementButton.tsx
- Przycisk otwierający modal z formularzem
- Wykorzystuje next-auth do weryfikacji sesji użytkownika
- Przekierowuje niezalogowanych na stronę logowania
- Obsługuje stan modala (isModalOpen)
```

#### AdvertisementForm.tsx

```typescript
// src/app/szukam-partnera-do-bachaty/components/AdvertisementForm.tsx
- Główny formularz dodawania/edycji ogłoszeń
- Walidacja wszystkich pól
- Obsługa przesyłania danych do API
- Szablony opisów dla różnych typów ogłoszeń
- Obsługa błędów i komunikatów
```

### 1.2 Komponenty UI

#### Modal.tsx

```typescript
// src/components/ui/Modal.tsx
- Reużywalny komponent modalowy
- Portal do body
- Obsługa klawisza ESC
- Blokada scrollowania body
- Animacje wejścia/wyjścia
```

#### CustomSelect.tsx

```typescript
// src/components/ui/CustomSelect.tsx
- Stylowany komponent select
- Obsługa ikon
- Customowe style dla opcji
- Integracja z formularzem
```

### 1.3 Modele i Typy

#### advertisement.ts (typy)

```typescript
// src/types/advertisement.ts
- Definicje typów AdvertisementType
- Interface Advertisement
- Typy dla poziomów zaawansowania
- Typy dla lokalizacji
```

#### Advertisement.ts (model)

```typescript
// src/models/Advertisement.ts
- Schema mongoose
- Walidacja pól
- Timestampy (createdAt, updatedAt)
- Relacje z użytkownikami
```

## 2. Funkcjonalności

### 2.1 Dodawanie Ogłoszenia

1. Kliknięcie przycisku "Dodaj ogłoszenie"
2. Sprawdzenie autoryzacji
3. Otwarcie modala z formularzem
4. Wypełnienie pól:
   - Typ ogłoszenia
   - Tytuł
   - Opis (z szablonami)
   - Data i czas
   - Lokalizacja
   - Poziom zaawansowania
5. Walidacja danych
6. Wysłanie do API
7. Komunikat o sukcesie/błędzie

### 2.2 Wyświetlanie Ogłoszeń

#### QuickAds.tsx

```typescript
// src/app/szukam-partnera-do-bachaty/components/QuickAds.tsx
- Lista ogłoszeń
- Filtrowanie po typach
- Paginacja ("Pokaż więcej")
- Opcje edycji/usuwania dla właściciela
```

#### Strona Szczegółów

```typescript
// src/app/szukam-partnera-do-bachaty/ogloszenie/[id]/page.tsx
- Pełne informacje o ogłoszeniu
- Dane autora
- Mapa lokalizacji
- Przyciski akcji
```

## 3. Style i UI

### 3.1 Główny Arkusz Stylów

```css
// src/app/szukam-partnera-do-bachaty/styles.css
- Style komponentów
- Animacje
- Efekty hover
- Responsywność
- Customowe scrollbary
```

### 3.2 Motywy i Kolory

- Gradient: amber-500 do red-500
- Tła: białe z opacity
- Cienie i efekty glassmorphism
- Zaokrąglone rogi (rounded-lg)

## 4. API i Integracje

### 4.1 Endpointy

```typescript
// src/app/api/advertisements/route.ts
GET    /api/advertisements      // Lista ogłoszeń
POST   /api/advertisements      // Dodawanie ogłoszenia
GET    /api/advertisements/:id  // Szczegóły ogłoszenia
PUT    /api/advertisements/:id  // Aktualizacja
DELETE /api/advertisements/:id  // Usuwanie
```

### 4.2 Autoryzacja

- Wykorzystanie next-auth
- Middleware do sprawdzania sesji
- Zabezpieczenie endpointów

## 5. Obsługa Błędów

### 5.1 Walidacja

- Sprawdzanie wymaganych pól
- Walidacja dat (nie z przeszłości)
- Limity długości tekstu
- Poprawność lokalizacji

### 5.2 Komunikaty

- Toast notifications
- Informacje o błędach formularza
- Potwierdzenia akcji
- Strona 404 dla nieistniejących ogłoszeń

## 6. Optymalizacja

### 6.1 Performance

- Lazy loading komponentów
- Optymalizacja obrazów
- Cachowanie zapytań
- Debouncing w wyszukiwaniu

### 6.2 SEO

- Metadane w layout.tsx
- Opisy dla wyszukiwarek
- Strukturowane dane JSON-LD
- Przyjazne URL-e

## 7. Przyszłe Rozszerzenia

### 7.1 Planowane Funkcje

- System powiadomień
- Automatyczne usuwanie przeterminowanych
- Rozszerzone filtry
- System ocen i komentarzy

### 7.2 Możliwe Ulepszenia

- Integracja z mapami
- System rezerwacji
- Chat między użytkownikami
- Eksport do kalendarza
