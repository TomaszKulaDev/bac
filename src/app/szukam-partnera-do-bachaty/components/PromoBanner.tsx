"use client";

import Image from "next/image";
import Link from "next/link";

export function PromoBanner() {
  return (
    <aside className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -right-1/4 inset-y-0 w-[125%]">
          <div className="relative w-full h-full">
            <Image
              src="/images/Hero-szukam-partnera-do-tanca.webp"
              alt=""
              fill
              className="object-cover object-[center_25%]"
              style={{
                maskImage: "linear-gradient(to left, black 50%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to left, black 50%, transparent)",
              }}
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/95 via-amber-500/80 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="lg:max-w-lg">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              2000+ aktywnych tancerzy
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-sm">
              Bachata łączy ludzi
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Poznaj innych pasjonatów Bachaty, umów się na wspólne lekcje i
              wydarzenia taneczne. Rozwijaj swoją pasję w dobrym towarzystwie!
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/rejestracja"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-amber-600 
                         shadow-md hover:shadow-lg hover:bg-white/95 active:bg-white/90
                         transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
              >
                Dołącz do społeczności
              </Link>
              <Link
                href="/o-spolecznosci"
                className="group inline-flex items-center text-sm font-semibold text-white hover:text-white/90
                         transition-all duration-200"
              >
                Dowiedz się więcej
                <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
