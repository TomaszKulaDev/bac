"use client";

import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";
import { FaMusic, FaUser, FaCaretDown, FaBars } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from './UserMenu';

export const NavContent: React.FC = React.memo(function NavContent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, status, handleLogout, syncAuthState } = useAuth();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    syncAuthState();
  }, [syncAuthState]);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-16">Ładowanie...</div>;
  }

  return (
    <nav className="bg-gray-800 text-white shadow-md relative" role="navigation" aria-label="Menu główne">
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold flex items-center">
            <FaMusic className="mr-2" />
            Baciata.pl
          </Link>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Otwórz menu mobilne"
            >
              <FaBars />
            </button>
          </div>
          <div className={`md:flex items-center space-x-4 ${isMobileMenuOpen ? 'flex' : 'hidden'} md:relative absolute top-full left-0 right-0 bg-gray-800 md:bg-transparent p-4 md:p-0 flex-col md:flex-row transition-all duration-300 ease-in-out z-50`}>
            <Link href="/muzyka" className="block py-2 md:py-0 hover:text-gray-300 transition duration-150 ease-in-out w-full text-center md:text-left md:w-auto mb-2 md:mb-0">
              Muzyka
            </Link>
            {isAuthenticated && user ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <>
                <Link href="/login" className="block py-2 md:inline-block md:py-0 hover:text-gray-300 transition duration-150 ease-in-out w-full text-center md:text-left md:w-auto mb-2 md:mb-0">
                  Zaloguj
                </Link>
                <Link href="/register" className="block py-2 md:inline-block md:py-0 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded transition duration-150 ease-in-out w-full text-center md:w-auto mt-2 md:mt-0">
                  Zarejestruj się
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});