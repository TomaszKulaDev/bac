import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUser, FaCaretDown } from "react-icons/fa";

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative dropdown-container w-full md:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="user-menu"
        aria-label="Otwórz menu użytkownika"
        className="flex items-center space-x-1 hover:text-gray-300 transition duration-150 ease-in-out w-full md:w-auto justify-between md:justify-start py-2 md:py-0"
      >
        <FaUser />
        <span>{user.name}</span>
        <FaCaretDown className="ml-1" />
      </button>
      {isOpen && (
        <div
          id="user-menu"
          className="absolute right-0 mt-2 w-full md:w-48 bg-white rounded-md shadow-lg py-1 z-10"
        >
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
      )}
    </div>
  );
};
