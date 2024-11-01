import React from 'react';

interface LoadingStateProps {
  error?: string | null;
}

const LoadingState: React.FC<LoadingStateProps> = ({ error }) => {
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Wystąpił błąd</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 rounded mt-2"></div>
      </div>
    </div>
  );
};

export default LoadingState;
