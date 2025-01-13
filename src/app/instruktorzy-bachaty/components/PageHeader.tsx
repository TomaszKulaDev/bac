import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  gradient?: string;
}

export function PageHeader({
  title,
  subtitle,
  ctaText = "Znajdź instruktora",
  onCtaClick = () => {
    // Domyślna funkcja przewijania do sekcji wyszukiwania
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    }
  },
  gradient = "from-purple-200 via-purple-400 to-purple-200",
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Breadcrumb - przeniesiony wyżej */}
      <nav className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center space-x-3 text-sm">
          <span className="text-gray-600">Strona główna</span>
          <FaArrowRight className="w-3 h-3 text-gray-400" />
          <span className="text-amber-600 font-medium">Instruktorzy</span>
        </div>
      </nav>

      {/* Tło */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 to-white" />
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-purple-100/20 blur-3xl" />
        <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-purple-50/30 blur-3xl" />

        {/* Mapa Polski */}
        <svg
          viewBox="0 0 500 600"
          className="absolute right-20 top-1/2 -translate-y-1/2 h-[600px] w-auto"
          fill="none"
        >
          <path
            d="m 548.83,291.64 c -0.46,0.04 -0.93,0.07 -1.4,0.07 -6.47,0 -12.17,-3.66 -14.55,-9.52 l -0.05,-0.13 c -0.71,-1.79 -1.17,-3.71 -1.31,-5.69 l -0.01,-0.3 -0.08,-0.44 -0.06,-0.36 c -0.43,-2.35 -0.66,-4.83 -0.66,-7.36 0,-6.72 2.4,-13.17 6.71,-18.17 l 0.13,-0.14 0.31,-0.36 0.33,-0.38 0.17,-0.18 c 3.83,-4.33 8.93,-7.43 14.74,-8.54 l 1.44,-0.27 0.74,-0.12 0.74,-0.13 0.73,-0.12 c 3.28,-0.54 6.62,-0.81 9.97,-0.8 7.67,0.01 14.9,3.08 20.15,8.37 l 0.16,0.16 0.28,0.28 0.27,0.27 0.16,0.15 c 4.46,4.34 7.17,10.23 7.36,16.58 l 0.03,0.9 0.03,0.82 v 0.47 c -0.01,1.71 -0.28,3.4 -0.78,5.01 l -0.13,0.38 -0.21,0.59 -0.12,0.31 c -1.28,3.32 -3.64,6.16 -6.79,8.12 l -0.45,0.28 -0.97,0.56 -0.43,0.25 c -3.85,2.22 -8.44,3.41 -13.14,3.41 -0.57,0 -1.14,-0.03 -1.7,-0.09 z m -5.7,-22.27 c -1.3,0.15 -2.55,0.34 -3.79,0.59 l -1.13,0.2 -0.65,0.1 -0.65,0.12 -1.36,0.22 c -3.11,0.5 -6.03,1.24 -8.76,2.21 l -0.57,0.21 -0.39,0.14 -0.4,0.14 -0.57,0.2 c -2.47,0.88 -4.58,2.03 -6.3,3.41 l -0.27,0.21 -0.17,0.13 -0.18,0.13 -0.27,0.21 c -1.03,0.78 -1.89,1.65 -2.58,2.59 l -0.11,0.15 -0.06,0.08 -0.06,0.08 -0.11,0.15 c -0.53,0.74 -0.94,1.5 -1.23,2.3 l -0.03,0.09 -0.01,0.03 -0.01,0.03 -0.03,0.09 c -0.21,0.58 -0.34,1.17 -0.39,1.77 l -0.01,0.16 v 0.08 l -0.01,0.25 0,0.06 c -0.01,0.69 0.11,1.36 0.36,1.99 l 0.05,0.13 0.03,0.06 0.05,0.13 c 0.39,0.94 1.02,1.79 1.82,2.5 l 0.14,0.12 0.08,0.07 0.08,0.07 0.14,0.12 c 0.96,0.83 2.12,1.5 3.39,1.97 l 0.22,0.08 0.12,0.04 0.12,0.04 0.22,0.08 c 1.44,0.53 2.96,0.82 4.52,0.82 0.21,0 0.42,-0.01 0.63,-0.03 l 0.97,-0.09 0.98,-0.09 0.47,-0.04 c 0.57,-0.06 1.14,-0.13 1.7,-0.21 l 0.26,-0.04 0.28,-0.05 0.26,-0.04 c 1.54,-0.25 3.02,-0.63 4.41,-1.13 l 0.18,-0.06 0.09,-0.03 0.09,-0.03 0.18,-0.06 c 0.99,-0.34 1.94,-0.74 2.83,-1.2 l 0.16,-0.08 0.16,-0.09 0.16,-0.08 c 1.79,-0.97 3.29,-2.39 4.35,-4.1 l 0.06,-0.09 0.03,-0.05 0.06,-0.09 c 0.42,-0.67 0.72,-1.38 0.91,-2.11 l 0.01,-0.1 0.01,-0.15 0,-0.07 c -0.01,-0.68 -0.13,-1.35 -0.36,-1.98 l -0.03,-0.09 -0.04,-0.05 -0.03,-0.09 c -0.29,-0.81 -0.77,-1.55 -1.39,-2.2 l -0.05,-0.05 -0.05,-0.05 -0.05,-0.05 c -0.68,-0.74 -1.51,-1.39 -2.43,-1.92 l -0.34,-0.19 -0.18,-0.1 -0.18,-0.1 -0.34,-0.19 c -1.03,-0.58 -2.1,-1.07 -3.21,-1.46 l -0.27,-0.09 -0.14,-0.05 -0.14,-0.05 -0.27,-0.09 c -1.17,-0.4 -2.36,-0.7 -3.55,-0.89 l -0.28,-0.04 -0.28,-0.04 -0.57,-0.09 z m 19.49,-14.39 c 0.52,-0.23 1.01,-0.49 1.49,-0.77 l 0.35,-0.21 0.19,-0.11 0.19,-0.11 0.35,-0.21 c 0.65,-0.39 1.27,-0.8 1.87,-1.22 l 0.17,-0.12 0.09,-0.06 0.09,-0.06 0.17,-0.12 c 0.82,-0.58 1.55,-1.18 2.2,-1.83 l 0.06,-0.06 0.03,-0.03 0.06,-0.06 c 0.34,-0.35 0.64,-0.7 0.9,-1.06 l 0.03,-0.04 0,-0.04 0.03,-0.04 c 0.18,-0.25 0.33,-0.5 0.45,-0.76 l 0.02,-0.04 0.01,-0.03 0.02,-0.04 c 0.07,-0.18 0.11,-0.37 0.15,-0.55 l 0.01,-0.07 v -0.09 l 0,-0.15 c -0.01,-0.46 -0.08,-0.91 -0.2,-1.35 l -0.01,-0.03 -0.02,-0.02 -0.01,-0.03 c -0.14,-0.44 -0.35,-0.85 -0.63,-1.24 l -0.03,-0.04 -0.04,-0.03 -0.03,-0.04 c -0.38,-0.51 -0.86,-0.95 -1.42,-1.31 l -0.08,-0.05 -0.08,-0.04 -0.08,-0.05 c -0.86,-0.55 -1.83,-0.96 -2.86,-1.2 l -0.4,-0.09 -0.21,-0.04 -0.21,-0.04 -0.4,-0.09 c -1.24,-0.29 -2.51,-0.43 -3.78,-0.43 -0.28,0 -0.56,0.01 -0.83,0.03 l -0.66,0.05 -1.08,0.08 -0.46,0.04 c -0.47,0.04 -0.93,0.09 -1.39,0.15 l -0.22,0.03 -0.11,0.02 -0.11,0.02 -0.22,0.03 c -0.8,0.11 -1.58,0.25 -2.33,0.43 l -0.13,0.03 -0.13,0.03 -0.13,0.03 c -1.51,0.36 -2.87,0.88 -4.08,1.57 l -0.08,0.04 -0.04,0.02 -0.04,0.02 -0.08,0.04 c -0.63,0.36 -1.22,0.75 -1.76,1.18 l -0.05,0.04 -0.05,0.04 -0.05,0.04 c -0.55,0.44 -1.05,0.91 -1.48,1.41 l -0.03,0.04 -0.02,0.02 -0.03,0.04 c -0.27,0.38 -0.49,0.77 -0.67,1.17 l -0.01,0.03 0,0.05 -0.01,0.03 c -0.11,0.27 -0.2,0.54 -0.26,0.82 l 0,0.07 -0.01,0.15 c 0.01,0.46 0.08,0.91 0.2,1.35 l 0.01,0.03 0.02,0.02 0.01,0.03 c 0.14,0.44 0.35,0.85 0.63,1.24 l 0.03,0.04 0.04,0.03 0.03,0.04 c 0.38,0.51 0.86,0.95 1.42,1.31 l 0.08,0.05 0.08,0.04 0.08,0.05 c 0.86,0.55 1.83,0.96 2.86,1.2 l 0.4,0.09 0.21,0.04 0.21,0.04 0.4,0.09 c 1.24,0.29 2.51,0.43 3.78,0.43 0.28,0 0.56,-0.01 0.83,-0.03 l 0.66,-0.05 1.08,-0.08 0.46,-0.04 c 0.47,-0.04 0.93,-0.09 1.39,-0.15 l 0.22,-0.03 0.11,-0.02 0.11,-0.02 0.22,-0.03 c 0.8,-0.11 1.58,-0.25 2.33,-0.43 l 0.13,"
            className="stroke-amber-400 stroke-[3] opacity-30"
          />
        </svg>
      </div>

      {/* Główna zawartość */}
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {" "}
        {/* Zmniejszone paddingi */}
        <div className="max-w-4xl">
          {/* Główny tytuł */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Podtytuł */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-xl text-gray-600 leading-relaxed max-w-3xl"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA i statystyki */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <button
              onClick={onCtaClick}
              className="group inline-flex items-center px-6 py-3 text-base font-semibold 
                       bg-amber-500 text-white rounded-lg shadow-sm hover:bg-amber-600 
                       transition-all duration-200 ease-in-out"
            >
              {ctaText}
              <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-8 text-gray-600">
              <div>
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm">Instruktorów</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-sm">Średnia ocen</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <div className="text-2xl font-bold text-gray-900">1000+</div>
                <div className="text-sm">Lekcji</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dekoracyjny pasek dolny */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200" />
    </section>
  );
}
