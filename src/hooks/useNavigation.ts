import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export const useNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, handleLogout } = useAuth();

  const handleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return {
    isMobileMenuOpen,
    handleMobileMenu,
    user,
    isAuthenticated,
    handleLogout
  };
}; 