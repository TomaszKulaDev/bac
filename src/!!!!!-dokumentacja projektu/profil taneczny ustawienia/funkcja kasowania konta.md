# 🔐 System Zarządzania Kontem Użytkownika

## 📋 Zaimplementowane Funkcjonalności

### 1. Widoczność Profilu

- Przełącznik publiczny/prywatny profil
- Automatyczna filtracja profili w wyszukiwarce
- Persystencja ustawień w bazie danych

```typescript
interface UserProfile {
  isPublicProfile: boolean;
  // ... inne pola
}
```

### 2. Zmiana Hasła

- Walidacja siły hasła:
  - Minimum 8 znaków
  - Wielka litera
  - Mała litera
  - Cyfra
- Weryfikacja aktualnego hasła
- Bezpieczne hashowanie (bcrypt)
- Obsługa błędów i komunikatów

### 3. Usuwanie Konta

Wielopoziomowe zabezpieczenia:

- Wymagany tekst potwierdzenia "USUŃ KONTO"
- Weryfikacja hasłem
- Wyraźne ostrzeżenia o konsekwencjach
- Automatyczne wylogowanie po usunięciu

## 🔧 Struktura API

### Endpointy

```
/api/users/
  ├── me                  # GET - pobieranie profilu
  ├── update-profile      # POST - aktualizacja profilu
  ├── change-password     # POST - zmiana hasła
  └── delete-account      # DELETE - usuwanie konta

/api/profiles/
  └── route.ts           # GET - lista publicznych profili
```

## 🛡️ Zabezpieczenia

### Zmiana Hasła

- Walidacja po stronie klienta i serwera
- Hashowanie hasła przed zapisem
- Weryfikacja aktualnego hasła

### Usuwanie Konta

- Dwuetapowa weryfikacja (tekst + hasło)
- Nieodwracalna operacja
- Zabezpieczenie przed przypadkowym usunięciem

## 💻 Komponenty UI

### Modalne

```
/components/
  ├── ChangePasswordModal.tsx
  └── DeleteAccountModal.tsx
```

### Strony

```
/app/profile/edit/
  └── settings/
      └── page.tsx       # Strona ustawień profilu
```

## 🔄 Przepływ Danych

1. **Widoczność Profilu**

   ```
   Toggle Switch → API → MongoDB → Filtracja w wyszukiwarce
   ```

2. **Zmiana Hasła**

   ```
   Form → Walidacja → API → Hashowanie → MongoDB
   ```

3. **Usuwanie Konta**
   ```
   Potwierdzenie → Weryfikacja hasła → API → MongoDB → Wylogowanie
   ```

## 🚀 Jak Używać

### Zmiana Widoczności Profilu

```typescript
const handlePrivacyToggle = async (isPublic: boolean) => {
  await updateUserProfile({ isPublicProfile: isPublic });
};
```

### Zmiana Hasła

```typescript
const handlePasswordChange = async (data: ChangePasswordData) => {
  await changePassword(data);
};
```

### Usuwanie Konta

```typescript
const handleDeleteAccount = async (password: string) => {
  await deleteAccount(password);
  signOut();
};
```

## 🔜 Planowane Rozszerzenia

- [ ] Dwuetapowa weryfikacja (2FA)
- [ ] Historia logowań
- [ ] Powiadomienia o zmianach w profilu
- [ ] Eksport danych użytkownika
