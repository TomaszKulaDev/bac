"use client";
import { Suspense, useState } from "react";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

import NewsGrid from "@/app/home/NewsGrid";
import Footer from "@/app/home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="pt-8">
      
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
