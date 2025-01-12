export function HeroSection() {
  return (
    <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
      {/* Tło z efektem parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("/images/bachata-romance.jpg")',
          filter: "brightness(0.3)",
        }}
      />

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Odkryj Swoich Instruktorów
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
          Znajdź idealnego instruktora bachaty, który pomoże Ci rozwinąć Twoją
          pasję
        </p>
      </div>
    </div>
  );
}
