import Head from "next/head";
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
      <Head>
        <title>baciata.pl – Twoja nowa przestrzeń do tańca bachaty!</title>
        <meta
          name="description"
          content="Dołącz do baciata.pl – To miejsce, gdzie pasja do tańca łączy ludzi! Dołącz do społeczności Bachaty pełnej energii, dziel się swoimi doświadczeniami i odkrywaj nowe rytmy życia. Razem tworzymy przestrzeń, w której każdy krok ma znaczenie."
        />
      </Head>
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-indigo-800 mb-8">
          Witaj w MyApp
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Bezpieczne i intuicyjne rozwiązanie dla Twoich potrzeb
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<FaUser className="text-4xl text-indigo-600" />}
            title="Zarządzaj profilem"
            description="Łatwo aktualizuj swoje dane i preferencje"
          />
          <FeatureCard
            icon={<FaLock className="text-4xl text-indigo-600" />}
            title="Bezpieczne logowanie"
            description="Wielopoziomowe zabezpieczenia Twoich danych"
          />
          <FeatureCard
            icon={<FaShieldAlt className="text-4xl text-indigo-600" />}
            title="Ochrona prywatności"
            description="Pełna kontrola nad udostępnianymi informacjami"
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
