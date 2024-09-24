// src/store/slices/adminSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Definicja interfejsu użytkownika
interface User {
  id: string; // ID użytkownika
  name: string; // Nazwa użytkownika
  email: string; // Email użytkownika
  role: string; // Rola użytkownika
  isVerified: boolean; // Flaga wskazująca, czy użytkownik jest zweryfikowany
}

// Definicja stanu dla admina
interface AdminState {
  users: User[]; // Lista użytkowników
  totalUsers: number; // Całkowita liczba użytkowników
  currentPage: number; // Aktualna strona w paginacji
}

// Inicjalny stan dla admina
const initialState: AdminState = {
  users: [], // Początkowo brak użytkowników
  totalUsers: 0, // Początkowo brak użytkowników
  currentPage: 1, // Początkowa strona to 1
};

// Asynchroniczna akcja do pobierania użytkowników
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    // Wysyłanie żądania do API w celu pobrania użytkowników
    const response = await fetch(
      `/api/admin/users?page=${page}&pageSize=${pageSize}`
    );
    const data = await response.json();
    return {
      users: data.users.map((user: any) => ({
        ...user,
        isVerified: user.isVerified || false // Ustawienie domyślnej wartości isVerified na false, jeśli nie jest określona
      })),
      totalUsers: data.totalUsers, // Całkowita liczba użytkowników
      currentPage: data.currentPage // Aktualna strona
    };
  }
);

// Asynchroniczna akcja do usuwania użytkownika
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId: string) => {
    // Wysyłanie żądania do API w celu usunięcia użytkownika
    await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
    return userId; // Zwracanie ID usuniętego użytkownika
  }
);

// Asynchroniczna akcja do aktualizacji roli użytkownika
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ userId, newRole }: { userId: string; newRole: string }) => {
    // Wysyłanie żądania do API w celu aktualizacji roli użytkownika
    const response = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }), // Przesyłanie nowej roli w ciele żądania
    });
    const data = await response.json();
    return data; // Zwracanie zaktualizowanych danych użytkownika
  }
);

// Asynchroniczna akcja do tworzenia nowego użytkownika
export const createUser = createAsyncThunk(
  'admin/createUser',
  async (userData: Partial<User>, { dispatch }) => {
    // Wysyłanie żądania do API w celu utworzenia nowego użytkownika
    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // Przesyłanie danych nowego użytkownika w ciele żądania
    });
    if (!response.ok) {
      throw new Error('Nie udało się utworzyć użytkownika'); // Rzucanie błędu w przypadku niepowodzenia
    }
    const newUser = await response.json();
    dispatch(fetchUsers({ page: 1, pageSize: 10 })); // Odśwież listę użytkowników po utworzeniu nowego
    return newUser; // Zwracanie nowo utworzonego użytkownika
  }
);

// Tworzenie slice dla admina
const adminSlice = createSlice({
  name: "admin", // Nazwa slice
  initialState, // Początkowy stan
  reducers: {
    // Akcja do dodawania użytkownika
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload); // Dodawanie nowego użytkownika na początek listy
      state.totalUsers += 1; // Zwiększanie całkowitej liczby użytkowników
    },
    // Akcja do czyszczenia stanu admina
    clearAdminState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Obsługa zakończonego sukcesem pobierania użytkowników
      .addCase(
        fetchUsers.fulfilled,
        (
          state,
          action: PayloadAction<{
            users: User[];
            totalUsers: number;
            currentPage: number;
          }>
        ) => {
          state.users = action.payload.users; // Aktualizacja listy użytkowników
          state.totalUsers = action.payload.totalUsers; // Aktualizacja całkowitej liczby użytkowników
          state.currentPage = action.payload.currentPage; // Aktualizacja aktualnej strony
        }
      )
      // Obsługa błędu podczas pobierania użytkowników
      .addCase(fetchUsers.rejected, (state, action) => {
        console.error("Błąd podczas pobierania użytkowników:", action.error); // Logowanie błędu
      })
      // Obsługa zakończonego sukcesem usuwania użytkownika
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user.id !== action.payload); // Usuwanie użytkownika z listy
      })
      // Obsługa błędu podczas usuwania użytkownika
      .addCase(deleteUser.rejected, (state, action) => {
        console.error("Błąd podczas usuwania użytkownika:", action.error); // Logowanie błędu
      })
      // Obsługa zakończonej sukcesem aktualizacji roli użytkownika
      .addCase(
        updateUserRole.fulfilled,
        (state, action: PayloadAction<User>) => {
          const index = state.users.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) {
            state.users[index] = action.payload; // Aktualizacja danych użytkownika na liście
          }
        }
      )
      // Obsługa błędu podczas aktualizacji roli użytkownika
      .addCase(updateUserRole.rejected, (state, action) => {
        console.error(
          "Błąd podczas aktualizacji roli użytkownika:",
          action.error
        ); // Logowanie błędu
      })
      // Obsługa zakończonego sukcesem tworzenia nowego użytkownika
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload); // Dodawanie nowego użytkownika do listy
        state.totalUsers += 1; // Zwiększanie całkowitej liczby użytkowników
      })
      // Obsługa błędu podczas tworzenia nowego użytkownika
      .addCase(createUser.rejected, (state, action) => {
        console.error("Błąd podczas tworzenia użytkownika:", action.error); // Logowanie błędu
      });
  },
});

// Eksportowanie reducer'a slice'a admina
export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;
