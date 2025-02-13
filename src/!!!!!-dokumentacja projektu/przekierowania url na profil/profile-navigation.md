# Dokumentacja Nawigacji do Profili Użytkowników

## Wprowadzenie

Ten dokument opisuje implementację spójnego systemu nawigacji do profili użytkowników w aplikacji Baciata. System zapewnia przyjazne dla SEO URL-e oraz zachowuje kompatybilność wsteczną.

## Struktura URL-i Profili

### Format URL

Profile są dostępne pod następującymi formatami URL:

- `/profile/[slug]` - np. `/profile/baciatapl`
- `/profile/[id]` - np. `/profile/678fc6d97cf56efeb374f2a2`

### Priorytety Generowania URL

1. Użyj zdefiniowanego `slug`a (jeśli istnieje)
2. Wygeneruj slug z nazwy użytkownika
3. Użyj ID jako ostateczność

## Implementacja

### 1. Helper do Generowania URL

```typescript
// src/utils/profile.ts
export const getProfileUrl = ({
  id,
  name,
  slug,
}: {
  id: string;
  name: string;
  slug?: string;
}) => {
  if (slug) return `/profile/${slug}`;
  const generatedSlug = generateSlug(name);
  return `/profile/${generatedSlug || id}`;
};
```

### 2. Generowanie Slugów

```typescript
// src/utils/slug.ts
export function generateSlug(title: string): string {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .replace(/^-+|-+$/g, "");
}
```

## Użycie w Komponentach

### 1. Modal z Lajkami

```typescript
// LikersModal.tsx
router.push(
  getProfileUrl({
    id: user.userId,
    name: user.userName,
    ...(user.slug && { slug: user.slug }),
  })
);
```

### 2. Avatary Użytkowników

```typescript
// LikedByAvatars.tsx
onAvatarClick?.(
  getProfileUrl({
    id: user.userId,
    name: user.userName,
    ...(user.slug && { slug: user.slug }),
  })
);
```

### 3. Karty Profili

```typescript
// ProfileCard.tsx
<Link
  href={getProfileUrl({
    id: profile.id,
    name: profile.name,
    slug: profile.slug
  })}
>
```

## Interfejsy TypeScript

### LikedByUser

```typescript
interface LikedByUser {
  userId: string;
  userName: string;
  email: string;
  userImage: string | null;
  slug?: string;
}
```

### LikedByAvatarsProps

```typescript
interface LikedByAvatarsProps {
  users: LikedByUser[];
  onAvatarClick?: (profileUrl: string) => void;
  // ... inne props
}
```

## Korzyści Implementacji

1. **SEO-Friendly**

   - Czytelne URL-e zawierające nazwy użytkowników
   - Łatwiejsze indeksowanie przez wyszukiwarki

2. **Spójność**

   - Jednolity system generowania URL-i
   - Centralna logika w `getProfileUrl`

3. **Kompatybilność**

   - Wsparcie dla starszych URL-i bazujących na ID
   - Płynna migracja na system slugów

4. **Elastyczność**
   - Możliwość łatwej zmiany formatu URL-i
   - Wsparcie dla różnych formatów identyfikatorów

## Dobre Praktyki

1. **Zawsze używaj `getProfileUrl`**

   - Nie konstruuj URL-i ręcznie
   - Zapewnia spójność w całej aplikacji

2. **Przekazuj pełne dane**

   - Zawsze przekazuj `id`, `name` i opcjonalnie `slug`
   - Pozwala to na generowanie optymalnych URL-i

3. **Obsługa błędów**
   - Zawsze miej fallback na ID
   - Waliduj dane wejściowe

## Planowane Rozszerzenia

1. Dodanie cache'owania slugów
2. Implementacja przekierowań 301 ze starych URL-i
3. System walidacji unikalności slugów
4. Automatyczna aktualizacja slugów przy zmianie nazwy użytkownika

## Uwagi

- Slugi są generowane z nazw użytkowników, więc mogą się powtarzać
- W takim przypadku system używa ID jako fallbacku
- Warto rozważyć dodanie unikalnych identyfikatorów do slugów
