// src/store/slices/adminSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface AdminState {
  users: User[];
  totalUsers: number;
  currentPage: number;
}

const initialState: AdminState = {
  users: [],
  totalUsers: 0,
  currentPage: 1,
};

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

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId: string) => {
    // Tutaj dodaj logikę usuwania użytkownika przez API
    await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
    return userId;
  }
);

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

export const createUser = createAsyncThunk(
  "admin/createUser",
  async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchUsers.rejected, (state, action) => {
        console.error("Błąd podczas pobierania użytkowników:", action.error);
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.error("Błąd podczas usuwania użytkownika:", action.error);
      })
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
      .addCase(updateUserRole.rejected, (state, action) => {
        console.error(
          "Błąd podczas aktualizacji roli użytkownika:",
          action.error
        );
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        console.error("Błąd podczas tworzenia użytkownika:", action.error);
      });
  },
});

export default adminSlice.reducer;
