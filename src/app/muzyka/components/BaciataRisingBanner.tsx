import Image from "next/image";

const BaciataRisingBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#0a1e3b] to-[#2a4a7f] text-white py-16 px-4 mb-8 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/music-notes.svg')] bg-repeat animate-float" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-0.5 rounded-full mb-4">
            <div className="bg-[#0a1e3b] px-6 py-2 rounded-full">
              <span className="text-white font-medium">Baciata.pl</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-2 tracking-[0.2em] text-white/80">
            BACIATA RISING
          </h2>
        </div>
        <h1 className="text-5xl font-black text-center leading-tight tracking-[0.1em] animate-fade-in-up text-white">
          NAJLEPSZE BACIATKI
        </h1>
      </div>
    </div>
  );
};

export default BaciataRisingBanner;
