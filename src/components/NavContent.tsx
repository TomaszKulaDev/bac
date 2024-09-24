"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";
import { FaMusic } from "react-icons/fa";

export function NavContent() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    console.log("Logout initiated");
    dispatch(logout());
    router.push("/");
    console.log("Logout completed");
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">
        <Link href="/">MyApp</Link>
      </div>
      <ul className="flex space-x-4 items-center">
        <li>
          <Link href="/muzyka" className="flex items-center hover:text-gray-300">
            <FaMusic className="mr-1" />
            Muzyka
          </Link>
        </li>
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
