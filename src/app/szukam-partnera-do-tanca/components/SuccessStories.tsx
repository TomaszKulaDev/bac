import Image from "next/image";
import { FaQuoteLeft, FaStar, FaHeart } from "react-icons/fa";

interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  names: string;
  date: string;
  rating: number;
  likes: number;
}

const stories: Story[] = [
  {
    id: "1",
    title: "Od pierwszego treningu do mistrzostw",
    description:
      "Poznaliśmy się przez portal szukając partnera do treningu. Po roku wspólnych ćwiczeń wzięliśmy udział w mistrzostwach Polski!",
    image: "/success-stories/story-1.jpg",
    names: "Asia i Marek",
    date: "Marzec 2024",
    rating: 5,
    likes: 234,
  },
  // ... więcej historii
];

export function SuccessStories() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Historie Sukcesu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Zobacz jak inni znaleźli swoich idealnych partnerów tanecznych
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-64">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(story.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold">{story.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-3 -left-2 text-red-100 text-4xl" />
                  <p className="text-gray-600 mb-4 relative z-10">
                    {story.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">{story.names}</p>
                    <p className="text-gray-500">{story.date}</p>
                  </div>
                  <div className="flex items-center gap-1 text-red-500">
                    <FaHeart />
                    <span className="text-sm">{story.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
            Zobacz więcej historii
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
