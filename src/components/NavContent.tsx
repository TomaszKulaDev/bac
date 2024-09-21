"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";

export function NavContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    console.log("Logout initiated");
    await signOut({ redirect: false });
    dispatch(logout());
    router.push("/");
    console.log("Logout completed");
  };

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      if (status === "authenticated" && session?.user) {
        dispatch(login({
          user: {
            id: session.user.id || '',
            email: session.user.email || null,
            name: session.user.name || null,
            role: session.user.role || null
          }
        }));
      } else if (status === "unauthenticated") {
        dispatch(logout());
      }
    }
  }, [status, session, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">
        <Link href="/">MyApp</Link>
      </div>
      <ul className="flex space-x-4">
        {isAuthenticated && user ? (
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
