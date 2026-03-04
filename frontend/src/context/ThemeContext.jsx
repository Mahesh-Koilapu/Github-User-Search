/**
 * Theme Context - Manages Dark/Light Mode Globally
 * 
 * This context provides theme state and toggle functionality
 * to all components in the application.
 * 
 * Features:
 * - Persists user preference in localStorage
 * - Respects system preference on first visit
 * - Provides theme state to all child components
 */

import { createContext, useContext, useState, useEffect } from 'react';

// Create context with undefined as default
const ThemeContext = createContext();

/**
 * Custom hook to access theme context
 * Must be used within a ThemeProvider
 * 
 * @returns {object} - { isDarkMode, toggleDarkMode }
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Theme Provider Component
 * Wraps the app and provides theme functionality
 * 
 * @param {object} children - Child components
 */
export const ThemeProvider = ({ children }) => {
  // Initialize state from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // First check localStorage for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // If no saved preference, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Effect to apply theme changes and persist to localStorage
  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Apply/remove dark class to HTML element for CSS styling
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  /**
   * Toggle between dark and light mode
   */
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Provide theme context to children
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

