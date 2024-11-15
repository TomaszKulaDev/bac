"use client";
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../AdminLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Notification } from '@/components/ui/Notification';
import { validateFile } from '@/lib/utils/fileValidation';

interface HeaderImage {
  position: number;
  imageName: string;
}

const HeaderImagesPage = () => {
  const { data: session } = useSession();
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [images, setImages] = useState<HeaderImage[]>([]);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleImageUpload = async (file: File, position: number) => {
    try {
      await validateFile(file);
      
      if (!selectedPosition) {
        setNotification({
          type: 'error',
          message: 'Wybierz pozycję dla zdjęcia'
        });
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('position', selectedPosition.toString());

      const response = await fetch('/api/header-images', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Błąd podczas uploadu');
      }
      
      await fetchImages();
      setSelectedPosition(null);
      
      if (fileInputRefs.current[position]) {
        fileInputRefs.current[position]!.value = '';
      }
      
      setNotification({
        type: 'success',
        message: 'Zdjęcie zostało dodane'
      });
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: error.message || 'Wystąpił błąd podczas uploadu'
      });
    }
  };

  const handleDeleteImage = async (position: number) => {
    if (!confirm('Czy na pewno chcesz usunąć to zdjęcie?')) {
      return;
    }
    
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
        
        <ImagePositionSelector
          onSelect={setSelectedPosition}
          currentImages={images}
          selectedPosition={selectedPosition}
        />
        
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
                <ImageCell 
                  position={position} 
                  image={images.find(img => img.position === position)}
                  onDelete={handleDeleteImage}
                />

                <div className="text-center">
                  <p className="font-semibold mb-2">Pozycja {position}</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, position);
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
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

const ImagePositionSelector = ({ onSelect, currentImages, selectedPosition }: {
  onSelect: (position: number) => void;
  currentImages: HeaderImage[];
  selectedPosition: number | null;
}) => {
  const positions = [1, 2, 3, 4, 5];
  
  return (
    <div className="flex gap-4 justify-center mb-8">
      {positions.map((pos) => {
        const isOccupied = currentImages.some(img => img.position === pos);
        const isSelected = selectedPosition === pos;
        
        return (
          <button
            key={pos}
            onClick={() => onSelect(pos)}
            className={`
              relative w-12 h-12 rounded-full border-2
              flex items-center justify-center
              transition-all duration-300
              ${isSelected 
                ? 'border-green-500 bg-green-500/10' 
                : isOccupied 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-gray-300 hover:border-blue-300'}
            `}
          >
            <span className="text-sm font-medium">{pos}</span>
            {isOccupied && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

const ImageCell = ({ 
  position, 
  image, 
  onDelete 
}: { 
  position: number; 
  image?: HeaderImage;
  onDelete: (position: number) => void;
}) => {
  return (
    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
      {image ? (
        <>
          <Image
            src={`/images/header/${image.imageName}`}
            alt={`Pozycja ${position}`}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.jpg';
            }}
            priority={position <= 2}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(position)}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full 
                     hover:bg-red-600 transition-colors"
            title="Usuń zdjęcie"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </>
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">Brak zdjęcia</span>
        </div>
      )}
    </div>
  );
};

export default HeaderImagesPage;
