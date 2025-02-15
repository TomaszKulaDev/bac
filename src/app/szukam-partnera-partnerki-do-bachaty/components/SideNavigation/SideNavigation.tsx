"use client";

import {
  FaHome,
  FaPlus,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./SideNavigation.module.css";

export default function SideNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <>
      {/* Przycisk hamburger menu dla mobile */}
      <button
        className={styles.menuToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <FaTimes className={styles.menuIcon} />
        ) : (
          <FaBars className={styles.menuIcon} />
        )}
      </button>

      <nav
        className={`${styles.sideNav} ${isMobile ? styles.mobile : ""} ${
          isOpen ? styles.open : ""
        }`}
        aria-label="Menu główne"
        role="navigation"
      >
        <div className={styles.navContent}>
          <Link
            href="/"
            className={styles.navButton}
            aria-label="Strona główna"
            title="Strona główna"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaHome className={styles.navIcon} aria-hidden="true" />
            <span className={styles.srOnly}>Strona główna</span>
          </Link>

          <button
            className={styles.navButton}
            aria-label="Dodaj nowy profil"
            title="Dodaj nowy profil"
            type="button"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaPlus className={styles.navIcon} aria-hidden="true" />
            <span className={styles.srOnly}>Dodaj nowy profil</span>
          </button>

          <button
            className={styles.navButton}
            aria-label="Wyszukaj partnera"
            title="Wyszukaj partnera"
            type="button"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaSearch className={styles.navIcon} aria-hidden="true" />
            <span className={styles.srOnly}>Wyszukaj partnera</span>
          </button>

          <Link
            href="/moj-profil"
            className={styles.navButton}
            aria-label="Mój profil"
            title="Mój profil"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaUser className={styles.navIcon} aria-hidden="true" />
            <span className={styles.srOnly}>Mój profil</span>
          </Link>
        </div>
      </nav>

      {/* Overlay dla mobile */}
      {isMobile && isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
