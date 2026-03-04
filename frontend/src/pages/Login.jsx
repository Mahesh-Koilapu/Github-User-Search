/**
 * Login Page Component
 * 
 * This page handles both user login and registration.
 * Users can toggle between login and register forms.
 * Uses theme context for dark/light mode support.
 */

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { loginUser, registerUser } from '../services/authApi';

/**
 * Login page component
 * Handles user authentication (login and registration)
 * 
 * @returns {JSX} - Login/Register form
 */
const Login = () => {
  // Toggle between login and register mode
  const [isRegister, setIsRegister] = useState(false);
  
  // Form input states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Feedback message states
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get theme for dark mode support
  const { isDarkMode } = useTheme();

  /**
   * Handle form submission
   * Calls login or register API based on current mode
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    // Validate inputs
    if (!username.trim() || !password.trim()) {
      setMessage('Please fill in all fields');
      setIsError(true);
      return;
    }

    try {
      setIsLoading(true);

      if (isRegister) {
        // Register new user
        const data = await registerUser({ username, password });
        
        if (data.message === 'User registered successfully') {
          setMessage('Registration successful! Please login.');
          setIsRegister(false);
          setUsername('');
          setPassword('');
        } else {
          setMessage(data.message || 'Registration failed');
          setIsError(true);
        }
      } else {
        // Login existing user
        const data = await loginUser({ username, password });

        if (data.token) {
          // Save token and redirect to dashboard
          localStorage.setItem('token', data.token);
          window.location.href = '/';
        } else {
          setMessage(data.message || 'Invalid credentials');
          setIsError(true);
        }
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggle between login and register mode
   * Clears form and messages when switching
   */
  const toggleMode = () => {
    setIsRegister(!isRegister);
    setMessage('');
    setIsError(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className={`auth-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="auth-card">
        {/* Page title */}
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        
        {/* Authentication form */}
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="form-group">
            <input 
              type="text" 
              value={username}
              onChange={event => setUsername(event.target.value)} 
              placeholder="Username"
              disabled={isLoading}
            />
          </div>
          
          {/* Password input */}
          <div className="form-group">
            <input 
              type="password" 
              value={password}
              onChange={event => setPassword(event.target.value)} 
              placeholder="Password"
              disabled={isLoading}
            />
          </div>
          
          {/* Submit button */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Please wait...' : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>

        {/* Success or error message */}
        {message && (
          <p className={isError ? 'error-message' : 'success-message'}>
            {message}
          </p>
        )}

        {/* Toggle between login and register */}
        <p className="toggle-text">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button 
            type="button" 
            onClick={toggleMode}
            className="toggle-btn"
            disabled={isLoading}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

