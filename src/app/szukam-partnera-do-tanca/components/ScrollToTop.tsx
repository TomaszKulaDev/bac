"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 
                   w-12 h-12 
                   flex items-center justify-center
                   bg-gradient-to-br from-amber-500 to-amber-600
                   hover:from-amber-600 hover:to-amber-700
                   text-white rounded-xl shadow-lg
                   transform rotate-3 hover:rotate-6
                   transition-all duration-300 group
                   hover:shadow-amber-500/25"
          aria-label="Przewiń do góry"
        >
          <FaArrowUp
            className="w-5 h-5 
                     group-hover:scale-110 
                     transition-transform duration-300"
          />
          <div
            className="absolute -bottom-1 -right-1 
                        w-5 h-5 bg-white rounded-lg 
                        shadow-sm flex items-center 
                        justify-center transform 
                        -rotate-12 group-hover:rotate-[-24deg] 
                        transition-all duration-300"
          >
            <span className="text-amber-600 text-[10px] font-bold">↑</span>
          </div>
        </button>
      )}
    </>
  );
}
