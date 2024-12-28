"use client"; // Ten plik jest komponentem po stronie klienta

import { useSession } from "next-auth/react"; // Importujemy hook useSession z next-auth, aby uzyskać informacje o sesji użytkownika
import { useDispatch } from "react-redux"; // Importujemy hook useDispatch z react-redux, aby móc wysyłać akcje do store Redux
import { useEffect, useRef } from "react"; // Importujemy hook useEffect z React, aby wykonać efekt uboczny po renderowaniu komponentu
import { login, logout } from "../store/slices/authSlice"; // Importujemy akcję updateSession z authSlice, aby zaktualizować stan autoryzacji w Redux
import { mapSessionToUser } from "../types/auth";

// Definiujemy komponent AuthSync
export function AuthSync() {
  const { data: session, status } = useSession(); // Używamy hooka useSession, aby uzyskać dane sesji i status autoryzacji
  const dispatch = useDispatch(); // Używamy hooka useDispatch, aby uzyskać funkcję dispatch do wysyłania akcji
  const lastSync = useRef<string>("");

  // Główny efekt synchronizacji
  useEffect(() => {
    const syncAuth = async () => {
      if (session?.user) {
        // Sprawdź czy dane się zmieniły
        const currentState = JSON.stringify(session.user);
        if (lastSync.current === currentState) {
          return;
        }

        try {
          const response = await fetch("/api/users/me");
          if (response.ok) {
            const userData = await response.json();

            // Aktualizuj Redux
            dispatch(
              login({
                user: mapSessionToUser({
                  ...userData,
                  role: session.user.role,
                }),
              })
            );

            lastSync.current = currentState;
          }
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error syncing auth state:", error);
          }
        }
      } else if (status === "unauthenticated") {
        dispatch(logout());
      }
    };

    syncAuth();
  }, [session, status, dispatch]);

  return null; // Komponent nie renderuje niczego
}
