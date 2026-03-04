/**
 * Header Component
 * 
 * Displays the application header with title and action buttons.
 * Shows logout button when user is logged in.
 * Includes dark/light mode toggle button.
 */

import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Header component - displays top navigation bar
 * 
 * @returns {JSX} - Header with title and action buttons
 */
const Header = () => {
  const navigate = useNavigate();
  // Get authentication token from localStorage
  const token = localStorage.getItem('token');
  
  // Get theme functions from context
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  /**
   * Handle user logout
   * Removes token and redirects to login page
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Application Title */}
        <h1>GitHub Search App</h1>
        
        {/* Action buttons container */}
        <div className="header-actions">
          {/* Dark mode toggle button */}
          <button 
            onClick={toggleDarkMode} 
            className="theme-toggle"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {/* Show sun icon in dark mode, moon in light mode */}
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          {/* Logout button - only show when logged in */}
          {token && (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

