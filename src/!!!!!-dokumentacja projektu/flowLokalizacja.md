# Flow Danych Profilu Użytkownika

## Struktura i Przepływ Danych

### 1. Model Danych (MongoDB)

```typescript
// src/models/User.ts
const userSchema = new Schema({
  dancePreferences: {
    location: String, // Lokalizacja użytkownika
    level: String, // Poziom zaawansowania
    styles: [String], // Style tańca
    availability: String, // Dostępność
  },
});
```

### 2. API Endpoints

#### Pobieranie Profili (GET)

```typescript
// src/app/api/profiles/route.ts
GET /api/profiles
- Pobiera wszystkie profile z bazy
- Konwertuje _id na id dla frontendu
- Zwraca sformatowane dane
```

#### Aktualizacja Profilu (PUT)

```typescript
// src/app/api/user/route.ts
PUT /api/user
- Wymaga autoryzacji (session)
- Aktualizuje dane w bazie
- Zwraca zaktualizowany profil
```

### 3. Hook useUserProfile

```typescript
// src/hooks/useUserProfile.ts
const useUserProfile = () => {
  - Zarządza stanem profilu
  - Obsługuje operacje CRUD
  - Zapewnia metody aktualizacji
  - Synchronizuje stan z backendem
}
```

### 4. Komponenty React

#### Edycja Profilu

```typescript
// src/app/profile/page.tsx
- Wykorzystuje useUserProfile
- Zarządza formularzem edycji
- Obsługuje zmiany w czasie rzeczywistym
- Zapisuje zmiany do bazy
```

#### Wyświetlanie Profili

```typescript
// src/app/szukam-partnera-do-tanca/components/LatestProfiles.tsx
- Pobiera profile przez API
- Wyświetla dane w UI
- Aktualizuje widok przy zmianach
```

## Przepływ Danych (Data Flow)

1. **Inicjalizacja**

   - Komponent montuje się
   - useUserProfile inicjalizuje stan
   - Pobierane są dane z API
   - Dane są wyświetlane w UI

2. **Aktualizacja**

   - Użytkownik zmienia dane w formularzu
   - Komponent aktualizuje lokalny stan
   - Hook wysyła zmiany do API
   - API aktualizuje bazę danych
   - Potwierdzenie wraca do frontendu
   - UI się odświeża

3. **Wyświetlanie**
   - Komponenty pobierają dane przez API
   - Dane są formatowane do wyświetlenia
   - UI renderuje aktualne informacje

## Przykład Przepływu Aktualizacji Lokalizacji

1. **Input użytkownika**

```typescript
<input
  value={formData.dancePreferences?.location}
  onChange={(e) => handleInputChange("location", e.target.value)}
/>
```

2. **Obsługa zmiany**

```typescript
const handleInputChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    dancePreferences: {
      ...prev.dancePreferences,
      [field]: value,
    },
  }));
};
```

3. **Zapisywanie zmian**

```typescript
const handleSubmit = async () => {
  await updateProfile(formData);
};
```

4. **Aktualizacja w bazie**

```typescript
// API endpoint
const updatedUser = await User.findByIdAndUpdate(
  userId,
  { $set: { "dancePreferences.location": newLocation } },
  { new: true }
);
```

## Ważne Uwagi

1. **Bezpieczeństwo**

   - Wszystkie endpointy modyfikujące dane wymagają autoryzacji
   - Walidacja danych po stronie serwera
   - Sanityzacja danych wejściowych

2. **Wydajność**

   - Optymalizacja zapytań do bazy
   - Cachowanie odpowiedzi API
   - Debouncing aktualizacji formularza

3. **Obsługa Błędów**

   - Walidacja danych wejściowych
   - Obsługa błędów API
   - Informacje zwrotne dla użytkownika

4. **Typowanie**
   - Spójne interfejsy TypeScript
   - Walidacja schematów
   - Kontrola typów w czasie kompilacji

## Konwencje

1. **ID w MongoDB vs Frontend**

   - Backend: `_id` (MongoDB)
   - Frontend: `id`
   - Konwersja w warstwie API

2. **Nazewnictwo**

   - Spójne nazwy pól
   - Camelcase w JS/TS
   - Snake_case w MongoDB

3. **Struktura API**

   - RESTful endpoints
   - Spójne odpowiedzi
   - Standardowa obsługa błędów

   # Szczegółowa Dokumentacja Przepływu Danych w Profilu Użytkownika

## 1. Struktura Bazy Danych

### Model Użytkownika (MongoDB)

```typescript
// src/models/User.ts
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "/images/default-avatar.png",
  },
  dancePreferences: {
    location: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    styles: {
      type: [String],
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
  },
  socialMedia: {
    instagram: String,
    facebook: String,
    youtube: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
```

## 2. Interfejsy TypeScript

### Typy i Interfejsy

