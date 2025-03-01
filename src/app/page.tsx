"use client";
import { Suspense, useState } from "react";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

import NewsGrid from "@/app/home/NewsGrid";
import OnetNewsSection from "@/app/home/OnetNewsRedSection";
import Footer from "@/app/home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pt-8">
        {/* Onet News Section - full width */}
        <section className="py-8 mb-8 w-full">
          <OnetNewsSection />
        </section>

        {/* News Grid */}
        <section className="py-8">
          <NewsGrid />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
