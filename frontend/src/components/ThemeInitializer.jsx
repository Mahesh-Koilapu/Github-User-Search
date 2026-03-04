/**
 * Theme Initializer Component
 * 
 * This invisible component initializes the dark mode
 * when the application first loads. It applies the
 * saved theme preference to the document immediately.
 */

import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Theme Initializer - Applies theme on page load
 * This runs before the page renders to prevent flash
 * 
 * @returns {null} - This component renders nothing
 */
const ThemeInitializer = () => {
  // Get current theme state from context
  const { isDarkMode } = useTheme();
  
  // Apply theme class on mount and when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // This component doesn't render anything
  return null;
};

export default ThemeInitializer;

