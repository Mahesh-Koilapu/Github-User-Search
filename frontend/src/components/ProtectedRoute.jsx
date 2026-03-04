/**
 * Protected Route Component
 * 
 * This component protects routes that require authentication.
 * If user is not logged in, they are redirected to login page.
 * 
 * Usage: Wrap any component that should only be accessible
 *        to authenticated users with this component.
 */

import { Navigate } from 'react-router-dom';

/**
 * Higher-order component that protects child routes
 * 
 * @param {ReactNode} children - The protected component to render
 * @returns {JSX} - Either children or redirect to login
 */
const ProtectedRoute = ({ children }) => {
  // Check if user has a valid token in localStorage
  const token = localStorage.getItem('token');

  // If no token found, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute;

