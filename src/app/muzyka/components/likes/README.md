# Komponenty związane z polubieniami

## Struktura projektu

```
src/app/muzyka/components/likes/
├── avatars/
│   ├── LikedByAvatars.tsx   # Komponent avatarów
│   └── README.md            # Dokumentacja komponentu
├── data/
│   └── mockData.ts          # Dane testowe
├── types/
│   └── likedBy.ts           # Typy TypeScript
├── index.ts                 # Eksport publicznego API
└── README.md                # Główna dokumentacja
```

## Komponenty

### LikedByAvatars

Reużywalny komponent React wyświetlający miniatury (avatary) użytkowników, którzy polubili dany element.

```tsx
import { LikedByAvatars, TEMP_LIKED_BY } from "@/app/muzyka/components/likes";

// Podstawowe użycie
<LikedByAvatars users={TEMP_LIKED_BY} />

// Zaawansowane użycie
<LikedByAvatars
  users={TEMP_LIKED_BY}
  size="large"
  showCount={true}
  maxAvatars={5}
/>
```

#### Props

| Prop       | Typ                | Domyślnie | Opis                                     |
| ---------- | ------------------ | --------- | ---------------------------------------- |
| users      | LikedByUser[]      | wymagane  | Lista użytkowników                       |
| size       | 'small' \| 'large' | 'small'   | Rozmiar avatarów                         |
| showCount  | boolean            | true      | Czy pokazywać licznik                    |
| maxAvatars | number             | 4         | Maksymalna liczba wyświetlanych avatarów |

## Typy

### LikedByUser

```typescript
interface LikedByUser {
  userId: string;
  userName: string;
  userImage: string | null;
}
```

### LikedByAvatarsProps

```typescript
interface LikedByAvatarsProps {
  users: LikedByUser[];
  size?: "small" | "large";
  showCount?: boolean;
  maxAvatars?: number;
}
```

## Dane testowe

Plik `mockData.ts` zawiera przykładowe dane do testowania komponentów:

```typescript
const TEMP_LIKED_BY = [
  { userId: "1", userName: "Anna", userImage: null },
  // ... więcej użytkowników
];
```

## Przykłady użycia

### W PoplistaItem

```tsx
// Dla pierwszego miejsca
<LikedByAvatars
  users={TEMP_LIKED_BY}
  size="large"
  showCount={true}
/>

// Dla pozostałych pozycji
<LikedByAvatars
  users={TEMP_LIKED_BY}
  size="small"
  showCount={true}
/>
```

## Stylowanie

### Rozmiary

- Small: `w-10 h-10`
- Large: `w-14 h-14`

### Kolory

- Tło avatara: `bg-amber-100`
- Tekst inicjałów: `text-amber-600`
- Obramowanie: `border-white`
- Licznik: `bg-gray-100`, `text-gray-600`

## Interakcje

### Efekty Hover

- Rozwijanie avatarów po najechaniu na grupę
- Skalowanie pojedynczego avatara przy najechaniu
- Płynne animacje przejść
- Zwiększony z-index dla aktywnego avatara

### Animacje

- Czas trwania: 300ms
- Płynne przejścia dla:
  - Rozstawu między avatarami
  - Skalowania
  - Przesunięcia
  - Przezroczystości licznika

### Responsywność

- Różne rozmiary odstępów dla small/large
- Zachowanie proporcji przy skalowaniu
- Płynne przejścia na mobile/desktop

## Best Practices

1. **Importy**

   ```tsx
   import {
     LikedByAvatars,
     TEMP_LIKED_BY,
   } from "@/app/muzyka/components/likes";
   ```

2. **Wydajność**

   - Używaj `maxAvatars` do ograniczenia liczby renderowanych elementów
   - Przekazuj tylko niezbędne dane

3. **Dostępność**
   - Używaj odpowiednich atrybutów ARIA
   - Zapewnij wystarczający kontrast

## Planowane rozszerzenia

- [ ] Tooltips z nazwami użytkowników
- [ ] Różne kształty avatarów
- [ ] Animacje
- [ ] Przekierowania do profili
- [ ] Obsługa różnych formatów zdjęć
- [ ] Integracja z Next.js Image
- [ ] Testy jednostkowe
- [ ] Storybook stories

## Uwagi

- Wymaga Tailwind CSS
- Zalecane używanie Next.js Image
- Obsługa przypadków brzegowych
- Dokumentacja komponentów w odpowiednich folderach
