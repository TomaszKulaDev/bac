'use client';

import { useState } from "react";
import { FaHeart, FaShare } from "react-icons/fa";
import Image from "next/image";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

interface Story {
  id: number;
  content: string;
  likes: number;
  image?: string;
}

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const TaneczneHistoriePage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStory.trim() !== "") {
      const newStoryObj: Story = {
        id: Date.now(),
        content: newStory,
        likes: 0,
        image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      };
      setStories([newStoryObj, ...stories]);
      setNewStory("");
      setSelectedImage(null);
    }
  };

  const handleLike = (storyId: number) => {
    setStories(prevStories =>
      prevStories.map(story =>
        story.id === storyId ? { ...story, likes: story.likes + 1 } : story
      )
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
    onDrop: (acceptedFiles: File[]) => {
      setSelectedImage(acceptedFiles[0]);
    },
  });

  const featuredStories = stories.slice(0, 5);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500"
    >
      {/* Hero Image */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="/hero-image.jpg"
            alt="Taneczne Historie"
            fill
            className="object-cover"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-96">
          <h1 className="text-5xl font-bold text-white text-center">
            Taneczne Historie
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Stories */}
          {featuredStories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Polecane historie</h2>
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={5000}
                transitionTime={500}
                swipeable
                emulateTouch
              >
                {featuredStories.map(story => (
                  <div key={story.id} className="bg-white p-6 rounded-lg shadow-lg">
                    {story.image && (
                      <Image src={story.image} alt="Historia" width={500} height={300} className="w-full h-64 object-cover mb-4 rounded-lg" />
                    )}
                    <p className="text-gray-800 mb-4">{story.content}</p>
                    <div className="flex justify-end space-x-4">
                      <button 
                        className="flex items-center text-pink-500 hover:text-pink-600"
                        onClick={() => handleLike(story.id)}
                      >
                        <FaHeart className={`mr-1 ${story.likes > 0 ? 'text-pink-600' : ''}`} /> 
                        {story.likes > 0 ? story.likes : 'Lubię to!'}
                      </button>
                      <button className="flex items-center text-purple-500 hover:text-purple-600">
                        <FaShare className="mr-1" /> Udostępnij
                      </button>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          {/* Share Your Story */}
          <div>
            <p className="text-xl text-white text-center mb-8">
              Podziel się swoją wyjątkową taneczną historią z naszą społecznością!
            </p>
            <form onSubmit={handleSubmit} className="mb-8">
              <textarea
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
                placeholder="Podziel się swoją taneczną historią..."
                className="w-full h-32 p-4 rounded-lg shadow-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                maxLength={500}
              ></textarea>
              
              <div {...getRootProps()} className="mt-4 p-4 border-2 border-dashed border-white rounded-lg cursor-pointer">
                <input {...getInputProps()} />
                {selectedImage ? (
                  <Image src={URL.createObjectURL(selectedImage)} alt="Wybrane zdjęcie" width={500} height={300} className="w-full h-48 object-cover rounded-lg" />
                ) : (
                  <p className="text-white text-center">Przeciągnij i upuść zdjęcie lub kliknij, aby wybrać</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 bg-white text-purple-500 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-purple-100 transition duration-200"
              >
                Opublikuj
              </button>
            </form>
          </div>
        </div>

        {/* All Stories */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {stories.map((story) => (
              <div key={story.id} className="bg-white p-6 rounded-lg shadow-lg mb-4">
                {story.image && (
                  <Image src={story.image} alt="Historia" width={500} height={300} className="w-full h-64 object-cover mb-4 rounded-lg" />
                )}
                <p className="text-gray-800 mb-4">{story.content}</p>
                <div className="flex justify-end space-x-4">
                  <button 
                    className="flex items-center text-pink-500 hover:text-pink-600"
                    onClick={() => handleLike(story.id)}
                  >
                    <FaHeart className={`mr-1 ${story.likes > 0 ? 'text-pink-600' : ''}`} />
                    {story.likes > 0 ? story.likes : 'Lubię to!'}
                  </button>
                  <button className="flex items-center text-purple-500 hover:text-purple-600">
                    <FaShare className="mr-1" /> Udostępnij
                  </button>
                </div>
              </div>
            ))}
          </Masonry>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TaneczneHistoriePage;

