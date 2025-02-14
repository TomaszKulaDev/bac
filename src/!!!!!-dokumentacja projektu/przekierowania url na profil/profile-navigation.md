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

# Dokumentacja Nawigacji do Profili Użytkowników

## Wprowadzenie

Ten dokument opisuje implementację spójnego systemu nawigacji do profili użytkowników w aplikacji Baciata. System zapewnia przyjazne dla SEO URL-e, obsługę polskich znaków oraz zachowuje kompatybilność wsteczną.

## Struktura URL-i Profili

### Format URL

Profile są dostępne pod następującymi formatami URL:

- `/profile/[slug]` - np. `/profile/jan-kowalski` (z polskich znaków "Jan Kowalski")
- `/profile/[id]` - np. `/profile/678fc6d97cf56efeb374f2a2` (fallback)

### Priorytety Generowania URL

1. Użyj zdefiniowanego `slug`a (jeśli istnieje)
2. Wygeneruj slug z nazwy użytkownika (automatyczna konwersja polskich znaków)
3. Użyj ID jako ostateczność

## Implementacja

### 1. Helper do Generowania URL

```typescript
// src/utils/profile.ts
import { generateSlug } from "./slug";

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

### 2. Generowanie Slugów z Obsługą Polskich Znaków

```typescript
// src/utils/slug.ts
export const generateSlug = (text: string): string => {
  // Mapowanie polskich znaków na ich odpowiedniki bez ogonków
  const polishChars: { [key: string]: string } = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
    Ą: "A",
    Ć: "C",
    Ę: "E",
    Ł: "L",
    Ń: "N",
    Ó: "O",
    Ś: "S",
    Ź: "Z",
    Ż: "Z",
  };

  return text
    .split("")
    .map((char) => polishChars[char] || char)
    .join("")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // usuń znaki specjalne
    .replace(/\s+/g, "-") // zamień spacje na myślniki
    .replace(/-+/g, "-"); // usuń wielokrotne myślniki
};
```

### 3. Automatyczna Aktualizacja Slugów w API

```typescript
// src/app/api/users/update-profile/route.ts
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const slug = generateSlug(data.name); // Generowanie sluga z nazwy

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          ...data,
          slug: slug, // Automatyczna aktualizacja sluga
        },
      },
      { new: true }
    );

    return NextResponse.json({
      id: updatedUser._id.toString(),
      name: updatedUser.name, // Zachowujemy oryginalną nazwę z polskimi znakami
      slug: updatedUser.slug, // URL-friendly slug bez polskich znaków
      // ... pozostałe pola
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
```

## Przykłady Konwersji

| Nazwa Oryginalna             | Wygenerowany Slug            |
| ---------------------------- | ---------------------------- |
| Łukasz Świątek               | lukasz-swiatek               |
| Żaneta Kowalska              | zaneta-kowalska              |
| Grzegorz Brzęczyszczykiewicz | grzegorz-brzeczyszczykiewicz |

## Korzyści Implementacji

1. **SEO-Friendly**

   - Czytelne URL-e bez polskich znaków
   - Zachowanie oryginalnych nazw w interfejsie
   - Łatwiejsze indeksowanie przez wyszukiwarki

2. **Spójność**

   - Jednolity system generowania URL-i
   - Automatyczna konwersja polskich znaków
   - Centralna logika w `generateSlug`

3. **UX**
   - Czytelne adresy URL
   - Zachowanie oryginalnych nazw w interfejsie
   - Spójna nawigacja w całej aplikacji

## Dobre Praktyki

1. **Generowanie Slugów**

   - Zawsze używaj `generateSlug` do tworzenia URL-i
   - Nie modyfikuj ręcznie polskich znaków
   - Zachowuj oryginalne nazwy w bazie danych

2. **Aktualizacja Profili**

   - Slug jest automatycznie aktualizowany przy zmianie nazwy
   - Zachowywana jest oryginalna nazwa z polskimi znakami
   - URL jest zawsze generowany bez polskich znaków

3. **Wyszukiwanie**
   - Szukaj po slugu i oryginalnej nazwie
   - Uwzględniaj wielkość liter
   - Obsługuj różne warianty zapisu

## Uwagi Techniczne

1. **Baza Danych**

   - Przechowuj zarówno oryginalną nazwę jak i slug
   - Indeksuj pole slug dla szybszego wyszukiwania
   - Zachowuj historię zmian slugów (opcjonalnie)

2. **API**

   - Zawsze zwracaj zarówno nazwę jak i slug
   - Waliduj dane wejściowe
   - Obsługuj błędy konwersji

3. **Frontend**
   - Używaj komponentu Link z Next.js
   - Przekazuj pełne dane do getProfileUrl
   - Wyświetlaj oryginalne nazwy w interfejsie
