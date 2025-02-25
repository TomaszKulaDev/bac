import React from "react";
import Image from "next/image";
import {
  FaCalendar,
  FaTrophy,
  FaUsers,
  FaMapMarkerAlt,
  FaStar,
  FaMedal,
  FaChartLine,
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import type {
  StatCardProps,
  RankingCardProps,
  EventCardProps,
  NewsCardProps,
} from "./types";
export { metadata } from "./metadata";

const Header = () => (
  <header className="fixed w-full bg-white shadow-sm z-50">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-red-600">PBL</div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#ranking"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Ranking
            </a>
            <a
              href="#events"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Wydarzenia
            </a>
            <a
              href="#news"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Aktualności
            </a>
            <a
              href="#stats"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Statystyki
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FaSearch className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FaBell className="text-gray-600" />
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
            <FaUserCircle />
            <span>Zaloguj się</span>
          </button>
        </div>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="pt-16 bg-gradient-to-br from-red-600 to-red-800 text-white">
    <div className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Poland Bachata League
          </h1>
          <p className="text-xl mb-8 text-red-100">
            Dołącz do największej społeczności bachatowej w Polsce. Rywalizuj,
            rozwijaj się i baw się razem z nami!
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-red-50 transition-colors">
              Dołącz do nas
            </button>
            <button className="px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Zobacz ranking
            </button>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/images/hero-image.jpg"
            alt="Bachata dancers"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  </section>
);

const RankingCard: React.FC<RankingCardProps> = ({
  rank,
  name,
  points,
  image,
  category,
}) => (
  <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-4">
      <div className="relative w-16 h-16">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-full"
        />
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
          {rank}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
      <div className="text-right">
        <div className="font-bold text-xl text-red-600">{points}</div>
        <div className="text-sm text-gray-500">punktów</div>
      </div>
    </div>
  </div>
);

const NewsCard: React.FC<NewsCardProps> = ({ date, title, image, excerpt }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div className="relative h-48">
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
        {date}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-3 hover:text-red-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 line-clamp-2">{excerpt}</p>
      <button className="mt-4 text-red-600 font-semibold hover:text-red-700 transition-colors">
        Czytaj więcej →
      </button>
    </div>
  </div>
);

const EventCard: React.FC<EventCardProps> = ({
  date,
  time,
  title,
  location,
  category,
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start space-x-4">
      <div className="flex flex-col items-center justify-center bg-red-50 rounded-lg p-3 min-w-[80px]">
        <span className="text-red-600 font-bold text-xl">
          {date.split(".")[0]}
        </span>
        <span className="text-red-600 text-sm">{`${date.split(".")[1]}.${
          date.split(".")[2]
        }`}</span>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <FaMapMarkerAlt className="mr-1" />
          {location}
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <FaCalendar className="mr-1" />
          {time}
        </div>
        <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
          {category}
        </span>
      </div>
    </div>
  </div>
);

const StatCard: React.FC<StatCardProps> = ({ number, label }) => (
  <div className="bg-white rounded-xl p-6 text-center">
    <div className="text-3xl font-bold text-red-600 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default function PolandBachataLeague() {
  const stats = [
    { number: "1,200+", label: "Tancerzy" },
    { number: "48", label: "Wydarzenia" },
    { number: "6", label: "Miast" },
    { number: "3", label: "Dywizje" },
  ];

  const news = [
    {
      date: "20.02.2024",
      title: "Nowy system rankingowy",
      image: "/news/ranking.jpg",
      excerpt:
        "Wprowadzamy nowy system punktacji w lidze, który jeszcze lepiej odzwierciedla umiejętności tancerzy...",
    },
    // ... więcej newsów
  ];

  const rankings = [
    {
      rank: 1,
      name: "Anna Kowalska",
      points: 2500,
      image: "/avatars/anna.jpg",
      category: "Pro Division",
    },
    // ... więcej rankingów
  ];

  const events = [
    {
      date: "24.02.2024",
      time: "20:00",
      title: "Bachata Masters Warsaw",
      location: "Warszawa",
      category: "Pro Division",
    },
    // ... więcej wydarzeń
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />

      <main className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </section>

        {/* Ranking Section */}
        <section id="ranking" className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Top Ranking</h2>
            <button className="text-red-600 hover:text-red-700 transition-colors">
              Zobacz wszystkich →
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {rankings.map((ranking, index) => (
              <RankingCard key={index} {...ranking} />
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* News Section */}
            <section id="news">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Aktualności</h2>
                <button className="text-red-600 hover:text-red-700 transition-colors">
                  Wszystkie aktualności →
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {news.map((item, index) => (
                  <NewsCard key={index} {...item} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold mb-6">
                Nadchodzące Wydarzenia
              </h2>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
              <button className="w-full mt-6 px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors">
                Zobacz wszystkie wydarzenia
              </button>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Poland Bachata League</h3>
              <p className="text-gray-400">
                Największa społeczność bachatowa w Polsce
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Linki</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    O nas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ranking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Wydarzenia
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Społeczność</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Bądź na bieżąco z wydarzeniami
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Twój email"
                  className="flex-1 px-4 py-2 rounded-l-full bg-gray-800 border-gray-700 text-white"
                />
                <button className="px-6 py-2 bg-red-600 text-white rounded-r-full hover:bg-red-700 transition-colors">
                  Zapisz się
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; 2024 Poland Bachata League. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
