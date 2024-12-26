"use client";

import { useEffect, useRef } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Lazy loading video
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback dla urządzeń mobilnych
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10" />

      {/* Animated background particles */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse-slow delay-1000" />
      </div>

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
        >
          <source src="/videos/bachata-hero.mp4" type="video/mp4" />
          <track kind="captions" srcLang="pl" label="Polski" />
        </video>
      </div>

      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              Znajdź Idealnego
              <span className="text-red-500 animate-pulse-slow">
                {" "}
                Partnera{" "}
              </span>
              do Tańca
            </h1>
            <meta
              name="description"
              content="Największa społeczność tancerzy w Polsce"
            />
            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto">
              Dołącz do największej społeczności tancerzy bachaty w Polsce
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero-primary group">
                <FaUserPlus className="text-xl group-hover:rotate-12 transition-transform" />
                Dodaj Ogłoszenie
              </button>
              <button className="btn-hero-secondary group">
                <FaSearch className="text-xl group-hover:scale-110 transition-transform" />
                Szukaj Partnera
              </button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up delay-300">
            {[
              { value: "2,500+", label: "Aktywnych Tancerzy" },
              { value: "1,200+", label: "Udanych Par" },
              { value: "48", label: "Miast" },
              { value: "120+", label: "Szkół Partnerskich" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center transform hover:scale-105 transition-transform"
              >
                <div
                  className="text-2xl md:text-3xl font-bold text-red-500 mb-1 animate-count-up"
                  data-value={stat.value}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