```typescript
// src/types/user.ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  dancePreferences?: {
    location: string;
    level: "beginner" | "intermediate" | "advanced";
    styles: string[];
    availability: string;
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type UpdateProfileData = Partial<UserProfile>;
```

## 3. API Endpoints (Szczegółowo)

### Pobieranie Profilu

```typescript
// src/app/api/profiles/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    // Pobieranie z bazy
    const users = await User.find();

    // Formatowanie odpowiedzi
    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      dancePreferences: {
        location: user.dancePreferences?.location,
        level: user.dancePreferences?.level,
        styles: user.dancePreferences?.styles,
        availability: user.dancePreferences?.availability,
      },
      socialMedia: user.socialMedia,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}
```

### Aktualizacja Profilu

```typescript
// src/app/api/user/route.ts
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Walidacja danych
    const validatedData = userUpdateSchema.parse(data);

    // Aktualizacja w bazie
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        $set: {
          "dancePreferences.location": validatedData.dancePreferences?.location,
          "dancePreferences.level": validatedData.dancePreferences?.level,
          "dancePreferences.styles": validatedData.dancePreferences?.styles,
          "dancePreferences.availability":
            validatedData.dancePreferences?.availability,
          socialMedia: validatedData.socialMedia,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    // Formatowanie odpowiedzi
    const formattedUser = {
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      // ... pozostałe pola
    };

    return NextResponse.json(formattedUser);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
```

## 4. Hook useUserProfile (Szczegółowo)

```typescript
// src/hooks/useUserProfile.ts
import { useState, useEffect } from "react";
import { UserProfile, UpdateProfileData } from "@/types/user";

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pobieranie profilu
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/user");
      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setUserProfile(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  // Aktualizacja profilu
  const updateProfile = async (data: UpdateProfileData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedData = await response.json();
      setUserProfile(updatedData);
      setError(null);
      return updatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    userProfile,
    isLoading,
    error,
    updateProfile,
    refreshProfile: fetchProfile,
  };
};
```

## 5. Komponenty React (Szczegółowo)

### Komponent Edycji Profilu

```typescript
// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserProfile } from "@/types/user";

export default function ProfilePage() {
  const { userProfile, updateProfile, isLoading, error } = useUserProfile();
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    dancePreferences: {
      location: "",
      level: "beginner",
      styles: [],
      availability: "",
    },
  });

  // Inicjalizacja formularza danymi użytkownika
  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

  // Obsługa zmian w formularzu
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      dancePreferences: {
        ...prev.dancePreferences,
        [field]: value,
      },
    }));
  };

  // Zapisywanie zmian
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      // Sukces - można dodać powiadomienie
    } catch (error) {
      // Obsługa błędu - można dodać powiadomienie
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Lokalizacja</label>
        <input
          type="text"
          value={formData.dancePreferences?.location || ""}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>
      {/* Pozostałe pola formularza */}
    </form>
  );
}
```

## 6. Walidacja i Bezpieczeństwo

### Schema Walidacji

```typescript
// src/schemas/validationSchemas.ts
import { z } from "zod";

export const userUpdateSchema = z.object({
  dancePreferences: z.object({
    location: z.string().min(1, "Lokalizacja jest wymagana"),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    styles: z.array(z.string()).min(1, "Wybierz przynajmniej jeden styl"),
    availability: z.string().min(1, "Określ swoją dostępność"),
  }),
  socialMedia: z
    .object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      youtube: z.string().optional(),
    })
    .optional(),
});
```

## 7. Obsługa Błędów

### Middleware do obsługi błędów

```typescript
// src/middleware/errorHandler.ts
export const errorHandler = (error: any) => {
  if (error.name === "ValidationError") {
    return {
      status: 400,
      message: "Validation Error",
      details: error.errors,
    };
  }

  if (error.name === "UnauthorizedError") {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  // Domyślna obsługa błędów
  return {
    status: 500,
    message: "Internal Server Error",
  };
};
```

## 8. Optymalizacja Wydajności

### Cachowanie

```typescript
// src/hooks/useUserProfile.ts
const CACHE_TIME = 5 * 60 * 1000; // 5 minut

const cache = {
  data: null,
  timestamp: 0,
};

const fetchWithCache = async () => {
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_TIME) {
    return cache.data;
  }

  const response = await fetch("/api/user");
  const data = await response.json();

  cache.data = data;
  cache.timestamp = now;

  return data;
};
```

## 9. Monitoring i Logowanie

### Logger

```typescript
// src/utils/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
  },
};
```

## 10. Testy

### Przykładowy Test

```typescript
// src/tests/useUserProfile.test.ts
import { renderHook } from "@testing-library/react-hooks";
import { useUserProfile } from "@/hooks/useUserProfile";

describe("useUserProfile", () => {
  it("should fetch and update profile", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUserProfile());

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.userProfile).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });
});
```
