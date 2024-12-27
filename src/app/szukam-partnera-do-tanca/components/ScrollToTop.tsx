"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
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
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full 
                   bg-gradient-to-r from-amber-500 to-red-500 
                   text-white shadow-lg hover:from-amber-600 
                   hover:to-red-600 transition-all duration-300
                   transform hover:scale-110 active:scale-95
                   animate-fade-in"
          aria-label="Przewiń do góry"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </>
  );
}
