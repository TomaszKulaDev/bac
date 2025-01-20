/**
 * Layout dla sekcji nauki tańca bachata.
 * Główne funkcjonalności:
 * - Zapewnia spójny układ dla wszystkich podstron kursu
 * - Importuje i eksportuje metadane dla SEO
 * - Opakowuje zawartość w komponent CourseLayoutClient
 * - Obsługuje routing i nawigację w obrębie kursu
 * 
 * Komponent przyjmuje props:
 * - children: komponenty potomne do wyrenderowania w layoucie
 */

import React from "react";
import { CourseLayoutClient } from "./components/CourseLayoutClient";
import { metadata } from "./page.metadata";

export { metadata };

interface BachataLayoutProps {
  children: React.ReactNode;
}

export default function BachataLayout({ children }: BachataLayoutProps) {
  return <CourseLayoutClient>{children}</CourseLayoutClient>;
}
