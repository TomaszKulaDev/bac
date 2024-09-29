import Image from "next/image";

const BaciataRisingBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 px-4 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-2xl font-bold mt-2 tracking-[0.2em] animate-pulse">
            BACIATA RISING
          </h2>
        </div>
        <h1 className="text-5xl font-black text-center leading-tight tracking-[0.1em] animate-fade-in-up">
          Z MIŁOŚCI DO MUZYKI.
        </h1>
      </div>
    </div>
  );
};


export default BaciataRisingBanner;