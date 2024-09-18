import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    // inne reducery...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
