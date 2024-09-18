import Link from "next/link";
import { FaUser, FaLock, FaShieldAlt } from "react-icons/fa";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Home(): React.ReactElement {
  return (
    <div className="min-h-screen bg-indigo-100">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-indigo-800 mb-8">
          Baciata.pl
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Baciata.pl – Twoja nowa przestrzeń do tańca bachaty!
        </p>

        <div className="grid md:grid-cols-1 gap-8 mb-16">
          <FeatureCard
            icon={<FaUser className="text-4xl text-indigo-600" />}
            title="Taniec"
            description="Dołącz do społeczności Baciata.pl – Odkryj najnowsze trendy w tańcu i muzyce, badz na bieząco z wydarzeniami. Baciata.pl to miejsce, gdzie pasja do tańca łączy ludzi! Dołącz do społeczności Bachaty pełnej energii, dziel się swoimi doświadczeniami i odkrywaj nowe rytmy życia. Razem tworzymy przestrzeń, w której każdy krok ma znaczenie."
          />
        </div>

        <div className="text-center">
          <Link
            href="/register"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Rozpocznij teraz
          </Link>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
        {title}
      </h2>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}
