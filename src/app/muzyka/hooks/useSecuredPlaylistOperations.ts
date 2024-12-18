import { useCallback } from 'react';

interface UseSecuredPlaylistOperationsProps {
  isAuthenticated: boolean;
  showErrorToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
}

export const useSecuredPlaylistOperations = ({
  isAuthenticated,
  showErrorToast,
  showSuccessToast
}: UseSecuredPlaylistOperationsProps) => {
  const secureOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    {
      requireAuth = true,
      errorMessage = 'Musisz być zalogowany, aby wykonać tę operację',
      successMessage
    }: {
      requireAuth?: boolean;
      errorMessage?: string;
      successMessage?: string;
    } = {}
  ): Promise<T | null> => {
    if (!isAuthenticated) {
      return null;
    }

    if (requireAuth && !isAuthenticated) {
      showErrorToast(errorMessage);
      return null;
    }

    try {
      const result = await operation();
      if (successMessage) {
        showSuccessToast(successMessage);
      }
      return result;
    } catch (error) {
      console.error('Błąd operacji:', error);
      showErrorToast(error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd');
      return null;
    }
  }, [isAuthenticated, showErrorToast, showSuccessToast]);

  return { secureOperation };
};
