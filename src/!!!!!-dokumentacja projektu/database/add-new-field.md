# Instrukcja dodawania nowych pól do bazy danych

## 1. Model (Song.ts)

Dodaj nowe pole do schematu w `src/models/Song.ts`:

## 2. Interfejs formularza (AddSongForm.tsx)

Zaktualizuj interfejs `AddSongFormProps` w `src/app/admin/music/components/AddSongForm.tsx`:

## 3. Stan formularza (AddSongForm.tsx)

Dodaj nowe pole do stanu początkowego:

## 4. UI Formularza (AddSongForm.tsx)

Dodaj checkbox w odpowiedniej sekcji formularza:

## 5. API Endpoint (route.ts)

Zaktualizuj obsługę GET i POST w `src/app/api/songs/route.ts`:

## 6. Reset formularza

Pamiętaj o dodaniu nowego pola do resetu formularza w `handleSubmit`:

## Przykłady dodanych pól:

- `impro`
- `sensual`
- `dominicana`
- `poczatkujacy`
- `sredni`
- `zaawansowany`
- `slow`
- `medium`
- `fast`

## Uwagi:

1. Wszystkie nowe pola są typu Boolean z domyślną wartością `false`
2. Nazwy pól powinny być spójne w całej aplikacji
3. Po dodaniu nowego pola, należy przetestować:

   - Dodawanie nowej piosenki
   - Sprawdzenie zapisu w bazie danych
   - Pobranie listy piosenek

   # Song API - Znane problemy i rozwiązania

## Problem z `.lean()` w Mongoose

### Opis problemu

Podczas używania metody `.lean()` w zapytaniach Mongoose do bazy danych MongoDB, wystąpił problem z mapowaniem pól z wartościami domyślnymi, szczególnie dla pól typu Boolean. Problem dotyczył konkretnie pola `dominicana` w modelu `Song`, które nie było zwracane w odpowiedzi API mimo poprawnego zapisania w bazie danych.

### Lokalizacja problemu

Problem występował w endpoincie GET `/api/songs` przy pobieraniu listy piosenek:

### Rozwiązanie

Usunięto metodę `.lean()` z zapytania, co rozwiązało problem z mapowaniem pól. Aktualna implementacja:

### Wpływ na inne części aplikacji

Problem mógł potencjalnie wpływać na inne endpointy używające `.lean()`. Zaleca się unikanie tej metody w całej aplikacji, szczególnie gdy pracujemy z polami posiadającymi wartości domyślne.

### Dodatkowe uwagi

- Metoda `.lean()` jest optymalizacją wydajności w Mongoose, ale może powodować problemy z mapowaniem pól
- Jeśli wydajność jest krytyczna, należy rozważyć inne metody optymalizacji
- Zawsze należy dokładnie testować mapowanie wszystkich pól przy użyciu `.lean()`

### Powiązane pliki

- `src/app/api/songs/route.ts`
- `src/models/Song.ts`
- `src/store/slices/features/songsSlice.ts`

### Data rozwiązania

9 listopada 2024
