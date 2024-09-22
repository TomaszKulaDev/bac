// src/store/slices/adminSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Definicja interfejsu użytkownika
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

// Definicja stanu dla admina
interface AdminState {
  users: User[];
  totalUsers: number;
  currentPage: number;
}

// Inicjalny stan dla admina
const initialState: AdminState = {
  users: [],
  totalUsers: 0,
  currentPage: 1,
};

// Asynchroniczna akcja do pobierania użytkowników
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await fetch(
      `/api/admin/users?page=${page}&pageSize=${pageSize}`
    );
    const data = await response.json();
    return {
      users: data.users.map((user: any) => ({
        ...user,
        isVerified: user.isVerified || false
      })),
      totalUsers: data.totalUsers,
      currentPage: data.currentPage
    };
  }
);

// Asynchroniczna akcja do usuwania użytkownika
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId: string) => {
    // Tutaj dodaj logikę usuwania użytkownika przez API
    await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
    return userId;
  }
);

// Asynchroniczna akcja do aktualizacji roli użytkownika
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ userId, newRole }: { userId: string; newRole: string }) => {
    // Tutaj dodaj logikę aktualizacji roli użytkownika przez API
    const response = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    const data = await response.json();
    return data;
  }
);

// Asynchroniczna akcja do tworzenia nowego użytkownika
export const createUser = createAsyncThunk(
  'admin/createUser',
  async (userData: Partial<User>, { dispatch }) => {
    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Nie udało się utworzyć użytkownika');
    }
    const newUser = await response.json();
    dispatch(fetchUsers({ page: 1, pageSize: 10 })); // Odśwież listę użytkowników
    return newUser;
  }
);

// Tworzenie slice dla admina
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Akcja do dodawania użytkownika
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload);
      state.totalUsers += 1;
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
          state.users = action.payload.users;
          state.totalUsers = action.payload.totalUsers;
          state.currentPage = action.payload.currentPage;
        }
      )
      // Obsługa błędu podczas pobierania użytkowników
      .addCase(fetchUsers.rejected, (state, action) => {
        console.error("Błąd podczas pobierania użytkowników:", action.error);
      })
      // Obsługa zakończonego sukcesem usuwania użytkownika
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      // Obsługa błędu podczas usuwania użytkownika
      .addCase(deleteUser.rejected, (state, action) => {
        console.error("Błąd podczas usuwania użytkownika:", action.error);
      })
      // Obsługa zakończonej sukcesem aktualizacji roli użytkownika
      .addCase(
        updateUserRole.fulfilled,
        (state, action: PayloadAction<User>) => {
          const index = state.users.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        }
      )
      // Obsługa błędu podczas aktualizacji roli użytkownika
      .addCase(updateUserRole.rejected, (state, action) => {
        console.error(
          "Błąd podczas aktualizacji roli użytkownika:",
          action.error
        );
      })
      // Obsługa zakończonego sukcesem tworzenia nowego użytkownika
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
        state.totalUsers += 1;
      })
      // Obsługa błędu podczas tworzenia nowego użytkownika
      .addCase(createUser.rejected, (state, action) => {
        console.error("Błąd podczas tworzenia użytkownika:", action.error);
      });
  },
});

// Eksportowanie reducer'a slice'a admina
export default adminSlice.reducer;
