"use client";

import { useEffect, useRef } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import Link from "next/link";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Autoplay prevented");
      });
    }
  }, []);

  return (
    <section
      className="relative h-[85vh] min-h-[600px]"
      aria-label="Główny banner"
      role="banner"
    >
      {/* Overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10"
        aria-hidden="true"
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 z-0 opacity-30" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                     from-red-500/20 via-transparent to-transparent animate-pulse-slow"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                     from-purple-500/20 via-transparent to-transparent animate-pulse-slow delay-1000"
        />
      </div>

      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          poster="/images/hero-poster.jpg"
          aria-hidden="true"
          preload="metadata"
        >
          <source src="/videos/bachata-hero.mp4" type="video/mp4" />
          <track kind="captions" srcLang="pl" label="Polski" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in-up space-y-6">
            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              Znajdź Idealnego
              <span className="text-red-500 animate-pulse-slow">
                {" "}
                Partnera{" "}
              </span>
              do Tańca
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Dołącz do największej społeczności tancerzy bachaty w Polsce
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/dodaj-ogloszenie"
                className="btn-hero-primary group"
                aria-label="Dodaj ogłoszenie"
              >
                <FaUserPlus
                  className="text-xl group-hover:rotate-12 transition-transform"
                  aria-hidden="true"
                />
                Dodaj Ogłoszenie
              </Link>

              <Link
                href="/szukaj"
                className="btn-hero-secondary group"
                aria-label="Szukaj partnera"
              >
                <FaSearch
                  className="text-xl group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                Szukaj Partnera
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 text-white/90">
              <div>
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-sm text-white/70">Aktywnych Tancerzy</div>
              </div>
              <div>
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-white/70">Miast</div>
              </div>
              <div>
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-sm text-white/70">Połączonych Par</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
