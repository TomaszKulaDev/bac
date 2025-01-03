# Implementacja Pola Wieku w Profilu Użytkownika

# Dokumentacja Implementacji Pola Wieku - Zmodyfikowane Pliki

## 🎯 Cel
Dodanie możliwości wprowadzania i wyświetlania wieku użytkownika w aplikacji tanecznej.

## 📁 Zmodyfikowane Pliki


### 1. Typy i Modele
````markdown
src/
├── types/
│   └── user.ts                 # Definicja interfejsu UserProfile z polem age
├── models/
│   └── User.ts                 # Model MongoDB z walidacją wieku (16-120 lat)
└── store/
    └── slices/
        └── authSlice.ts        # Aktualizacja Redux store o pole age
````


### 2. Hooki i Komponenty
````markdown
src/
├── hooks/
│   └── useUserProfile.ts       # Hook do zarządzania profilem z obsługą wieku
└── app/
    ├── profile/
    │   └── page.tsx            # Strona profilu z formularzem wieku
    └── szukam-partnera-do-tanca/
        └── components/
            └── LatestProfiles.tsx  # Wyświetlanie wieku na liście profili
````

### 3. API Endpoints
````markdown
src/
└── app/
    └── api/
        ├── users/
        │   ├── me/
        │   │   └── route.ts    # Pobieranie danych profilu z wiekiem
        │   └── update-profile/
        │       └── route.ts    # Aktualizacja profilu z walidacją wieku
        └── profiles/
            └── route.ts        # Lista profili z wiekiem
````

📝 Szczegóły Zmian
Modele i Typy
User.ts: Dodano pole age z walidacją
user.ts: Rozszerzono interfejs o age
authSlice.ts: Dodano age do stanu Redux
Komponenty React
page.tsx: Dodano formularz wieku i wyświetlanie
LatestProfiles.tsx: Dodano wyświetlanie wieku obok imienia
API
me/route.ts: Dodano zwracanie wieku
update-profile/route.ts: Dodano walidację wieku
profiles/route.ts: Dodano pole wieku do listy profili
🔄 Przepływ Danych
Wprowadzanie wieku w formularzu (page.tsx)
Walidacja i wysyłka przez API (update-profile/route.ts)
Zapis w bazie danych (User.ts)
Wyświetlanie w profilu i na liście profili
🛠️ Zmiany w Kodzie
Każdy plik został zaktualizowany o obsługę nowego pola age, zachowując:
Spójność typów
Walidację danych
Aktualizację stanu
Wyświetlanie informacji
📚 Dokumentacja API
GET /api/users/me - zwraca profil z wiekiem
POST /api/users/update-profile - aktualizuje wiek
GET /api/profiles - lista profili z wiekiem
✅ Testy
Zalecane testy dla zmodyfikowanych plików:
Walidacja wieku (16-120)
Aktualizacja profilu
Wyświetlanie wieku
Obsługa błędów
🔍 Uwagi
Pole wieku jest opcjonalne
Walidacja po stronie klienta i serwera
Spójne wyświetlanie w całej aplikacji