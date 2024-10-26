// Importujemy React, który jest niezbędny do tworzenia komponentów
import React from 'react';

// Definiujemy interfejs props dla komponentu DeleteAllConfirmation
interface DeleteAllConfirmationProps {
  isOpen: boolean;      // Określa, czy modal jest otwarty
  onConfirm: () => void; // Funkcja wywoływana przy potwierdzeniu
  onCancel: () => void;  // Funkcja wywoływana przy anulowaniu
}

// Definiujemy komponent funkcyjny DeleteAllConfirmation
const DeleteAllConfirmation: React.FC<DeleteAllConfirmationProps> = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  // Jeśli modal nie jest otwarty, nie renderujemy nic
  if (!isOpen) return null;

  // Renderujemy modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Kontener modalu z tłem i centrowaniem zawartości */}
      <div className="bg-white p-6 rounded-lg max-w-md">
        {/* Nagłówek ostrzegawczy */}
        <h2 className="text-xl font-bold text-red-600 mb-4">
          ⚠️ Uwaga! Operacja nieodwracalna
        </h2>
        {/* Opis konsekwencji operacji */}
        <p className="mb-6 text-gray-700">
          Czy na pewno chcesz usunąć wszystkie utwory? Ta operacja jest nieodwracalna i spowoduje:
          <ul className="list-disc ml-6 mt-2">
            <li>Usunięcie wszystkich utworów z bazy danych</li>
            <li>Wyczyszczenie wszystkich playlist</li>
          </ul>
        </p>
        {/* Kontener przycisków */}
        <div className="flex justify-end space-x-4">
          {/* Przycisk anulowania */}
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Anuluj
          </button>
          {/* Przycisk potwierdzenia usunięcia */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Usuń wszystko
          </button>
        </div>
      </div>
    </div>
  );
};

// Eksportujemy komponent, aby mógł być użyty w innych częściach aplikacji
export default DeleteAllConfirmation;
