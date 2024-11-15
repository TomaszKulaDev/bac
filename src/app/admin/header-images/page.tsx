"use client";
import React, { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface HeaderImage {
  position: number;
  imageName: string;
}

const HeaderImagesPage = () => {
  const { data: session } = useSession();
  const [images, setImages] = useState<HeaderImage[]>([]);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/header-images');
      if (!response.ok) throw new Error('Błąd podczas pobierania zdjęć');
      const data = await response.json();
      setImages(data);
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: error.message || 'Wystąpił błąd podczas pobierania zdjęć'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (position: number, file: File) => {
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Wybierz plik obrazu');
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('position', position.toString());

      const response = await fetch('/api/header-images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Błąd podczas uploadu');
      }

      await fetchImages();
      setNotification({
        type: 'success',
        message: 'Zdjęcie zostało pomyślnie dodane'
      });
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: error.message || 'Wystąpił błąd podczas uploadu zdjęcia'
      });
    }
  };

  const handleDeleteImage = async (position: number) => {
    try {
      const response = await fetch(`/api/header-images?position=${position}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Błąd podczas usuwania zdjęcia');
      }

      await fetchImages();
      setNotification({
        type: 'success',
        message: 'Zdjęcie zostało pomyślnie usunięte'
      });
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: error.message || 'Wystąpił błąd podczas usuwania zdjęcia'
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Zarządzanie zdjęciami nagłówka</h1>
        
        {isLoading ? (
          <div>Ładowanie...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((position) => (
              <motion.div
                key={position}
                className="bg-white p-4 rounded-lg shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                  {images.find(img => img.position === position) ? (
                    <Image
                      src={`/images/header/${images.find(img => img.position === position)?.imageName}`}
                      alt={`Pozycja ${position}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Brak zdjęcia</span>
                    </div>
                  )}
                  {images.find(img => img.position === position) && (
                    <button
                      onClick={() => handleDeleteImage(position)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      title="Usuń zdjęcie"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="text-center">
                  <p className="font-semibold mb-2">Pozycja {position}</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(position, file);
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {notification && (
          <div
            className={`fixed bottom-4 right-4 p-4 rounded-lg ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default HeaderImagesPage;
