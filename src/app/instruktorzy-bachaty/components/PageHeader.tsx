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
  gradient = "from-amber-200 via-amber-400 to-amber-200",
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Tło */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-white" />
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-amber-100/20 blur-3xl" />
        <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-amber-50/30 blur-3xl" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-3 mb-8 text-sm">
            <span className="text-gray-600">Strona główna</span>
            <FaArrowRight className="w-3 h-3 text-gray-400" />
            <span className="text-amber-600 font-medium">Instruktorzy</span>
          </nav>

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
