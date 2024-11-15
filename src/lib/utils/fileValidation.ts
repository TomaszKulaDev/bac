export const validateFile = async (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Dozwolone są tylko pliki JPEG, PNG i WebP');
    }
    
    if (file.size > maxSize) {
      throw new Error('Maksymalny rozmiar pliku to 5MB');
    }
  
    // Sprawdź wymiary obrazu
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        if (img.width < 800 || img.height < 600) {
          reject(new Error('Minimalne wymiary obrazu to 800x600px'));
        }
        resolve();
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error('Nie udało się zweryfikować wymiarów obrazu'));
      };
    });
  };