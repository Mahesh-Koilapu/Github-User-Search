import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';


const ThemeInitializer = () => {
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  

  return null;
};

export default ThemeInitializer;

