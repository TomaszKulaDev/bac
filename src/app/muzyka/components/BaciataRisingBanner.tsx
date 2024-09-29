import Image from "next/image";

const BaciataRisingBanner: React.FC = () => {
  return (
    <div className="w-full bg-white text-black py-12 px-4 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-4">
          {/* <Image
            src="/baciata-logo-black.png" // Upewnij się, że masz czarne logo
            alt="Baciata Rising"
            width={40}
            height={40}
          /> */}
          <h2 className="text-2xl font-bold mt-2 tracking-[0.2em]">
            BACIATA RISING
          </h2>
        </div>
        <h1 className="text-5xl font-black text-center leading-tight tracking-[0.1em]">
          Z MIŁOŚCI DO MUZYKI.
        </h1>
      </div>
    </div>
  );
};

export default BaciataRisingBanner;
