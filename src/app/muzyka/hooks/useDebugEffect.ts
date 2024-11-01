import { useEffect } from 'react';

export const useDebugEffect = (name: string, value: any) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Debug] ${name}:`, value);
    }
  }, [name, value]);
}; 