import Link from "next/link";
import { FaUser, FaMusic } from "react-icons/fa";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Home(): React.ReactElement {
  return (
    <div style={{backgroundColor: 'white', minHeight: '100vh'}}>
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-indigo-800 mb-8">
          Baciata.pl
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Baciata.pl – Twoja nowa przestrzeń do tańca bachaty!
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/taniec">
            <FeatureCard
              icon={<FaUser className="text-4xl text-indigo-600" />}
              title="Bachata na Baciata.pl"
              description="Dołącz do społeczności Baciata.pl – Odkryj najnowsze trendy w tańcu i muzyce, badz na bieząco z wydarzeniami. Baciata.pl to miejsce, gdzie pasja do tańca łączy ludzi!"
            />
          </Link>
          <Link href="/muzyka">
            <FeatureCard
              icon={<FaMusic className="text-4xl text-indigo-600" />}
              title="Najlepsza muzyka do tańczenia Bachaty"
              description="Odkryj największą kolekcję muzyki bachaty online. Playlisty dla początkujących i zaawansowanych tancerzy, klasyczne hity i współczesne utwory."
            />
          </Link>
        </div>

        <div className="text-center space-x-4">
          <Link
            href="/register"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 inline-block"
          >
            Rozpocznij teraz
          </Link>
          <Link
            href="/muzyka"
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 inline-block"
          >
            Odkryj muzykę
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
