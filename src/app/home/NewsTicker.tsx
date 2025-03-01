"use client";

import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const newsItems = [
  "Światowy Kongres Bachaty 2024 - bilety już w sprzedaży!",
  "Nowe kursy bachaty dla początkujących startują w przyszłym tygodniu",
  "Dominikańscy mistrzowie bachaty przyjeżdżają do Polski na warsztaty",
  "Festiwal Bachata Fusion 2024 - zapisy otwarte do końca miesiąca",
  "Nowy album Romeo Santosa bije rekordy popularności",
  "Mistrzostwa Polski w Bachacie - zgłoszenia tylko do 15 czerwca",
  "Bachata w parach - nowy trend na parkietach całego świata",
];

export default function NewsTicker() {
  return (
    <div className="w-full bg-red-600 text-white overflow-hidden py-2">
      <div className="max-w-[1600px] mx-auto px-4 flex items-center">
        <div className="overflow-hidden relative w-full">
          <div className="ticker-wrapper">
            <div className="ticker-move">
              {newsItems.map((item, index) => (
                <span key={index} className="ticker-item">
                  {item}
                </span>
              ))}
              {/* Duplikujemy elementy dla płynnego zapętlenia */}
              {newsItems.map((item, index) => (
                <span key={`dup-${index}`} className="ticker-item">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Style dla animacji */}
      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .ticker-move {
          display: inline-block;
          white-space: nowrap;
          padding-right: 100%;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          animation-name: tickerMove;
          animation-duration: 100s;
        }

        .ticker-item {
          display: inline-block;
          padding: 0 2rem;
        }

        @keyframes tickerMove {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
