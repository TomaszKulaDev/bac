"use client"; // Ten plik jest komponentem po stronie klienta

import { useSession } from "next-auth/react"; // Importujemy hook useSession z next-auth, aby uzyskać informacje o sesji użytkownika
import { useDispatch } from "react-redux"; // Importujemy hook useDispatch z react-redux, aby móc wysyłać akcje do store Redux
import { useEffect } from "react"; // Importujemy hook useEffect z React, aby wykonać efekt uboczny po renderowaniu komponentu
import { login, logout } from "../store/slices/authSlice"; // Importujemy akcję updateSession z authSlice, aby zaktualizować stan autoryzacji w Redux
import { mapSessionToUser } from "../types/auth";

// Definiujemy komponent AuthSync
export function AuthSync() {
  const { data: session, status } = useSession(); // Używamy hooka useSession, aby uzyskać dane sesji i status autoryzacji
  const dispatch = useDispatch(); // Używamy hooka useDispatch, aby uzyskać funkcję dispatch do wysyłania akcji

  // Używamy hooka useEffect, aby wykonać kod po renderowaniu komponentu
  useEffect(() => {
    if (session?.user) {
      const mappedUser = mapSessionToUser(session.user);
      dispatch(login({ user: mappedUser }));
    } else if (status === "unauthenticated") {
      dispatch(logout());
    }
  }, [session, status, dispatch]);

  return null; // Komponent nie renderuje niczego
}
