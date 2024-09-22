import React from "react";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  console.log("LoginModal rendered");
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Witamy ponownie!
        </h2>
        <p className="mb-6 text-gray-600">
          Zaloguj się, aby móc głosować na swoje ulubione utwory i cieszyć się
          pełnią funkcji naszej aplikacji.
        </p>
        <a
          href="/login"
          className="block text-center bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full hover:from-green-600 hover:to-teal-600 transition duration-300 mb-4"
        >
          Zaloguj się
        </a>
        <a
          href="/register"
          className="block text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full hover:from-yellow-600 hover:to-orange-600 transition duration-300 mb-4"
        >
          Zarejestruj się
        </a>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition duration-300"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
