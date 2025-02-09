# System Polubień w MusiSite

## Opis funkcjonalności

System polubień pozwala użytkownikom na:

- Polubienie utworu (like)
- Wyświetlanie liczby polubień dla każdego utworu
- Wyświetlanie avatarów użytkowników, którzy polubili utwór
- Interaktywne avatary z animacjami przy najechaniu

## Struktura komponentów

### 1. PoplistaItem.tsx

Główny komponent wyświetlający pojedynczy utwór w liście. Zawiera:

- Przycisk like z licznikiem polubień
- Komponent SongLikers wyświetlający avatary
- Różne style dla pierwszego miejsca i pozostałych pozycji

### 2. SongLikers.tsx

Komponent odpowiedzialny za:

- Pobieranie listy użytkowników, którzy polubili utwór
- Przekazywanie danych do komponentu LikedByAvatars
- Obsługę stanu ładowania

### 3. LikedByAvatars.tsx

Komponent UI wyświetlający avatary użytkowników:

- Responsywne avatary z inicjałami
- Animacje przy najechaniu
- Limit wyświetlanych avatarów
- Wskaźnik dodatkowych użytkowników (+X)

## Endpointy API

### GET /api/musisite/songs/[id]/likers

Pobiera listę użytkowników, którzy polubili dany utwór:

```typescript
// Response
{
  users: {
    userId: string;
    email: string;
  }
  [];
}
```

## Typy TypeScript

### LikedByUser

```typescript
interface LikedByUser {
  userId: string;
  userName: string;
}
```

### LikedByAvatarsProps

```typescript
interface LikedByAvatarsProps {
  users: LikedByUser[];
  size?: "small" | "large";
  maxAvatars?: number;
}
```

## Style i animacje

### Avatary

- Responsywne rozmiary (small/large)
- Animacje hover
- Efekt nakładania się avatarów
- Rozszerzanie się przy najechaniu myszką

### Przycisk like

- Zmiana koloru przy aktywnym polubieniu
- Animacja skalowania przy najechaniu
- Różne style dla stanu disabled

## Responsywność

- Avatary są ukryte na mobilnych urządzeniach (`hidden sm:block`)
- Różne rozmiary komponentów w zależności od breakpointów
- Dostosowane odstępy i padding dla różnych rozmiarów ekranu

## Użycie komponentów

### Przykład użycia SongLikers

```typescript
<SongLikers songId={song._id} />
```

### Przykład użycia LikedByAvatars

```typescript
<LikedByAvatars users={users} size="small" maxAvatars={6} />
```

## Konwencje

- Frontend używa `id`
- Backend (MongoDB) używa `_id`
- Konwersja następuje w warstwie API

## Dobre praktyki

1. Separacja logiki biznesowej od prezentacji
2. Reużywalne komponenty UI
3. Typowanie TypeScript
4. Obsługa stanów ładowania
5. Responsywny design
6. Spójna stylizacja w całej aplikacji

## Przyszłe rozszerzenia

1. Dodanie tooltipów z pełną listą użytkowników
2. Implementacja infinite scroll dla dużej liczby polubień
3. Dodanie animacji przy dodawaniu/usuwaniu polubienia
4. Rozszerzenie funkcjonalności o komentarze
5. Dodanie powiadomień o nowych polubieniach

## Wymagania

- Next.js 14.2.6+
- MongoDB
- TypeScript
- React Icons
- Tailwind CSS
