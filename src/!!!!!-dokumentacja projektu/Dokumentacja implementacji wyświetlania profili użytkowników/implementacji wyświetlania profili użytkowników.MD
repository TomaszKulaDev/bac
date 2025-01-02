# Dokumentacja implementacji wyświetlania profili użytkowników

src/
├── app/
│ ├── api/
│ │ └── profiles/
│ │ └── route.ts # Endpoint API dla profili
│ │
│ └── szukam-partnera-do-tanca/
│ ├── components/
│ │ └── LatestProfiles.tsx # Komponent wyświetlający profile
│ └── page.tsx # Strona główna listy profili
│
├── types/
│ └── user.ts # Definicje typów dla profili
│
├── models/
│ └── User.ts # Model mongoose dla użytkownika
│
├── lib/
│ └── mongodb.ts # Konfiguracja połączenia z bazą
│
└── !!!!!-dokumentacja projektu/
└── Dokumentacja implementacji wyświetlania profili użytkowników/
└── implementacji wyświetlania profili użytkowników.MD

Legenda:
📁 Folder
📄 Plik
🔄 Aktywnie używane
⚡ Endpoint API
🎨 Komponent React
📝 Dokumentacja

graph TD
A[LatestProfiles.tsx] -->|Pobiera dane| B[/api/profiles/route.ts]
B -->|Używa modelu| C[User.ts]
B -->|Połączenie z DB| D[mongodb.ts]
A -->|Używa typów| E[user.ts]
C -->|Definiuje typy| E

## 1. Aktualny stan implementacji

### Zaimplementowane funkcjonalności:

- Pobieranie listy profili
- Wyświetlanie podstawowych informacji
- Optymalizacja obrazów
- Responsywny układ

### Wykorzystywane pliki:

1. src/app/api/profiles/route.ts

   - Endpoint GET zwracający profile
   - Limit 6 najnowszych profili
   - Filtrowanie zweryfikowanych użytkowników

2. src/app/szukam-partnera-do-tanca/components/LatestProfiles.tsx

   - Komponent wyświetlający profile
   - Wykorzystuje next/image
   - Obsługa stanów ładowania

3. src/types/user.ts

   - Interfejs UserProfile
   - Typy dla preferencji tanecznych

4. src/models/User.ts
   - Model mongoose
   - Schemat użytkownika
   - Walidacje danych

## 2. Planowane rozszerzenia

(bazując na istniejącej strukturze)

1. Filtrowanie:

   - Dodanie parametrów do endpointu /api/profiles
   - Implementacja komponentu filtrów
   - Integracja z istniejącym modelem

2. Paginacja:

   - Rozszerzenie endpointu o obsługę stron
   - Dodanie komponentu nawigacji
   - Zachowanie stanu filtrów

3. Szczegóły profilu:
   - Wykorzystanie istniejącego modelu User
   - Dodanie nowego endpointu /api/profiles/[id]
   - Implementacja strony szczegółów
