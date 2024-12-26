"use client";

import { useEffect, useRef } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import Link from "next/link";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToSearch = () => {
    const searchSection = document.getElementById("partner-search");
    if (searchSection) {
      const offset = 160;
      const elementPosition = searchSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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
      {/* Zmodyfikowany gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Zmodyfikowane animated particles */}
      <div className="absolute inset-0 z-0 opacity-40" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                     from-cyan-500/30 via-transparent to-transparent animate-pulse-slow"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                     from-amber-500/30 via-transparent to-transparent animate-pulse-slow delay-1000"
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
          poster="/images/Hero-szukam-partnera-do-tanca.webp"
          aria-hidden="true"
          preload="metadata"
        >
          <source src="/videos/bachata-hero.mp4" type="video/mp4" />
          <track kind="captions" srcLang="pl" label="Polski" />
        </video>
      </div>

      {/* Content z nowymi kolorami */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in-up space-y-6">
            <h1 className="text-4xl md:text-7xl font-bold leading-tight text-white">
              Znajdź Idealnego
              <span className="bg-gradient-to-r from-amber-500 to-red-500 text-transparent bg-clip-text animate-pulse-slow">
                {" "}
                Partnera{" "}
              </span>
              do Tańca
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Dołącz do największej społeczności tancerzy Bachaty w Polsce.
            </p>

            {/* Zmodyfikowane przyciski */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/dodaj-ogloszenie"
                className="btn-hero-primary group bg-gradient-to-r from-amber-500 to-red-500 
                         hover:from-amber-600 hover:to-red-600 text-white px-8 py-3 
                         rounded-full flex items-center gap-2 transition-all duration-300"
                aria-label="Dodaj ogłoszenie"
              >
                <FaUserPlus
                  className="text-xl group-hover:rotate-12 transition-transform"
                  aria-hidden="true"
                />
                Dodaj Ogłoszenie
              </Link>

              <button
                onClick={scrollToSearch}
                className="btn-hero-secondary group bg-white/10 hover:bg-white/20 
                         backdrop-blur-sm text-white px-8 py-3 rounded-full 
                         flex items-center gap-2 transition-all duration-300
                         border border-white/30"
                aria-label="Szukaj partnera"
              >
                <FaSearch
                  className="text-xl group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                Szukaj Partnera
              </button>
            </div>

            {/* Zmodyfikowane statystyki */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-400">2,500+</div>
                <div className="text-sm text-white/80">Aktywnych Tancerzy</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-400">150+</div>
                <div className="text-sm text-white/80">Miast</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-400">10,000+</div>
                <div className="text-sm text-white/80">Połączonych Par</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
