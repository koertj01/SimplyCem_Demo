import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeMode } from './ThemeProvider';

export const ThemeListener = () => {
  const { setActiveThemeType } = useThemeMode();
  const location = useLocation();
  
  useEffect(() => {
    // Set theme based on route
    if (location.pathname === '/') {
      setActiveThemeType('home');
    } else {
      setActiveThemeType('app');
    }
  }, [location.pathname, setActiveThemeType]);
  
  return null; 
};