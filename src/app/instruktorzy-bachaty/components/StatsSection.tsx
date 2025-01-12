interface StatsSectionProps {
  lightMode?: boolean;
}

export function StatsSection({ lightMode = false }: StatsSectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2 text-amber-500">20+</div>
            <div className="text-gray-600 font-medium">Instruktorów</div>
          </div>
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
