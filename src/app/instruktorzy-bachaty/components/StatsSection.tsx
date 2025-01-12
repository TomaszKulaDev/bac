import { motion } from "framer-motion";

interface StatsSectionProps {
  lightMode?: boolean;
}

export function StatsSection({ lightMode = false }: StatsSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-500 to-amber-600 
                          bg-clip-text text-transparent"
            >
              20+
            </div>
            <div className="text-gray-600 font-medium">Instruktorów</div>
          </motion.div>
          <div>
            <div className="text-4xl font-bold mb-2 text-amber-500">5+</div>
            <div className="text-gray-600 font-medium">Lat doświadczenia</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-amber-500">1000+</div>
            <div className="text-gray-600 font-medium">Uczniów</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-amber-500">50+</div>
            <div className="text-gray-600 font-medium">Kursów</div>
          </div>
        </div>
      </div>
    </section>
  );
}
