# Implementacja Profilu Użytkownika

## 📁 Struktura Plików

### 1. Typy (`src/types/user.ts`)

```typescript
export type Gender = "male" | "female";
export interface UserProfile {
  // Definicja interfejsu profilu użytkownika
  id: string;
  name: string;
  email: string;
  bio?: string;
  gender?: Gender;
  // ... inne pola
}
```

### 2. Model MongoDB (`src/models/User.ts`)

```typescript
const userSchema = new mongoose.Schema({
  // ... podstawowe pola
  bio: {
    type: String,
    maxlength: [500, "Opis nie może być dłuższy niż 500 znaków"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
});
```

### 3. Hook Profilu (`src/hooks/useUserProfile.ts`)

```typescript
export function useUserProfile() {
  // Hook do zarządzania danymi profilu
  const fetchUserProfile = async () => {
    // Pobieranie danych profilu
  };

  const updateUserProfile = async (updatedData: Partial<UserProfile>) => {
    // Aktualizacja danych profilu
  };
}
```

### 4. API Endpoints

#### GET Profile (`src/app/api/users/me/route.ts`)

```typescript
export async function GET(request: Request) {
  // Endpoint do pobierania danych profilu
  return NextResponse.json({
    id: userDetails._id,
    bio: userDetails.bio,
    gender: userDetails.gender,
    // ... inne pola
  });
}
```

#### Update Profile (`src/app/api/users/update-profile/route.ts`)

```typescript
export async function POST(request: Request) {
  // Endpoint do aktualizacji profilu
  const validatedData = updateProfileSchema.parse(data);
  // Aktualizacja w bazie danych
}
```

### 5. Komponent Profilu (`src/app/profile/page.tsx`)

```typescript
export default function ProfilePage() {
  // Komponent strony profilu
  // Obsługa formularza i wyświetlanie danych
}
```

## 🔄 Przepływ Danych

1. **Inicjalizacja**:

   - Komponent `ProfilePage` używa hooka `useUserProfile`
   - Hook pobiera dane przez endpoint `/api/users/me`

2. **Edycja**:

   - Użytkownik edytuje dane w formularzu
   - Dane są walidowane przez Zod
   - Aktualizacja przez endpoint `/api/users/update-profile`

3. **Zapisywanie**:
   - Dane są walidowane na serwerze
   - Zapisywane w MongoDB
   - Aktualizowany jest stan w komponencie

## 🔒 Walidacja

### Frontend

- Walidacja formularza
- Maksymalna długość bio: 500 znaków
- Enum dla płci: "male" | "female"

### Backend

- Schemat Zod dla walidacji
- Walidacja w modelu MongoDB
- Sprawdzanie sesji użytkownika

## 🎨 UI/UX

- Responsywny design
- Tryb edycji/podglądu
- Animacje przejść (Framer Motion)
- Obsługa błędów
- Wskaźniki ładowania

## 🛠 Technologie

- Next.js 14.2.6
- MongoDB
- TypeScript
- Framer Motion
- TailwindCSS

## 📝 Uwagi

1. Wszystkie pola profilu są opcjonalne oprócz name i email
2. Bio ma limit 500 znaków
3. Płeć jest zdefiniowana jako enum
4. Dane są walidowane zarówno po stronie klienta jak i serwera
5. Wykorzystano TypeScript dla bezpieczeństwa typów

## 🔍 Testowanie

1. Sprawdź walidację formularza
2. Przetestuj limity znaków
3. Sprawdź zachowanie dla różnych typów danych
4. Zweryfikuj obsługę błędów
5. Sprawdź responsywność UI

## 🚀 Wdrożenie

1. Upewnij się, że model MongoDB jest zaktualizowany
2. Sprawdź poprawność typów TypeScript
3. Zweryfikuj działanie endpointów API
4. Przetestuj integrację komponentów
