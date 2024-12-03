import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { createPortal } from 'react-dom';

interface UserMenuProps {
  user: {
    name: string;
    role?: string;
  };
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Funkcja do obliczania pozycji menu
  const getMenuPosition = () => {
    if (!buttonRef.current) return { top: 0, right: 0 };
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: `${rect.bottom + window.scrollY}px`,
      right: `${window.innerWidth - rect.right}px`
    };
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:text-gray-300 transition duration-150 ease-in-out"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaUser />
        <span>{user.name}</span>
      </button>

      {isOpen && createPortal(
        <div 
          ref={menuRef}
          className="fixed w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          style={{
            ...getMenuPosition(),
            zIndex: 9999
          }}
        >
          <div className="py-1" role="menu">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Profil
            </Link>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Panel Admin
              </Link>
            )}
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Wyloguj
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
