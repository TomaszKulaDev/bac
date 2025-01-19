import React from "react";
import { Metadata } from "next";
import { CourseLayoutClient } from "./components/CourseLayoutClient";

export const metadata: Metadata = {
  title: "Nauka Tańca Bachata | MusiSite",
  description:
    "Naucz się tańczyć bachatę z najlepszymi instruktorami. Kursy dla początkujących i zaawansowanych.",
};

interface BachataLayoutProps {
  children: React.ReactNode;
}

export default function BachataLayout({ children }: BachataLayoutProps) {
  return <CourseLayoutClient>{children}</CourseLayoutClient>;
}
