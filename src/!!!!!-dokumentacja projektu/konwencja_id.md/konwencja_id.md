# Konwencje Nazewnictwa ID w Aplikacji

## Standardy identyfikatorów

W naszej aplikacji przyjęliśmy następujące konwencje dotyczące identyfikatorów:

### Frontend (React/Next.js)

- Używamy `id` (bez podkreślnika)
- Przykład: `profile.id`
- Dotyczy wszystkich komponentów i interfejsów TypeScript

```typescript
// Przykład w interfejsie
interface UserProfile {
  id: string;
  name: string;
  // ...
}

// Przykład w komponencie
<Link href={`/profile/${profile.id}`}>
```

### Backend (MongoDB)

- Używamy `_id` (z podkreślnikiem)
- Jest to standardowa konwencja MongoDB
- Dotyczy wszystkich operacji na bazie danych

```typescript
// Przykład w modelu MongoDB
const user = await User.findById(_id);
```

### Warstwa API

- Konwertujemy `_id` z MongoDB na `id` dla frontendu
- Konwersja następuje w endpointach API

```typescript
// Przykład konwersji w API
export async function GET() {
  const profiles = await User.find();
  return profiles.map((profile) => ({
    id: profile._id.toString(),
    ...profile.toObject(),
  }));
}
```

## Dlaczego ta konwencja?

1. **Spójność** - jednolite nazewnictwo w całej warstwie frontendowej
2. **Separation of Concerns** - oddzielenie konwencji bazy danych od interfejsu użytkownika
3. **Type Safety** - zgodność z typami TypeScript
4. **Czytelność** - jasne rozróżnienie między danymi z bazy a danymi w UI

## Ważne!

- Nie używaj `_id` w komponentach React
- Zawsze konwertuj `_id` na `id` w warstwie API
- Zachowuj `_id` tylko w operacjach bazodanowych
