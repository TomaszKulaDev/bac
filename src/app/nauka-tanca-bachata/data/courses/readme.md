# Plan Dodawania Nowej Lekcji do Kursu Tańca

## 1. Przygotowanie Materiałów

### Wymagane Pliki Wideo
- [ ] Widok z przodu (front)
- [ ] Widok z tyłu (back)
- [ ] Szczegóły techniczne (detail)
- [ ] Miniaturka lekcji (thumbnail)

### Wymagane Informacje
- [ ] Tytuł lekcji
- [ ] Opis lekcji
- [ ] Czas trwania
- [ ] Poziom trudności
- [ ] Dane instruktora

## 2. Proces Dodawania

### Krok 1: Dodaj URL Filmów
Edytuj plik: `src/app/nauka-tanca-bachata/data/sampleVideos.ts`
```typescript
export const SAMPLE_VIDEOS = {
  // Dodaj nowe filmy:
  NAZWA_FILMU_PRZOD: "url/do/filmu/przod.mp4",
  NAZWA_FILMU_TYL: "url/do/filmu/tyl.mp4",
  NAZWA_FILMU_SZCZEGOLY: "url/do/filmu/szczegoly.mp4"
};
```

### Krok 2: Dodaj Lekcję
Edytuj odpowiedni plik kursu w: `src/app/nauka-tanca-bachata/data/courses/`
- beginnerCourse.ts (dla kursu podstawowego)
- modernaCourse.ts (dla kursu moderna)
- sensualCourse.ts (dla kursu sensual)
- isolationCourse.ts (dla kursu izolacji)

```typescript
{
  id: "unikalne-id-lekcji",
  title: "Tytuł Lekcji",
  description: "Opis lekcji",
  duration: "45min",
  thumbnail: "/images/lessons/thumbnail.jpg",
  videos: [
    {
      id: "v1-unikalne-id",
      title: "Widok z przodu",
      description: "Opis widoku",
      videoUrl: SAMPLE_VIDEOS.NAZWA_FILMU_PRZOD,
      perspective: "front",
      instructor: "Nazwa Instruktora"
    },
    {
      id: "v2-unikalne-id",
      title: "Widok z tyłu",
      description: "Opis widoku",
      videoUrl: SAMPLE_VIDEOS.NAZWA_FILMU_TYL,
      perspective: "back",
      instructor: "Nazwa Instruktora"
    },
    {
      id: "v3-unikalne-id",
      title: "Szczegóły techniczne",
      description: "Opis szczegółów",
      videoUrl: SAMPLE_VIDEOS.NAZWA_FILMU_SZCZEGOLY,
      perspective: "detail",
      instructor: "Nazwa Instruktora"
    }
  ],
  isCompleted: false
}
```

## 3. Checklist Przed Publikacją

### Sprawdzenie Plików
- [ ] Wszystkie URL do filmów są poprawne
- [ ] Miniaturka jest dodana w odpowiednim folderze
- [ ] Filmy są w odpowiedniej jakości (minimum 1080p)

### Sprawdzenie Kodu
- [ ] Unikalne ID dla lekcji
- [ ] Unikalne ID dla każdego filmu
- [ ] Poprawne dane instruktora
- [ ] Prawidłowa kategoria kursu

### Testowanie
- [ ] Odtwarzanie wszystkich perspektyw
- [ ] Działanie przycisków kontrolnych
- [ ] Responsywność na różnych urządzeniach

## 4. Konwencje Nazewnictwa

### ID Lekcji
```
[kurs]-[rozdzial]-[numer-lekcji]
Przykład: bachata-podstawy-r1-l1
```

### ID Filmów
```
v[numer]-[id-lekcji]-[perspektywa]
Przykład: v1-bachata-podstawy-r1-l1-front
```

### Nazwy Plików Wideo
```
[kurs]-[rozdzial]-[lekcja]-[perspektywa].mp4
Przykład: bachata-podstawy-r1-l1-front.mp4
```

## 5. Struktura Katalogów

```
src/app/nauka-tanca-bachata/
├── data/
│   ├── courses/
│   │   ├── beginnerCourse.ts
│   │   ├── modernaCourse.ts
│   │   ├── sensualCourse.ts
│   │   └── isolationCourse.ts
│   └── sampleVideos.ts
└── public/
    └── images/
        └── lessons/
            └── thumbnails/
```

## 6. Wsparcie

W razie problemów:
- Sprawdź istniejące lekcje jako przykłady
- Skontaktuj się z zespołem technicznym
- Użyj systemu kontroli wersji (git) do śledzenia zmian

## 7. Uwagi Końcowe

- Zawsze twórz kopię zapasową przed wprowadzaniem zmian
- Testuj zmiany lokalnie przed wdrożeniem
- Zachowaj spójność z istniejącymi materiałami
- Upewnij się, że wszystkie materiały są wysokiej jakości