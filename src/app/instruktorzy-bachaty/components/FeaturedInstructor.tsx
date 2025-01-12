import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { Instructor } from "@/types/instructor";

interface FeaturedInstructorProps {
  instructor: Instructor;
}

export function FeaturedInstructor({ instructor }: FeaturedInstructorProps) {
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={instructor.image}
          alt={instructor.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {instructor.name}
            </h1>
            <div className="flex items-center gap-4 text-white/80 mb-6">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>{instructor.location}</span>
              </div>
              {instructor.instagram && (
                <a
                  href={`https://instagram.com/${instructor.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-amber-500"
                >
                  <FaInstagram />
                  <span>{instructor.instagram}</span>
                </a>
              )}
            </div>
            <p className="text-lg text-white/90 mb-8">
              {instructor.description}
            </p>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Umów lekcję
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
