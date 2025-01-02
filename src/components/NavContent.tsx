"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { FaMusic } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/slices/authSlice";
import { RootState } from "../store/slices/types";
import { useAuth } from "../hooks/useAuth";
import { UserMenu } from "./UserMenu";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { useNavigation } from "@/hooks/useNavigation";
import { useSession } from "next-auth/react";

export const NavContent: React.FC = React.memo(function NavContent() {
  const {
    isMobileMenuOpen,
    handleMobileMenu,
    user,
    isAuthenticated,
    handleLogout,
  } = useNavigation();
  const { data: session } = useSession();

  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <nav className="nav-container">
        <div className="nav-gradient">
          <div className="nav-content">
            <div className="w-full h-full flex items-center justify-between px-4">
              {/* Logo */}
              <div className="nav-item w-[100px]">
                <Link href="/" className="flex items-center h-full">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                    <span className="text-[#E30613] font-bold text-sm">
                      BAC
                    </span>
                  </div>
                </Link>
              </div>

              {/* Menu główne */}
              <div className="nav-item hidden md:flex justify-center flex-1">
                <div className="flex items-center justify-between w-[600px]">
                  <Link
                    href="/muzyka"
                    className="text-white text-[13px] tracking-wide font-medium hover:opacity-90 whitespace-nowrap"
                  >
                    MUZYKA
                  </Link>
                  <Link
                    href="/szukam-partnera-do-tanca"
                    className="text-white text-[13px] tracking-wide font-medium hover:opacity-90 whitespace-nowrap"
                  >
                    SZUKAM PARTNERA
                  </Link>
                  <Link
                    href="/taneczne-historie"
                    className="text-white text-[13px] tracking-wide font-medium hover:opacity-90 whitespace-nowrap"
                  >
                    TANECZNE HISTORIE
                  </Link>
                  <Link
                    href="/wydarzenia"
                    className="text-white text-[13px] tracking-wide font-medium hover:opacity-90 whitespace-nowrap"
                  >
                    WYDARZENIA
                  </Link>
                  <Link
                    href="/szkoly"
                    className="text-white text-[13px] tracking-wide font-medium hover:opacity-90 whitespace-nowrap"
                  >
                    SZKOŁY TAŃCA
                  </Link>
                </div>
              </div>

              {/* Przyciski logowania */}
              <div className="nav-item w-[200px] hidden md:flex justify-end gap-4">
                {isAuthenticated && user ? (
                  <UserMenu
                    user={{
                      name: user.name,
                      role: user.role,
                    }}
                    onLogout={handleLogout}
                  />
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-white text-[13px] font-medium hover:opacity-90"
                    >
                      Zaloguj
                    </Link>
                    <Link
                      href="/register"
                      className="text-white text-[13px] font-medium hover:opacity-90"
                    >
                      Dołącz do nas
                    </Link>
                  </>
                )}
              </div>

              {/* Przycisk mobilny */}
              <button
                className="md:hidden text-white hover:opacity-90"
                onClick={handleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-[45px]" />
    </Suspense>
  );
});
