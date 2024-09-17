// src/store/slices/types.ts
export interface RootState {
  auth: {
    isAuthenticated: boolean;
    user: any;
  };
}
