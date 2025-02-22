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
} from "react-icons/fa";
import type {
  StatCardProps,
  RankingCardProps,
  EventCardProps,
  NewsCardProps,
} from "./types";
export { metadata } from "./metadata";

const Header = () => (
  <header className="bg-gradient-to-r from-red-800 to-red-600 py-4">
    <nav className="container mx-auto px-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-white">POLAND BACHATA LEAGUE</div>
      <div className="flex gap-6 text-white">
        <a href="#ranking">Ranking</a>
        <a href="#events">Wydarzenia</a>
        <a href="#news">Aktualności</a>
        <a href="#stats">Statystyki</a>
      </div>
    </nav>
  </header>
);

const NewsCard: React.FC<NewsCardProps> = ({ date, title, image, excerpt }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
    <div className="relative h-48">
      <Image src={image} alt={title} fill className="object-cover" />
    </div>
    <div className="p-4">
      <div className="text-sm text-gray-500 mb-2">{date}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{excerpt}</p>
    </div>
  </div>
);

const NextEvents = () => {
  const upcomingEvents = [
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
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Najbliższe Wydarzenia</h2>
      <div className="space-y-4">
        {upcomingEvents.map((event, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <div className="text-sm text-gray-500">
                {event.date} {event.time}
              </div>
              <div className="font-semibold">{event.title}</div>
              <div className="text-sm text-gray-600">{event.location}</div>
            </div>
            <div className="text-sm font-medium text-red-600">
              {event.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
      excerpt: "Wprowadzamy nowy system punktacji w lidze...",
    },
    // ... więcej newsów
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <section id="ranking">
              <h2 className="text-2xl font-bold mb-6">Top Ranking</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tu dodaj komponenty RankingCard */}
              </div>
            </section>

            <section id="news">
              <h2 className="text-2xl font-bold mb-6">Aktualności</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map((item, index) => (
                  <NewsCard key={index} {...item} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <NextEvents />

            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Statystyki Sezonu</h2>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
