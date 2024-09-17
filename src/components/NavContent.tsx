"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";

export function NavContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = async () => {
    await signOut({ redirect: false });
    dispatch(logout());
    router.push("/");
  };

  useEffect(() => {
    if (status === "authenticated" && !isAuthenticated) {
      dispatch(login({ user: session.user }));
    }
  }, [status, session, dispatch, isAuthenticated]);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">
        <Link href="/">MyApp</Link>
      </div>
      <ul className="flex space-x-4">
        {status === "authenticated" ? (
          <>
            <li>
              <Link href="/profile">Profil</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Wyloguj</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Zaloguj</Link>
            </li>
            <li>
              <Link href="/register">Zarejestruj się</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
