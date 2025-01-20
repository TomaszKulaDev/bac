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
