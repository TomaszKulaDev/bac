"use client"; // Ten plik jest komponentem po stronie klienta

import { useSession } from "next-auth/react"; // Importujemy hook useSession z next-auth, aby uzyskać informacje o sesji użytkownika
import { useDispatch } from "react-redux"; // Importujemy hook useDispatch z react-redux, aby móc wysyłać akcje do store Redux
import { useEffect } from "react"; // Importujemy hook useEffect z React, aby wykonać efekt uboczny po renderowaniu komponentu
import { updateSession } from "../store/slices/authSlice"; // Importujemy akcję updateSession z authSlice, aby zaktualizować stan autoryzacji w Redux

// Definiujemy komponent AuthSync
export function AuthSync() {
  const { data: session, status } = useSession(); // Używamy hooka useSession, aby uzyskać dane sesji i status autoryzacji
  const dispatch = useDispatch(); // Używamy hooka useDispatch, aby uzyskać funkcję dispatch do wysyłania akcji

  // Używamy hooka useEffect, aby wykonać kod po renderowaniu komponentu
  useEffect(() => {
    // Sprawdzamy, czy status sesji to "authenticated" i czy sesja istnieje
    if (status === "authenticated" && session) {
      // Wysyłamy akcję updateSession do Redux, aby zaktualizować stan autoryzacji
      dispatch(
        updateSession({
          isAuthenticated: true, // Ustawiamy isAuthenticated na true
          user: {
            id: session.user?.id || "", // Ustawiamy id użytkownika z sesji lub pusty string, jeśli brak
            email: session.user?.email, // Ustawiamy email użytkownika z sesji
            name: session.user?.name, // Ustawiamy nazwę użytkownika z sesji
            role: session.user?.role, // Ustawiamy rolę użytkownika z sesji, zakładając, że jest dostępna
            image: session.user?.image, // Ustawiamy obraz użytkownika z sesji
          },
        })
      );
    } else if (status === "unauthenticated") {
      // Jeśli status sesji to "unauthenticated", wysyłamy akcję updateSession z isAuthenticated na false i user na null
      dispatch(
        updateSession({
          isAuthenticated: false, // Ustawiamy isAuthenticated na false
          user: null, // Ustawiamy user na null
        })
      );
    }
  }, [status, session, dispatch]); // Hook useEffect zależy od status, session i dispatch

  return null; // Komponent nie renderuje niczego
}
