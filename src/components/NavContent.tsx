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
              <div className="nav-item w-[180px]">
                <Link href="/" className="flex items-center gap-4 group">
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-xl bg-white/95 flex items-center justify-center 
                    transform rotate-3 group-hover:rotate-6 transition-all duration-300 shadow-lg"
                    >
                      <span
                        className="text-red-600 font-bold text-[14px] tracking-wider leading-none 
                      text-center"
                      >
                        BACIATA
                      </span>
                    </div>
                    <div
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-orange-500 
                    flex items-center justify-center transform -rotate-12 group-hover:rotate-[-24deg] 
                    transition-all duration-300"
                    >
                      <span className="text-white text-sm font-bold">PL</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-2xl leading-none">
                      DANCE
                    </span>
                    <span className="text-white/80 text-sm">community</span>
                  </div>
                </Link>
              </div>

              {/* Menu główne */}
              <div className="nav-item hidden md:flex justify-center flex-1">
                <div className="flex items-center justify-between w-[600px]">
                  <Link
                    href="/muzyka"
                    className="relative text-white text-[13px] tracking-wide font-medium 
                    hover:opacity-90 whitespace-nowrap group"
                  >
                    <span>MUZYKA</span>
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[2px] bg-white 
                    transition-all duration-300 group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/szukam-partnera-do-tanca"
                    className="relative text-white text-[13px] tracking-wide font-medium 
                    hover:opacity-90 whitespace-nowrap group"
                  >
                    <span>SZUKAM PARTNERA</span>
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[2px] bg-white 
                    transition-all duration-300 group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/taneczne-historie"
                    className="relative text-white text-[13px] tracking-wide font-medium 
                    hover:opacity-90 whitespace-nowrap group"
                  >
                    <span>TANECZNE HISTORIE</span>
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[2px] bg-white 
                    transition-all duration-300 group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/wydarzenia"
                    className="relative text-white text-[13px] tracking-wide font-medium 
                    hover:opacity-90 whitespace-nowrap group"
                  >
                    <span>WYDARZENIA</span>
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[2px] bg-white 
                    transition-all duration-300 group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/szkoly"
                    className="relative text-white text-[13px] tracking-wide font-medium 
                    hover:opacity-90 whitespace-nowrap group"
                  >
                    <span>SZKOŁY TAŃCA</span>
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[2px] bg-white 
                    transition-all duration-300 group-hover:w-full"
                    ></span>
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
    </Suspense>
  );
});
