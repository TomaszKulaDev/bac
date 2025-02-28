"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Event {
  id: string;
  title: string;
  image: string;
  slug: string;
  date: string;
  location?: string;
}

export default function EventsHighlights() {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  // Przykładowe dane wydarzeń bachatowych
  const events: Event[] = [
    {
      id: "1",
      title:
        "Warsaw Bachata Festival 2024 - 10. edycja największego festiwalu w Polsce",
      image:
        "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=1770&auto=format&fit=crop",
      slug: "warsaw-bachata-festival-2024",
      date: "2024-06-15",
      location: "Warszawa",
    },
    {
      id: "2",
      title:
        "Bachata Summer Camp - Intensywne warsztaty z międzynarodowymi instruktorami",
      image:
        "https://images.unsplash.com/photo-1545128485-c400ce7b23d5?q=80&w=1770&auto=format&fit=crop",
      slug: "bachata-summer-camp-2024",
      date: "2024-07-20",
      location: "Kraków",
    },
    {
      id: "3",
      title: "Bachata Night - Wieczór z muzyką na żywo i pokazami mistrzów",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop",
      slug: "bachata-night-live-music",
      date: "2024-05-25",
      location: "Wrocław",
    },
    {
      id: "4",
      title: "Poland Bachata League - Finały krajowych mistrzostw",
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1770&auto=format&fit=crop",
      slug: "poland-bachata-league-finals",
      date: "2024-08-10",
      location: "Poznań",
    },
  ];

  return (
    <div className="mb-12">
      <div className="border-b border-gray-200 pb-2 mb-6">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
          WYDARZENIA BACHATOWE FESTIWALE
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <motion.div
            key={event.id}
            className="relative overflow-hidden rounded-md shadow-md h-[300px] group"
            onHoverStart={() => setHoveredEvent(event.id)}
            onHoverEnd={() => setHoveredEvent(null)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/wydarzenia/${event.slug}`} className="block h-full">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

              <Image
                src={event.image}
                alt={event.title}
                fill
                className={`object-cover transition-transform duration-700 ${
                  hoveredEvent === event.id ? "scale-105" : "scale-100"
                }`}
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-white font-medium text-lg leading-tight mb-2">
                  {event.title}
                </h3>

                <div className="flex items-center text-xs text-gray-200 mt-2">
                  <time>
                    {new Date(event.date).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>

                  {event.location && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{event.location}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
