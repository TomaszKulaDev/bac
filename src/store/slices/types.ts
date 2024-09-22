// src/store/slices/types.ts

// Interfejs RootState reprezentuje główny stan aplikacji Redux
export interface RootState {
  // Stan uwierzytelniania
  auth: {
    // Flaga wskazująca, czy użytkownik jest uwierzytelniony
    isAuthenticated: boolean;
    // Obiekt reprezentujący dane użytkownika
    user: any; // Typ 'any' może być zastąpiony bardziej szczegółowym typem, jeśli jest dostępny
  };
}
